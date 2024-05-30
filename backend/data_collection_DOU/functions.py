import os
import requests
from datetime import datetime
from bs4 import BeautifulSoup
import zipfile

# Definindo o ano e o mês
ano = 2024
mes = 4

# Função para capturar o link do banco de dados do DOU
def captura_link_banco_de_dados_DOU_mes(ano, mes):
    url_bd_dou = "https://www.in.gov.br/acesso-a-informacao/dados-abertos/base-de-dados?"
    meses = ['NULL - (meses equivalentes aos seus números)', 'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
    data_input = datetime(ano, mes, 1)
    data_atual = datetime.now()

    if data_input > data_atual:
        return "Data informada é posterior à data atual."
    else:
        url_consulta = url_bd_dou + "ano=" + str(ano) + "&mes=" + meses[mes]
        response = requests.get(url_consulta)

        # Verifica se a requisição foi bem sucedida
        if response.status_code == 200:
            html_content = response.content  # Pega o conteúdo HTML da resposta
            # Usa o Beautiful Soup para parsear o HTML
            soup = BeautifulSoup(html_content, 'html.parser')

            # Encontrar todos os elementos <a>
            links = soup.find_all('a')

            # Iterar sobre os links e encontrar o href que contém S03 e .zip
            for link in links:
                href = link.get('href')
                if href and 'S03' in href and '.zip' in href:
                    return href
            
            return "Nenhum link encontrado para esse periodo"
        else:
            return f"Falha ao acessar a página. Status code: {response.status_code}"

def faz_download_do_zip(link_html):
    # Obtém o diretório atual
    diretorio_atual = os.getcwd()
    
    # Cria a pasta "content" no diretório atual, se não existir
    diretorio_content = os.path.join(diretorio_atual, "content")
    if not os.path.exists(diretorio_content):
        os.makedirs(diretorio_content)
    
    # Obtém o nome do arquivo ZIP a partir do link
    nome_arquivo_zip = link_html.split('/')[-1]
    
    # Faz o download do arquivo ZIP
    r = requests.get(link_html)
    with open(os.path.join(diretorio_content, nome_arquivo_zip), "wb") as f:
        f.write(r.content)
    
    # Extrai o arquivo ZIP para uma pasta com o ano e o mês
    pasta_extracao = os.path.join(diretorio_content, f"{ano}-{mes:02d}")
    with zipfile.ZipFile(os.path.join(diretorio_content, nome_arquivo_zip), 'r') as zip_ref:
        zip_ref.extractall(pasta_extracao)
    
    print("Download e extração do ZIP concluídos com sucesso!")

# Exemplo de uso:
#link_html = captura_link_banco_de_dados_DOU_mes(ano, mes)
#if link_html:
#    faz_download_do_zip(link_html)
#else:
 #   print("Nenhum link encontrado para o período especificado.")
    
    # Cria a pasta "content" no diretório atual, se não existir
direct = os.getcwd()
print(direct)
diretorio_content = os.path.join(os.getcwd(), "content")
print(diretorio_content)
if not os.path.exists('content'):
    os.makedirs(diretorio_content)
