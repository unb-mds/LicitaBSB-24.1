
# Scraper de Licitações do Diário Oficial da União (DOU)

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


## Instruções de Teste
Para executar os testes, utilize o comando:
```bash
python3 -m pytest teste_functions.py
```
Isso irá executar todos os testes definidos no arquivo `teste_functions.py` e fornecer um relatório detalhado dos resultados.

#### Considerações Finais
Esses testes visam aumentar a cobertura de testes e garantir que as funções no módulo `functions.py` funcionem corretamente sob diferentes condições. Por favor, revise os testes adicionados e informe caso haja alguma sugestão ou modificação necessária.

Obrigado!
