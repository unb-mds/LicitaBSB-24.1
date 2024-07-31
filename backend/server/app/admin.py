from django.contrib import admin
from app.models import Licitacao, Orgao, Valores
import datetime
class ListandoLicitacoes(admin.ModelAdmin):
    list_display = ("titulo", "objeto", "link", "idorgao")
    list_filter = ("idorgao",)  # Adiciona um filtro para o campo 'idorgao'
    search_fields = ("titulo", "objeto")  # Adiciona uma barra de pesquisa para 'titulo' e 'objeto'
    ordering = ("-id",)  # Ordena por ID de forma decrescente
    list_per_page = 10
    # Opcional: Exibir campos editáveis diretamente na listagem

class ListandoOrgaos(admin.ModelAdmin):
    list_display = ("nome", "id")  # Substitua pelos campos reais do modelo Orgao
    search_fields = ("nome",)  # Adiciona pesquisa por nome
    ordering = ("nome",)  # Ordena por nome
    list_per_page = 10

class ListandoValores(admin.ModelAdmin):
    list_display = ("valor", "id", "idlicitacao")  # Substitua pelos campos reais do modelo Valores
    search_fields = ("descricao",)  # Adiciona pesquisa por descrição
    ordering = ("-valor",)  # Ordena por valor de forma decrescente
    list_per_page = 10

admin.site.register(Licitacao, ListandoLicitacoes)
admin.site.register(Orgao, ListandoOrgaos)
admin.site.register(Valores, ListandoValores)
