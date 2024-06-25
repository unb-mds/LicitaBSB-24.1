# Licita BSB

## O que nós somos

Licita BSB é um projeto de divulgação das dispensas de licitação realizadas em Brasília. Através do nosso portal, as dispensas de licitação mais recentes publicadas nos diários oficiais serão divulgadas de maneira acessível e compreensível para o público em geral.

Visando ampliar a divulgação desse material, Licita BSB também possui um bot na rede social X (antigo Twitter), onde serão compartilhadas as dispensas de licitação mais recentes, de modo a alcançar um público ainda maior e manter a população de Brasília informada sobre as decisões governamentais.

> Esse projeto será realizado durante a disciplica de Métodos de Desenvolvimento de Software da Universida de Brasília, no primeiro semestre de 2024.

## Tecnologias utilizadas

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)

## Como executar o projeto
### Backend:

### Tutorial: Como Executar o Scrapy

#### Scraper de Licitações do Diário Oficial da União (DOU)

Este projeto contém scripts para extrair informações sobre avisos de licitação do Diário Oficial da União (DOU), especificamente focando em licitações relacionadas a Brasília. O script principal (`main.py`) permite executar o scraping em diferentes modos: para um intervalo de datas específico, a partir de uma data inicial até a data atual, ou desde 02/01/2013 até a data atual.

## Estrutura do Projeto

- `main.py`: Script principal para execução via terminal.
- `functions.py`: Contém todas as funções auxiliares utilizadas pelo script principal.
- `data.json`: Arquivo JSON onde os dados extraídos são armazenados.

## Requisitos

- Python 3.6 ou superior
- Bibliotecas Python: `requests`, `beautifulsoup4`, `urllib3`

Você pode instalar as bibliotecas necessárias utilizando:
```sh
pip install requests beautifulsoup4 urllib3
```

## Uso

### Executando o Script

Você pode executar o script `main.py` de três maneiras diferentes:

1. **Processar desde 02/01/2013 até a data atual:**
    ```sh
    python3 main.py
    ```

2. **Processar desde uma data inicial até a data atual:**
    ```sh
    python3 main.py <dia-inicial>/<mes-inicial>/<ano-inicial>
    ```

    Exemplo:
    ```sh
    python3 main.py 01/01/2020
    ```

3. **Processar um intervalo específico de datas:**
    ```sh
    python3 main.py <dia-inicial>/<mes-inicial>/<ano-inicial> <dia-final>/<mes-final>/<ano-final>
    ```

    Exemplo:
    ```sh
    python3 main.py 01/01/2020 31/12/2020
    ```

### Formato de Data

As datas devem ser fornecidas no formato `dd/mm/aaaa`.

### Restrições de Data

- A data inicial não pode ser anterior a 02/01/2013.
- A data final não pode ser posterior à data atual.

### Arquivo JSON de Saída

Os dados extraídos são armazenados no arquivo `data.json` no diretório atual. O script adiciona novos dados ao arquivo existente, se houver.

## Funcionalidades

1. **Criar Sessão com Retries:**
   - Configura uma sessão HTTP com tentativas automáticas de reenvio em caso de falhas.

2. **Capturar Link do Jornal Diário:**
   - Gera o link para a edição do DOU de uma data específica.

3. **Extrair URLs de Títulos:**
   - Obtém as URLs de todas as publicações do DOU para uma data específica.

4. **Extrair Avisos de Licitação:**
   - Filtra as URLs para encontrar apenas avisos de licitação.

5. **Filtrar Avisos de Brasília:**
   - Verifica se os avisos de licitação são referentes a Brasília.

6. **Extrair Informações dos Avisos:**
   - Extrai detalhes dos avisos de licitação, como tipo, número, órgão responsável, objeto, assinante, data de publicação, etc.

7. **Criar JSON com Avisos:**
   - Cria um arquivo JSON com todas as informações extraídas dos avisos de licitação referentes a Brasília.

## Exemplo de Execução

```sh
python3 main.py 01/01/2020 31/12/2020
```

Isso processará todos os avisos de licitação do DOU para o intervalo de 01/01/2020 a 31/12/2020 e armazenará as informações em `data.json`.

### Frontend:

**1. Instalando dependências**

Certifique-se de ter a [versão mais recente do NodeJS](https://nodejs.org/en/download) instalada.

Navegue até o diretório `web` e execute o seguinte comando:
```
npm install
```

**2. Executando o React**

Para rodar o projeto, dentro do diretório /web, execute o comando:
```
npm run dev
```

O site estará disponível por padrão na porta 5432 em http://localhost:5432/ (ou http://127.0.0.1:5432/)


## Documentação do projeto


- Documentação: https://unb-mds.github.io/2024-1-Squad-03/
- Nosso quadro do Miro: https://miro.com/app/board/uXjVKcAWUlc=/?share_link_id=295633820307
- Figma da equipe: https://www.figma.com/file/vdfnVL6qkyUAPGeYfCCqol/Licita?type=design&node-id=0-1&mode=design&t=ZOaqmrSccc577Pog-0

## 🧑‍💻👩‍💻 Desenvolvedores

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
