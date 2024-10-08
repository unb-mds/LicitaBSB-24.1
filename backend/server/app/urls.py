from django.urls import path
from app.views import  listar_licitacoes,licitacao_por_id,nome_orgaos_por_id, listar_orgaos, listar_licitacoes_quantidade_mensal, listar_licitacoes_quantidade_anual, listar_licitacoes_valores_mensais, listar_licitacoes_valores_anuais, licitacao_maior_valor, subscribe_email


urlpatterns = [
    path('orgaos/<int:id>/', nome_orgaos_por_id, name='nome_orgaos_por_id'),
    path('orgaos', listar_orgaos, name='lista_orgaos'),
    path('licitacoes', listar_licitacoes, name='listar_licitacoes'),
    path('licitacoes/<int:id>', licitacao_por_id, name='licitacao_por_id'),
    path('licitacoes/maior-valor', licitacao_maior_valor, name='licitacao_maior_valor'),
    path('dash/quantidade-mensal', listar_licitacoes_quantidade_mensal, name= 'listar_licitacoes_quantidade_mensal'),
    path('dash/quantidade-anual', listar_licitacoes_quantidade_anual, name= 'listar_licitacoes_quantidade_anual'),
    path('dash/valores-mensais', listar_licitacoes_valores_mensais, name='licitacoes-valores-mensais'),
    path('dash/valores-anuais', listar_licitacoes_valores_anuais, name='valores-anuais-list'),
    path('subscribe',subscribe_email, name='subscribe_email'),
]