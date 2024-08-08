from django.db import models

class Orgao(models.Model):
    nome = models.CharField(max_length=255)
    id = models.AutoField(primary_key=True)

    def __str__(self):
        return f'{self.nome} - {self.id}'

class Licitacao(models.Model):
    titulo = models.CharField(max_length=255, blank=True, null=True)
    objeto = models.TextField()
    numero_processo = models.CharField(max_length=255, blank=True, null=True)
    edicao = models.CharField(max_length=100,blank=True, null=True)
    secao_pagina = models.CharField(max_length=255, blank=True, null=True)
    link = models.CharField(max_length=200, blank=True, null=True)
    data = models.CharField(blank=True, max_length=12)
    id = models.AutoField(primary_key=True)
    tipo = models.CharField(max_length=255)
    numero_licitacao = models.CharField(max_length=255, blank=True, null=True)
    assinante = models.CharField(max_length=255, blank=True, null=True)
    cargo = models.CharField(max_length=255, blank=True, null=True)
    idorgao = models.ForeignKey(Orgao, on_delete=models.CASCADE)

    def __str__(self):
        return self.titulo + '\n' + self.objeto

class Valores(models.Model):
    id = models.AutoField(primary_key=True)
    valor = models.FloatField()
    idlicitacao = models.ForeignKey(Licitacao, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.id} - {self.valor}"
    
class LicitacaoQuantidade(models.Model):
    ano = models.IntegerField()
    mes = models.IntegerField()
    total_licitacoes = models.IntegerField()
    def __str__(self):
        return f"{self.ano}-{self.mes}: {self.total_licitacoes} licitações"

class LicitacaoValoresMensal(models.Model):
    ano = models.IntegerField()
    mes = models.IntegerField()
    valor_total = models.FloatField()
    def __str__(self):
        return f"{self.ano}-{self.mes}: {self.total_licitacoes} reais"