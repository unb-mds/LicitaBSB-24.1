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

## Padrões de emojis 💈

<table>
  <thead>
    <tr>
      <th>Tipo do commit</th>
      <th>Emoji</th>
      <th>Palavra-chave</th>
    </tr>
  </thead>
 <tbody>
    <tr>
      <td>Acessibilidade</td>
      <td>♿ <code>:wheelchair:</code></td>
      <td></td>
    </tr>
    <tr>
      <td>Adicionando um teste</td>
      <td>✅ <code>:white_check_mark:</code></td>
      <td><code>test</code></td>
    </tr>
    <tr>
      <td>Atualizando a versão de um submódulo</td>
      <td>⬆️ <code>:arrow_up:</code></td>
      <td></td>
    </tr>
    <tr>
      <td>Retrocedendo a versão de um submódulo</td>
      <td>⬇️ <code>:arrow_down:</code></td>
      <td></td>
    </tr>
    <tr>
      <td>Adicionando uma dependência</td>
      <td>➕ <code>:heavy_plus_sign:</code></td>
      <td><code>build</code></td>
    </tr>
    <tr>
      <td>Alterações de revisão de código</td>
      <td>👌 <code>:ok_hand:</code></td>
      <td><code>style</code></td>
    </tr>
    <tr>
      <td>Animações e transições</td>
      <td>💫 <code>:dizzy:</code></td>
      <td></td>
    </tr>
    <tr>
      <td>Bugfix</td>
      <td>🐛 <code>:bug:</code></td>
      <td><code>fix</code></td>
    </tr>
    <tr>
      <td>Comentários</td>
      <td>💡 <code>:bulb:</code></td>
      <td><code>docs</code></td>
    </tr>
    <tr>
      <td>Commit inicial</td>
      <td>🎉 <code>:tada:</code></td>
      <td><code>init</code></td>
    </tr>
    <tr>
      <td>Configuração</td>
      <td>🔧 <code>:wrench:</code></td>
      <td><code>chore</code></td>
    </tr>
    <tr>
      <td>Deploy</td>
      <td>🚀 <code>:rocket:</code></td>
      <td></td>
    </tr>
    <tr>
      <td>Documentação</td>
      <td>📚 <code>:books:</code></td>
      <td><code>docs</code></td>
    </tr>
    <tr>
      <td>Em progresso</td>
      <td>🚧 <code>:construction:</code></td>
      <td></td>
    </tr>
    <tr>
      <td>Estilização de interface</td>
      <td>💄 <code>:lipstick:</code></td>
      <td><code>feat</code></td>
    </tr>
    <tr>
      <td>Infraestrutura</td>
      <td>🧱 <code>:bricks:</code></td>
      <td><code>ci</code></td>
    </tr>
    <tr>
      <td>Lista de ideias (tasks)</td>
      <td>🔜 <code> :soon: </code></td>
      <td></td>
    </tr>
    <tr>
      <td>Mover/Renomear</td>
      <td>🚚 <code>:truck:</code></td>
      <td><code>chore</code></td>
    </tr>
    <tr>
      <td>Novo recurso</td>
      <td>✨ <code>:sparkles:</code></td>
      <td><code>feat</code></td>
    </tr>
    <tr>
      <td>Package.json em JS</td>
      <td>📦 <code>:package:</code></td>
      <td><code>build</code></td>
    </tr>
    <tr>
      <td>Performance</td>
      <td>⚡ <code>:zap:</code></td>
      <td><code>perf</code></td>
    </tr>
    <tr>
        <td>Refatoração</td>
        <td>♻️ <code>:recycle:</code></td>
        <td><code>refactor</code></td>
    </tr>
    <tr>
      <td>Limpeza de Código</td>
      <td>🧹 <code>:broom:</code></td>
      <td><code>cleanup</code></td>
    </tr>
    <tr>
      <td>Removendo um arquivo</td>
      <td>🗑️ <code>:wastebasket:</code></td>
      <td><code>remove</code></td>
    </tr>
    <tr>
      <td>Removendo uma dependência</td>
      <td>➖ <code>:heavy_minus_sign:</code></td>
      <td><code>build</code></td>
    </tr>
    <tr>
      <td>Responsividade</td>
      <td>📱 <code>:iphone:</code></td>
      <td></td>
    </tr>
    <tr>
      <td>Revertendo mudanças</td>
      <td>💥 <code>:boom:</code></td>
      <td><code>fix</code></td>
    </tr>
    <tr>
      <td>Segurança</td>
      <td>🔒️ <code>:lock:</code></td>
      <td></td>
    </tr>
    <tr>
      <td>SEO</td>
      <td>🔍️ <code>:mag:</code></td>
      <td></td>
    </tr>
    <tr>
      <td>Tag de versão</td>
      <td>🔖 <code>:bookmark:</code></td>
      <td></td>
    </tr>
    <tr>
      <td>Teste de aprovação</td>
      <td>✔️ <code>:heavy_check_mark:</code></td>
      <td><code>test</code></td>
    </tr>
    <tr>
      <td>Testes</td>
      <td>🧪 <code>:test_tube:</code></td>
      <td><code>test</code></td>
    </tr>
    <tr>
      <td>Texto</td>
      <td>📝 <code>:pencil:</code></td>
      <td></td>
    </tr>
    <tr>
      <td>Tipagem</td>
      <td>🏷️ <code>:label:</code></td>
      <td></td>
    </tr>
    <tr>
      <td>Tratamento de erros</td>
      <td>🥅 <code>:goal_net:</code></td>
      <td></td>
    </tr>
    <tr>
      <td>Dados</td>
      <td>🗃️ <code>:card_file_box:</code></td>
      <td><code>raw</code></td>
    </tr>
  </tbody>
</table>