---
hide:
  - navigation
  - toc
---
## Como Executar o Projeto

### Pré-requisitos

- [NodeJS v20 ou superior](https://nodejs.org/en/download)
- [Python 3.12.3](https://www.python.org/downloads/)

Clone o repositório do projeto:

```bash
git clone https://github.com/unb-mds/LicitaBSB-24.1.git
```

### Backend

#### Execução

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

#### Endpoints

Os endpoints da API REST se encontram no link https://bit.ly/licitabsb_api ou no caso de você está executando o programa em sua máquina ele se encontrará em http://localhost:8000/swagger/ 

#### Bot de Licitações no X

Este bot publica automaticamente as licitações do Diário Oficial do Distrito Federal (DODF) e do Diário Oficial da União (DOU) referentes a Brasília na conta [@LicitaBSB](https://x.com/LicitaBSB).

##### Funcionalidades

- Autenticação automática na API do Twitter.
- Integração com o sistema de coleta de dados.
- Formatação de dados para postagens legíveis.
- Publicação automática das licitações.
- Testes com dados simulados.

##### Configuração

1. Clone o repositório:

    ```bash
    git clone https://github.com/unb-mds/LicitaBSB-24.1.git
    cd LicitaBSB-24.1
    ```

2. Instale as dependências:

    ```bash
    pip install -r backend/requirements.txt
    ```

3. Configure as variáveis de ambiente criando um arquivo `.env` na raiz do projeto com as chaves da API do Twitter:

    ```env
    TWITTER_API_KEY=seu_api_key
    TWITTER_API_KEY_SECRET=seu_api_key_secret
    TWITTER_ACCESS_TOKEN=seu_access_token
    TWITTER_ACCESS_TOKEN_SECRET=seu_access_token_secret
    TWITTER_BEARER_TOKEN=seu_bearer_token
    ```

4. Atualize o sistema de coleta de dados para garantir que a database esteja atualizada.

##### Uso

1. Execute o script principal:

    ```bash
    python backend/twitter_bot/auto.py
    ```

2. O bot publicará as licitações no Twitter. Se não houver licitações no dia, o bot publicará uma mensagem informando.

### Frontend

1. Navegue até o diretório `web` e instale as dependências:

    ```bash
    npm install
    ```

2. Para rodar o projeto, execute:

    ```bash
    npm run dev
    ```

O site estará disponível em `http://localhost:5432/`.

### Observações

- A atualização do banco de dados é feita automaticamente por Cronjob.
- Para testar os componentes do backend, acesse o repositório e clique no componente desejado.
