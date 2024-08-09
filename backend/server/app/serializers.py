from rest_framework import serializers
from app.models import Orgao, Licitacao, Valores, LicitacaoQuantidade, LicitacaoValoresMensal
from collections import defaultdict
from django.db.models import Sum

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

class LicitacoesQuantidadeMensalSerializer(serializers.ModelSerializer):
    class Meta:
        model = LicitacaoQuantidade
        fields = ['ano', 'mes', 'total_licitacoes']

class LicitacoesQuantidadeAnualSerializer(serializers.ModelSerializer):
    total_licitacoes = serializers.SerializerMethodField()

    class Meta:
        model = LicitacaoQuantidade
        fields = ['ano', 'total_licitacoes']

    def get_total_licitacoes(self, obj):
        # Agrupa e soma as licitações por ano
        total_licitacoes_por_ano = LicitacaoQuantidade.objects.filter(ano=obj.ano).aggregate(total=Sum('total_licitacoes'))
        return total_licitacoes_por_ano['total']

class LicitacoesValoresMensaisSerializer(serializers.ModelSerializer):
    class Meta:
        model = LicitacaoValoresMensal
        fields = ['ano', 'mes', 'valor_total']

class LicitacoesValoresAnuaisSerializer(serializers.Serializer):
    ano = serializers.IntegerField()
    valor_total = serializers.SerializerMethodField()

    def get_valor_total(self, obj):
        ano = obj['ano']
        valor_total = LicitacaoValoresMensal.objects.filter(ano=ano).aggregate(Sum('valor_total'))['valor_total__sum']
        return valor_total if valor_total is not None else 0

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['valor_total'] = self.get_valor_total(instance)
        return representation