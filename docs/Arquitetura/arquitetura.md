# Documenta��o de Arquitetura - LicitaBSB

## Introdu��o

O projeto LicitaBSB tem como objetivo coletar licita��es do site "Di�rio Oficial da Uni�o" relacionadas a Bras�lia e organiz�-las em um feed de rede social. Os usu�rios poder�o realizar buscas avan�adas para encontrar licita��es espec�ficas de seu interesse.

### Diagrama de Arquitetura

![Diagrama de Arquitetura](Diagrama2.png)

## Camadas

1. **Model**: Esta parte ser� respons�vel pela l�gica do projeto e pelo gerenciamento dos dados da aplica��o. Ela atua como um intermedi�rio para manipular dados entre o banco de dados e a Visualiza��o. Em sua intera��o com o banco de dados, permite a cria��o, leitura, atualiza��o e exclus�o de informa��es, garantindo a integridade e consist�ncia dos dados.

2. **View**: Ser� respons�vel por lidar com a l�gica de apresenta��o e a resposta aos usu�rios. Seu papel � formatar os dados recebidos do banco de dados por meio do Modelo para exibi��o e selecionar os templates apropriados para renderizar a resposta. Ela funcionar� como a intermedi�ria da arquitetura, controlando o fluxo entre a l�gica do projeto e a interface do usu�rio.

3. **Template**: Respons�vel pela apresenta��o final dos dados ao usu�rio. Ela armazena os arquivos HTML, CSS e Bootstrap estendidos, e define a estrutura e o layout da interface do usu�rio. Assim, os templates ser�o usados para renderizar o conte�do visual de maneira consistente e estilizada.

#### Fluxo de Trabalho:
- **Entrada de dados:** Os dados s�o obtidos de fontes especificadas, como arquivos ou APIs.
- **Processamento e An�lise:** Os dados s�o processados e analisados em tempo real, utilizando bibliotecas para manipula��o de dados.
- **Visualiza��o:** Os resultados s�o apresentados de maneira intuitiva por meio de gr�ficos, tabelas e outras visualiza��es interativas.

## Tecnologias Escolhidas

- A nossa aplica��o utiliza HTML, CSS e JavaScript para o front-end, Python no back-end e o banco de dados � utilizado apenas arquivos salvos em JSON.

- **Linguagem de Programa��o:** [Python](https://docs.python.org/3/) e [Javascript](https://www.javascript.com/)
- **Framework Web:** [React](https://react.dev/)
- **Banco de Dados:** JSON no pr�prio GitHub
- **Ferramenta de Coleta de Dados:** Framework [BeautifulSoup4](https://beautiful-soup-4.readthedocs.io/en/latest/) e [Requests](https://pypi.org/project/requests/)

## Estrutura do Backend

O backend est� dividido em tr�s pastas: **Data_analysis**, **data_collection_avisos** e **data_collection_extrato**.

- **Data_analysis:**
  - `licitacoes`: Pasta contendo as licita��es do site [Portal da Transpar�ncia](https://portaldatransparencia.gov.br/download-de-dados/licitacoes).
  - `main.py`: Atrav�s das bibliotecas [OS](https://docs.python.org/3/library/os.html), [CSV](https://docs.python.org/3/library/csv.html) e [JSON](https://docs.python.org/3/library/json.html) faz itera��es sobre os arquivos contidos na pasta `licitacoes` retirando os dados de licita��es de Brasilia os armazenado na arquivo `output.json`.
  - `output.json`: Base de dados das licita��es do projeto feitas pela fun��o `main.py`.
  
- **Data_collection_avisos:** 
    - `database/data.json`:
    - `function.py`:
    - `main.py`:

- **Data_collection_extrato:** Possui a mesma fun��o da `main.py` da pasta `data_collection_avisos`, por�m direcionada � extra��o apenas de extratos.

A pasta `Data_analysis` foi utilizada para fazer a extra��o inicial dos dados para nosso banco de dados, enquanto as pastas `data_collection_avisos` e `data_collection_extrato` servem para tirar semanalmente as licita��es novas. O m�todo usado em `Data_analysis`, embora completo, s� consegue pegar os dados fornecidos pelo Portal da Transpar�ncia, que demoram um m�s ou mais para estarem prontos.

## Hist�rico de Vers�es

| Data       | Vers�o | Descri��o                               | Autores      |
|------------|--------|-----------------------------------------|--------------|
| 2024-04-12 | 1.0    | Vers�o inicial da documenta��o           | Marcelo Adrian |
| 2024-07-01 | 1.1    | Modifica��es segundo requisi��es         | Marcelo Adrian |
| 2024-07-08 | 1.2    | Explica��es estruturais         | Marcelo Adrian |
