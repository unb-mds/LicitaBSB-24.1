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

def texto_para_imagem(texto, caminho_imagem):
    largura = 400
    altura = 300
    imagem = Image.open('backend/twitter/logo.png')
    desenho = ImageDraw.Draw(imagem)
    
    # Tentativa de carregar a fonte do caminho fornecido
    try:
        fonte = ImageFont.truetype('backend/twitter/assets/ARIAL.TTF', 13)
    except IOError:
        print("Fonte não encontrada. Usando fonte padrão.")
        fonte = ImageFont.load_default()
    
    margem = 10
    espaco_linhas = 5
    palavras = texto.split(' ')
    linha = ''
    y_text = margem

    for palavra in palavras:
        largura_linha = desenho.textbbox((0, 0), linha + palavra, font=fonte)[2]  # Posição 2 retorna a largura da caixa delimitadora
        if largura_linha <= (largura - 2 * margem):
            linha += palavra + ' '
        else:
            desenho.text((margem, y_text), linha, font=fonte, fill=(0, 0, 0))
            linha = palavra + ' '
            altura_linha = desenho.textbbox((0, 0), linha, font=fonte)[3]  # Posição 3 retorna a altura da caixa delimitadora
            y_text += altura_linha + espaco_linhas
    
    desenho.text((margem, y_text), linha, font=fonte, fill=(0, 0, 0))

    imagem.save(caminho_imagem)
    print(f"Imagem salva como {caminho_imagem}")

# FUNCAO PARA FAZER MARCA D'AGUA

# def watermark_with_transparency(input_image_path, output_image_path, watermark_image_path, position):
#     base_image = Image.open(input_image_path).convert('RGBA')
#     watermark = Image.open(watermark_image_path).convert('RGBA')
#     width, height = base_image.size
#     transparent = Image.new('RGBA', (width, height), (0,0,0,0))
#     transparent.paste(base_image, (0,0))
#     transparent.paste(watermark, position, mask=watermark)
#     transparent.save(output_image_path)
#     print(f"Imagem com marca d'água salva como {output_image_path}")

# Chamada da função

licitacoes = []
db_path = 'backend/server/db.sqlite3'
connection = sqlite3.connect(db_path)
cursor = connection.cursor()

data_ontem = (datetime.now() - timedelta(days=1)).strftime('%d/%m/%Y') # pega as licitações de ontem, tem que garantir que esse código só será executado quando o json já estiver atualizado com a data de ontem

print(f"Buscando licitações para a data: {data_ontem}")
query = """
SELECT titulo, objeto, data, link
FROM app_licitacao
WHERE data = ?
"""

# Executar a consulta
cursor.execute(query, (data_ontem,))
licitacoes_data = cursor.fetchall()

# Fechar a conexão com o banco de dados
connection.close()
for licitacao in licitacoes_data:
    tipo, objeto, data_abertura, link = licitacao
    a = encurtar_url(link)
    time.sleep(1)  # Pausa para evitar sobrecarga
    licitacoes.append({
        'titulo': tipo,
        'descricao': objeto,
        'data': data_abertura,
        'link': a
    })

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
        mensagens.append((tweet_message, licitacao["descricao"]))

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
    for i, (mensagem, descricao) in enumerate(mensagens):
        try:
            caminho_imagem = f"tweet_image_{i}.png"
            # caminho_imagem_com_marca = f"tweet_image_watermarked_{i}.png"
            texto_para_imagem(descricao, caminho_imagem)

            # adiciona a marca dagua
            # watermark_with_transparency(caminho_imagem, caminho_imagem_com_marca, watermark_image_path, position=(0, 0))

            # upload na imagem
            response = api.media_upload(filename=caminho_imagem)
            media_id = response.media_id
            # cria o tweet já com a imagem
            tweet = client.create_tweet(text=mensagem, media_ids=[media_id])
            print(tweet)
            # remove a imagem para liberar espaço em disco
            os.remove(caminho_imagem)
            # os.remove(caminho_imagem_com_marca)

            # posta a cada 20 segundos
            time.sleep(20)
        except Exception as e:
            print(f"Erro ao enviar tweet: {e}")
            traceback.print_exc()
            time.sleep(5)
else:
    try:
        tweet = client.create_tweet(text=mensagens[0])
        print(tweet)
    except Exception as e:
        print(f"Erro ao enviar tweet: {e}")
        traceback.print_exc()
        time.sleep(5)