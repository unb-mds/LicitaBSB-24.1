import sqlite3
from datetime import datetime

# Conectar ao banco de dados SQLite
conn = sqlite3.connect('/home/victor-schmidt/Documents/LicitaBSB-24.1/backend/server/db.sqlite3')
cursor = conn.cursor()

# Função para extrair o ano e o mês a partir da data
def parse_date(date_str):
    try:
        dt = datetime.strptime(date_str, '%d/%m/%Y')
        return dt.year, dt.month
    except ValueError:
        return None, None

# Obter todas as licitações
cursor.execute('SELECT id, data FROM app_licitacao')
licitacoes = cursor.fetchall()

# Criar um dicionário para armazenar a soma dos valores por ano e mês
somas_por_mes = {}

for licitacao_id, data in licitacoes:
    ano, mes = parse_date(data)
    if ano and mes:
        # Obter a soma dos valores para a licitação atual
        cursor.execute('SELECT SUM(valor) FROM app_valores WHERE idlicitacao_id = ?', (licitacao_id,))
        soma_valores = cursor.fetchone()[0] or 0

        # Adicionar a soma ao dicionário
        if (ano, mes) not in somas_por_mes:
            somas_por_mes[(ano, mes)] = 0
        somas_por_mes[(ano, mes)] += soma_valores

# Preencher a tabela LicitacaoValoresMensal
for (ano, mes), valor_total in somas_por_mes.items():
    cursor.execute('''
        INSERT OR REPLACE INTO app_licitacaovaloresmensal (ano, mes, valor_total)
        VALUES (?, ?, ?)
    ''', (ano, mes, valor_total))

# Commit e fechar a conexão
conn.commit()
conn.close()

print("Tabela LicitacaoValoresMensal preenchida com sucesso.")
