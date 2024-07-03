# Documentação de Arquitetura - LicitaBSB

## Introdução

O projeto LicitaBSB tem como objetivo coletar licitações do site "Meu Querido Diário" relacionadas a Brasília e organizá-las em um feed de rede social. Os usuários poderão realizar buscas avançadas para encontrar licitações específicas de seu interesse.

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
- **Framework Web:** [React](https://react.dev/).
- **Banco de Dados:** Json no proprio Github.
- **Ferramenta de Coleta de Dados:** Framework [BeatifulSoup4](https://beautiful-soup-4.readthedocs.io/en/latest/) e [Request](https://pypi.org/project/requests/).

## Histórico de Versões

| Data       | Versão | Descrição                               | Autores      |
|------------|--------|-----------------------------------------|--------------|
| 2024-04-12 | 1.0    | Versão inicial da documentação           | Marcelo Adrian |
| 2024-07-01 | 1.1    | Modificações segundo requisições           | Marcelo Adrian |
