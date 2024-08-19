# Scraper de Licitações do Diário Oficial da União (DOU)

Este projeto contém scripts para extrair informações sobre avisos de licitação do Diário Oficial da União (DOU), especificamente focando em licitações relacionadas a Brasília. O script principal (`main.py`) permite executar o scraping em diferentes modos: para um intervalo de datas específico, a partir de uma data inicial até a data atual, ou desde 02/01/2013 até a data atual.

## Estrutura do Projeto

- `main.py`: Script principal para execução via terminal.
- `funcoes_coletoras.py`: Contém todas as funções auxiliares utilizadas pelo script principal.
- `backend/server/db.sqlite3/`: Pasta contendo o banco de dados SQLite onde os dados extraídos são armazenados.

## Requisitos

- Python 3.6 ou superior
- Bibliotecas Python: `requests`, `beautifulsoup4`, `urllib3`, `sqlite3`

Você pode instalar as bibliotecas necessárias utilizando:
```sh
pip install requests beautifulsoup4 urllib3 sqlite3
```
## Uso
### Executando o Script
Você pode executar o script main.py de três maneiras diferentes, sendo de extrema importância que o tipo seja especificado, sendo avisos ou extratos:

1. **Processar dados do dia anterior até a data atual:**

```sh
python3 main.py avisos # para procurar os avisos
```
```sh
python3 main.py extratos # para procurar os extratos
```
2. **Processar desde uma data inicial até a data atual:**
```sh
python3 main.py avisos <dia-inicial>/<mes-inicial>/<ano-inicial>
```
```sh
python3 main.py extratos <dia-inicial>/<mes-inicial>/<ano-inicial>
```
Exemplo:

```sh
python3 main.py avisos 01/01/2020
```
```sh
python3 main.py extratos 01/01/2020
```
4. **Processar um intervalo específico de datas:**

```sh
python3 main.py avisos <dia-inicial>/<mes-inicial>/<ano-inicial> <dia-final>/<mes-final>/<ano-final>
```
```sh
python3 main.py extratos <dia-inicial>/<mes-inicial>/<ano-inicial> <dia-final>/<mes-final>/<ano-final>
```
Exemplo:

```sh
python3 main.py avisos 01/01/2020 31/12/2020
```
```sh
python3 main.py extratos 01/01/2020 31/12/2020
```

### Formato de Data
As datas devem ser fornecidas no formato dd/mm/aaaa.

### Restrições de Data
- A data inicial não pode ser anterior a 02/01/2013.
- A data final não pode ser posterior à data atual.
  
### Banco de Dados SQLite
Os dados extraídos são armazenados em um banco de dados SQLite localizado na pasta ```backend/server/db.sqlite3/```. Novos dados são adicionados ao banco existente, se houver.

## Funcionalidades
1. **Criar Sessão com Retries:**
Configura uma sessão HTTP com tentativas automáticas de reenvio em caso de falhas.

2. **Capturar Link do Jornal Diário:**
Gera o link para a edição do DOU de uma data específica.

3. **Extrair URLs de Títulos:**
Obtém as URLs de todas as publicações do DOU para uma data específica.

4. **Extrair Avisos de Licitação:**
Filtra as URLs para encontrar apenas avisos de licitação.

5. **Filtrar Avisos de Brasília:**
Verifica se os avisos de licitação são referentes a Brasília.

6. **Extrair Informações dos Avisos:**
Extrai detalhes dos avisos de licitação, como tipo, número, órgão responsável, objeto, assinante, data de publicação, etc.

7. **Salvar Dados no SQLite:**
Armazena todas as informações extraídas no banco de dados SQLite referente a Brasília.

## Exemplo de Execução
```sh
python3 main.py 01/01/2020 31/12/2020
```
Isso processará todos os avisos de licitação do DOU para o intervalo de 01/01/2020 a 31/12/2020 e armazenará as informações no banco de dados SQLite.

## Instruções de Teste
Para executar os testes, utilize o comando:

```bash
python3 -m pytest testes.py
```
Isso irá executar todos os testes definidos no arquivo `testes.py` e fornecer um relatório detalhado dos resultados.

#### Considerações Finais
Esses testes visam aumentar a cobertura de testes e garantir que as funções no módulo ```funcoes_coletoras.py``` funcionem corretamente sob diferentes condições. Por favor, revise os testes adicionados e informe caso haja alguma sugestão ou modificação necessária.

Obrigado!