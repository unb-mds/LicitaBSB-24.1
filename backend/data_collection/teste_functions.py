import functions as func
import pytest
from requests.adapters import HTTPAdapter
from urllib3.util.retry import Retry
from datetime import datetime, timedelta
import json
from bs4 import BeautifulSoup
from requests.exceptions import HTTPError

def test_criar_sessao_com_retries_defaults():
    session = func.criar_sessao_com_retries()
    adapter = session.get_adapter("http://")
    retry = adapter.max_retries

    assert isinstance(retry, Retry)
    assert retry.total == 3
    assert retry.backoff_factor == 0.3
    assert tuple(retry.status_forcelist) == (500, 502, 504)  # usando tuple para comparação

def test_criar_sessao_com_retries_custom():
    session = func.criar_sessao_com_retries(retries=5, backoff_factor=1.0, status_forcelist=(400, 401))
    adapter = session.get_adapter("http://")
    retry = adapter.max_retries

    assert isinstance(retry, Retry)
    assert retry.total == 5
    assert retry.backoff_factor == 1.0
    assert tuple(retry.status_forcelist) == (400, 401)  # usando tuple para comparação

# Mock de criação de sessão com retries para evitar dependências externas nos testes
def criar_sessao_com_retries_mock():
    class MockSession:
        def get(self, url):
            return MockResponse(200)

    class MockResponse:
        def __init__(self, status_code):
            self.status_code = status_code

    return MockSession()

def test_link_jornal_diario_data_futura():
    # Preparação
    data_futura = datetime.now() + timedelta(days=1)
    dia, mes, ano = data_futura.day, data_futura.month, data_futura.year

    # Execução
    resultado = func.link_jornal_diario(dia, mes, ano)

    # Verificação
    assert "Data informada é posterior à data atual." in resultado

def test_link_jornal_diario_data_passada():
    # Preparação
    data_passada = datetime.now() - timedelta(days=1)
    dia, mes, ano = data_passada.day, data_passada.month, data_passada.year

    # Mock da função criar_sessao_com_retries
    criar_sessao_com_retries = criar_sessao_com_retries_mock

    # Execução
    resultado = func.link_jornal_diario(dia, mes, ano)

    # Verificação
    assert "leiturajornal?data=" in resultado
from requests.exceptions import HTTPError

def criar_sessao_com_retries_mock_json():
    class MockSession:
        def get(self, url):
            if url == 'https://www.in.gov.br/leiturajornal?data=27-06-2024':
                return MockResponse(200, '<html><body><script id="params" type="application/json">{"jsonArray": [{"urlTitle": "exemplo1"}, {"urlTitle": "exemplo2"}]}</script></body></html>')
            elif url == 'https://www.in.gov.br/leiturajornal312312312':
                raise HTTPError("404 Not Found")
            else:
                return MockResponse(200, '<html><body><p>Conteúdo da página</p></body></html>')

    class MockResponse:
        def __init__(self, status_code, text):
            self.status_code = status_code
            self.text = text

        def raise_for_status(self):
            if self.status_code != 200:
                raise HTTPError(f"{self.status_code} Error")

    return MockSession()

def test_extrair_url_titles_sucesso():
    # Preparação
    url_valida = 'https://www.in.gov.br/leiturajornal?data=27-06-2024'

    # Mock da função criar_sessao_com_retries
    func.criar_sessao_com_retries = criar_sessao_com_retries_mock_json

    # Execução
    resultado = func.extrair_url_titles(url_valida)

    # Verificação
    assert isinstance(resultado, list)
    assert len(resultado) == 2
    assert all(url.startswith("http://www.in.gov.br/web/dou/-/") for url in resultado)

def test_extrair_url_titles_not_found():
    # Preparação
    url_not_found = 'https://www.in.gov.br/leiturajornal312312312'

    # Mock da função criar_sessao_com_retries
    func.criar_sessao_com_retries = criar_sessao_com_retries_mock_json

    # Execução e Verificação
    with pytest.raises(HTTPError):
        func.extrair_url_titles(url_not_found)
