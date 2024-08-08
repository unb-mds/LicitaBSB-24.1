from rest_framework import serializers
from app.models import Orgao, Licitacao, Valores, LicitacaoQuantidade, LicitacaoValoresMensal
from collections import defaultdict

class OrgaoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Orgao
        fields = '__all__'  # Inclui todos os campos do modelo Orgao

class ValoresSerializer(serializers.ModelSerializer):
    class Meta:
        model = Valores
        fields = ['valor']

class LicitacaoSerializer(serializers.ModelSerializer):
    valores = serializers.SerializerMethodField()  # Novo campo para os valores associados
    nome_orgao = serializers.SerializerMethodField()
    class Meta:
        model = Licitacao
        fields = '__all__'  # Inclui todos os campos do modelo Licitacao
    
    def get_nome_orgao(self, obj):
        return obj.idorgao.nome if obj.idorgao else None  # Obtém o nome do órgão, se existir
    
    def get_valores(self, obj):
        valores = Valores.objects.filter(idlicitacao=obj).values_list('valor', flat=True)  # Obtém todos os valores associados
        return list(valores) if valores else None  # Retorna uma lista simples de valores ou None se não houver valores

class LicitacoesQuantidadeSerializer(serializers.ModelSerializer):
    class Meta:
        model = LicitacaoQuantidade
        fields = ['ano', 'mes', 'total_licitacoes']

class LicitacoesValoresMensaisSerializer(serializers.ModelSerializer):
    class Meta:
        model = LicitacaoValoresMensal
        fields = ['ano', 'mes', 'valor_total']


