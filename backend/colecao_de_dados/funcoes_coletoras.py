import os
import requests
import re
from datetime import datetime
from bs4 import BeautifulSoup
import json
from requests.adapters import HTTPAdapter
from urllib3.util.retry import Retry
import sqlite3
import warnings
from urllib3.exceptions import InsecureRequestWarning

def parse_date(date_str):
    try:
        dt = datetime.strptime(date_str, '%d/%m/%Y')
        return dt.year, dt.month
    except ValueError:
        return None, None
# Função para criar uma sessão com retries
def criar_sessao_com_retries(retries=3, backoff_factor=0.3, status_forcelist=(500, 502, 504)):
    session = requests.Session()
    retry = Retry(
        total=retries,
        read=retries,
        connect=retries,
        backoff_factor=backoff_factor,
        status_forcelist=status_forcelist,
    )
    adapter = HTTPAdapter(max_retries=retry)

    session.mount("http://", adapter)
    session.mount("https://", adapter)
    session.verify = False  # Ignorar erros de certificado SSL
    # Suprime o aviso de InsecureRequestWarning
    warnings.simplefilter('ignore', InsecureRequestWarning)
    return session

# Função para capturar o link do banco de dados do DOU
def link_jornal_diario(dia, mes, ano):
    url_bd_dou = "https://www.in.gov.br/leiturajornal?data="
    meses = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
    data_input = datetime(ano, mes, dia)
    data_atual = datetime.now()

    if data_input > data_atual:
        return "Data informada é posterior à data atual."
    else:
        dia_str = str(dia).zfill(2)
        mes_str = meses[mes - 1]
        url_consulta = f"{url_bd_dou}{dia_str}-{mes_str}-{ano}&secao=do3"
        
        # Criar sessão com retries
        sessao = criar_sessao_com_retries()
        response = sessao.get(url_consulta)

        # Verifica se a requisição foi bem sucedida
        if response.status_code == 200:
            return url_consulta
        else:
            return f"Falha ao acessar a página. Status code: {response.status_code}"

def extrair_url_titles(url):
    # Criar sessão com retries
    sessao = criar_sessao_com_retries()
    
    # Obter o HTML da página
    response = sessao.get(url)
    response.raise_for_status()  # Verifica se a requisição foi bem-sucedida

    # Parse the HTML
    soup = BeautifulSoup(response.text, 'html.parser')

    # Find the script tag with the JSON data
    script_tag = soup.find('script', id='params', type='application/json')

    if not script_tag:
        print("Tag <script> com id 'params' não encontrada.")
        return []

    # Load the JSON data
    data = json.loads(script_tag.string)

    # Extract the urlTitle values and prepend the base URL
    base_url = "http://www.in.gov.br/web/dou/-/"
    url_titles = [base_url + item['urlTitle'] for item in data.get('jsonArray', [])]

    return url_titles

def extraindo_links_licitacoes(lista_de_urls, tipo):
    links_licitacoes = []
    if tipo == 'avisos': termos = ["aviso-de-licitacao", "aviso-de-licitação", "aviso-de-dispensa-de-licitacao"]
    elif tipo == 'extratos': termos = ["extrato-de-dispensa-de-licitacao", "extrato-de-dispensa-de-licitação", "extrato-de-inexigibilidade-de-licitacao" ]
    else: return KeyError("Tipo inválido. Use 'avisos' ou 'extratos'.")
    for url in lista_de_urls:
        if any(term in url for term in termos):
            links_licitacoes.append(url)

    return links_licitacoes

