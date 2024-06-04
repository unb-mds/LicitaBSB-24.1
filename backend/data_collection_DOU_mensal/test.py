import urllib.parse

# Link fornecido
url = "https://www.in.gov.br/acesso-a-informacao/dados-abertos/base-de-dados?ano=2015&mes=Dezembro"

# Analisar a URL
parsed_url = urllib.parse.urlparse(url)

# Obter os valores dos parâmetros
ano = urllib.parse.parse_qs(parsed_url.query).get("ano", [None])[0]
mes = urllib.parse.parse_qs(parsed_url.query).get("mes", [None])[0]

# Exibir os resultados
print(f"Ano: {ano}")
print(f"Mês: {mes}")
