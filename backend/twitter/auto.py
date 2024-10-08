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

def carregar_configuracoes_twitter():
    try:
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
        # print("Configurações do Twitter carregadas com sucesso.")
        return client, api
    except Exception as e:
        print(f"Erro ao carregar configurações do Twitter: {e}")
        traceback.print_exc()
        return None, None

def encurtar_url(url):
    try:
        # print(f"Tentando encurtar a URL: {url}")
        response = requests.post(
            'https://api.encurtador.dev/encurtamentos',
            headers={'Content-Type': 'application/json'},
            json={"url": url},
            timeout=10  # Timeout de 10 segundos
        )
        if response.status_code in [200, 201] or response.text.startswith('200 / 201'):
            encurtada = response.json().get('urlEncurtada', url)
            # print(f"URL encurtada: {encurtada}")
            return encurtada
        else:
            print(f"Falha ao encurtar a URL: {response.status_code} - {response.text}")
            return url
    except requests.exceptions.Timeout:
        print(f"Timeout ao tentar encurtar a URL: {url}")
        return url
    except Exception as e:
        print(f"Exceção ao encurtar URL: {e}")
        traceback.print_exc()
        return url

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

def texto_para_imagem(titulo, descricao, data, caminho_imagem, valor=None):
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
        fonte_valor = ImageFont.truetype('backend/twitter/assets/IBMPLEXSANS.TTF', 32)
    except IOError:
        print("Fonte não encontrada. Usando fonte padrão.")
        fonte_titulo = ImageFont.load_default()
        fonte_descricao = ImageFont.load_default()
        fonte_data = ImageFont.load_default()
        fonte_valor = ImageFont.load_default()

    def desenhar_texto_negrito(desenho, posicao, texto, fonte, cor, deslocamento=1):
        x, y = posicao
        desenho.text((x - deslocamento, y), texto, font=fonte, fill=cor)
        desenho.text((x + deslocamento, y), texto, font=fonte, fill=cor)
        desenho.text((x, y - deslocamento), texto, font=fonte, fill=cor)
        desenho.text((x, y + deslocamento), texto, font=fonte, fill=cor)
        desenho.text((x, y), texto, font=fonte, fill=cor)

    # Título
    if len(titulo) > 33 and len(titulo) < 38:
        titulo = titulo[:33] + '\n' + titulo[33:]
    elif len(titulo) > 38:
        titulo = titulo[:30] + '\n' + titulo[30:]
    titulo_largura, titulo_altura = desenho.textbbox((0, 0), titulo, font=fonte_titulo)[2:4]
    y_text = (altura_imagem - titulo_altura) / 2 - 300  # Ajuste vertical
    x_text = (largura_imagem - titulo_largura) / 2
    desenhar_texto_negrito(desenho, (x_text, y_text), titulo, fonte_titulo, "black")
    
    # Data
    data_text = f"Data: {data}"
    largura_data, altura_data = desenho.textbbox((0, 0), data_text, font=fonte_data)[2:4]
    if len(titulo) > 33:
        y_text += titulo_altura - 150
    else:
        y_text = 170  
    x_text = 420
    desenhar_texto_negrito(desenho, (x_text, y_text), data_text, fonte_data, "black")

    # Descrição
    if len(descricao) > 520:
        descricao = descricao[:517] + "..."
    y_text += titulo_altura + 100  # Espaço entre título e descrição
    palavras = descricao.split(' ')
    linhas = []
    linha = ''

    def dividir_palavras_longas(palavras, max_len=48):
        novas_palavras = []
        for palavra in palavras:
            while len(palavra) > max_len:
                novas_palavras.append(palavra[:max_len])
                palavra = palavra[max_len:]
            novas_palavras.append(palavra)
        return novas_palavras

    # Dividir palavras longas antes de processar a descrição
    palavras = dividir_palavras_longas(palavras)

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
        palavras_linha = linha.split()
        if len(palavras_linha) > 1:
            largura_linha, altura_linha = desenho.textbbox((0, 0), linha, font=fonte_descricao)[2:4]
            espaco_extra = (largura_texto - largura_linha) / (len(palavras_linha) - 1)
            x_text = margem_lateral
            for palavra in palavras_linha:
                desenho.text((x_text, y_text), palavra, font=fonte_descricao, fill="black")
                largura_palavra, _ = desenho.textbbox((0, 0), palavra + ' ', font=fonte_descricao)[2:4]  # Inclui o espaço original
                x_text += largura_palavra + espaco_extra
        else:
            largura_linha, altura_linha = desenho.textbbox((0, 0), linha, font=fonte_descricao)[2:4]
            x_text = (largura_imagem - largura_linha) / 2
            desenho.text((x_text, y_text), linha, font=fonte_descricao, fill="black")
        y_text += altura_linha
    
    # pega o valor (se disponível)
    if valor is not None:
        valor_text = f"Valor: R$ {valor:.2f}"
        y_text = 830  
        x_text = 420
        largura_valor, altura_valor = desenho.textbbox((0, 0), valor_text, font=fonte_valor)[2:4]
        desenhar_texto_negrito(desenho, (x_text, y_text), valor_text, fonte_valor, "black")

    imagem.save(caminho_imagem)
    # print(f"Imagem salva em: {caminho_imagem}")

