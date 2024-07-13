
import tweepy
import json
import datetime
import time
import traceback
import os
from dotenv import load_dotenv

load_dotenv()

def fetch_licitations():
    licitacoes = []
    caminho_extrato = 'backend/data_collection_extrato/database/data.json'
    caminho_avisos = 'backend/data_collection_avisos/database/data.json'
    data_hoje = '10/07/2024' #datetime.now().strftime('%d/%m/%Y')  # Formate a data atual no mesmo formato das datas em seu JSON

    print(f"Buscando licitações para a data: {data_hoje}")

    with open(caminho_avisos, 'r', encoding='utf-8') as file:
        licitacoes_data = json.load(file)
        for licitacao in licitacoes_data:
            if licitacao['data_abertura'] == data_hoje:
                licitacoes.append({
                    'titulo': licitacao['tipo'],
                    'descricao': licitacao['objeto'],
                    'data': licitacao['data_abertura'],
                    'link': licitacao['link']
                })
    with open(caminho_extrato, 'r', encoding='utf-8') as file:
        licitacoes_data = json.load(file)
        for licitacao in licitacoes_data:
            if licitacao['data_abertura'] == data_hoje:
                licitacoes.append({
                    'titulo': licitacao['tipo'],
                    'descricao': licitacao['objeto'],
                    'data': licitacao['data_abertura'],
                    'link': licitacao['link']
                })
    if not licitacoes:
        return ['Hoje não tivemos nenhum tipo de licitação liberada no Diário Oficial da União']
    mensagens = []
    for licitacao in licitacoes:
        tweet_message = f'''Nova licitação: {licitacao['titulo']}
Mais detalhes: {licitacao['link']}
Descricao: {licitacao['descricao']}
'''
        # Garante que a mensagem não ultrapasse 280 caracteres
        if len(tweet_message) > 280:
            tweet_message = tweet_message[:277] + '...'
        mensagens.append(tweet_message)
    print(f"Licitações encontradas")
    return mensagens

api = tweepy.Client(
    consumer_key=os.getenv('TWITTER_ACCESS_TOKEN'),   #API KEY
    consumer_secret=os.getenv('TWITTER_ACCESS_TOKEN_SECRET'), #API KEY SECRET
    access_token= os.getenv('TWITTER_API_KEY'), #ACCESS TOKEN
    access_token_secret= os.getenv('TWITTER_API_KEY_SECRET') #ACCESS TOKEN SECRET
)

a = "Em meios aos caos da tecnologia e à evolução constante, encontramos a beleza da simplicidade nas linhas de código que criamos. Cada projeto é um desafio, uma história contada em algoritmos e bugs corrigidos. Que nossa paixão por criar nunca se perca no labirinto dos bits e bytes."
print(len(a))
tweet = api.create_tweet(text=a)
"""
mensagens_tweet = fetch_licitations()
for i in mensagens_tweet:
    try:
        time.sleep(5)
        tweet = api.create_tweet(text=i)
        print(tweet)
    except Exception as e:
        print(f"Erro ao enviar tweet: {e}")
        traceback.print_exc()
"""
