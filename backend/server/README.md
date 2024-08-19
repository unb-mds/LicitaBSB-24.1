# LicitaBSB - Projeto Django

Este projeto é uma aplicação Django que fornece uma API REST para gerenciar e consultar informações sobre licitações em Brasília. Abaixo estão as instruções para configurar, executar, e testar o projeto.

## Execução

1. Navegue até o diretório `backend/` e crie um ambiente virtual:

    **Linux**
    ```bash
    python -m venv venv
    source venv/bin/activate
    ```

    **Windows**
    ```bash
    python -m venv venv
    venv\Scripts\activate
    ```

2. Instale as dependências:

    ```bash
    pip install -r requirements.txt
    ```

3. Para rodar o projeto, navegue até o diretório `backend/server` e execute:

    ```bash
    python manage.py runserver
    ```

A API REST estará disponível em `http://127.0.0.1:8000/`.

## Endpoints

Os endpoints da API REST podem ser encontrados em: 
- https://bit.ly/licitabsb_api 
Se você estiver executando o projeto localmente, a documentação estará disponível em:
- http://localhost:8000/swagger/ 

## Testes Automatizados

1. Introdução aos Testes com Django

O Django oferece um framework robusto para criação e execução de testes automatizados. Abaixo estão as instruções de como rodar os testes.

2. Configuração Inicial

Certifique-se de que os pacotes de teste estão instalados. Se estiver utilizando um ambiente virtual, ative-o antes de instalar as dependências:
> Clone o repositório
 ```bash
    git clone https://github.com/unb-mds/LicitaBSB-24.1.git
    cd LicitaBSB-24.1
 ```
> Instale as dependências
```bash
python -m venv venv # Criação do ambiente virtual
source venv/bin/activate  # Ativação no Linux/MacOS
venv\Scripts\activate     # Ativação no Windows
pip install -r requirements.txt # Instalação das dependências
```

3. Estrutura dos Testes
   
Os testes estão organizados por convenção dentro de cada aplicação Django:
- tests.py: Localizado dentro de cada aplicação.
- Pasta tests/: Opcionalmente, uma pasta tests/ pode conter múltiplos arquivos de teste para melhor organização.


1. Executando os Testes
   
Para rodar os testes, navegue até `backend/server` e utilize o comando:

```bash
python manage.py test
```
O Django irá automaticamente detectar e executar todos os testes definidos no projeto, fornecendo um relatório detalhado dos resultados.