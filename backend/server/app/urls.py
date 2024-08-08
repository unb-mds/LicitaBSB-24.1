from django.urls import path
from app.views import  listar_licitacoes,licitacao_por_id,nome_orgaos_por_id, listar_orgaos, listar_licitacoes_quantidade, listar_licitacoes_valores_mensais


urlpatterns = [
    path('orgaos/<int:id>/', nome_orgaos_por_id, name='nome_orgaos_por_id'),
    path('orgaos', listar_orgaos, name='lista_orgaos'),
    path('licitacoes', listar_licitacoes, name='listar_licitacoes'),
    path('licitacoes/<int:id>', licitacao_por_id, name='licitacao_por_id'),
    path('dash/quantidade', listar_licitacoes_quantidade, name= 'listar_licitacoes_quantidade'),
    path('dash/valores-mensais', listar_licitacoes_valores_mensais, name='licitacoes-valores-mensais'),
]