from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from app.models import Orgao, Licitacao
from datetime import datetime
class LicitacaoTests(APITestCase):

    def setUp(self):
        for i in range(15):
            Orgao.objects.create(id=i+1, nome=f'Orgao Teste {i+1}')
        
        self.orgao = Orgao.objects.create(id=16, nome='Orgao Teste 16')
        
        for i in range(15):
            Licitacao.objects.create(
                tipo='Tipo Teste',
                data=(datetime.now()).strftime('%d/%m/%Y'),
                objeto=f'Objeto Teste {i+1}',
                idorgao=self.orgao,
                valores=[1000 * (i+1)]
            )

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

    def test_listar_licitacoes_paginacao(self):
        response = self.client.get(reverse('listar_licitacoes'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 10)

    def test_listar_licitacoes_filtro_search(self):
        response = self.client.get(reverse('listar_licitacoes'), {'search': 'Teste 1'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_listar_licitacoes_filtro_orgao(self):
        response = self.client.get(reverse('listar_licitacoes'), {'idorgao': self.orgao.id})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(all(licitacao['idorgao'] == self.orgao.id for licitacao in response.data['results']))

    def test_listar_licitacoes_ordenar_por_valor(self):
        response = self.client.get(reverse('listar_licitacoes'), {'ordering': 'valores'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        valores = [licitacao['valores'][0] for licitacao in response.data['results'] if licitacao['valores']]
        self.assertEqual(valores, sorted(valores))
