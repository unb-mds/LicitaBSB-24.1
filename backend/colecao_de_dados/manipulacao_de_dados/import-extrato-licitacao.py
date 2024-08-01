import sqlite3
import json
import os

# Caminhos para o banco de dados e arquivo JSON
db_path = '/home/victor-schmidt/Documents/forks/LicitaBSB-24.1/backend/server/db.sqlite3'
json_path = '/home/victor-schmidt/Documents/forks/LicitaBSB-24.1/backend/colecao_de_dados/database/data_extratos.json'

# Verificação se os arquivos existem
if not os.path.exists(db_path):
    print(f"Erro: O banco de dados '{db_path}' não foi encontrado.")
    exit()

if not os.path.exists(json_path):
    print(f"Erro: O arquivo JSON '{json_path}' não foi encontrado.")
    exit()
def insert_valores_licitacao(valores, licitacao_id, cursor):
    if isinstance(valores, list):
        for valor in valores:
            cursor.execute("INSERT INTO app_valores (idlicitacao_id, valor) VALUES (?, ?)", (licitacao_id, valor))

# Função para inserir dados no banco
def insert_data(data, cursor):
    # Verificar se o órgão já existe
    cursor.execute("SELECT id FROM app_orgao WHERE nome = ?", (data['nomeOrgao'],))
    orgao_id = cursor.fetchone()
    if orgao_id:
        orgao_id = orgao_id[0]
    else:
        # Inserir novo órgão e obter o id
        cursor.execute("INSERT INTO app_orgao (nome) VALUES (?)", (data['nomeOrgao'],))
        orgao_id = cursor.lastrowid

    # Definir valores para campos que podem ser nulos
    assinante = data.get('assinante', None)
    data_abertura = data.get('data_abertura', None)
    cargo = data.get('cargo', None)
    edicao = data.get('edicao', None)
    secao_pagina = data.get('secao_pagina', None)
    link = data.get('link', None)
    valores_licitacao = data.get('valores_licitacao', [])

    # Inserir a licitação
    cursor.execute("""
        INSERT INTO app_licitacao (
            titulo, tipo, idorgao_id, objeto, numero_processo, 
            data, edicao, secao_pagina, link
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, (
        data['tipo'], 'extrato', orgao_id, data['objeto'], data['numero_processo'],
        data_abertura, edicao, secao_pagina,
        link
    ))
    # Obter o ID da licitação recém-inserida
    licitacao_id = cursor.lastrowid

    # Inserir os valores de licitação
    insert_valores_licitacao(valores_licitacao, licitacao_id, cursor)

# Conectar ao banco de dados
conn = sqlite3.connect(db_path)
cursor = conn.cursor()

# Ler o arquivo JSON
with open(json_path, 'r') as file:
    licitacoes = json.load(file)

# Inserir dados
for licitacao in licitacoes:
    insert_data(licitacao, cursor)

# Commit e fechar a conexão
conn.commit()
conn.close()

print("Dados inseridos com sucesso!")
