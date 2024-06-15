import os
import requests
import re
from datetime import datetime
from bs4 import BeautifulSoup
import json
from requests.adapters import HTTPAdapter
from urllib3.util.retry import Retry

# Função para criar uma sessão com retries
def criar_sessao_com_retries(retries=5, backoff_factor=0.3, status_forcelist=(500, 502, 504)):
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

def extraindo_avisos_licitacao(lista_de_urls):
    links_avisos_licitacao = []
    termos = ["aviso-de-licitacao", "aviso-de-licitação"]

    for url in lista_de_urls:
        if any(term in url for term in termos):
            links_avisos_licitacao.append(url)

    return links_avisos_licitacao

def filtrando_os_avisos_de_brasilia(descricao):
    # Palavras específicas que estamos procurando
    palavras_especificas = ["Brasilia", "Brasília", " DF "]
    descricao = descricao.lower()  # Usar .lower() para fazer a verificação case-insensitive

    if any(palavra.lower() in descricao for palavra in palavras_especificas):
        for palavra_chave in palavras_especificas:
            if palavra_chave.lower() in descricao:
                indice_palavra_chave = descricao.index(palavra_chave.lower())
                trecho_analisado = descricao[max(0, indice_palavra_chave - 30):indice_palavra_chave + len(palavra_chave) + 30]
                if "horarios" not in trecho_analisado and "horário" not in trecho_analisado:
                    return True  # Se encontrar, retorna o aviso_info
    return False  # Se nenhuma palavra específica estiver presente ou se encontrar "horarios"/"horário" nas proximidades

def extrair_info_aviso(url):
    # Criar sessão com retries
    sessao = criar_sessao_com_retries()
    
    # Obter o HTML da página
    response = sessao.get(url)
    response.raise_for_status()

    # Parse the HTML
    soup = BeautifulSoup(response.text, 'html.parser')

    descricao_elem = soup.find('p', class_='dou-paragraph')
    if descricao_elem:
        descricao = descricao_elem.text.strip()
    else:
        descricao = None

    if not filtrando_os_avisos_de_brasilia(descricao):
        return None

    # Extrair e remover número de processo
    numero_processo_regex = re.compile(r'Nº Processo:\s*(\d+[-\d/]*\d+)', re.IGNORECASE)
    match = numero_processo_regex.search(descricao)
    numero_processo = match.group(1) if match else None
    descricao = numero_processo_regex.sub('', descricao).strip()

    # Extrair informações principais
    tipo_elem = soup.find('p', class_='identifica')
    tipo = tipo_elem.text.strip() if tipo_elem else None

    identifica_elems = soup.find_all('p', class_='identifica')
    subtitulo = identifica_elems[1].text.strip() if len(identifica_elems) > 1 else None

    assinante_elem = soup.find('p', class_='assina')
    assinante = assinante_elem.text.strip() if assinante_elem else None

    cargo_elem = soup.find('p', class_='cargo')
    cargo = cargo_elem.text.strip() if cargo_elem else None

    # Extrair informações adicionais
    detalhes_dou = soup.find('div', class_='detalhes-dou')
    data_publicacao = detalhes_dou.find('span', class_='publicado-dou-data').text.strip() if detalhes_dou and detalhes_dou.find('span', class_='publicado-dou-data') else None
    edicao = detalhes_dou.find('span', class_='edicao-dou-data').text.strip() if detalhes_dou and detalhes_dou.find('span', 'edicao-dou-data') else None
    secao_pagina = detalhes_dou.find('span', 'secao-dou').text.strip() if detalhes_dou and detalhes_dou.find('span', 'secao-dou') else None
    orgao = detalhes_dou.find('span', 'orgao-dou-data').text.strip() if detalhes_dou and detalhes_dou.find('span', 'orgao-dou-data') else None

    # Construir o dicionário com as informações
    aviso_info = {
        "tipo": tipo,
        "numero_licitacao": subtitulo,
        "nomeOrgao": orgao,
        "objeto": descricao,
        "numero_processo": numero_processo,
        "assinante": assinante,
        "data_abertura": data_publicacao,
        "cargo": cargo,
        "edicao": edicao,
        "secao_pagina": secao_pagina,
        "link": url
    }

    return aviso_info

def criandojsoncomavisos(links_avisos, dia, mes, ano):
    print("Realizando a extração dos avisos de licitação de Brasília na data de " + str(dia) + "/" + str(mes) + "/" + str(ano))
    avisos_detalhados = []
    maxil = len(links_avisos)
    cont = 1
    licita = 0
    for link in links_avisos:
        info_aviso = extrair_info_aviso(link)
        print("Processando licitação " + str(cont) + " de " + str(maxil))
        cont += 1
        if info_aviso:  # Verifica se o dicionário não está vazio
            avisos_detalhados.append(info_aviso)
            licita += 1
            print("A licitação " + str(cont-1) + " era de Brasilia.")
    print("Foram encontrados " + str(licita) + " licitações do DOU referentes a Brasília na data informada.")
    
    # Nome do arquivo JSON
    output_file = "data.json"
    
    # Carregar dados existentes, se houver
    if os.path.exists(output_file):
        with open(output_file, 'r', encoding='utf-8') as f:
            try:
                dados_existentes = json.load(f)
            except json.JSONDecodeError:
                dados_existentes = []
    else:
        dados_existentes = []
    
    # Adicionar novos dados
    dados_existentes.extend(avisos_detalhados)
    
    # Salvar dados de volta no arquivo
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(dados_existentes, f, ensure_ascii=False, indent=4)

    return avisos_detalhados

