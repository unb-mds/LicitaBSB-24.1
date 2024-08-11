from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from .models import Orgao

class URLTests(TestCase):
    def setUp(self):
        # Configura o cliente de teste da API
        self.client = APIClient()
        # Criar múltiplos objetos Orgao para testar a paginação e a busca
        for i in range(15):
            Orgao.objects.create(id=i+1, nome=f'Orgao Teste {i+1}')
        # Criar um objeto Orgao específico para o teste de nome_orgaos_por_id
        self.orgao = Orgao.objects.create(id=16, nome='Orgao Teste 16')

    def test_nome_orgaos_por_id(self):
        # Faz uma requisição GET para a URL nome_orgaos_por_id com o ID do orgao criado
        response = self.client.get(reverse('nome_orgaos_por_id', args=[self.orgao.id]))
        # Verifica se o status da resposta é 200 OK
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        # Verifica se os dados retornados são os esperados
        self.assertEqual(response.data, {'id': self.orgao.id, 'nome': self.orgao.nome})

    def test_listar_orgaos_paginacao(self):
        # Faz uma requisição GET para a URL lista_orgaos
        response = self.client.get(reverse('lista_orgaos'))
        # Verifica se o status da resposta é 200 OK
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        # Verifica se a página contém 10 itens (página de resultados paginados)
        self.assertEqual(len(response.data['results']), 10)

    def test_listar_orgaos_busca(self):
        # Faz uma requisição GET para a URL lista_orgaos com o parâmetro de busca 'Teste 1'
        response = self.client.get(reverse('lista_orgaos'), {'search': 'Teste 1'})
        # Verifica se o status da resposta é 200 OK
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        # Verifica se pelo menos um dos resultados contém 'Teste 1' no nome
        self.assertTrue(any('Teste 1' in orgao['nome'] for orgao in response.data['results']))