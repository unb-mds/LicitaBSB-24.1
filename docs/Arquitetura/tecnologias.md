# Visão Geral do Projeto LicitaBSB

## Visão Geral do Projeto
O LicitaBSB é um projeto que tem como objetivo coletar licitações do site "Meu Querido Diário" relacionadas a Brasília e organizá-las em um feed de rede social. Os usuários terão a capacidade de realizar buscas avançadas para encontrar licitações específicas de seu interesse.

## Tecnologias Utilizadas

### Front-End:

- JavaScript: Será utilizado como linguagem principal para o desenvolvimento do front-end, proporcionando interatividade e dinamismo à interface do usuário.
- React: O React continuará sendo utilizado para o desenvolvimento do front-end devido à sua capacidade de criar interfaces de usuário interativas e responsivas.
- Tailwind CSS: Será adotado o framework Tailwind CSS para facilitar o design e a estilização dos componentes da interface do usuário, oferecendo uma abordagem baseada em utilitários.

### Chron Job:

- Python: Será utilizado para a criação do cron job para execução de tarefas automatizadas, como a coleta periódica de dados.
- Google Cloud ou AWS: A escolha entre Google Cloud ou AWS será feita para hospedar e implantar o cron job, considerando fatores como escalabilidade, facilidade de uso e custo.

### Web Scraping e Resgate de Documentos:

- Python: Continuará sendo utilizado para web scraping e resgate de documentos devido à sua eficácia e ampla variedade de bibliotecas disponíveis para essa finalidade.
- Biblioteca scrapy: Scrapy é um framework Python para web scraping, oferecendo uma abordagem de alto nível para extrair dados de sites de forma rápida e eficiente.
- Biblioteca pypdf2: pypdf2 é uma biblioteca Python para manipulação de arquivos PDF, permitindo a extração de texto e metadados de documentos PDF.

### Back-End:

- Node.js: Será adotado o Node.js como plataforma de desenvolvimento do back-end devido à sua eficiência no tratamento de requisições assíncronas e à compatibilidade com JavaScript, facilitando a comunicação entre o front-end e o back-end.

### Banco de Dados:

- MySQL (relacional): Será utilizado o MySQL como opção de banco de dados relacional devido à sua fácil integração com o framework Django, especialmente para casos em que a estruturação dos dados for mais adequada ou necessária.

## Considerações de Segurança

- Proteção contra Injeção de SQL: Medidas de segurança serão implementadas para proteger contra ataques de injeção de SQL e outras vulnerabilidades comuns de segurança da web.

## Considerações de Desempenho e Escalabilidade

- Otimização de Consultas: As consultas ao banco de dados serão otimizadas para garantir um desempenho eficiente, especialmente ao lidar com grandes volumes de dados.
- Escalabilidade Horizontal: A arquitetura da aplicação será projetada para permitir escalabilidade horizontal, facilitando a adição de recursos conforme necessário para lidar com um aumento no número de usuários e/ou de dados.

## Histórico de Versões

| Data       | Versão | Descrição                               | Autores      |
|------------|--------|-----------------------------------------|--------------|
| 2024-04-15 | 1.0    | Versão inicial da documentação           | Marcelo Adrian |
