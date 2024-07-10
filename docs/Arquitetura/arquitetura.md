# Documentação de Arquitetura - LicitaBSB

## Introdução

O projeto LicitaBSB tem como objetivo coletar licitações do site "Diário Oficial da União" relacionadas a Brasília e organizá-las em um feed de rede social. Os usuários poderão realizar buscas avançadas para encontrar licitações específicas de seu interesse.

### Diagrama de Arquitetura

![Diagrama de Arquitetura](Diagrama2.png)

## Camadas

1. **Model**: Esta parte será responsável pela lógica do projeto e pelo gerenciamento dos dados da aplicação. Ela atua como um intermediário para manipular dados entre o banco de dados e a Visualização. Em sua interação com o banco de dados, permite a criação, leitura, atualização e exclusão de informações, garantindo a integridade e consistência dos dados.

2. **View**: Será responsável por lidar com a lógica de apresentação e a resposta aos usuários. Seu papel é formatar os dados recebidos do banco de dados por meio do Modelo para exibição e selecionar os templates apropriados para renderizar a resposta. Ela funcionará como a intermediária da arquitetura, controlando o fluxo entre a lógica do projeto e a interface do usuário.

3. **Template**: Responsável pela apresentação final dos dados ao usuário. Ela armazena os arquivos HTML, CSS e Bootstrap estendidos, e define a estrutura e o layout da interface do usuário. Assim, os templates serão usados para renderizar o conteúdo visual de maneira consistente e estilizada.

#### Fluxo de Trabalho:
- **Entrada de dados:** Os dados são obtidos de fontes especificadas, como arquivos ou APIs.
- **Processamento e Análise:** Os dados são processados e analisados em tempo real, utilizando bibliotecas para manipulação de dados.
- **Visualização:** Os resultados são apresentados de maneira intuitiva por meio de gráficos, tabelas e outras visualizações interativas.

## Tecnologias Escolhidas

- A nossa aplicação utiliza HTML, CSS e JavaScript para o front-end, Python no back-end e o banco de dados é utilizado apenas arquivos salvos em JSON.

- **Linguagem de Programação:** [Python](https://docs.python.org/3/) e [Javascript](https://www.javascript.com/)
- **Framework Web:** [React](https://react.dev/)
- **Banco de Dados:** JSON no próprio GitHub
- **Ferramenta de Coleta de Dados:** Framework [BeautifulSoup4](https://beautiful-soup-4.readthedocs.io/en/latest/) e [Requests](https://pypi.org/project/requests/)

## Estrutura do Backend

O backend está dividido em três pastas: **Data_analysis**, **data_collection_avisos** e **data_collection_extrato**.

- **Data_analysis:**
  - `licitacoes`: Pasta contendo as licitações do site [Portal da Transparência](https://portaldatransparencia.gov.br/download-de-dados/licitacoes).
  - `main.py`: Através das bibliotecas [OS](https://docs.python.org/3/library/os.html), [CSV](https://docs.python.org/3/library/csv.html) e [JSON](https://docs.python.org/3/library/json.html) faz iterações sobre os arquivos contidos na pasta `licitacoes` retirando os dados de licitações de Brasilia os armazenado na arquivo `output.json`.
  - `output.json`: Base de dados das licitações do projeto feitas pela função `main.py`.
  
- **Data_collection_avisos:** 
    - `database/data.json`:
    - `function.py`:
    - `main.py`:

- **Data_collection_extrato:** Possui a mesma função da `main.py` da pasta `data_collection_avisos`, porém direcionada à extração apenas de extratos.

A pasta `Data_analysis` foi utilizada para fazer a extração inicial dos dados para nosso banco de dados, enquanto as pastas `data_collection_avisos` e `data_collection_extrato` servem para tirar semanalmente as licitações novas. O método usado em `Data_analysis`, embora completo, só consegue pegar os dados fornecidos pelo Portal da Transparência, que demoram um mês ou mais para estarem prontos.

## Histórico de Versões

| Data       | Versão | Descrição                               | Autores      |
|------------|--------|-----------------------------------------|--------------|
| 2024-04-12 | 1.0    | Versão inicial da documentação           | Marcelo Adrian |
| 2024-07-01 | 1.1    | Modificações segundo requisições         | Marcelo Adrian |
| 2024-07-08 | 1.2    | Explicações estruturais         | Marcelo Adrian |
