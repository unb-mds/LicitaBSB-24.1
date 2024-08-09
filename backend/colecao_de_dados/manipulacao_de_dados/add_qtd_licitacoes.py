import sqlite3
from datetime import datetime

# Conectando ao banco de dados SQLite
conn = sqlite3.connect('/home/victor-schmidt/Documents/LicitaBSB-24.1/backend/server/db.sqlite3')
cursor = conn.cursor()

def extrair_ano_mes(data):
    """Extrai ano e mês de uma data no formato dd/mm/aaaa"""
    try:
        data_obj = datetime.strptime(data, '%d/%m/%Y')
        return data_obj.year, data_obj.month
    except ValueError:
        return None, None

def adicionar_licitacao_quantidade():
    # Cria uma lista para armazenar as contagens
    contagens = {}

    # Consulta para obter todas as datas da tabela app_licitacao
    cursor.execute('SELECT data FROM app_licitacao')
    datas = cursor.fetchall()
    print(f"Total de datas encontradas: {len(datas)}")  # Debug

    for (data,) in datas:
        ano, mes = extrair_ano_mes(data)
        if ano is not None and mes is not None:
            if (ano, mes) not in contagens:
                contagens[(ano, mes)] = 0
            contagens[(ano, mes)] += 1

    print(f"Contagens calculadas: {contagens}")  # Debug

    # Insere as contagens na tabela app_licitacaoquantidade
    for (ano, mes), total_licitacoes in contagens.items():
        cursor.execute('''
            INSERT INTO app_licitacaoquantidade (ano, mes, total_licitacoes)
            VALUES (?, ?, ?)
        ''', (ano, mes, total_licitacoes))
        print(f"Inserido: {ano}-{mes} com {total_licitacoes} licitações")  # Debug

    # Salva as alterações e fecha a conexão
    conn.commit()
    conn.close()

# Executa a função para adicionar a contagem de licitações
adicionar_licitacao_quantidade()
