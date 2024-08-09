from rest_framework.decorators import api_view
from app.models import Licitacao, Orgao, LicitacaoQuantidade, LicitacaoValoresMensal
from app.serializers import LicitacaoSerializer, OrgaoSerializer, LicitacoesQuantidadeMensalSerializer, LicitacoesQuantidadeAnualSerializer,LicitacoesValoresMensaisSerializer, LicitacoesValoresAnuaisSerializer
from rest_framework.response import Response
from rest_framework.exceptions import NotFound
from rest_framework.pagination import PageNumberPagination
from datetime import datetime
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from django.db.models import Sum, F, FloatField, Q
from django.db.models.functions import Cast
from rest_framework import status

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
        "Listar todas as licitações com filtros dinâmicos e paginação. \n"
        "Filtros disponíveis: \n"
        "- tipo: Tipo de licitação, pode ser 'aviso' ou 'extrato'.\n"
        "- data: Data da licitação no formato dd-mm-aaaa.\n"
        "- search: Termo de busca no campo 'objeto'.\n"
        "- orgao: Termos de busca parcial no nome do órgão, separados por vírgula. Suporta múltiplos órgãos.\n"
        "Ordenação: adicione o parâmetro 'ordenar_por' com valor 'valor' para ordenar por valor total, \n"
        "ou deixe em branco para ordenar por data (padrão).\n"
    ),
    manual_parameters=[
        openapi.Parameter('tipo', openapi.IN_QUERY, description="Tipo de licitação, pode ser 'aviso' ou 'extrato'", type=openapi.TYPE_STRING),
        openapi.Parameter('data', openapi.IN_QUERY, description="Data da licitação (dd-mm-aaaa)", type=openapi.TYPE_STRING),
        openapi.Parameter('search', openapi.IN_QUERY, description="Termo de busca no campo 'objeto'", type=openapi.TYPE_STRING),
        openapi.Parameter('orgao', openapi.IN_QUERY, description="Termos de busca parcial no nome do órgão, separados por vírgula. Suporta múltiplos órgãos.", type=openapi.TYPE_STRING),
        openapi.Parameter('ordenar_por', openapi.IN_QUERY, description="Ordenação dos resultados. Use 'valor' para ordenar por valor total, ou deixe em branco para ordenar por data.", type=openapi.TYPE_STRING)
    ],
    responses={200: openapi.Response('Lista de licitações', LicitacaoSerializer(many=True))}
)
@api_view(['GET'])
def listar_licitacoes(request):
    paginator = PageNumberPagination()
    paginator.page_size = 10

    filtro_campos = ['tipo', 'data', 'search', 'orgao']
    nomes_dos_campos_db = ['tipo', 'data', 'objeto', 'idorgao__nome']
    filtros = Q()

    for campo, real_campo in zip(filtro_campos, nomes_dos_campos_db):
        valor = request.GET.get(campo)
        if valor:
            if campo == 'data':
                valor = valor.replace('-', '/')
            if campo == 'search':
                filtros &= Q(**{f'{real_campo}__icontains': valor})
            elif campo == 'orgao':
                # Suporte para múltiplos órgãos separados por vírgula
                orgaos = [orgao.strip() for orgao in valor.split(',')]  # Remove espaços extras
                orgaos_q = Q()
                for orgao in orgaos:
                    orgaos_q |= Q(**{f'{real_campo}__icontains': orgao})
                filtros &= orgaos_q
            else:
                filtros &= Q(**{real_campo: valor})

    licitacoes = Licitacao.objects.filter(filtros)

    if request.GET.get('ordenar_por') == 'valor':
        licitacoes = licitacoes.annotate(
            total_valor=Sum(Cast(F('valores'), FloatField()))
        ).order_by('-total_valor')
    else:
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


