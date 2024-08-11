from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from .models import Orgao

class URLTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.orgao = Orgao.objects.create(id=1, nome='Orgao Teste')

    def test_nome_orgaos_por_id(self):
        response = self.client.get(reverse('nome_orgaos_por_id', args=[self.orgao.id]))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, {'id': self.orgao.id, 'nome': self.orgao.nome})
