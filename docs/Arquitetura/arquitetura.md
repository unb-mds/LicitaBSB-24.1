# Documenta��o de Arquitetura - LicitaBSB

## Introdu��o

O projeto LicitaBSB tem como objetivo coletar licita��es do site "Di�rio Oficial da Uni�o" relacionadas a Bras�lia e organiz�-las em um feed de rede social. Os usu�rios poder�o realizar buscas avan�adas para encontrar licita��es espec�ficas de seu interesse.

### Diagrama de Arquitetura

![Diagrama de Arquitetura](Diagrama2.png)

## Camadas

1. **Model**: Respons�vel pela l�gica do projeto e pelo gerenciamento dos dados da aplica��o. Atua como um intermedi�rio para manipular dados entre o banco de dados e a Visualiza��o. Em sua intera��o com o banco de dados, permite a cria��o, leitura, atualiza��o e exclus�o de informa��es, garantindo a integridade e consist�ncia dos dados.

2. **View**: Respons�vel por lidar com a l�gica de apresenta��o e a resposta aos usu�rios. Formata os dados recebidos do banco de dados por meio do Modelo para exibi��o e seleciona os templates apropriados para renderizar a resposta. Funciona como a intermedi�ria da arquitetura, controlando o fluxo entre a l�gica do projeto e a interface do usu�rio.

3. **Template**: Respons�vel pela apresenta��o final dos dados ao usu�rio. Armazena os arquivos HTML, CSS e Bootstrap estendidos, e define a estrutura e o layout da interface do usu�rio. Assim, os templates s�o usados para renderizar o conte�do visual de maneira consistente e estilizada.

#### Fluxo de Trabalho
- **Entrada de dados:** Os dados s�o obtidos de fontes especificadas, como arquivos ou APIs.
- **Processamento e An�lise:** Os dados s�o processados e analisados em tempo real, utilizando bibliotecas para manipula��o de dados.
- **Visualiza��o:** Os resultados s�o apresentados de maneira intuitiva por meio de gr�ficos, tabelas e outras visualiza��es interativas.

## Tecnologias Escolhidas

- **Front-end:** HTML, CSS e JavaScript.
- **Back-end:** Python.
- **Banco de Dados:** JSON no pr�prio GitHub.
- **Framework Web:** [React](https://react.dev/)
- **Ferramenta de Coleta de Dados:** Framework [BeautifulSoup4](https://beautiful-soup-4.readthedocs.io/en/latest/) e [Requests](https://pypi.org/project/requests/).

## Estrutura do Backend

O backend est� dividido em tr�s pastas: **Data_analysis**, **data_collection_avisos** e **data_collection_extrato**.

- **Data_analysis:**
  - `licitacoes`: Pasta contendo as licita��es do site [Portal da Transpar�ncia](https://portaldatransparencia.gov.br/download-de-dados/licitacoes).
  - `main.py`: Utiliza as bibliotecas [os](https://docs.python.org/3/library/os.html), [csv](https://docs.python.org/3/library/csv.html) e [json](https://docs.python.org/3/library/json.html) para iterar sobre os arquivos contidos na pasta `licitacoes`, extraindo os dados de licita��es de Bras�lia e armazenando-os no arquivo `output.json`.
  - `output.json`: Base de dados das licita��es do projeto, gerada pela fun��o `main.py`.

- **Data_collection_avisos:** 
  - `database/data.json`: Base de dados completa pela jun��o da base de dados gerada pelo `Data_analysis` e a `main.py`.
  - `function.py`: Utiliza as bibliotecas [os](https://docs.python.org/3/library/os.html), [requests](https://pypi.org/project/requests/), [re](https://docs.python.org/3/library/re.html), [datetime](https://docs.python.org/3/library/datetime.html), [bs4](https://pypi.org/project/beautifulsoup4/), [json](https://docs.python.org/3/library/json.html) e [urllib3](https://pypi.org/project/urllib3/) para auxiliar nas opera��es feitas em `main.py`.
  - `main.py`: Utiliza as bibliotecas [sys](https://docs.python.org/3/library/sys.html) e [datetime](https://docs.python.org/3/library/datetime.html) para realizar a extra��o de avisos de licita��es a partir de um intervalo de datas fornecido pelo usu�rio ou do dia anterior � execu��o.

- **Data_collection_extrato:** Possui a mesma fun��o da `main.py` da pasta `data_collection_avisos`, por�m direcionada � extra��o apenas de extratos.

A pasta `Data_analysis` foi utilizada para fazer a extra��o inicial dos dados para nosso banco de dados, enquanto as pastas `data_collection_avisos` e `data_collection_extrato` servem para tirar semanalmente as licita��es novas. O m�todo usado em `Data_analysis`, embora completo, s� consegue pegar os dados fornecidos pelo Portal da Transpar�ncia, que demoram um m�s ou mais para estarem prontos.

## Fluxo de Raspagem 

1. **Obter Data de Raspagem:**

   *Op��es:*
   - Data atual (se nenhum argumento for fornecido no script `main.py`).
   - Intervalo de datas espec�fico (informado atrav�s de argumentos no script).

   *Valida��o:*
   - A data inicial n�o pode ser anterior a 05/02/2018.
   - A data final n�o pode ser posterior � data atual.

2. **Iterar por Dias:**

   Para cada dia no intervalo:

   - **Capturar Link do DOU:**
     - Utilizar a fun��o `link_jornal_diario` para obter o link da p�gina do DOU para o dia espec�fico.

   - **Extrair URLs de T�tulos:**
     - Utilizar a fun��o `extrair_url_titles` para extrair as URLs dos t�tulos dos avisos de licita��o a partir da p�gina do DOU.

   - **Extrair Avisos de Licita��o:**
     - Utilizar a fun��o `extraindo_avisos_licitacao` para filtrar as URLs dos t�tulos e identificar apenas os avisos de licita��o.

   - **Criar JSON com Avisos:**
     - Processar cada aviso de licita��o:
       - Extrair informa��es como tipo, n�mero, �rg�o, objeto, data de abertura, valores e outras.
       - Salvar as informa��es em um arquivo JSON.
     - Utilizar a fun��o `criandojsoncomavisos` para realizar o processo completo.

   - **Filtrar por Bras�lia:**
     - Utilizar a fun��o `filtrando_os_avisos_de_brasilia` para garantir que apenas os avisos relacionados a Bras�lia sejam inclu�dos no arquivo JSON final.

3. **Armazenar em JSON:**

   - Salvar o arquivo JSON com as informa��es dos avisos de licita��o no diretorio `database`.

## Hist�rico de Vers�es

| Data       | Vers�o | Descri��o                               | Autores         |
|------------|--------|-----------------------------------------|-----------------|
| 2024-04-12 | 1.0    | Vers�o inicial da documenta��o          | Marcelo Adrian  |
| 2024-07-01 | 1.1    | Modifica��es segundo requisi��es        | Marcelo Adrian  |
| 2024-07-08 | 1.2    | Explica��es estruturais                 | Marcelo Adrian  |