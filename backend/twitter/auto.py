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
    imagem = Image.new('RGB', (largura, altura), color=(255, 255, 255))
    desenho = ImageDraw.Draw(imagem)
    try:
        fonte = ImageFont.truetype("Arial.ttf", 40)
    except IOError:
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

licitacoes = []
caminho_extrato = 'backend/colecao_de_dados/database/data_extratos.json'
caminho_avisos = 'backend/colecao_de_dados/database/data_avisos.json'

data_ontem = (datetime.now() - timedelta(days=1)).strftime('%d/%m/%Y') # pega as licitações de ontem, tem que garantir que esse código só será executado quando o json já estiver atualizado com a data de ontem

print(f"Buscando licitações para a data: {data_ontem}")

with open(caminho_avisos, 'r', encoding='utf-8') as file:
    licitacoes_data = json.load(file)
    for licitacao in licitacoes_data:
        if licitacao['data_abertura'] == data_ontem:
            a = encurtar_url(licitacao['link'])
            time.sleep(1)
            licitacoes.append({
                'titulo': licitacao['tipo'],
                'descricao': licitacao['objeto'],
                'data': licitacao['data_abertura'],
                'link': a
            })

with open(caminho_extrato, 'r', encoding='utf-8') as file:
    licitacoes_data = json.load(file)
    for licitacao in licitacoes_data:
        if licitacao['data_abertura'] == data_ontem:
            a = encurtar_url(licitacao['link'])
            time.sleep(1)
            licitacoes.append({
                'titulo': licitacao['tipo'],
                'descricao': licitacao['objeto'],
                'data': licitacao['data_abertura'],
                'link': a
            })

if not licitacoes:
    mensagens = [f'Hoje não tivemos nenhum tipo de licitação liberada no Diário Oficial da União\n\nVisite nosso site: {site}']
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

for i, (mensagem, descricao) in enumerate(mensagens):
    try:
        caminho_imagem = f"tweet_image_{i}.png"
        texto_para_imagem(descricao, caminho_imagem)

        # upload na imagem
        response = api.media_upload(filename=caminho_imagem)
        media_id = response.media_id

        # cria o tweet já com a imagem
        tweet = client.create_tweet(text=mensagem, media_ids=[media_id])
        print(tweet)

        # remove a imagem para liberar espaço em disco
        os.remove(caminho_imagem)

        # posta a cada 30 segundos
        time.sleep(30)
    except Exception as e:
        print(f"Erro ao enviar tweet: {e}")
        traceback.print_exc()
        time.sleep(5)
