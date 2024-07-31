## Sumário

- [Sobre o Projeto](#Sobre-o-Projeto)
- [Como Executar o Projeto](#Como-Executar-o-Projeto)
  - [Pré-requisitos](#Pré-requisitos)
  - [Execução](#Execução)
  - [Observações](#Observações)
- [Documentação](#Documentação)
- [Equipe](#Equipe)

## Sobre o Projeto

Licita BSB é um projeto de divulgação das dispensas de licitação realizadas em Brasília. Através do nosso portal, as dispensas de licitação mais recentes publicadas nos diários oficiais serão divulgadas de maneira acessível e compreensível para o público em geral.

Visando ampliar a divulgação desse material, Licita BSB também possui um bot na rede social X (antigo Twitter), onde serão compartilhadas as dispensas de licitação mais recentes, de modo a alcançar um público ainda maior e manter a população de Brasília informada sobre as decisões governamentais.

Acesse o nosso bot no [X (antigo twitter)](https://x.com/LicitaBSB) para acompanhar licitações do DOU de forma diária.

> Esse projeto será realizado durante a disciplina de Métodos de Desenvolvimento de Software da Universidade de Brasília, no primeiro semestre de 2024.

## Como Executar o Projeto

### Pré-requisitos

- [NodeJS v20 ou superior](https://nodejs.org/en/download) instalada.

Clone o repositório do projeto com o seguinte comando:

```bash
git clone https://github.com/unb-mds/LicitaBSB-24.1.git
```

### Execução

Navegue até o diretório `web` e execute o seguinte comando:

```bash
npm install
```

Para rodar o projeto, dentro do diretório `/web`, execute o comando:

```bash
npm run dev
```

O site estará disponível por padrão na porta 5432 em http://localhost:5432/ (ou http://127.0.0.1:5432/)

### Observações

- A atualização do banco de dados é feita de forma automática no projeto por Cronjob.
- Caso deseje testar os componentes do backend [clique aqui](https://github.com/unb-mds/LicitaBSB-24.1/tree/main/backend) e depois clique no componente que deseja testar.

## Documentação

- [Documentação](https://unb-mds.github.io/LicitaBSB-24.1/)
- [Nosso quadro do Miro](https://miro.com/app/board/uXjVKcAWUlc=/?share_link_id=295633820307)
- [Figma da equipe](https://www.figma.com/file/vdfnVL6qkyUAPGeYfCCqol/Licita?type=design&node-id=0-1&mode=design&t=ZOaqmrSccc577Pog-0)

## Equipe

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
