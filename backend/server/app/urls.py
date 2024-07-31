from django.urls import path
from app.views import licitacao_listar, nome_orgaos_listar,listar_licitacoes_por_tipo,licitacao_por_id


urlpatterns = [
    path('', licitacao_listar),
    path('orgaos', nome_orgaos_listar),
    path('licitacao/', listar_licitacoes_por_tipo, name='listar_licitacoes_por_tipo'),
    path('<int:id>/', licitacao_por_id, name='licitacao_por_id'),
]