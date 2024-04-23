---
hide:
  - navigation
  - toc
---
## Como executar o ambiente virtual Backend 


## Tutorial: Como Inicializar o Ambiente Virtual

Antes de criar um ambiente virtual, certifique-se de ter o pacote `virtualenv` instalado. Você pode fazer isso usando o seguinte comando:

```
pip install virtualenv
```

Agora, vamos criar um ambiente virtual chamado `venv` dentro do diretório `backend` do seu projeto. Execute o seguinte comando:

```
python3 -m venv backend/venv
```

Com o ambiente virtual criado, é hora de ativá-lo:

- **No Windows:**

```
backend\venv\Scripts\activate.bat
```

- **No Linux / macOS:**

```
source backend/venv/bin/activate
```

Uma vez ativado, você estará pronto para instalar as dependências listadas no arquivo `requirements.txt`, localizado no diretório `backend`. Use o seguinte comando para fazer isso:

```
pip install -r backend/requirements.txt
```

Agora que o ambiente está configurado e as dependências estão instaladas, você pode começar a trabalhar no seu projeto Django.

Se precisar instalar alguma biblioteca adicional, você pode fazê-lo com o comando `pip install <nome_do_pacote>`. Lembre-se de atualizar o arquivo `requirements.txt` depois de instalar novas dependências. Para fazer isso, execute:

```
pip freeze > backend/requirements.txt
```

Isso garantirá que seu ambiente virtual esteja sempre em sincronia com as bibliotecas necessárias para o seu projeto.
