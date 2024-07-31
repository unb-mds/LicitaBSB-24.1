import json
import re

def corrigir_valores_licitacao(valores):
    if valores is None:
        return None        
    new_valores = []
    if len(valores) == 1:
        if valores[0].count('.') > 1:
            valores[0] = valores[0][:-1]
        valores[0] = valores[0].replace(',','.')
        new_valores = [valores[0]]
    else:
        for valor in valores:
            pontos = valor.count('.')
            if pontos > 1:
                valor = valor[:-1]
            new_valores.append(valor)
    if len(new_valores) == 1:
        new_valores = [float(new_valores[0].replace(',','.'))]

    return new_valores
def processar_arquivo_json(caminho_arquivo):
    with open(caminho_arquivo, 'r', encoding='utf-8') as arquivo:
        dados = json.load(arquivo)
    print(type(dados[0]['valores_licitacao']))
    for i in dados:
        if isinstance(i['valores_licitacao'], str):
            i['valores_licitacao'] = [i['valores_licitacao']]
        else:
            i['valores_licitacao'] = corrigir_valores_licitacao(i['valores_licitacao'])
    
    with open(caminho_arquivo, 'w', encoding='utf-8') as arquivo:
        json.dump(dados, arquivo, indent=4, ensure_ascii=False)

# Caminho do arquivo JSON que você forneceu
caminho_arquivo = '/home/victor-schmidt/Documents/forks/LicitaBSB-24.1/backend/colecao_de_dados/database/data_avisos.json'

# Processa o arquivo JSON
processar_arquivo_json(caminho_arquivo)
