from rest_framework.decorators import api_view
from app.models import Licitacao, Orgao
from app.serializers import LicitacaoSerializer, OrgaoSerializer
from rest_framework.response import Response
from rest_framework.exceptions import NotFound
from rest_framework.pagination import PageNumberPagination
from datetime import datetime
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi


@swagger_auto_schema(
    method='get',
    operation_description="Obter nome do órgão por ID",
    responses={200: OrgaoSerializer()}
)
@api_view(['GET'])
def nome_orgaos_por_id(request, id):
    try:
        orgao = Orgao.objects.get(id=id)
    except Orgao.DoesNotExist:
        raise NotFound(f'Órgão com ID {id} não encontrado.')

    serializer = OrgaoSerializer(orgao)
    return Response(serializer.data)


@swagger_auto_schema(
    method='get',
    operation_description="Listar todos os órgãos com opção de pesquisa e paginação",
    manual_parameters=[
        openapi.Parameter('search', openapi.IN_QUERY, description="Termo de pesquisa para nome do órgão", type=openapi.TYPE_STRING)
    ],
    responses={200: OrgaoSerializer(many=True)}
)
@api_view(['GET'])
def listar_orgaos(request):
    paginator = PageNumberPagination()
    paginator.page_size = 10

    search_term = request.GET.get('search', '')

    if search_term:
        orgaos = Orgao.objects.filter(nome__icontains=search_term)
    else:
        orgaos = Orgao.objects.all()

    page = paginator.paginate_queryset(orgaos, request)
    serializer = OrgaoSerializer(page, many=True)
    return paginator.get_paginated_response(serializer.data)


@swagger_auto_schema(
    method='get',
    operation_description="Listar todas as licitações com filtros dinâmicos e paginação",
    manual_parameters=[
        openapi.Parameter('tipo', openapi.IN_QUERY, description="Tipo de licitação", type=openapi.TYPE_STRING),
        openapi.Parameter('data', openapi.IN_QUERY, description="Data da licitação (dd-mm-aaaa)", type=openapi.TYPE_STRING)
    ],
    responses={200: LicitacaoSerializer(many=True)}
)
@api_view(['GET'])
def listar_licitacoes(request):
    paginator = PageNumberPagination()
    paginator.page_size = 10

    filtro_campos = ['tipo', 'data']
    filtros = {}

    for campo in filtro_campos:
        valor = request.GET.get(campo)
        if valor:
            if campo == 'data':
                valor = valor.replace('-', '/')
            filtros[campo] = valor

    licitacoes = Licitacao.objects.filter(**filtros)

    if licitacoes.exists():
        licitacoes = sorted(licitacoes, key=lambda x: datetime.strptime(x.data, '%d/%m/%Y'), reverse=True)

    result_page = paginator.paginate_queryset(licitacoes, request)
    serializer = LicitacaoSerializer(result_page, many=True)
    return paginator.get_paginated_response(serializer.data)


@swagger_auto_schema(
    method='get',
    operation_description="Obter detalhes de uma licitação por ID",
    responses={200: LicitacaoSerializer()}
)
@api_view(['GET'])
def licitacao_por_id(request, id):
    try:
        licitacao = Licitacao.objects.get(pk=id)
    except Licitacao.DoesNotExist:
        raise NotFound("Licitacao não encontrada")

    serializer = LicitacaoSerializer(licitacao)
    return Response(serializer.data)
