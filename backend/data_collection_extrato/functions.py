import os
import requests
import re
from datetime import datetime
from bs4 import BeautifulSoup
import json
from requests.adapters import HTTPAdapter
from urllib3.util.retry import Retry

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

def extraindo_extratos_licitacao(lista_de_urls):
    links_avisos_licitacao = []
    termos = ["extrato-de-dispensa-de-licitacao", "extrato-de-dispensa-de-licitação", "extrato-de-inexigibilidade-de-licitacao" ]

    for url in lista_de_urls:
        if any(term in url for term in termos):
            links_avisos_licitacao.append(url)

    return links_avisos_licitacao


def filtrando_os_extratos_de_brasilia(descricao):
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
                                  "21hs", "22hs", "23hs"
                                ]
                if not any(palavra in trecho_analisado for palavra in palavras_chave):
                    return True  # Se encontrar, retorna o aviso_info
    return False  # Se nenhuma palavra específica estiver presente ou se encontrar "horarios"/"horário" nas proximidades

def extrair_info_extratos(url):
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

    # Filtra os avisos que não são de Brasília
    if not filtrando_os_extratos_de_brasilia(descricao):
        return None

    # Extrai o número do processo usando regex
    numero_processo_regex = re.compile(r'Processo(?:\s*n[ºo])?:?\s*([\d.]+[-\d/]*\d+)', re.IGNORECASE)
    match = numero_processo_regex.search(descricao)
    numero_processo = match.group(1) if match else None

    # Encontra os elementos de identificação e subtítulo
    identifica_elems = soup.find('p', class_='identifica')
    titulo = identifica_elems.text.strip() if identifica_elems else None
    if titulo == None:
        identifica_elems = soup.find('h3', class_='titulo-dou')
        titulo = identifica_elems.text.strip() if identifica_elems else None


    # Encontra o elemento que contém os detalhes do DOU (data de publicação, edição, seção/página, órgão)
    detalhes_dou = soup.find('div', class_='detalhes-dou')
    data_publicacao = detalhes_dou.find('span', class_='publicado-dou-data').text.strip() if detalhes_dou and detalhes_dou.find('span', 'publicado-dou-data') else None
    edicao = detalhes_dou.find('span', class_='edicao-dou-data').text.strip() if detalhes_dou and detalhes_dou.find('span', 'edicao-dou-data') else None
    secao_pagina = detalhes_dou.find('span', 'secao-dou').text.strip() if detalhes_dou and detalhes_dou.find('span', 'secao-dou') else None
    orgao = detalhes_dou.find('span', 'orgao-dou-data').text.strip() if detalhes_dou and detalhes_dou.find('span', 'orgao-dou-data') else None

    # Extrai os valores de licitação usando regex
    regex_valor = r'R\$ ?([\d,.]+)(?!\d)|RS ?([\d,.]+)(?!\d)'
    valores_licitacao = re.findall(regex_valor, descricao)

    # Converte os valores para o formato numérico e remove duplicatas
    valores_licitacao = list(set([valor[0].replace('.', '').replace(',', '.') if valor[0] else valor[1].replace('.', '').replace(',', '.') for valor in valores_licitacao]))
    if "" in valores_licitacao: valores_licitacao.remove("")
    # Monta o dicionário com as informações do aviso
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

    return aviso_info



def criandojsoncomavisos(links_avisos, dia, mes, ano):
    print("Realizando a extração dos avisos de licitação de Brasília na data de " + str(dia) + "/" + str(mes) + "/" + str(ano))
    avisos_detalhados = []
    maxil = len(links_avisos)
    cont = 1
    licita = 0
    for link in links_avisos:
        try:
            info_aviso = extrair_info_extratos(link)
            print("\033[0mProcessando licitação " + str(cont) + " de " + str(maxil))
            if info_aviso:  # Verifica se o dicionário não está vazio
                avisos_detalhados.append(info_aviso)
                licita += 1
                print("\033[92mA licitação " + str(cont) + " era de Brasilia.\033[0m")
        except Exception as e:
            print(f"Não foi possível processar a licitação {cont}: {e}")
        cont += 1
    
    print("Foram encontrados " + str(licita) + " licitações do DOU referentes a Brasília na data informada.")
    
    # Nome do arquivo JSON
    output_directory = 'backend/data_collection_extrato/database'
    os.makedirs(output_directory, exist_ok=True)  # Garante que o diretório de saída exista
    output_file = os.path.join(output_directory, 'data.json')
    
    # Carregar dados existentes, se houver
    if os.path.exists(output_file):
        with open(output_file, 'r', encoding='utf-8') as f:
            try:
                dados_existentes = json.load(f)
            except json.JSONDecodeError:
                dados_existentes = []
    else:
        dados_existentes = []
    
    # Determinar o próximo ID
    if dados_existentes:
        ultimo_id = max(item['id'] for item in dados_existentes) if dados_existentes else 0
    else:
        ultimo_id = 0

    # Adicionar novos dados com IDs incrementais
    for index, aviso in enumerate(avisos_detalhados, start=ultimo_id + 1):
        aviso['id'] = index
        dados_existentes.append(aviso)
    
    # Salvar dados de volta no arquivo
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(dados_existentes, f, ensure_ascii=False, indent=4)

    return avisos_detalhados
