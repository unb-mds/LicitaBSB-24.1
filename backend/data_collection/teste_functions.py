import functions as func
import pytest
from requests.adapters import HTTPAdapter
from urllib3.util.retry import Retry


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