def filtrando_licitacoes_brasilia(descricao):
    # Palavras específicas que estamos procurando
    palavras_especificas = ["Brasilia", "Brasília", " DF ", " Ceilândia ", " Plano Piloto " ]
    descricao = descricao.lower()  # Usar .lower() para fazer a verificação case-insensitive

    if any(palavra.lower() in descricao for palavra in palavras_especificas):
        for palavra_chave in palavras_especificas:
            if palavra_chave.lower() in descricao:
                indice_palavra_chave = descricao.index(palavra_chave.lower())
                trecho_analisado = descricao[max(0, indice_palavra_chave - 30):indice_palavra_chave + len(palavra_chave) + 30]
                palavras_chave = [ "horarios", "horário", "Hora", "hora","00h", "01h", "02h", "03h", 
                                  "04h", "05h", "06h", "07h", "08h", "09h", "10h", "11h", "12h", 
                                  "13h", "14h", "15h", "16h", "17h", "18h", "19h", "20h", "21h", 
                                  "22h", "23h", "00hs", "01hs", "02hs", "03hs", "04hs", "05hs", 
                                  "06hs", "07hs", "08hs", "09hs", "10hs", "11hs", "12hs", 
                                  "13hs", "14hs", "15hs", "16hs", "17hs", "18hs", "19hs", "20hs", 
                                  "21hs", "22hs", "23hs", "Belem", "Belém", "belem"
                                ]
                if not any(palavra in trecho_analisado for palavra in palavras_chave):
                    return True  # Se encontrar, retorna o aviso_info
    return False  # Se nenhuma palavra específica estiver presente ou se encontrar "horarios"/"horário" nas proximidades

def extrair_info_licitacao(url,tipo):
    # Cria uma sessão HTTP com retries
    sessao = criar_sessao_com_retries()
    response = sessao.get(url)
    response.raise_for_status()

    # Faz o parsing do HTML da página usando BeautifulSoup
    soup = BeautifulSoup(response.text, 'html.parser')

    # Encontra o elemento que contém a descrição do aviso
    descricao_elem = soup.find('p', class_='dou-paragraph')
    if descricao_elem:
        descricao = descricao_elem.text.strip()
    else:
        descricao = None

    # Encontra os elementos de identificação e subtítulo
    identifica_elems = soup.find('p', class_='identifica')
    titulo = identifica_elems.text.strip() if identifica_elems else None
    if titulo == None: identifica_elems = soup.find('h3', class_='titulo-dou')
    titulo = identifica_elems.text.strip() if identifica_elems else None

    # Filtra os avisos que não são de Brasília
    if not filtrando_licitacoes_brasilia(descricao):
        return None

    #Extrai o número do processo usando regex
    numero_processo_regex = re.compile(r'Processo(?:\s*n[ºo])?:?\s*([\d.]+[-\d/]*\d+)', re.IGNORECASE)
    match = numero_processo_regex.search(descricao)
    numero_processo = match.group(1) if match else None
    # Encontra o elemento que contém os detalhes do DOU (data de publicação, edição, seção/página, órgão)
    detalhes_dou = soup.find('div', class_='detalhes-dou')
    data_publicacao = detalhes_dou.find('span', class_='publicado-dou-data').text.strip() if detalhes_dou and detalhes_dou.find('span', 'publicado-dou-data') else None
    edicao = detalhes_dou.find('span', class_='edicao-dou-data').text.strip() if detalhes_dou and detalhes_dou.find('span', 'edicao-dou-data') else None
    secao_pagina = detalhes_dou.find('span', 'secao-dou').text.strip() if detalhes_dou and detalhes_dou.find('span', 'secao-dou') else None
    orgao = detalhes_dou.find('span', 'orgao-dou-data').text.strip() if detalhes_dou and detalhes_dou.find('span', 'orgao-dou-data') else None

    # Extrai os valores de licitação usando regex
    regex_valor = r'R\$ ?([\d.]+,\d{2})(?!\d)|RS ?([\d.]+,\d{2})(?!\d)'
    valores_licitacao = re.findall(regex_valor, descricao)

    # Converte os valores para o formato numérico e remove duplicatas
    valores_licitacao = list(set([valor[0].replace('.', '').replace(',', '.') if valor[0] else valor[1].replace('.', '').replace(',', '.') for valor in valores_licitacao]))
    if "" in valores_licitacao: valores_licitacao.remove("")
    for valor in valores_licitacao: 
        try:
            valor = float(valor)
        except:
            valores_licitacao.remove(valor)
    if tipo == 'avisos':
        # Encontra os elementos de identificação e subtítulo
        identifica_elems = soup.find_all('p', class_='identifica')
        subtitulo = identifica_elems[1].text.strip() if len(identifica_elems) > 1 else None
        # Encontra o elemento que contém o assinante
        assinante_elem = soup.find('p', class_='assina')
        assinante = assinante_elem.text.strip() if assinante_elem else None
        # Encontra o elemento que contém o cargo do assinante
        cargo_elem = soup.find('p', class_='cargo')
        cargo = cargo_elem.text.strip() if cargo_elem else None
        if titulo == None: titulo = "Aviso de Licitação"
        aviso_info = {
            "tipo": titulo,
            "numero_licitacao": subtitulo,
            "nomeOrgao": orgao,
            "objeto": descricao,
            "numero_processo": numero_processo,
            "assinante": assinante,
            "data_abertura": data_publicacao,
            "cargo": cargo,
            "edicao": edicao,
            "secao_pagina": secao_pagina,
            "link": url,
            "valores_licitacao": valores_licitacao if valores_licitacao else None
        }
    elif tipo == 'extratos':
        if titulo == None: titulo = "Extrato de Licitação"
        aviso_info = {
            "tipo": titulo,
            "nomeOrgao": orgao,
            "objeto": descricao,
            "numero_processo": numero_processo,
            "data_abertura": data_publicacao,
            "edicao": edicao,
            "secao_pagina": secao_pagina,
            "link": url,
            "valores_licitacao": valores_licitacao if valores_licitacao else None
        }
    # Monta o dicionário com as informações do aviso
    

    return aviso_info

