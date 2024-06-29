import functions as func
import pytest
from requests.adapters import HTTPAdapter
from urllib3.util.retry import Retry
from datetime import datetime, timedelta

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