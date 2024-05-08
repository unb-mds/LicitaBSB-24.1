---
hide:
  - navigation
  - toc
---
## Como executar o projeto


### Tutorial: Como Executar o Scrapy

Para testar o scrapy, siga estas etapas:

Clonar o Repositório:
Certifique-se de clonar o repositório para o seu ambiente local usando o seguinte comando:

```console
git clone <URL_do_repositório>
```

Entrar no Diretório do Projeto:
Navegue para o diretório do projeto no terminal usando o comando cd:
```console
cd <nome_do_diretório>
```
Ativar o Ambiente Virtual (Opcional):
```console
python3 -m venv <nome_do_ambiente_virtual>
```

Se estiver usando um ambiente virtual, ative-o:
console
source <nome_do_ambiente_virtual>/bin/activate


Instale as bibliotecas necessárias:
```console
pip install --no-deps -r data_collection/requirements-dev.in
```
#### Pronto. 
### Agora, com o ambiente pronto para rodar o Scrapy, podemos seguir:
1. Navegue até o diretório data_collection:
```console
cd data_collection
``` 
2. Verifique a lista de raspadores disponíveis:
```console
scrapy list
```
Se quiser converter para txt e apagar o pdf utilize <licita_bsb> se deseja somente raspar utilize <df_brasilia>
3. Execute um raspador da lista:
```console
scrapy crawl <nome_do_raspador>
```
4. Os diários coletados na raspagem serão salvos no diretório `data_collection/data/licita_bsb/arquivos_raspados`

#### Dicas de execução
Além dos comandos acima, o Scrapy oferece outros recursos para configurar o comando de raspagem. Os recursos a seguir podem ser usados sozinhos ou combinados.  

* *Limite de data*  
Ao executar o item 3, o raspador coletará todos os diários oficiais do site publicador daquele município. Para execuções menores, utilize a flag de atributo -a seguida de:

start_date=AAAA-MM-DD: definirá a data inicial de coleta de diários.
```console
scrapy crawl <nome_do_raspador>-a start_date=<AAAA-MM-DD>
```
end_date=AAAA-MM-DD: definirá a data final de coleta de diários. Caso omitido, assumirá a data do dia em que está sendo executado.
```console
scrapy crawl <nome_do_raspador> -a end_date=<AAAA-MM-DD>
```

Nota:

Certifique-se de ter feito o checkout na branch 46-scrapping-diario-oficial-df antes de executar o projeto.
Antes de tentar rodar o projeto, certifique-se de instalar os requirements conforme as instruções acima.

### Tutorial: Como executar o Front-End

**1. Instalando dependências**

Certifique-se de ter a [versão mais recente do NodeJS](https://nodejs.org/en/download) instalada.

Navegue até o diretório `web` e execute o seguinte comando:
```
npm install
```

**2. Executando o React**

Para rodar o projeto, dentro do diretório /web, execute o comando:
```
npm run dev
```

O site estará disponível por padrão na porta 5432 em [http://localhost:5432/](http://localhost:5432/) ou [http://127.0.0.1:5432/](http://127.0.0.1:5432/)
