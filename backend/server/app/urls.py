from django.urls import path
from app.views import  nome_orgaos_listar,listar_licitacoes,licitacao_por_id


urlpatterns = [
    path('orgaos', nome_orgaos_listar),
    path('licitacoes', listar_licitacoes, name='listar_licitacoes'),
    path('licitacoes/<int:id>', licitacao_por_id, name='licitacao_por_id'),
]