# Padrões de Commits 📜

De acordo com a documentação do [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/), commits semânticos são uma convenção simples para ser utilizada nas mensagens de commit. Esta convenção define um conjunto de regras para criar um histórico de commit explícito, facilitando a criação de ferramentas automatizadas.

Esses commits auxiliarão você e sua equipe a entenderem de forma facilitada quais alterações foram realizadas no trecho de código que foi commitado. Essa identificação ocorre por meio de uma palavra e um emoji que identifica se aquele commit realizado se trata de uma alteração de código, atualização de pacotes, documentação, alteração de visual, teste, entre outros.

## Tipo e Descrição 🦄

O commit semântico possui os seguintes elementos estruturais (tipos), que informam a intenção do seu commit ao utilizador(a) de seu código:

### ```feat```
- **Descrição**: Indica que seu trecho de código está incluindo um novo recurso.
- **Relacionamento**: Se relaciona com o MINOR do versionamento semântico.

### ```fix```
- **Descrição**: Indica que seu trecho de código commitado está solucionando um problema (bug fix).
- **Relacionamento**: Se relaciona com o PATCH do versionamento semântico.

### ```docs```
- **Descrição**: Indica que houveram mudanças na documentação, como por exemplo no README do seu repositório.
- **Relacionamento**: Não inclui alterações em código.

### ```test```
- **Descrição**: Utilizado quando são realizadas alterações em testes, seja criando, alterando ou excluindo testes unitários.
- **Relacionamento**: Não inclui alterações em código.

### ```build```
- **Descrição**: Utilizado quando são realizadas modificações em arquivos de build e dependências.

### ```perf```
- **Descrição**: Serve para identificar quaisquer alterações de código que estejam relacionadas a performance.

### ```style```
- **Descrição**: Indica alterações referentes a formatações de código, semicolons, trailing spaces, lint, etc.
- **Relacionamento**: Não inclui alterações em código.

### ```refactor```
- **Descrição**: Refere-se a mudanças devido a refatorações que não alterem sua funcionalidade, como melhorias de performance ou alteração na estrutura de código.
- **Relacionamento**: Pode incluir mudanças que não alterem a funcionalidade.

### ```chore```
- **Descrição**: Indica atualizações de tarefas de build, configurações de administrador, pacotes, etc.
- **Relacionamento**: Não inclui alterações em código.

### ```ci```
- **Descrição**: Indica mudanças relacionadas a integração contínua (continuous integration).

### ```raw```
- **Descrição**: Indica mudanças relacionadas a arquivos de configurações, dados, features, parâmetros.

### ```cleanup```
- **Descrição**: Utilizado para remover código comentado, trechos desnecessários ou qualquer outra forma de limpeza do código-fonte, visando aprimorar sua legibilidade e manutenibilidade.

### ```remove```
- **Descrição**: Indica a exclusão de arquivos, diretórios ou funcionalidades obsoletas ou não utilizadas, reduzindo o tamanho e a complexidade do projeto e mantendo-o mais organizado.

## Recomendações 🎉

- Adicione um tipo consistente com o título do conteúdo.
- Recomendamos que a primeira linha tenha no máximo 4 palavras.
- Para descrever com detalhes, use a descrição do commit.
- Utilize um emoji no início da mensagem de commit representando o conteúdo do commit.
- Os links precisam ser adicionados em sua forma mais autêntica, ou seja, sem encurtadores de link e links afiliados.
