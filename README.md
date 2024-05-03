# Licita BSB

## O que nós somos

Licita BSB é um projeto de divulgação das dispensas de licitação realizadas em Brasília. Através do nosso portal, as dispensas de licitação mais recentes publicadas nos diários oficiais serão divulgadas de maneira acessível e compreensível para o público em geral.

Visando ampliar a divulgação desse material, Licita BSB também possui um bot na rede social X (antigo Twitter), onde serão compartilhadas as dispensas de licitação mais recentes, de modo a alcançar um público ainda maior e manter a população de Brasília informada sobre as decisões governamentais.

> Esse projeto será realizado durante a disciplica de Métodos de Desenvolvimento de Software da Universida de Brasília, no primeiro semestre de 2024.

## Tecnologias utilizadas

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)

## Como executar o projeto
### Backend:

Instruções para Executar o Scrapy:

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
### Frontend:

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

O site estará disponível por padrão na porta 5432 em http://localhost:5432/ (ou http://127.0.0.1:5432/)


## Documentação do projeto


- Documentação: https://unb-mds.github.io/2024-1-Squad-03/
- Nosso quadro do Miro: https://miro.com/app/board/uXjVKcAWUlc=/?share_link_id=295633820307
- Figma da equipe: https://www.figma.com/file/vdfnVL6qkyUAPGeYfCCqol/Licita?type=design&node-id=0-1&mode=design&t=ZOaqmrSccc577Pog-0

## 🧑‍💻👩‍💻 Desenvolvedores

<center>
<table style="margin-left: auto; margin-right: auto;">
    <tr>
        <td align="center">
            <a href="https://github.com/Marcelo-Adrian">
                <img style="border-radius: 50%;" src="https://github.com/Marcelo-Adrian.png" width="150px;"/>
                <h5 class="text-center">Marcelo<br>Adrian</h5>
            </a>
        </td>
        <td align="center">
            <a href="https://github.com/MariaCHelena">
                <img style="border-radius: 50%;" src="https://github.com/MariaCHelena.png" width="150px;"/>
                <h5 class="text-center">Maria<br>Helena</h5>
            </a>
        </td>
        <td align="center">
            <a href="https://github.com/m4rllon">
                <img style="border-radius: 50%;" src="https://github.com/m4rllon.png" width="150px;"/>
                <h5 class="text-center">Marllon<br>Fausto</h5>
            </a>
        </td>
        <td align="center">
            <a href="https://github.com/nateejpg">
                <img style="border-radius: 50%;" src="https://github.com/nateejpg.png" width="150px;"/>
                <h5 class="text-center">Nathan<br>Abreu</h5>
            </a>
        </td>
        <td align="center">
            <a href="https://github.com/Otavio4283">
                <img style="border-radius: 50%;" src="https://github.com/Otavio4283.png" width="150px;"/>
                <h5 class="text-center">Otávio<br>Henrique</h5>
            </a>
        </td>
         <td align="center">
            <a href="https://github.com/thaleseuflauzino">
                <img style="border-radius: 50%;" src="https://github.com/thaleseuflauzino.png" width="150px;"/>
                <h5 class="text-center">Thales<br>Euflauzino</h5>
            </a>
        </td>
	<td align="center">
            <a href="https://github.com/moonshinerd">
                <img style="border-radius: 50%;" src="https://github.com/moonshinerd.png" width="150px;"/>
                <h5 class="text-center">Víctor<br>Schmidt</h5>
            </a>
        </td>
</table>

</center>
