# Bot de Licitações para Twitter

Este projeto desenvolve um bot para a plataforma X (antigo Twitter) responsável por publicar automaticamente as licitações do Diário Oficial do Distrito Federal (DODF) e do Diário Oficial da União (DOU) referentes a Brasília. O bot integra-se ao sistema existente de coleta de dados, formata e publica as informações de maneira clara e acessível.

## Objetivo

Automatizar a publicação de licitações do DODF e do DOU no Twitter [@LicitaBSB](https://twitter.com/LicitaBSB), facilitando o acesso a essas informações para a população de Brasília.

## Funcionalidades

- Autenticação automática na API do Twitter.
- Integração com o sistema de coleta de dados existente.
- Formatação de dados para postagens legíveis.
- Publicação automática das licitações.
- Testes com dados simulados.

## Requisitos

- Conta no Twitter configurada para o bot.
- API do Twitter configurada (chaves e tokens).
- Sistema de coleta de dados atualizado.

## Tecnologias Utilizadas

- Python
- Tweepy (biblioteca para interação com a API do Twitter)
- Requests (para encurtamento de URLs)
- dotenv (para gerenciamento de variáveis de ambiente)
- json (para manipulação de dados)
- time, datetime, traceback (para manipulação de tempo e tratamento de exceções)

## Configuração

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/unb-mds/LicitaBSB-24.1.git
   cd LicitaBSB-24.1
   ```

2. **Instale as dependências:**
   As dependências necessárias estão listadas no arquivo `requirements.txt` no diretório raiz do projeto. Para instalar, execute:
   ```bash
   pip install -r requirements.txt
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
   Garanta que os arquivos no banco de dados estejam atualizados com as licitações mais recentes.

## Uso

1. **Execute o script principal:**
   ```bash
   python backend/twitter_bot/auto.py
   ```

2. **O bot irá publicar as licitações no Twitter:**
   - As licitações são formatadas e postadas automaticamente.
   - Caso não haja licitações no dia, o bot publicará uma mensagem informando.

## Exemplo de Postagem

```plaintext
[Título da Licitação]
Mais detalhes: [URL Encurtada]

[Descrição da Licitação]
```

## Testes do bot

Para testar o bot, utilizamos a biblioteca `unittest` do Python. Siga o passo a passo abaixo para executar os testes:

1. **Navegue até o diretório raiz do projeto:**
   ```bash
   cd LicitaBSB-24.1
   ```

2. **Execute o script de teste:**
   ```bash
   python -m unittest /backend/twitter/test.py
   ```

   Isso irá executar todos os testes presentes no diretório `tests` que começam com o prefixo `test_`.

3. **Verifique os resultados dos testes:**
   Após a execução dos testes, você verá os resultados no terminal. Os testes irão verificar se as funcionalidades do bot estão funcionando corretamente e se os dados estão sendo formatados e publicados adequadamente.

Certifique-se de que todas as asserções nos testes passaram sem erros. Caso algum teste falhe, verifique o motivo do erro e faça as correções necessárias no código.