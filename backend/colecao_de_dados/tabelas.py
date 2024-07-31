import pandas as pd
import json
import os

def criar_tabela_de_json(caminho_arquivo_json, chave):
    try:
        with open(caminho_arquivo_json, 'r', encoding='utf-8') as file:
            dados = json.load(file)
        
        if not dados:
            print("Nenhum dado encontrado no arquivo JSON.")
            return pd.DataFrame()
        
        dados_filtrados = [item[chave] for item in dados if chave in item]
        
        if not dados_filtrados:
            print(f"Nenhum dado encontrado com a chave '{chave}'.")
            return pd.DataFrame()
        
        df = pd.DataFrame(dados_filtrados, columns=[chave])
        return df
    except FileNotFoundError:
        print(f"Arquivo {caminho_arquivo_json} não encontrado.")
        return pd.DataFrame()
    except json.JSONDecodeError:
        print("Erro ao decodificar o arquivo JSON.")
        return pd.DataFrame()

df_extratos = criar_tabela_de_json('backend/colecao_de_dados/database/data_extratos.json', "nomeOrgao")
df_avisos = criar_tabela_de_json('backend/colecao_de_dados/database/data_avisos.json', "nomeOrgao")

df_novo = pd.concat([df_extratos, df_avisos]).drop_duplicates(subset=['nomeOrgao']).reset_index(drop=True)

caminho_csv = 'backend/colecao_de_dados/database/orgaos.csv'

if os.path.exists(caminho_csv) and os.path.getsize(caminho_csv) > 0:
    try:
        df_existente = pd.read_csv(caminho_csv, header=None, names=["nomeOrgao"])
        df_total = pd.concat([df_existente, df_novo]).drop_duplicates(subset=['nomeOrgao']).reset_index(drop=True)
    except pd.errors.EmptyDataError:
        print("Arquivo CSV existente está vazio. Criando novo DataFrame.")
        df_total = df_novo
else:
    df_total = df_novo

lista_json = df_total["nomeOrgao"].tolist()

caminho_json_saida = 'backend/colecao_de_dados/database/orgaos.json'

with open(caminho_json_saida, 'w', encoding='utf-8') as file:
    json.dump(lista_json, file, ensure_ascii=False, indent=4)

print(f"Dados salvos em {caminho_json_saida}")