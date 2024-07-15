import json
from datetime import datetime
from dotenv import load_dotenv

load_dotenv() #carrega os segredos da API do twitter e constantes

licitacoes = []
caminho_extrato = 'backend/data_collection_extrato/database/data.json'
caminho_avisos = 'backend/data_collection_avisos/database/data.json'
data_hoje = '10/07/2024'#datetime.now().strftime('%d/%m/%Y')  # pega as licitações de hoje, tem que garantir que esse código só será executado quando o json já estiver atualizado com a data de hoje

print(f"Buscando licitações para a data: {data_hoje}")
QUANTIDADE_DE_TWETTS_DIA = 0
with open(caminho_avisos, 'r', encoding='utf-8') as file:
    licitacoes_data = json.load(file)
    for licitacao in licitacoes_data:
        if licitacao['data_abertura'] == data_hoje:
            QUANTIDADE_DE_TWETTS_DIA += 1
            
with open(caminho_extrato, 'r', encoding='utf-8') as file:
    licitacoes_data = json.load(file)
    for licitacao in licitacoes_data:
        if licitacao['data_abertura'] == data_hoje:
            QUANTIDADE_DE_TWETTS_DIA += 1

if not licitacoes:
    QUANTIDADE_DE_TWETTS_DIA += 1
