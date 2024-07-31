import json
import re

def corrigir_valores_licitacao(valores):
    if valores is None:
        return None      
    lista = []
    for valor in valores:
        valor = str(valor).replace(',','.')
        lista.append(float(valor))
    return lista
def processar_arquivo_json(caminho_arquivo):
    with open(caminho_arquivo, 'r', encoding='utf-8') as arquivo:
        dados = json.load(arquivo)
    print(type(dados[0]['valores_licitacao']))
    for i in dados:
        i['valores_licitacao'] = corrigir_valores_licitacao(i['valores_licitacao'])
    
    with open(caminho_arquivo, 'w', encoding='utf-8') as arquivo:
        json.dump(dados, arquivo, indent=4, ensure_ascii=False)

# Caminho do arquivo JSON que você forneceu
caminho_arquivo = '/home/victor-schmidt/Documents/forks/LicitaBSB-24.1/backend/colecao_de_dados/database/data_avisos.json'

# Processa o arquivo JSON
processar_arquivo_json(caminho_arquivo)
