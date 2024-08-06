import tweepy
import json
from datetime import datetime, timedelta
import time
import traceback
import os
import requests
from dotenv import load_dotenv
from twitter_text import parse_tweet
from PIL import Image, ImageDraw, ImageFont
import sqlite3

load_dotenv()  # Carrega os segredos da API do Twitter

def encurtar_url(url):
    try:
        response = requests.post(
            'https://api.encurtador.dev/encurtamentos',
            headers={'Content-Type': 'application/json'},
            json={"url": url}
        )
        print(f"Status Code: {response.status_code}")
        print(f"Response Text: {response.text}")

        if response.status_code in [200, 201] or response.text.startswith('200 / 201'):
            return response.json().get('urlEncurtada', url)
        else:
            return url
    except Exception as e:
        print(f"Exceção ao encurtar URL: {e}")
        return url

site = encurtar_url("https://licitabsb-repo.vercel.app")

def editar_mensagem(mensagem):
    result = parse_tweet(mensagem).asdict()
    if result['valid']:
        return mensagem
    else:
        mensagem_editada = mensagem[:result['validRangeEnd']]
        mensagem_editada = mensagem_editada.rstrip()  # Remove espaços em branco extras no final
        if len(mensagem_editada) > 3:
            mensagem_editada = mensagem_editada[:-3] + "..."
        return mensagem_editada

def texto_para_imagem(titulo, descricao, data, caminho_imagem):
    largura_imagem = 1080
    altura_imagem = 1080
    margem_lateral = 100
    largura_texto = largura_imagem - 2 * margem_lateral

    imagem = Image.open('backend/twitter/background.jpg')
    desenho = ImageDraw.Draw(imagem)
    
    # Tentativa de carregar a fonte do caminho fornecido
    try:
        fonte_titulo = ImageFont.truetype('backend/twitter/assets/IBMPLEXSANS.TTF', 44)
        fonte_descricao = ImageFont.truetype('backend/twitter/assets/IBMPLEXSERIF.TTF', 35)
        fonte_data = ImageFont.truetype('backend/twitter/assets/IBMPLEXSANS.TTF', 32)
    except IOError:
        print("Fonte não encontrada. Usando fonte padrão.")
        fonte_titulo = ImageFont.load_default()
        fonte_descricao = ImageFont.load_default()
        fonte_data = ImageFont.load_default()

    def desenhar_texto_negrito(desenho, posicao, texto, fonte, cor, deslocamento=1):
        x, y = posicao
        desenho.text((x - deslocamento, y), texto, font=fonte, fill=cor)
        desenho.text((x + deslocamento, y), texto, font=fonte, fill=cor)
        desenho.text((x, y - deslocamento), texto, font=fonte, fill=cor)
        desenho.text((x, y + deslocamento), texto, font=fonte, fill=cor)
        desenho.text((x, y), texto, font=fonte, fill=cor)


    # Título
    titulo_largura, titulo_altura = desenho.textbbox((0, 0), titulo, font=fonte_titulo)[2:4]
    y_text = (altura_imagem - titulo_altura) / 2 - 300  # Ajuste vertical
    x_text = (largura_imagem - titulo_largura) /2
    desenhar_texto_negrito(desenho, (x_text, y_text), titulo, fonte_titulo, "black")
    
    # Data
    data_text = f"Data: {data}"
    largura_data, altura_data = desenho.textbbox((0, 0), data_text, font=fonte_data)[2:4]
    y_text = (altura_imagem - titulo_altura) / 2 - 350
    x_text = (largura_imagem - titulo_largura) / 1.25
    desenhar_texto_negrito(desenho, (x_text, y_text), data_text, fonte_data, "black")

    # Descrição
    y_text += titulo_altura + 150  # Espaço entre título e descrição
    palavras = descricao.split(' ')
    linhas = []
    linha = ''
    
    for palavra in palavras:
        largura_linha, altura_linha = desenho.textbbox((0, 0), linha + palavra, font=fonte_descricao)[2:4]
        if largura_linha <= largura_texto:
            linha += palavra + ' '
        else:
            linhas.append(linha)
            linha = palavra + ' '
    linhas.append(linha)
    
    altura_texto = sum([desenho.textbbox((0, 0), linha, font=fonte_descricao)[3] for linha in linhas])
    
    for linha in linhas:
        largura_linha, altura_linha = desenho.textbbox((0, 0), linha, font=fonte_descricao)[2:4]
        x_text = (largura_imagem - largura_linha) / 2
        desenho.text((x_text, y_text), linha, font=fonte_descricao, fill="black")
        y_text += altura_linha

    

    imagem.save(caminho_imagem)
    print(f"Imagem salva em: {caminho_imagem}")

