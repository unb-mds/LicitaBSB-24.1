## Descrição do funcionamento dos workflows
Estes são os scripts de automações para contínua integração do nosso projeto. Ele utiliza o GitHub Actions para automatizar a execução de um script Python que coleta extratos e avisos de licitações, e também outro script que posta no Twitter (X) as atualizações.

### Estrutura dos Workflows
O workflow é definido por um arquivo YAML e contém as seguintes seções principais:

``on``
Define os gatilhos que iniciam o workflow:

``workflow_dispatch:`` Permite a execução manual do workflow.

``schedule:`` Define um cronograma para a execução automática do workflow. No caso, ele está configurado para rodar diariamente aos meio dia.
```
on:
  workflow_dispatch:
  schedule:
    - cron: '00 15 * * *'  
```
``cron``: configura o intervalo de tempo no qual o workflow será executado no seguinte formato:
![image](https://github.com/unb-mds/LicitaBSB-24.1/assets/120137721/b8ce6db2-6bb8-4c0b-a3c8-1a4a82ce9d5a)
``*`` any value

``jobs``
Define os trabalhos a serem executados no workflow. Neste caso, há um único trabalho chamado run-python.

``run-python``
Este trabalho roda em uma máquina virtual Ubuntu (ubuntu-latest) e executa uma série de etapas:

```
jobs:
  run-python:
    runs-on: ubuntu-latest

    steps:
```
1. Checkout do Repositório

Esta etapa utiliza a ação actions/checkout@v2 para fazer o checkout do repositório.

```
    - name: Checkout repository
      uses: actions/checkout@v2
```
2. Configuração do Python
   
Esta etapa configura a versão do Python a ser utilizada (3.10.12) utilizando a ação actions/setup-python@v2.
```
    - name: Setup Python
      uses: actions/setup-python@v2
      with:
        python-version: 3.10.12
```
3. Instalação de Dependências
   
Esta etapa instala as dependências necessárias para o script Python, que estão incluidos no diretório ```backend/requirements.txt```

```
    - name: Install dependencies
      run: |
        python3 -m pip install --upgrade pip
        pip install -r backend/requirements.txt
```
4. Execução do Script Python
   
Esta etapa executa o script Python, neste exemplo, será responsável por coletar os dados de licitações.

```
    - name: Run colecao de dados avisos script
      run: |
        echo "Running data_collection_avisos script..."
        python backend/colecao_de_dados/main.py avisos
        echo "Finalizado a colecao dos dados de avisos."
```
5. Commit e Push da Data Atualizada
   
Esta etapa configura o Git, faz o pull das últimas mudanças, adiciona os arquivos modificados, realiza um commit com a mensagem "[CI] Licitações extraídas com sucesso!" e faz o push das alterações para o repositório.

```
    - name: Commit and push updated last date
      run: |
        git config --global user.name "Github Actions"
        git config --global user.email "actions@users.noreply.github.com"
        git pull origin main
        git add --all
        git commit -m "[CI] Licitações extraídas com sucesso!"
        git push
```
Este workflow permite a automação de qualquer script python, garantindo que sejam sempre atualizados sem a necessidade de intervenção manual.
