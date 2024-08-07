# Generated by Django 5.0.7 on 2024-07-31 05:03

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Orgao',
            fields=[
                ('nome', models.CharField(max_length=255)),
                ('id', models.AutoField(primary_key=True, serialize=False)),
            ],
        ),
        migrations.CreateModel(
            name='Licitacao',
            fields=[
                ('titulo', models.CharField(blank=True, max_length=255, null=True)),
                ('objeto', models.TextField()),
                ('numero_processo', models.CharField(blank=True, max_length=255, null=True)),
                ('edicao', models.CharField(blank=True, max_length=100, null=True)),
                ('secao_pagina', models.CharField(blank=True, max_length=255, null=True)),
                ('link', models.CharField(blank=True, max_length=200, null=True)),
                ('data', models.CharField(blank=True, max_length=12)),
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('tipo', models.CharField(max_length=255)),
                ('numero_licitacao', models.CharField(blank=True, max_length=255, null=True)),
                ('assinante', models.CharField(blank=True, max_length=255, null=True)),
                ('cargo', models.CharField(blank=True, max_length=255, null=True)),
                ('idorgao', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='app.orgao')),
            ],
        ),
        migrations.CreateModel(
            name='Valores',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('valor', models.FloatField()),
                ('idlicitacao', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='app.licitacao')),
            ],
        ),
    ]
