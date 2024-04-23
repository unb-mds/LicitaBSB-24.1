---
hide:
  - navigation
  - toc
---
## Como executar o ambiente virtual Backend 

### Inicialização do Ambiente Virtual e Projeto Django para o Backend 

Se prepare para desvendar os segredos do backend do nosso projeto!  Siga estas etapas para configurar e dar vida ao ambiente virtual e ao projeto Django:

### ️ Pré-requisitos ️

Antes de embarcarmos nessa jornada, certifique-se de ter os seguintes itens em sua bagagem:

* **Python e pip:** Baixe e instale o Python em [https://www.python.org/](https://www.python.org/).
* **Pacote `python3.10-venv`:** Instale-o através do comando:

```
sudo apt install python3.10-venv
```

###  Instalação do Ambiente Virtual 

1. Abra o terminal e navegue até a pasta `backend` do projeto.
2. Ative o ambiente virtual com o comando mágico:

   * **Windows:**
     ```
     backend\Scripts\activate
     ```
   * **macOS e Linux:**
     ```
     source backend/bin/activate
     ```

**Parabéns!** Você está agora dentro do ambiente virtual de desenvolvimento `backend`. 

###  Acesso ao Projeto Django 

1. Com o ambiente virtual ativado, navegue até a pasta `licita_bsb`.

2. Execute o seguinte comando para dar vida ao projeto Django:  
   ```python3 manage.py runserver```  
3. Seu projeto será aberto em [http://127.0.0.1:8000/](http://127.0.0.1:8000/) ou [http://localhost:8000/](http://localhost:8000/).

Mãos à obra! ‍ Hora de escrever o código que fará a magia acontecer!

###  Desativação do Ambiente Virtual 

Quando terminar sua missão, desative o ambiente virtual com o comando:

```
deactivate
```

Isso o levará de volta ao ambiente Python global da sua máquina.

Com esses passos, você estará pronto para desbravar o mundo do backend Django!  Boa sorte! 
