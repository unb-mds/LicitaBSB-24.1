import os
import requests
from datetime import datetime
from bs4 import BeautifulSoup
import re
import json
from requests_html import HTMLSession

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
        response = requests.get(url_consulta)

        # Verifica se a requisição foi bem sucedida
        if response.status_code == 200:
            html_content = response.content  # Pega o conteúdo HTML da resposta
            # Usa o Beautiful Soup para parsear o HTML
            soup = BeautifulSoup(html_content, 'html.parser')
            # Aqui você pode adicionar lógica para extrair dados específicos usando BeautifulSoup
            return url_consulta
        else:
            return f"Falha ao acessar a página. Status code: {response.status_code}"


def extrair_url_titles(url):
    # Obter o HTML da página
    response = requests.get(url)
    response.raise_for_status()  # Verifica se a requisição foi bem-sucedida

    # Parse the HTML
    soup = BeautifulSoup(response.text, 'html.parser')

    # Find the script tag with the JSON data
    script_tag = soup.find('script', id='params', type='application/json')

    # Load the JSON data
    data = json.loads(script_tag.string)

    # Extract the urlTitle values and prepend the base URL
    base_url = "http://www.in.gov.br/web/dou/-/"
    url_titles = [base_url + item['urlTitle'] for item in data['jsonArray']]

    return url_titles


# Exemplo de uso
url = link_jornal_diario(1, 2, 2024)
html = extrair_url_titles(url)
for link in html:
    print(link)