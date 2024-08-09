## Sumário

- [Sobre o Projeto](#sobre-o-projeto)
- [Como Executar o Projeto](#como-executar-o-projeto)
  - [Pré-requisitos](#pré-requisitos)
  - [Backend](#backend)
    - [Execução](#execução)
    - [Endpoints](https://licitabsbserer-a1c309841042.herokuapp.com/swagger/)
    - [Bot de Licitações no X](#bot-de-licitações-no-x)
  - [Frontend](#frontend)
  - [Observações](#observações)
- [Documentação](#documentação)
- [Equipe](#equipe)

## Sobre o Projeto

**Licita BSB** é um projeto que visa a divulgação das dispensas de licitação realizadas em Brasília. Através do nosso portal, as dispensas de licitação publicadas nos diários oficiais são disponibilizadas de maneira acessível ao público.

Acesse o nosso portal [aqui](https://fastidious-daffodil-724e94.netlify.app/) para explorar as licitações de forma simples e rápida.

Para aumentar a visibilidade dessas informações, o projeto também inclui um bot na rede social X (antigo Twitter) que compartilha as licitações mais recentes, mantendo a população informada sobre as decisões governamentais. 

Acesse o nosso bot no [X (antigo Twitter)](https://x.com/LicitaBSB) para acompanhar licitações do DOU diariamente.

> Este projeto faz parte da disciplina de Métodos de Desenvolvimento de Software da Universidade de Brasília, no primeiro semestre de 2024.

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

Os endpoints da API REST se encontram no link https://licitabsbserer-a1c309841042.herokuapp.com/swagger/ ou no caso de você está executando o programa em sua máquina ele se encontrará em http://localhost:8000/swagger/ 

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
    python backend/twitter_bot/bot.py
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

## Documentação

- [Documentação](https://unb-mds.github.io/LicitaBSB-24.1/)
- [Quadro do Miro](https://miro.com/app/board/uXjVKcAWUlc=/?share_link_id=295633820307)
- [Figma da equipe](https://www.figma.com/file/vdfnVL6qkyUAPGeYfCCqol/Licita?type=design&node-id=0-1&mode=design&t=ZOaqmrSccc577Pog-0)

## Equipe

<center>
<table style="margin-left: auto; margin-right: auto;">
    <tr>
        <td align="center">
            <a href="https://github.com/Marcelo-Adrian">
                <img style="border-radius: 50%;" src="https://github.com/Marcelo-Adrian.png" width="150px;"/>
                <h5 class="text-center">Marcelo<br>Adrian</h5>
            </a>
        </td>
        <td align="center">
            <a href="https://github.com/MariaCHelena">
                <img style="border-radius: 50%;" src="https://github.com/MariaCHelena.png" width="150px;"/>
                <h5 class="text-center">Maria<br>Helena</h5>
            </a>
        </td>
        <td align="center">
            <a href="https://github.com/m4rllon">
                <img style="border-radius: 50%;" src="https://github.com/m4rllon.png" width="150px;"/>
                <h5 class="text-center">Marllon<br>Fausto</h5>
            </a>
        </td>
        <td align="center">
            <a href="https://github.com/nateejpg">
                <img style="border-radius: 50%;" src="https://github.com/nateejpg.png" width="150px;"/>
                <h5 class="text-center">Nathan<br>Abreu</h5>
            </a>
        </td>
        <td align="center">
            <a href="https://github.com/Otavio4283">
                <img style="border-radius: 50%;" src="https://github.com/Otavio4283.png" width="150px;"/>
                <h5 class="text-center">Otávio<br>Henrique</h5>
            </a>
        </td>
         <td align="center">
            <a href="https://github.com/thaleseuflauzino">
                <img style="border-radius: 50%;" src="https://github.com/thaleseuflauzino.png" width="150px;"/>
                <h5 class="text-center">Thales<br>Euflauzino</h5>
            </a>
        </td>
	<td align="center">
            <a href="https://github.com/moonshinerd">
                <img style="border-radius: 50%;" src="https://github.com/moonshinerd.png" width="150px;"/>
                <h5 class="text-center">Víctor<br>Schmidt</h5>
            </a>
        </td>
</table>
</center>
