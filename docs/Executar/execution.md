---
hide:
  - navigation
---

### Pré-requisitos

- [NodeJS v20 ou superior](https://nodejs.org/en/download)
- [Python 3.12.3](https://www.python.org/downloads/)

Clone o repositório do projeto:

```
git clone https://github.com/unb-mds/LicitaBSB-24.1.git
```

### Backend

#### Execução

1. Navegue até o diretório `backend/` e crie um ambiente virtual:

    **Linux**
    ```
    python -m venv venv
    source venv/bin/activate
    ```

    **Windows**
    ```
    python -m venv venv
    venv\Scripts\activate
    ```

2. Instale as dependências:

    ```
    pip install -r requirements.txt
    ```

3. Para rodar o projeto, navegue até o diretório `backend/server` e execute:

    ```
    python manage.py runserver
    ```

A API REST estará disponível em `http://127.0.0.1:8000/`.

#### Endpoints

Os endpoints da API REST se encontram no link https://bit.ly/licitabsb_api ou no caso de você está executando o programa em sua máquina ele se encontrará em http://localhost:8000/swagger/ 

#### Bot de Licitações no X

Este bot publica automaticamente as licitações do Diário Oficial do Distrito Federal (DODF) e do Diário Oficial da União (DOU) referentes a Brasília na conta [@LicitaBSB](https://x.com/LicitaBSB).

###### Testes do bot

Para testar o bot, utilizamos a biblioteca `unittest` do Python (ela é nativa, portanto, não é necessário nenhum pip). Siga o passo a passo abaixo para executar os testes:

1. **Navegue até o diretório raiz do projeto:**
   ```
   cd LicitaBSB-24.1
   ```

2. **Execute o script de teste:**
   ```
   python -m unittest /backend/twitter/test.py
   ```

   Isso irá executar todos os testes presentes no diretório `tests` que começam com o prefixo `test_`.

3. **Verifique os resultados dos testes:**
   Após a execução dos testes, você verá os resultados no terminal. Os testes irão verificar se as funcionalidades do bot estão funcionando corretamente e se os dados estão sendo formatados e publicados adequadamente.

Certifique-se de que todas as asserções nos testes passaram sem erros. Caso algum teste falhe, verifique o motivo do erro e faça as correções necessárias no código.

##### Funcionalidades

- Autenticação automática na API do Twitter.
- Integração com o sistema de coleta de dados.
- Formatação de dados para postagens legíveis.
- Publicação automática das licitações.
- Testes com dados simulados.


##### Configuração

1. Clone o repositório:

    ```
    git clone https://github.com/unb-mds/LicitaBSB-24.1.git
    cd LicitaBSB-24.1
    ```

2. Instale as dependências:

    ```
    pip install -r backend/requirements.txt
    ```

3. Configure as variáveis de ambiente criando um arquivo `.env` na raiz do projeto com as chaves da API do Twitter:

    
    ```TWITTER_API_KEY=seu_api_key  ```  
    ```TWITTER_API_KEY_SECRET=seu_api_key_secret ```  
    ```TWITTER_ACCESS_TOKEN=seu_access_token  ```  
    ```TWITTER_ACCESS_TOKEN_SECRET=seu_access_token_secret  ```  
    ```TWITTER_BEARER_TOKEN=seu_bearer_token```
    

4. Atualize o sistema de coleta de dados para garantir que a database esteja atualizada.

##### Uso

1. Execute o script principal:

    ```
    python backend/twitter_bot/auto.py
    ```

2. O bot publicará as licitações no Twitter. Se não houver licitações no dia, o bot publicará uma mensagem informando.

#### Testes

1. Testes Automatizados com Django

O Django oferece um framework robusto para criação e execução de testes automatizados. Abaixo estão as instruções de como rodar os testes.

2. Configuração Inicial

Certifique-se de que os pacotes de teste estão instalados. Se estiver utilizando um ambiente virtual, ative-o antes de instalar as dependências:
> Clone o repositório
 ```
    git clone https://github.com/unb-mds/LicitaBSB-24.1.git
    cd LicitaBSB-24.1
 ```
> Instale as dependências
```
python -m venv venv # Criação do ambiente virtual
source venv/bin/activate  # Ativação no Linux/MacOS
venv\Scripts\activate     # Ativação no Windows
pip install -r requirements.txt # Instalação das dependências
```

3. Estrutura dos Testes
   
Por convenção, os testes em Django são colocados em um arquivo tests.py dentro de cada aplicação, ou em uma pasta tests/ contendo múltiplos arquivos de teste.

4. Executando os Testes
   
Para rodar os testes, navegue até `backend/server` e utilize o comando:

```
python manage.py test
```

### Frontend

1. Navegue até o diretório `frontend` e instale as dependências:

    ```
    npm install
    ```

2. Para rodar o projeto, execute:

    ```
    npm run build
    npm run dev
    ```

O site estará disponível em `http://localhost:5432/`.

### Observações

- A atualização do banco de dados é feita automaticamente por Cronjob.
- Para testar os componentes do backend, acesse o repositório e clique no componente desejado.