licitacoes = []
db_path = 'backend/server/db.sqlite3'
connection = sqlite3.connect(db_path)
cursor = connection.cursor()

data_ontem = '02/08/2024' #(datetime.now() - timedelta(days=1)).strftime('%d/%m/%Y') # pega as licitações de ontem, tem que garantir que esse código só será executado quando o json já estiver atualizado com a data de ontem

print(f"Buscando licitações para a data: {data_ontem}")

# Consulta para selecionar as licitações
query_licitacoes = """
SELECT id, titulo, objeto, data, link
FROM app_licitacao
WHERE data = ?
"""

# Executar a consulta das licitações
cursor.execute(query_licitacoes, (data_ontem,))
licitacoes_data = cursor.fetchall()

# Lista para armazenar as licitações e seus valores
licitacoes = []

# Iterar sobre as licitações e buscar os valores relacionados
for licitacao in licitacoes_data:
    licitacao_id, tipo, objeto, data_abertura, link = licitacao
    
    # Consulta para selecionar os valores relacionados à licitação
    query_valores = """
    SELECT valor
    FROM app_valores
    WHERE idlicitacao_id = ?
    """
    
    # Executar a consulta dos valores
    cursor.execute(query_valores, (licitacao_id,))
    valores_data = cursor.fetchall()
    
    # Extrair os valores em uma lista
    valores = [valor[0] for valor in valores_data]
    
    # Encurtar o link
    a = encurtar_url(link)
    time.sleep(1)  # Pausa para evitar sobrecarga
    
    # Adicionar a licitação com os valores à lista
    licitacoes.append({
        'titulo': tipo,
        'descricao': objeto,
        'data': data_abertura,
        'link': a,
        'valores': sum(valores)
    })

# Fechar a conexão com o banco de dados
connection.close()

verificador_de_licitacao = False
if not licitacoes:
    mensagens = [f'Nas últimas 24 horas não houve nenhum tipo de licitação liberada no Diário Oficial da União\n\nVisite nosso site: {site}']
    verificador_de_licitacao = True
else:
    mensagens = []
    for licitacao in licitacoes:
        link_encurtado = encurtar_url(licitacao['link'])
        tweet_message = f'{licitacao["titulo"]}\nVisite nosso site: {site}\nMais detalhes: {link_encurtado}'
        tweet_message = editar_mensagem(tweet_message)
        mensagens.append((tweet_message, licitacao["titulo"], licitacao["descricao"], licitacao["data"]))

consumer_key = os.getenv('TWITTER_API_KEY')
consumer_secret = os.getenv('TWITTER_API_KEY_SECRET')
access_token = os.getenv('TWITTER_ACCESS_TOKEN')
access_token_secret = os.getenv('TWITTER_ACCESS_TOKEN_SECRET')
bearer_token = os.getenv('TWITTER_BEARER_TOKEN')

client = tweepy.Client(
    consumer_key=consumer_key,
    consumer_secret=consumer_secret,
    access_token=access_token,
    access_token_secret=access_token_secret,
    bearer_token=bearer_token
)
auth = tweepy.OAuth1UserHandler(consumer_key, consumer_secret, access_token, access_token_secret)
api = tweepy.API(auth)
if len(mensagens) > 50:
    mensagens = mensagens[:50]

watermark_image_path = 'backend/twitter/logolicita.png'
if verificador_de_licitacao == False:
    for i, (mensagem, titulo, descricao, data) in enumerate(mensagens):
        try:
            caminho_imagem = f"tweet_image_{i}.png"
            # caminho_imagem_com_marca = f"tweet_image_watermarked_{i}.png"
            texto_para_imagem(titulo, descricao, data, caminho_imagem)

            # upload na imagem
            # response = api.media_upload(filename=caminho_imagem)
            # media_id = response.media_id

            # cria o tweet já com a imagem
            # tweet = client.create_tweet(text=mensagem, media_ids=[media_id])
            # print(tweet)

            # remove a imagem para liberar espaço em disco
            # os.remove(caminho_imagem)
            # os.remove(caminho_imagem_com_marca)
            # posta a cada 20 segundos
            #time.sleep(20)
        except Exception as e:
            print(f"Erro ao processar a mensagem {i}: {e}")
            print(f"Erro ao enviar tweet: {e}")
            traceback.print_exc()
            time.sleep(5)
# else:
    # try:
        # tweet = client.create_tweet(text=mensagens[0])
        # print(tweet)
    # except Exception as e:
    #     print(f"Erro ao enviar tweet: {e}")
    #     traceback.print_exc()
    #     time.sleep(5)
