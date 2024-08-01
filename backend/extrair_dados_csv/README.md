# Análise de Licitações em Brasília

Este script Python realiza a análise de licitações de arquivos CSV específicos, filtrando e salvando os dados relevantes em um arquivo JSON.

## Estrutura do Projeto

- `extrair_dados_csv.py`: Script principal para execução.
- `licitacoes_csv/`: Pasta onde os arquivos CSV de licitações devem ser colocados.
- `dados_csv.json`: Arquivo JSON onde os dados filtrados são armazenados.

## Requisitos

- Python 3.6 ou superior

## Uso

**Execução do script**
Para executar o script e processar os arquivos CSV na pasta `licitacoes_csv/`, utilize o seguinte comando:

```sh
python extrair_dados_csv.py
```

**Observações:**

- Por motivos de armazenamento não foram baixadas todas as licitações possiveis.
- Certifique-se de baixar as licitações desejadas do [Portal da transparencia](https://portaldatransparencia.gov.br/download-de-dados/licitacoes).
- Separe apenas o CSV referente a licitações Ex: 202301_Licitação.csv