def insert_valores_licitacao(valores, licitacao_id, cursor):
    if isinstance(valores, list):
        for valor in valores:
            cursor.execute("INSERT INTO app_valores (idlicitacao_id, valor) VALUES (?, ?)", (licitacao_id, valor))

def insert_extrato_data(data, cursor):
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
            assinante, data, cargo, edicao, secao_pagina, link
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, (
        data['tipo'], 'extrato', orgao_id, data['objeto'], data['numero_processo'],
        assinante, data_abertura, cargo, edicao, secao_pagina,
        link
    ))
    # Obter o ID da licitação recém-inserida
    licitacao_id = cursor.lastrowid

    # Inserir os valores de licitação
    insert_valores_licitacao(valores_licitacao, licitacao_id, cursor)

def insert_avisos_data(data, cursor):
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
            titulo, tipo, numero_licitacao, idorgao_id, objeto, numero_processo, 
            assinante, data, cargo, edicao, secao_pagina, link
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, (
        data['tipo'], 'aviso', data['numero_licitacao'], orgao_id, data['objeto'], data['numero_processo'],
        assinante, data_abertura, cargo, edicao, secao_pagina,
        link
    ))
    # Obter o ID da licitação recém-inserida
    licitacao_id = cursor.lastrowid

    # Inserir os valores de licitação
    insert_valores_licitacao(valores_licitacao, licitacao_id, cursor)

def atualizar_quantidade_licitacoes(mes, ano, quantidade_licitacoes):
    db_path = 'backend/server/db.sqlite3'
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    # Verifica se já existe um registro para o ano e mês
    cursor.execute('''
        SELECT total_licitacoes
        FROM app_licitacaoquantidade
        WHERE ano = ? AND mes = ?
    ''', (ano, mes))
    
    resultado = cursor.fetchone()
    
    if resultado:
        # Se já existe, atualiza a quantidade
        total_licitacoes_existente = resultado[0]
        nova_quantidade = total_licitacoes_existente + quantidade_licitacoes
        cursor.execute('''
            UPDATE app_licitacaoquantidade
            SET total_licitacoes = ?
            WHERE ano = ? AND mes = ?
        ''', (nova_quantidade, ano, mes))
    else:
        # Se não existe, insere um novo registro
        cursor.execute('''
            INSERT INTO app_licitacaoquantidade (ano, mes, total_licitacoes)
            VALUES (?, ?, ?)
        ''', (ano, mes, quantidade_licitacoes))
    
    conn.commit()


