import tweepy
import json
from datetime import datetime
import time
import traceback
import os
import requests
from dotenv import load_dotenv
from twitter_text import parse_tweet

load_dotenv() #carrega os segredos da API do twitter

def encurtar_url(url):
    try:
        response = requests.post(
            'https://api.encurtador.dev/encurtamentos',
            headers={'Content-Type': 'application/json'},
            json={"url": url}
        )
        # Adicionando logs detalhados para depuração
        print(f"Status Code: {response.status_code}")
        print(f"Response Text: {response.text}")

        # Verificação do status code como string
        if response.status_code in [200, 201] or response.text.startswith('200 / 201'):
            return response.json().get('urlEncurtada', url)
        else:
            return url
    except Exception as e:
        print(f"Exceção ao encurtar URL: {e}")
        return url

def editar_mensagem(mensagem):
    result = parse_tweet(mensagem).asdict()
    if result['valid']:
        return mensagem
    else:
        # Mensagem não é válida, vamos ajustá-la
        mensagem_editada = mensagem[:result['validRangeEnd']]
        mensagem_editada = mensagem_editada.rstrip()  # Remove espaços em branco extras no final
        if len(mensagem_editada) > 3:
            mensagem_editada = mensagem_editada[:-3] + "..."
        return mensagem_editada

licitacoes = []
caminho_extrato = 'backend/data_collection_extrato/database/data.json'
caminho_avisos = 'backend/data_collection_avisos/database/data.json'
data_hoje = datetime.now().strftime('%d/%m/%Y')  # pega as licitações de hoje, tem que garantir que esse código só será executado quando o json já estiver atualizado com a data de hoje

print(f"Buscando licitações para a data: {data_hoje}")

with open(caminho_avisos, 'r', encoding='utf-8') as file:
    licitacoes_data = json.load(file)
    for licitacao in licitacoes_data:
        if licitacao['data_abertura'] == data_hoje:
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
        if licitacao['data_abertura'] == data_hoje:
            a = encurtar_url(licitacao['link'])
            time.sleep(1)
            licitacoes.append({
                'titulo': licitacao['tipo'],
                'descricao': licitacao['objeto'],
                'data': licitacao['data_abertura'],
                'link': a
            })

if not licitacoes:
    mensagens = ['Hoje não tivemos nenhum tipo de licitação liberada no Diário Oficial da União']
else:
    mensagens = []
    for licitacao in licitacoes:
        link_encurtado = encurtar_url(licitacao['link'])
        tweet_message = f'{licitacao['titulo']}\nMais detalhes: {link_encurtado}\n\n{licitacao['descricao']}'
        tweet_message = tweet_message.replace("Objeto:", "\nObjeto:")
        # Garante que a mensagem não ultrapasse 280 caracteres
        tweet_message = editar_mensagem(tweet_message)
        mensagens.append(tweet_message)

# Recuperar variáveis de ambiente
api_key = os.getenv('TWITTER_API_KEY')
api_key_secret = os.getenv('TWITTER_API_KEY_SECRET')
access_token = os.getenv('TWITTER_ACCESS_TOKEN')
access_token_secret = os.getenv('TWITTER_ACCESS_TOKEN_SECRET')
bearer_token= os.getenv('TWITTER_BEARER_TOKEN')
print(api_key)
print(api_key_secret)
print(access_token)
print(access_token_secret)
print(bearer_token)
api = tweepy.Client(
    consumer_key= api_key ,  #API KEY
    consumer_secret=api_key_secret, #API KEY SECRET
    access_token= access_token ,#ACCESS TOKEN
    access_token_secret= access_token_secret ,#ACCESS TOKEN SECRET
    bearer_token= bearer_token
)



if len(mensagens) > 50: mensagens = mensagens[:50] #só podemos publicar 50 tweets por dia isso limitara a postar somente os 50 tweets

time_de_espera_tweet = int(21000/len(mensagens)) #21000 segundos equivalem a cerca de 5 horas e 50 minutos

for i in mensagens:
    try:
        tweet = api.create_tweet(text=i) #publica o tweet
        print(tweet)
        time.sleep(time_de_espera_tweet) #faz o sistema dormir pelo tempo proporcional a quantidade de tempo  que é necessária para que todos caibam num intervalo de 5 horas e 50 minutos
    except Exception as e:
        print(f"Erro ao enviar tweet: {e}")
        traceback.print_exc()
        time.sleep(5)