def buscar_licitacoes(data_ontem):
    db_path = 'backend/server/db.sqlite3'
    connection = sqlite3.connect(db_path)
    cursor = connection.cursor()

    query_licitacoes = """
    SELECT id, titulo, objeto, data, link, tipo
    FROM app_licitacao
    WHERE data = ?
    """
    cursor.execute(query_licitacoes, (data_ontem,))
    licitacoes_data = cursor.fetchall()
    # print(f"Licitacoes encontradas: {licitacoes_data}")

    licitacoes = []
    licitacao_ids = [licitacao[0] for licitacao in licitacoes_data]

    if licitacao_ids:
        query_valores = """
        SELECT idlicitacao_id, valor
        FROM app_valores
        WHERE idlicitacao_id IN ({})
        """.format(','.join('?' * len(licitacao_ids)))
        cursor.execute(query_valores, licitacao_ids)
        valores_data = cursor.fetchall()
        # print(f"Valores encontrados: {valores_data}")

        valores_dict = {}
        for licitacao_id, valor in valores_data:
            if licitacao_id not in valores_dict:
                valores_dict[licitacao_id] = []
            valores_dict[licitacao_id].append(valor)

        for licitacao in licitacoes_data:
            licitacao_id, titulo, objeto, data_abertura, link, tipo = licitacao
            valores = valores_dict.get(licitacao_id, [])
            link_encurtado = encurtar_url(link)
            licitacoes.append({
                'titulo': titulo,
                'descricao': objeto,
                'data': data_abertura,
                'link': link_encurtado,
                'valores': sum(valores) if valores else None
            })

    connection.close()
    return licitacoes

def criar_mensagens(licitacoes, site):
    data_atual = datetime.now().strftime('%d/%m/%Y')
    mensagens_alternativas = [
        f'Nenhuma nova licitação disponível nas últimas 24 horas (até {data_atual}).\n\nFique ligado: {site}',
        f'Estamos de olho! Até {data_atual}, não houve novas licitações.\n\nAcesse: {site}',
        f'Sem novidades nas últimas 24 horas (até {data_atual}).\n\nConfira mais detalhes em nosso site: {site}',
    ]

    if not licitacoes:
        mensagens = [mensagens_alternativas[datetime.now().day % len(mensagens_alternativas)]]
        verificador_de_licitacao = True
    else:
        mensagens = []
        for licitacao in licitacoes:
            link_encurtado = encurtar_url(licitacao['link'])
            tweet_message = f'{licitacao["titulo"]}\nVisite nosso site: {site}\nMais detalhes: {link_encurtado}'
            tweet_message = editar_mensagem(tweet_message)
            mensagens.append((tweet_message, licitacao["titulo"], licitacao["descricao"], licitacao["data"], licitacao["valores"]))
        verificador_de_licitacao = False

    # print(f"Mensagens criadas: {mensagens}")
    return mensagens, verificador_de_licitacao

def postar_tweets(client, api, mensagens, verificador_de_licitacao):
    if verificador_de_licitacao == False:
        for i, (mensagem, titulo, descricao, data, valor) in enumerate(mensagens):
            try:
                # print(f"Processando mensagem {i}: {mensagem}")
                caminho_imagem = f"tweet_image_{i}.png"
                texto_para_imagem(titulo, descricao, data, caminho_imagem, valor)

                # upload na imagem 
                response = api.media_upload(filename=caminho_imagem)
                media_id = response.media_id
                # print(f"Imagem {caminho_imagem} carregada com media_id: {media_id}")

                # cria o tweet já com a imagem 
                tweet = client.create_tweet(text=mensagem, media_ids=[media_id])
                # print(f"Tweet criado: {tweet}")

                # remove a imagem para liberar espaço em disco 
                os.remove(caminho_imagem)
                # print(f"Imagem {caminho_imagem} removida")
                 
                # posta a cada 20 segundos 
                time.sleep(7)
            except Exception as e: 
                print(f"Erro ao processar a mensagem {i}: {e}" ) 
                print(f"Erro ao enviar tweet: {e}") 
                traceback.print_exc() 
    else: 
        try:
            print(f"Postando mensagem alternativa: {mensagens[0]}")
            tweet = client.create_tweet(text=mensagens[0])
            # print(f"Tweet criado: {tweet}")
        except Exception as e:
            print(f"Erro ao enviar tweet: {e}")
            traceback.print_exc()

def main():
    site = "https://bit.ly/LicitaBSB"
    data_ontem = (datetime.now() - timedelta(days=1)).strftime('%d/%m/%Y')
    print(f"Buscando licitações para a data: {data_ontem}")

    licitacoes = buscar_licitacoes(data_ontem)
    mensagens, verificador_de_licitacao = criar_mensagens(licitacoes, site)
    client, api = carregar_configuracoes_twitter()
    if client and api:
        postar_tweets(client, api, mensagens, verificador_de_licitacao)
    else:
        print("Erro ao carregar configurações do Twitter. Não foi possível postar os tweets.")

if __name__ == '__main__':
    main()