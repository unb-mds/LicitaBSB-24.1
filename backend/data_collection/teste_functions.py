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

def test_extraindo_avisos_licitacao_com_aviso_de_licitacao():
    # Preparação
    lista_urls = [
        "http://www.in.gov.br/web/dou/-/aviso-de-licitacao-371275885",
        "https://www.in.gov.br/web/dou/-/decisoes-568649220",
        "http://www.in.gov.br/web/dou/-/aviso-de-licitacao-370987947",
    ]
    
    # Execução
    resultado = func.extraindo_avisos_licitacao(lista_urls)
    
    # Verificação
    expected_urls = [
        "http://www.in.gov.br/web/dou/-/aviso-de-licitacao-371275885",
        "http://www.in.gov.br/web/dou/-/aviso-de-licitacao-370987947",
    ]
    
    assert len(resultado) == 2
    assert all(url in resultado for url in expected_urls)

def test_extraindo_avisos_licitacao_sem_aviso_de_licitacao():
    # Preparação
    lista_urls = [
        "https://www.in.gov.br/web/dou/-/decisoes-568649220",
        "https://www.in.gov.br/web/dou/-/lei-n-14.903-de-27-de-junho-de-2024-568649644",
    ]
    
    # Execução
    resultado = func.extraindo_avisos_licitacao(lista_urls)
    
    # Verificação
    assert len(resultado) == 0

def test_extraindo_avisos_licitacao_com_lista_vazia():
    # Preparação
    lista_urls = []
    
    # Execução
    resultado = func.extraindo_avisos_licitacao(lista_urls)
    
    # Verificação
    assert len(resultado) == 0


# Definindo os casos de teste como uma lista para a função filtrando_os_avisos_de_brasilia
test_cases = [
    ("Aviso de Brasília sem mencionar específicos", True),
    ("Aviso sem referência a city que temos o objetivo de pegar", False),
    ("Aviso de Brasília às 10h da manhã", False),
    ("Aviso de Brasília, DF", True),
    ("Aviso de Brasília em Ceilândia", True),
    ("Aviso de Brasília no Plano Piloto", True),
    ("Aviso de BRASÍLIA", True),
    ("Aviso de BrAsÍlIa no PLaNo PILOTO", True),
    ("Aviso de Brasília às 15h", False),
    ("Aviso de Brasília para as 11h00", False),
]

# Iterando sobre os casos de teste
@pytest.mark.parametrize("descricao, expected", test_cases)
def test_filtrando_os_avisos_de_brasilia(descricao, expected):
    assert func.filtrando_os_avisos_de_brasilia(descricao) == expected