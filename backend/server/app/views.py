from rest_framework.decorators import api_view
from app.models import Licitacao, Orgao
from app.serializers import LicitacaoSerializer, OrgaoSerializer
from rest_framework.response import Response
from rest_framework.exceptions import NotFound
from rest_framework.pagination import PageNumberPagination
from datetime import datetime


@api_view(['GET'])
def nome_orgaos_listar(request):
    paginator = PageNumberPagination()
    paginator.page_size = 10  # Define o número de itens por página

    orgaos = Orgao.objects.all()
    page = paginator.paginate_queryset(orgaos, request)
    serializer = OrgaoSerializer(page, many=True)

    return paginator.get_paginated_response(serializer.data)

@api_view(['GET'])
def nome_orgaos_por_id(request, id):
    try:
        orgao = Orgao.objects.get(id=id)
    except Orgao.DoesNotExist:
        raise NotFound(f'Órgão com ID {id} não encontrado.')

    serializer = OrgaoSerializer(orgao)
    return Response(serializer.data)

@api_view(['GET'])
def listar_licitacoes(request):
    paginator = PageNumberPagination()
    paginator.page_size = 10  # Define o número de itens por página

    # Lista de possíveis campos de filtro
    filtro_campos = ['tipo', 'data']

    # Dicionário para armazenar os filtros dinâmicos
    filtros = {}

    # Itera sobre os campos de filtro possíveis e adiciona ao dicionário de filtros
    for campo in filtro_campos:
        valor = request.GET.get(campo)
        if valor:
            if campo == 'data':
                # Converte o formato da data de dd-mm-aaaa para dd/mm/aaaa
                valor = valor.replace('-', '/')
            filtros[campo] = valor
            print(f"Filtrando por {campo}: {valor}")  # Mensagem para verificação

    licitacoes = Licitacao.objects.filter(**filtros)

    if not licitacoes.exists():
        print(f"Nenhuma licitação encontrada com os filtros: {filtros}")  # Mensagem quando não encontrar licitações
    else:
        print(f"{licitacoes.count()} licitações encontradas com os filtros: {filtros}")

    # Ordena as licitações por data mais recente
    licitacoes = sorted(licitacoes, key=lambda x: datetime.strptime(x.data, '%d/%m/%Y'), reverse=True)

    result_page = paginator.paginate_queryset(licitacoes, request)
    serializer = LicitacaoSerializer(result_page, many=True)
    return paginator.get_paginated_response(serializer.data)
    

@api_view(['GET'])
def licitacao_por_id(request, id):
    try:
        licitacao = Licitacao.objects.get(pk=id)
    except Licitacao.DoesNotExist:
        raise NotFound("Licitacao não encontrada")
    
    serializer = LicitacaoSerializer(licitacao)
    return Response(serializer.data)