def atualizar_licitacao_valores_mensal(cursor, data_atual):
    # Converter a data atual para ano e mês
    ano_atual, mes_atual = parse_date(data_atual)

    if not ano_atual or not mes_atual:
        print("Data inválida.")
        return
    
    # Obter todas as licitações inseridas na data atual
    cursor.execute('''
        SELECT id FROM app_licitacao WHERE data = ?
    ''', (data_atual,))
    licitacoes = cursor.fetchall()

    if not licitacoes:
        print("Nenhuma licitação encontrada para a data fornecida.")
        return

    # Criar um dicionário para armazenar a soma dos valores por ano e mês
    somas_por_mes = {}

    for (licitacao_id,) in licitacoes:
        # Obter a soma dos valores para a licitação atual
        cursor.execute('SELECT SUM(valor) FROM app_valores WHERE idlicitacao_id = ?', (licitacao_id,))
        soma_valores = cursor.fetchone()[0] or 0

        # Adicionar a soma ao dicionário
        if (ano_atual, mes_atual) not in somas_por_mes:
            somas_por_mes[(ano_atual, mes_atual)] = 0
        somas_por_mes[(ano_atual, mes_atual)] += soma_valores

    if not somas_por_mes:
        print("Nenhum valor encontrado para a soma.")
        return

    # Atualizar ou inserir valores na tabela LicitacaoValoresMensal
    for (ano, mes), valor_total in somas_por_mes.items():
        # Verificar se o registro já existe
        cursor.execute('SELECT valor_total FROM app_licitacaovaloresmensal WHERE ano = ? AND mes = ?', (ano, mes))
        resultado = cursor.fetchone()
        
        if resultado:
            # Atualizar o valor existente
            cursor.execute('''
                UPDATE app_licitacaovaloresmensal
                SET valor_total = valor_total + ?
                WHERE ano = ? AND mes = ?
            ''', (valor_total, ano, mes))
        else:
            # Inserir novo registro
            cursor.execute('''
                INSERT INTO app_licitacaovaloresmensal (ano, mes, valor_total)
                VALUES (?, ?, ?)
            ''', (ano, mes, valor_total))
            

    # Commit para garantir que as atualizações sejam salvas
    cursor.connection.commit()

def alimentando_banco_com_licitacoes(links_avisos, dia, mes, ano, tipo):
    if tipo == 'avisos': print("Realizando a extração dos avisos de licitação de Brasília na data de " + str(dia) + "/" + str(mes) + "/" + str(ano))
    elif tipo == 'extratos': print("Realizando a extração dos extratos de licitação de Brasília na data de " + str(dia) + "/" + str(mes) + "/" + str(ano))
    licitacoes_detalhadas = []
    maxil = len(links_avisos)
    cont = 1
    licita = 0
    for link in links_avisos:
        try:
            info_aviso = extrair_info_licitacao(link, tipo)
            print("\033[0mProcessando licitação " + str(cont) + " de " + str(maxil))
            if info_aviso:  # Verifica se o dicionário não está vazio
                licitacoes_detalhadas.append(info_aviso)
                licita += 1
                print("\033[92mA licitação " + str(cont) + " era de Brasilia.\033[0m")
        except Exception as e:
            print(f"Não foi possível processar a licitação {cont}: {e}")
        cont += 1
    
    print("Foram encontrados " + str(licita) + " licitações do DOU referentes a Brasília na data informada.")
    
    db_path = 'backend/server/db.sqlite3'
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    if tipo == 'extratos':
        # Inserir dados
        for licitacao in licitacoes_detalhadas:
            insert_extrato_data(licitacao, cursor)
    elif tipo == 'avisos':
        # Inserir dados
        for licitacao in licitacoes_detalhadas:
            insert_avisos_data(licitacao, cursor)
    conn.commit()
    # Atualiza a tabela de contagem de licitações
    ano = int(ano)
    mes = int(mes)
    atualizar_quantidade_licitacoes(mes, ano, licita)

    # Atualiza a tabela com os valores das licitações
    data_atual = f"{str(dia).zfill(2)}/{str(mes).zfill(2)}/{ano}"
    print(data_atual)
    atualizar_licitacao_valores_mensal(cursor, data_atual)
    conn.close()
    return licitacoes_detalhadas