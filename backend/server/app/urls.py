from django.urls import path
from app.views import  nome_orgaos_listar,listar_licitacoes,licitacao_por_id,nome_orgaos_por_id, nome_orgaos_pesquisar


urlpatterns = [
    path('orgaos', nome_orgaos_listar),
    path('orgaos/<int:id>/', nome_orgaos_por_id, name='nome_orgaos_por_id'),
    path('orgaos/', nome_orgaos_pesquisar, name='nome_orgaos_pesquisar'),
    path('licitacoes', listar_licitacoes, name='listar_licitacoes'),
    path('licitacoes/<int:id>', licitacao_por_id, name='licitacao_por_id'),
]