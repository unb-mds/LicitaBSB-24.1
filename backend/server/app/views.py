from rest_framework.decorators import api_view
from app.models import Licitacao, Orgao, LicitacaoQuantidade
from app.serializers import LicitacaoSerializer, OrgaoSerializer, LicitacaoQuantidadeFormattedSerializer
from rest_framework.response import Response
from rest_framework.exceptions import NotFound
from rest_framework.pagination import PageNumberPagination
from datetime import datetime
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from django.db.models import Sum, F, FloatField
from django.db.models.functions import Cast

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
    operation_description=(
        "Listar todas as licitações com filtros dinâmicos e paginação. "
        "Filtros disponíveis: tipo (Tipo de licitação), data (Data da licitação no formato dd-mm-aaaa), "
        "search (Termo de busca no campo 'objeto'). "
        "Ordenação: adicione o parâmetro 'ordenar_por' com valor 'valor' para ordenar por valor total, "
        "ou deixe em branco para ordenar por data (padrão)."
    ),
    manual_parameters=[
        openapi.Parameter('tipo', openapi.IN_QUERY, description="Tipo de licitação, pode ser 'aviso' ou 'extrato'", type=openapi.TYPE_STRING),
        openapi.Parameter('data', openapi.IN_QUERY, description="Data da licitação (dd-mm-aaaa)", type=openapi.TYPE_STRING),
        openapi.Parameter('search', openapi.IN_QUERY, description="Termo de busca no campo 'objeto'", type=openapi.TYPE_STRING),
        openapi.Parameter('ordenar_por', openapi.IN_QUERY, description="Ordenação dos resultados. Use 'valor' para ordenar por valor total, ou deixe em branco para ordenar por data.", type=openapi.TYPE_STRING)
    ],
    responses={200: openapi.Response('Lista de licitações', LicitacaoSerializer(many=True))}
)
@api_view(['GET'])
def listar_licitacoes(request):
    paginator = PageNumberPagination()
    paginator.page_size = 10

    # Lista de possíveis campos de filtro e seus correspondentes no banco de dados
    filtro_campos = ['tipo', 'data', 'search']
    nomes_dos_campos_db = ['tipo', 'data', 'objeto']
    filtros = {}

    # Itera sobre os campos de filtro e seus nomes correspondentes no banco de dados
    for campo, real_campo in zip(filtro_campos, nomes_dos_campos_db):
        valor = request.GET.get(campo)
        if valor:
            if campo == 'data':
                valor = valor.replace('-', '/')
            if campo == 'search':
                # Para o campo 'search', use icontains para busca parcial
                filtros[f'{real_campo}__icontains'] = valor
            else:
                filtros[real_campo] = valor

    # Filtro inicial
    licitacoes = Licitacao.objects.filter(**filtros)

    # Verifica se o parâmetro 'ordenar_por' está presente na URL e se o valor é 'valor'
    if request.GET.get('ordenar_por') == 'valor':
        # Anota cada licitação com a soma de seus valores
        licitacoes = licitacoes.annotate(
            total_valor=Sum(Cast(F('valores'), FloatField()))
        )
        # Ordena as licitações pelo valor total (do maior para o menor)
        licitacoes = licitacoes.order_by('-total_valor')
    else:
        # Ordena as licitações pela data mais recente (do mais recente para o mais antigo) na memória
        licitacoes = list(licitacoes)  # Converte o QuerySet para uma lista
        licitacoes = sorted(licitacoes, key=lambda x: datetime.strptime(x.data, '%d/%m/%Y'), reverse=True)

    # Paginação
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


@swagger_auto_schema(
    method='get',
    operation_description="Obter a quantidade de licitações organizadas por ano e mês.",
    responses={
        200: openapi.Response(
            description="Retorna a quantidade de licitações por ano e mês",
            schema=LicitacaoQuantidadeFormattedSerializer(many=True)
        )
    }
)
@api_view(['GET'])
def listar_licitacoes_quantidade(request):
    # Busca todos os registros da tabela LicitacaoQuantidade
    licitacao_quantidade = LicitacaoQuantidade.objects.values('ano', 'mes').annotate(total_licitacoes=Sum('total_licitacoes')).order_by('ano', 'mes')

    # Cria o serializer e retorna a resposta
    serializer = LicitacaoQuantidadeFormattedSerializer(licitacao_quantidade, many=True)
    return Response(serializer.data)