@swagger_auto_schema(
    method='get',
    operation_description="Obter a quantidade de licitações organizadas por ano e mês.",
    responses={
        200: openapi.Response(
            description="Retorna a quantidade de licitações por ano e mês",
            schema=LicitacoesQuantidadeMensalSerializer(many=True)
        )
    }
)
@api_view(['GET'])
def listar_licitacoes_quantidade_mensal(request):
    # Busca todos os registros da tabela LicitacaoQuantidade
    licitacao_quantidade = LicitacaoQuantidade.objects.values('ano', 'mes').annotate(total_licitacoes=Sum('total_licitacoes')).order_by('ano', 'mes')

    # Cria o serializer e retorna a resposta
    serializer = LicitacoesQuantidadeMensalSerializer(licitacao_quantidade, many=True)
    return Response(serializer.data)

@swagger_auto_schema(
    method='get',
    operation_description="Obter a quantidade de licitações organizadas por ano.",
    responses={
        200: openapi.Response(
            description="Retorna a quantidade de licitações por ano",
            schema=LicitacoesQuantidadeAnualSerializer(many=True)
        )
    }
)
@api_view(['GET'])
def listar_licitacoes_quantidade_anual(request):
    # Agrupa as licitações por ano e soma as quantidades
    licitacao_quantidade_anual = LicitacaoQuantidade.objects.values('ano').annotate(total_licitacoes=Sum('total_licitacoes')).order_by('ano')

    # Para evitar o erro, precisamos passar uma lista de objetos ao serializer
    # Para cada dicionário retornado por values(), criamos uma instância do modelo
    licitacao_quantidade_anual_objs = [
        LicitacaoQuantidade(ano=item['ano'], total_licitacoes=item['total_licitacoes']) 
        for item in licitacao_quantidade_anual
    ]

    # Cria o serializer e retorna a resposta
    serializer = LicitacoesQuantidadeAnualSerializer(licitacao_quantidade_anual_objs, many=True)
    return Response(serializer.data)



@swagger_auto_schema(
    method='get',
    operation_description="Obter a quantidade total de valores mensais de licitações, organizados por ano e mês.",
    responses={
        200: openapi.Response(
            description="Retorna a quantidade total de valores mensais por ano e mês",
            schema=LicitacoesValoresMensaisSerializer(many=True)
        )
    }
)
@api_view(['GET'])
def listar_licitacoes_valores_mensais(request):
    # Busca todos os registros da tabela LicitacaoQuantidade
    valores_mensais =  LicitacaoValoresMensal.objects.values('ano', 'mes').annotate(valor_total=Sum('valor_total')).order_by('ano', 'mes')

    # Cria o serializer e retorna a resposta
    serializer = LicitacoesValoresMensaisSerializer(valores_mensais, many=True)
    return Response(serializer.data)

@swagger_auto_schema(
    method='get',
    operation_description="Obter a quantidade total de valores anuais de licitações, organizados por ano.",
    responses={
        200: openapi.Response(
            description="Retorna a quantidade total de valores anuais por ano",
            schema=LicitacoesValoresAnuaisSerializer(many=True)
        )
    }
)
@api_view(['GET'])
def listar_licitacoes_valores_anuais(request):
    # Obtém todos os anos distintos e ordena em ordem crescente
    anos = LicitacaoValoresMensal.objects.values_list('ano', flat=True).distinct().order_by('ano')

    # Prepara os dados para o serializer
    dados = [{'ano': ano} for ano in anos]

    # Cria o serializer e retorna a resposta
    serializer = LicitacoesValoresAnuaisSerializer(dados, many=True)
    return Response(serializer.data)

@swagger_auto_schema(
    method='get',
    operation_description="Retorna a licitação com o maior valor somado.",
    responses={200: openapi.Response('Licitação com maior valor', LicitacaoSerializer())}
)
@api_view(['GET'])
def licitacao_maior_valor(request):
    # Anotar cada licitação com a soma de seus valores
    licitacao_com_maior_valor = Licitacao.objects.annotate(
        total_valor=Sum(Cast(F('valores'), FloatField()))
    ).order_by('-total_valor').first()

    if licitacao_com_maior_valor:
        serializer = LicitacaoSerializer(licitacao_com_maior_valor)
        return Response(serializer.data, status=status.HTTP_200_OK)
    else:
        return Response({'detail': 'Nenhuma licitação encontrada.'}, status=status.HTTP_404_NOT_FOUND)
