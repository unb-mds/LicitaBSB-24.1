from rest_framework.decorators import api_view
from app.models import Licitacao, Orgao
from app.serializers import LicitacaoSerializer, OrgaoSerializer
from rest_framework.response import Response
from rest_framework.exceptions import NotFound

@api_view(['GET'])
def licitacao_listar(request):
    licitacoes = Licitacao.objects.all()
    serializer = LicitacaoSerializer(licitacoes, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def nome_orgaos_listar(request):
    orgaos = Orgao.objects.all()
    serializer = OrgaoSerializer(orgaos, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def listar_licitacoes_por_tipo(request):
    tipo = request.query_params.get('type')  # Obtém o parâmetro 'type' da URL
    
    if tipo:
        print(f"Filtrando por tipo: {tipo}")  # Verifica o tipo recebido
        licitacoes = Licitacao.objects.filter(tipo=tipo)  # Filtra as licitações pelo tipo
        if not licitacoes.exists():
            print(f"Nenhuma licitação encontrada com o tipo: {tipo}")  # Mensagem para quando não encontrar nenhuma licitação
    else:
        print("Nenhum tipo fornecido, retornando todas as licitações.")  # Mensagem para quando nenhum tipo é fornecido
        licitacoes = Licitacao.objects.all()  # Caso nenhum tipo seja fornecido, retorna todas as licitações

    serializer = LicitacaoSerializer(licitacoes, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def licitacao_por_id(request, id):
    try:
        licitacao = Licitacao.objects.get(pk=id)
    except Licitacao.DoesNotExist:
        raise NotFound("Licitacao não encontrada")
    
    serializer = LicitacaoSerializer(licitacao)
    return Response(serializer.data)