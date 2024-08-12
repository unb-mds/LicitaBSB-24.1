from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from app.models import Licitacao, Orgao, LicitacaoQuantidade, LicitacaoValoresMensal
from app.serializers import LicitacaoSerializer, LicitacoesQuantidadeMensalSerializer
from django.db.models import Sum, F
from django.db.models.functions import Cast
from django.db.models import FloatField
from datetime import datetime

class Tests(APITestCase):

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
        # para os endpoints de quantidade mensal e anual
        LicitacaoQuantidade.objects.create(ano=2023, mes=1, total_licitacoes=5)
        LicitacaoQuantidade.objects.create(ano=2023, mes=2, total_licitacoes=10)
        LicitacaoQuantidade.objects.create(ano=2023, mes=3, total_licitacoes=15)
        LicitacaoQuantidade.objects.create(ano=2024, mes=1, total_licitacoes=0)


    # TESTE DO ENDPOINT NOME_ORGAOS_POR_ID
    def test_nome_orgaos_por_id_valido(self):
        # Faz uma requisição GET para a URL nome_orgaos_por_id com o ID do orgao criado
        response = self.client.get(reverse('nome_orgaos_por_id', args=[self.orgao.id]))
        # Verifica se o status da resposta é 200 OK
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        # Verifica se os dados retornados são os esperados
        self.assertEqual(response.data, {'id': self.orgao.id, 'nome': self.orgao.nome})

    def test_nome_orgaos_por_id_invalido(self):
        # Faz uma requisição GET para a URL nome_orgaos_por_id com um ID inexistente
        response = self.client.get(reverse('nome_orgaos_por_id', args=[999]))
        # Verifica se o status da resposta é 404 Not Found
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        # Verifica se a mensagem de erro está correta
        self.assertEqual(response.data, {'detail': 'Órgão com ID 999 não encontrado.'})

    # TESTE DO ENDPOINT LISTAR_ORGAOS
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

    # TESTE DO ENDPOINT LISTAR_LICITACOES
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

 # TESTE DO ENDPOINT LICITACAO_POR_ID
    def test_licitacao_por_id_valido(self):
        licitacao = Licitacao.objects.first()
        url = reverse('licitacao_por_id', args=[licitacao.id])
        response = self.client.get(url)
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        serializer = LicitacaoSerializer(licitacao)
        self.assertEqual(response.data, serializer.data)

    def test_licitacao_por_id_invalido(self):
        url = reverse('licitacao_por_id', args=[999])
        response = self.client.get(url)
        
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.data, {'detail': 'Licitacao não encontrada'})
        
    # TESTE DO ENDPOINT LISTAR_LICITACOES_QUANTIDADE_MENSAL
    def test_listar_licitacoes_quantidade_mensal(self):
            # Fazer uma requisição GET para o endpoint
            response = self.client.get(reverse('listar_licitacoes_quantidade_mensal'))
            # Verificar se o status da resposta é 200 OK
            self.assertEqual(response.status_code, status.HTTP_200_OK)
            # Dados esperados
            expected_data = [
                {'ano': 2023, 'mes': 1, 'total_licitacoes': 5},
                {'ano': 2023, 'mes': 2, 'total_licitacoes': 10},
                {'ano': 2023, 'mes': 3, 'total_licitacoes': 15},
                {'ano': 2024, 'mes': 1, 'total_licitacoes': 0},
            ]
            # Verificar o conteúdo da resposta
            self.assertEqual(response.data, expected_data)

    def test_listar_licitacoes_quantidade_mensal_vazio(self):
        LicitacaoQuantidade.objects.all().delete()
        response = self.client.get(reverse('listar_licitacoes_quantidade_mensal'))  
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, [])

    # TESTE DO ENDPOINT LISTAR_LICITACOES_QUANTIDADE_ANUAL
    def test_listar_licitacoes_quantidade_anual(self):
            # Fazer uma requisição GET para o endpoint
            response = self.client.get(reverse('listar_licitacoes_quantidade_anual'))
            # Verificar se o status da resposta é 200 OK
            self.assertEqual(response.status_code, status.HTTP_200_OK)
            # Dados esperados
            expected_data = [
                {'ano': 2023, 'total_licitacoes': 30},
                {'ano': 2024, 'total_licitacoes': 0}
            ]
            # Verificar o conteúdo da resposta
            self.assertEqual(response.data, expected_data)

    def test_listar_licitacoes_quantidade_anual_vazio(self):
        LicitacaoQuantidade.objects.all().delete()
        response = self.client.get(reverse('listar_licitacoes_quantidade_anual'))  
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, [])

    # TESTE DO ENDPOINT LICITACAO_MAIOR_VALOR   
    def test_licitacao_maior_valor(self):
        # Fazer uma requisição GET para o endpoint
        response = self.client.get(reverse('licitacao_maior_valor'))
        
        # Verificar se o status da resposta é 200 OK
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        # Verificar se a licitação retornada é a com maior valor somado
        licitacao_com_maior_valor = Licitacao.objects.annotate(
            total_valor=Sum(Cast(F('valores'), FloatField()))
        ).order_by('-total_valor').first()
        
        serializer = LicitacaoSerializer(licitacao_com_maior_valor)
        self.assertEqual(response.data, serializer.data)

    def test_licitacao_maior_valor_sem_licitacoes(self):
        # Remover todas as licitações
        Licitacao.objects.all().delete()
        
        # Fazer uma requisição GET para o endpoint
        response = self.client.get(reverse('licitacao_maior_valor'))
        
        # Verificar se o status da resposta é 404 NOT FOUND
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        
        # Verificar se a mensagem de erro está correta
        self.assertEqual(response.data, {'detail': 'Nenhuma licitação encontrada.'})