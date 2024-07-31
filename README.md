## Sumário

- [Sobre o Projeto](#Sobre-o-Projeto)
- [Como Executar o Projeto](#Como-Executar-o-Projeto)
  - [Pré-requisitos](#Pré-requisitos)
  - [Backend](#Backend)
    1. [Execucao-Back](#Execução-Back)
    2. [Endpoints](#Endpoints)
    3. [Bot de Licitações no X](#Bot-de-Licitações-no-X)
  - [Frontend](#Frontend)
  - [Observações](#Observações)
- [Documentação](#Documentação)
- [Equipe](#Equipe)

## Sobre o Projeto

Licita BSB é um projeto de divulgação das dispensas de licitação realizadas em Brasília. Através do nosso portal, as dispensas de licitação mais recentes publicadas nos diários oficiais serão divulgadas de maneira acessível e compreensível para o público em geral.

Visando ampliar a divulgação desse material, Licita BSB também possui um bot na rede social X (antigo Twitter), onde serão compartilhadas as dispensas de licitação mais recentes, de modo a alcançar um público ainda maior e manter a população de Brasília informada sobre as decisões governamentais.

Acesse o nosso bot no [X (antigo twitter)](https://x.com/LicitaBSB) para acompanhar licitações do DOU de forma diária.

> Esse projeto será realizado durante a disciplina de Métodos de Desenvolvimento de Software da Universidade de Brasília, no primeiro semestre de 2024.

## Como Executar o Projeto

### Pré-requisitos

- [NodeJS v20 ou superior](https://nodejs.org/en/download) instalada.
- [Python 3.12.3](https://www.python.org/downloads/) instalada.

Clone o repositório do projeto com o seguinte comando:

```bash
git clone https://github.com/unb-mds/LicitaBSB-24.1.git
```
### Backend

#### Execução Back
Navegue até o diretório `backend/` e execute o seguinte comando:

Linux
```bash
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```
Windows
```bash
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
```
Para rodar o projeto, navegue ao diretorio `backend/server`, e execute o comando:

```bash
python manage.py runserver
```

Com isso a API REST estará sendo executada no seu backend na porta http://127.0.0.1:8000/

#### Endpoints

##### Listar Órgãos

- **Método:** `GET`
- **URL:** `app/orgaos`
- **Descrição:** Retorna uma lista de todos os órgãos.
- **Exemplo:**
    ```bash
    curl -X GET http://127.0.0.1:8000/app/orgaos
    ```

##### Listar Licitações

- **Método:** `GET`
- **URL:** `/app/licitacoes`
- **Descrição:** Retorna uma lista de licitações com suporte para paginação e filtros.
- **Parâmetros de Query (opcionais):**
  - `tipo`: Filtra as licitações pelo tipo (`aviso` ou `extrato`).
  - `data`: Filtra as licitações pela data (formato `dd-mm-aaaa`, será convertido para `dd/mm/aaaa`).
- **Exemplo:**
    ```bash
    curl -X GET "http://127.0.0.1:8000/app/licitacoes?tipo=aviso&data=01-07-2024"
    ```

##### Licitação por ID

- **Método:** `GET`
- **URL:** `app/licitacoes/<int:id>`
- **Descrição:** Retorna os detalhes de uma licitação específica pelo ID.
- **Exemplo:**
    ```bash
    curl -X GET http://127.0.0.1:8000/app/licitacoes/1
    ```
#### Bot de Licitações no X

Este projeto desenvolve um bot para a plataforma X (antigo Twitter) responsável por publicar automaticamente as licitações do Diário Oficial do Distrito Federal (DODF) e do Diário Oficial da União (DOU) referentes a Brasília. O bot integra-se ao sistema existente de coleta de dados, formata e publica as informações de maneira clara e acessível.

##### Objetivo

Automatizar a publicação de licitações do DODF e do DOU no Twitter [@LicitaBSB](https://twitter.com/LicitaBSB), facilitando o acesso a essas informações para a população de Brasília.

##### Funcionalidades

- Autenticação automática na API do Twitter.
- Integração com o sistema de coleta de dados existente.
- Formatação de dados para postagens legíveis.
- Publicação automática das licitações.
- Testes com dados simulados.

##### Requisitos

- Conta no Twitter configurada para o bot.
- API do Twitter configurada (chaves e tokens).
- Sistema de coleta de dados atualizado.

##### Tecnologias Utilizadas

- Python
- Django REST framework
- Tweepy (biblioteca para interação com a API do Twitter)
- Requests (para encurtamento de URLs)
- dotenv (para gerenciamento de variáveis de ambiente)
- json (para manipulação de dados)
- time, datetime, traceback (para manipulação de tempo e tratamento de exceções)

##### Configuração

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/unb-mds/LicitaBSB-24.1.git
   cd LicitaBSB-24.1
   ```

2. **Instale as dependências:**
   As dependências necessárias estão listadas no arquivo `requirements.txt` no diretório `backend`. Para instalar, execute:
   ```bash
   pip install -r backend/requirements.txt
   ```

3. **Configure as variáveis de ambiente:**
   Crie um arquivo `.env` na raiz do projeto com as seguintes chaves:
   ```env
   TWITTER_API_KEY=seu_api_key
   TWITTER_API_KEY_SECRET=seu_api_key_secret
   TWITTER_ACCESS_TOKEN=seu_access_token
   TWITTER_ACCESS_TOKEN_SECRET=seu_access_token_secret
   TWITTER_BEARER_TOKEN=seu_bearer_token
   ```

4. **Atualize o sistema de coleta de dados:**
   Garanta que os arquivos `data.json` estejam atualizados com as licitações mais recentes.

##### Uso

1. **Execute o script principal:**
   ```bash
   python backend/twitter_bot/bot.py
   ```

2. **O bot irá publicar as licitações no Twitter:**
   - As licitações são formatadas e postadas automaticamente.
   - Caso não haja licitações no dia, o bot publicará uma mensagem informando.

##### Exemplo de Postagem

```plaintext
[Título da Licitação]
Mais detalhes: [URL Encurtada]

[Descrição da Licitação]
```



### Frontend

Navegue até o diretório `web` e execute o seguinte comando:

```bash
npm install
```

Para rodar o projeto, dentro do diretório `/web`, execute o comando:

```bash
npm run dev
```

O site estará disponível por padrão na porta 5432 em http://localhost:5432/ (ou http://127.0.0.1:5432/)

### Observações

- A atualização do banco de dados é feita de forma automática no projeto por Cronjob.
- Caso deseje testar os componentes do backend [clique aqui](https://github.com/unb-mds/LicitaBSB-24.1/tree/main/backend) e depois clique no componente que deseja testar.

## Documentação

- [Documentação](https://unb-mds.github.io/LicitaBSB-24.1/)
- [Nosso quadro do Miro](https://miro.com/app/board/uXjVKcAWUlc=/?share_link_id=295633820307)
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
