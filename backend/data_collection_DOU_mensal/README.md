
# Processador de Licitações DOU

Este projeto contém um script para processar licitações do Diário Oficial da União (DOU) a partir de arquivos XML baixados. O script pode ser executado com ou sem argumentos de linha de comando para especificar o intervalo de datas a ser processado.

## Funcionalidades

- Baixa e processa arquivos de licitações do DOU para um intervalo especificado de meses e anos.
- Se não forem fornecidos argumentos, processa licitações desde 2002 até o mês anterior ao mês atual.

## Requisitos

- Python 3.x
- Bibliotecas adicionais:
  - `argparse`
  - `datetime`
  - Suas funções customizadas em `functions.py` (presumivelmente contém as funções `datetime`, `processa_xml_licitacoes`, `processa_xml_obtem_brasilia`, `faz_download_do_zip`, e `captura_link_banco_de_dados_DOU_mes`)

## Uso

### Executando o Script

1. Clone o repositório:
    ```sh
    git clone https://github.com/seu-usuario/seu-repositorio.git
    cd seu-repositorio
    ```

2. Certifique-se de que todas as dependências estão instaladas.

3. Execute o script:

#### Sem Argumentos

Se você não fornecer argumentos, o script processará licitações desde 2002 até o mês anterior ao mês atual.

```sh
python3 main.py
```

#### Com Argumentos

Você pode especificar um intervalo de datas para processar licitações fornecendo os argumentos `<mes-inicial>/<ano-inicial>` e `<mes-final>/<ano-final>`.

```sh
python3 main.py <mes-inicial>/<ano-inicial> <mes-final>/<ano-final>
```

Exemplo:

```sh
python3 main.py 01/2020 12/2020
```

### Argumentos

- `<mes-inicial>/<ano-inicial>`: Mês e ano de início no formato `mm/aaaa`.
- `<mes-final>/<ano-final>`: Mês e ano de fim no formato `mm/aaaa`.

### Notas

- Certifique-se de que o mês inicial e final estejam no intervalo de 1 a 12.
- A data inicial deve ser anterior ou igual à data final.

### Estrutura do Projeto

- `main.py`: Script principal que processa as licitações.
- `functions.py`: Contém as funções auxiliares utilizadas pelo script principal.

### Exemplos

1. Processar licitações de janeiro de 2020 a dezembro de 2020:
    ```sh
    python3 main.py 01/2020 12/2020
    ```

2. Processar licitações de fevereiro de 2019 a junho de 2019:
    ```sh
    python3 main.py 02/2019 06/2019
    ```

## Autor

Victor Schmidt

## Licença

Este projeto está licenciado sob os termos da licença MIT.
```

Este `README.md` fornece uma visão geral do projeto, requisitos, instruções de uso, exemplos de como executar o script com diferentes argumentos, além de informações sobre a estrutura do projeto e o autor. Certifique-se de ajustar o conteúdo conforme necessário para refletir a estrutura real e as dependências do seu projeto.
