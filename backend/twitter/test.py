import unittest
from unittest.mock import patch, MagicMock
import tweepy
import os
import requests
from PIL import Image, ImageDraw, ImageFont
import sqlite3
from datetime import datetime, timedelta

# Assuming the functions are imported from the module
from backend.twitter.auto import (
    carregar_configuracoes_twitter,
    encurtar_url,
    editar_mensagem,
    texto_para_imagem,
    buscar_licitacoes,
    criar_mensagens,
    postar_tweets
)

class TestTwitterBot(unittest.TestCase):

    @patch.dict(os.environ, {
        'TWITTER_API_KEY': 'fake_key',
        'TWITTER_API_KEY_SECRET': 'fake_secret',
        'TWITTER_ACCESS_TOKEN': 'fake_token',
        'TWITTER_ACCESS_TOKEN_SECRET': 'fake_token_secret',
        'TWITTER_BEARER_TOKEN': 'fake_bearer_token',
    })
    @patch('backend.twitter.auto.tweepy.Client')
    @patch('backend.twitter.auto.tweepy.OAuth1UserHandler')
    @patch('backend.twitter.auto.tweepy.API')
    def test_carregar_configuracoes_twitter(self, MockAPI, MockOAuthHandler, MockClient):
        # Mock return values for tweepy classes
        mock_client = MagicMock()
        MockClient.return_value = mock_client

        mock_auth = MagicMock()
        MockOAuthHandler.return_value = mock_auth

        mock_api = MagicMock()
        MockAPI.return_value = mock_api

        # Call the function
        client, api = carregar_configuracoes_twitter()

        # Assert that the Client was called with the correct parameters
        MockClient.assert_called_once_with(
            consumer_key='fake_key',
            consumer_secret='fake_secret',
            access_token='fake_token',
            access_token_secret='fake_token_secret',
            bearer_token='fake_bearer_token'
        )

        # Assert that OAuth1UserHandler was called with the correct parameters
        MockOAuthHandler.assert_called_once_with(
            'fake_key', 'fake_secret', 'fake_token', 'fake_token_secret'
        )

        # Assert that the API was initialized with the correct authentication handler
        MockAPI.assert_called_once_with(mock_auth)

        # Assert the returned objects are correct
        self.assertEqual(client, mock_client)
        self.assertEqual(api, mock_api)

    @patch('backend.twitter.auto.requests.post')
    def test_encurtar_url(self, mock_post):
        mock_response = MagicMock()
        mock_response.status_code = 200
        mock_response.json.return_value = {'urlEncurtada': 'http://short.url'}
        mock_post.return_value = mock_response

        url = "http://long.url"
        short_url = encurtar_url(url)
        self.assertEqual(short_url, 'http://short.url')

    def test_editar_mensagem(self):
        mensagem = "This is a test message that is way too long for a single tweet and should be shortened."
        edited_message = editar_mensagem(mensagem)
        self.assertTrue(len(edited_message) <= 280)

    @patch('backend.twitter.auto.sqlite3.connect')
    def test_buscar_licitacoes(self, mock_connect):
        mock_conn = MagicMock()
        mock_cursor = MagicMock()
        mock_connect.return_value = mock_conn
        mock_conn.cursor.return_value = mock_cursor
        mock_cursor.fetchall.return_value = [
            (1, 'Titulo', 'Objeto', '01/01/2023', 'http://link.com', 'Tipo')
        ]

        data_ontem = (datetime.now() - timedelta(days=1)).strftime('%d/%m/%Y')
        licitacoes = buscar_licitacoes(data_ontem)
        self.assertEqual(len(licitacoes), 1)
        self.assertEqual(licitacoes[0]['titulo'], 'Titulo')

    def test_criar_mensagens(self):
        licitacoes = [
            {'titulo': 'Titulo', 'descricao': 'Descricao', 'data': '01/01/2023', 'link': 'http://link.com', 'valores': 100.0}
        ]
        site = "http://site.com"
        mensagens, verificador_de_licitacao = criar_mensagens(licitacoes, site)
        self.assertFalse(verificador_de_licitacao)
        self.assertEqual(len(mensagens), 1)

    @patch('backend.twitter.auto.Image.open')
    @patch('backend.twitter.auto.ImageDraw.Draw')
    @patch('backend.twitter.auto.ImageFont.truetype')
    def test_texto_para_imagem(self, mock_truetype, mock_draw, mock_open):
        # Mock Image and ImageDraw objects
        mock_image = MagicMock(spec=Image.Image)
        mock_draw_instance = MagicMock(spec=ImageDraw.ImageDraw)
        
        # Setup mock return values
        mock_open.return_value = mock_image
        mock_draw.return_value = mock_draw_instance
        
        # Mock font objects
        mock_font = MagicMock(spec=ImageFont.FreeTypeFont)
        mock_truetype.return_value = mock_font

        # Simular retorno da função textbbox
        # A função textbbox normalmente retorna um bounding box (x0, y0, x1, y1)
        mock_draw_instance.textbbox.side_effect = lambda pos, text, font: (0, 0, 100, 50)  # Exemplo de dimensões simuladas

        # Call the function under test
        texto_para_imagem(
            titulo="Teste Título",
            descricao="Esta é uma descrição de teste que será dividida em várias linhas para verificação.",
            data="01/01/2024",
            caminho_imagem="test_image.png",
            valor=150.00
        )
        
        # Verificações sobre chamadas de funções
        mock_open.assert_called_once_with('backend/twitter/background.jpg')
        mock_draw.assert_called_once_with(mock_image)
        mock_truetype.assert_any_call('backend/twitter/assets/IBMPLEXSANS.TTF', 44)
        mock_truetype.assert_any_call('backend/twitter/assets/IBMPLEXSERIF.TTF', 35)
        
        # Verificação da chamada de save
        mock_image.save.assert_called_once_with("test_image.png")

if __name__ == '__main__':
    unittest.main()