import os
import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin

# URLs
LOGIN_URL = 'https://licitacao.ac.gov.br/editais/check_login.php'
LISTA_URL = 'https://licitacao.ac.gov.br/editais/index.php?task=lista_editais'
DESTINO_PASTA = 'pdfs_editais'

# Credenciais
USUARIO = 'CPF/CNPJ'
SENHA = 'SENHA' # geralmente 4 ou 5 digitos

# Cria sessão persistente
sessao = requests.Session()

# Payload do formulário
payload = {
    'cnpj': USUARIO,
    'senha': SENHA,
    'task': 'check_login',
    'option': 'com_licitacoes'
}

# 1. Login POST
res_login = sessao.post(LOGIN_URL, data=payload)

# 2. Verifica sucesso
if "index.php?task=lista_editais" not in res_login.text and "sair" not in res_login.text.lower():
    print("Conteúdo recebido (início):\n", res_login.text[:1000])
    raise Exception("❌ Login falhou — verifique usuário/senha ou payload")

# 3. Vai para a página da lista de editais
res_lista = sessao.get(LISTA_URL)
soup = BeautifulSoup(res_lista.text, 'html.parser')

# 4. Extrai os links dos PDFs
pdf_links = [urljoin(LISTA_URL, a['href']) for a in soup.find_all('a', href=True) if a['href'].lower().endswith('.pdf')]

print(f"🔎 {len(pdf_links)} PDF(s) encontrados.")

# 5. Baixa os PDFs
os.makedirs(DESTINO_PASTA, exist_ok=True)

for link in pdf_links:
    nome_arquivo = os.path.basename(link.split('/')[-1])
    caminho = os.path.join(DESTINO_PASTA, nome_arquivo)

    if not os.path.exists(caminho):
        print(f"⬇️  Baixando: {nome_arquivo}")
        r = sessao.get(link)
        with open(caminho, 'wb') as f:
            f.write(r.content)
    else:
        print(f"✅ Já existe: {nome_arquivo}")

