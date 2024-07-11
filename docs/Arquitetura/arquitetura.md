# Documentação de Arquitetura - LicitaBSB

## Introdução

O projeto LicitaBSB tem como objetivo coletar licitações do site "Diário Oficial da União" relacionadas a Brasília e organizá-las em um feed de rede social. Os usuários poderão realizar buscas avançadas para encontrar licitações específicas de seu interesse.

### Diagrama de Arquitetura

![Diagrama de Arquitetura](Diagrama2.png)

## Camadas

1. **Model**: Responsável pela lógica do projeto e pelo gerenciamento dos dados da aplicação. Atua como um intermediário para manipular dados entre o banco de dados e a Visualização. Em sua interação com o banco de dados, permite a criação, leitura, atualização e exclusão de informações, garantindo a integridade e consistência dos dados.

2. **View**: Responsável por lidar com a lógica de apresentação e a resposta aos usuários. Formata os dados recebidos do banco de dados por meio do Modelo para exibição e seleciona os templates apropriados para renderizar a resposta. Funciona como a intermediária da arquitetura, controlando o fluxo entre a lógica do projeto e a interface do usuário.

3. **Template**: Responsável pela apresentação final dos dados ao usuário. Armazena os arquivos HTML, CSS e Bootstrap estendidos, e define a estrutura e o layout da interface do usuário. Assim, os templates são usados para renderizar o conteúdo visual de maneira consistente e estilizada.

#### Fluxo de Trabalho
- **Entrada de dados:** Os dados são obtidos de fontes especificadas, como arquivos ou APIs.
- **Processamento e Análise:** Os dados são processados e analisados em tempo real, utilizando bibliotecas para manipulação de dados.
- **Visualização:** Os resultados são apresentados de maneira intuitiva por meio de gráficos, tabelas e outras visualizações interativas.

## Tecnologias Escolhidas

- **Front-end:** HTML, CSS e JavaScript.
- **Back-end:** Python.
- **Banco de Dados:** JSON no próprio GitHub.
- **Framework Web:** [React](https://react.dev/)
- **Ferramenta de Coleta de Dados:** Framework [BeautifulSoup4](https://beautiful-soup-4.readthedocs.io/en/latest/) e [Requests](https://pypi.org/project/requests/).

## Estrutura do Backend

O backend está dividido em três pastas: **extra��o_dados_csv**, **data_collection_avisos** e **data_collection_extrato**.

- **extra��o_dados_csv:**
  - `licitacoes_csv`: Pasta contendo as licitações do site [Portal da Transparência](https://portaldatransparencia.gov.br/download-de-dados/licitacoes_csv).
  - `extrair_csv.py`: Utiliza as bibliotecas [os](https://docs.python.org/3/library/os.html), [csv](https://docs.python.org/3/library/csv.html) e [json](https://docs.python.org/3/library/json.html) para iterar sobre os arquivos contidos na pasta `licitacoes_csv`, extraindo os dados de licitações de Brasília e armazenando-os no arquivo `dados_csv.json`.
  - `dados_csv.json`: Base de dados das licitações do projeto, gerada pela função `extrair_csv.py`.

- **Data_collection_avisos:** 
  - `database/data.json`: Base de dados completa pela junção da base de dados gerada pelo `extra��o_dados_csv` e a `main.py`.
  - `function.py`: Utiliza as bibliotecas [os](https://docs.python.org/3/library/os.html), [requests](https://pypi.org/project/requests/), [re](https://docs.python.org/3/library/re.html), [datetime](https://docs.python.org/3/library/datetime.html), [bs4](https://pypi.org/project/beautifulsoup4/), [json](https://docs.python.org/3/library/json.html) e [urllib3](https://pypi.org/project/urllib3/) para auxiliar nas operações feitas em `main.py`.
  - `main.py`: Utiliza as bibliotecas [sys](https://docs.python.org/3/library/sys.html) e [datetime](https://docs.python.org/3/library/datetime.html) para realizar a extração de avisos de licitações a partir de um intervalo de datas fornecido pelo usuário ou do dia anterior à execução.

- **Data_collection_extrato:** Possui a mesma função da `main.py` da pasta `data_collection_avisos`, porém direcionada à extração apenas de extratos.

A pasta `extra��o_dados_csv` foi utilizada para fazer a extração inicial dos dados para nosso banco de dados, enquanto as pastas `data_collection_avisos` e `data_collection_extrato` servem para tirar semanalmente as licitações novas. O método usado em `extra��o_dados_csv`, embora completo, só consegue pegar os dados fornecidos pelo Portal da Transparência, que demoram um mês ou mais para estarem prontos.

## Fluxo de Raspagem 

1. **Obter Data de Raspagem:**

   *Opções:*
   - Data atual (se nenhum argumento for fornecido no script `main.py`).
   - Intervalo de datas específico (informado através de argumentos no script).

   *Validação:*
   - A data inicial não pode ser anterior a 05/02/2018.
   - A data final não pode ser posterior à data atual.

2. **Iterar por Dias:**

   Para cada dia no intervalo:

   - **Capturar Link do DOU:**
     - Utilizar a função `link_jornal_diario` para obter o link da página do DOU para o dia específico.

   - **Extrair URLs de Títulos:**
     - Utilizar a função `extrair_url_titles` para extrair as URLs dos títulos dos avisos de licitação a partir da página do DOU.

   - **Extrair Avisos de Licitação:**
     - Utilizar a função `extraindo_avisos_licitacao` para filtrar as URLs dos títulos e identificar apenas os avisos de licitação.

   - **Criar JSON com Avisos:**
     - Processar cada aviso de licitação:
       - Extrair informações como tipo, número, órgão, objeto, data de abertura, valores e outras.
       - Salvar as informações em um arquivo JSON.
     - Utilizar a função `criandojsoncomavisos` para realizar o processo completo.

   - **Filtrar por Brasília:**
     - Utilizar a função `filtrando_os_avisos_de_brasilia` para garantir que apenas os avisos relacionados a Brasília sejam incluídos no arquivo JSON final.

3. **Armazenar em JSON:**

   - Salvar o arquivo JSON com as informações dos avisos de licitação no diretorio `database`.

## Histórico de Versões

| Data       | Versão | Descrição                               | Autores         |
|------------|--------|-----------------------------------------|-----------------|
| 2024-04-12 | 1.0    | Versão inicial da documentação          | Marcelo Adrian  |
| 2024-07-01 | 1.1    | Modificações segundo requisições        | Marcelo Adrian  |
| 2024-07-08 | 1.2    | Explicações estruturais                 | Marcelo Adrian  |