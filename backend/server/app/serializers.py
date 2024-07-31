from rest_framework import serializers
from app.models import Orgao, Licitacao, Valores

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
        valores = Valores.objects.filter(idlicitacao=obj)  # Obtém todos os valores associados
        if valores.exists():
            serializer = ValoresSerializer(valores, many=True)  # Serializa a lista de valores
            return serializer.data
        return None  # Retorna None se não houver valores associados

