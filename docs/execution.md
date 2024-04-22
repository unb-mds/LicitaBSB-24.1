## Como executar o ambiente virtual backend

# Inicialização do Ambiente Virtual e Projeto Django para o Backend

Para começar a desenvolver no backend do projeto, siga estas etapas para configurar e iniciar o ambiente virtual e o projeto Django.

## Pré-requisitos

Certifique-se de ter o Python e o pip instalados na sua máquina. Você pode baixar e instalar o Python em [python.org](https://www.python.org/downloads/).
Verifique também se você tem instalado na sua máquina o pacote `python3.10-venv`. Caso não possua, instale através do comando:

```
sudo apt install python3.10-venv
``` 

## Instalação do Ambiente Virtual

1. Abra o terminal e navegue até a pasta `backend` do projeto.
2. Execute o seguinte comando para inicializar o ambiente virtual:
   No Windows:
     ```
     backend\Scripts\activate
     ```
   No macOS e Linux:
     ```
     source backend/bin/activate
     ```

Pronto, agora você está dentro do ambiente virtual de desenvolvimento `backend`.

## Acesso do projeto Django

1. Com o ambiente virtual ativado, navegue até a pasta `licita_bsb` para poder executar o projeto Django. Dentro dela, execute o comando:

   ```
   python3 manage.py runserver
   ```

2. Seu projeto será inicializado por padrão na porta 8000 em [http://127.0.0.1:8000/](http://127.0.0.1:8000/) (ou [http://localhost:8000/](http://localhost:8000/)).

Caso tudo tenha dado certo, você já pode começar a codar.

## Desativação do Ambiente Virtual

Quando terminar de trabalhar no projeto, você pode desativar o ambiente virtual usando o seguinte comando:

```
deactivate
```

Isso encerrará o ambiente virtual e retornará ao ambiente Python global da sua máquina.

Com estas etapas, você estará pronto para começar a trabalhar no backend do projeto Django!