# Contribuindo para o Licita BSB

Obrigado por considerar contribuir para o Licita BSB! Este guia ajudará você a entender como você pode ajudar.

## Como posso contribuir?

### Relatar problemas (Bugs)

Se você encontrar um bug, por favor, nos avise!

1. Certifique-se de que o bug não foi relatado anteriormente, verificando os [issues abertos](https://github.com/seu-repositorio/issues).
2. Se for um novo bug, [abra um novo issue](https://github.com/seu-repositorio/issues/new) e forneça informações detalhadas:
   - Descrição do problema
   - Passos para reproduzir o problema
   - Resultado esperado
   - Resultado atual
   - Capturas de tela ou logs, se aplicável

### Sugerir melhorias

Achou algo que poderia ser melhorado? Estamos abertos a sugestões!

1. Verifique se sua sugestão já não foi discutida anteriormente nos [issues abertos](https://github.com/seu-repositorio/issues).
2. Se for uma nova sugestão, [abra um novo issue](https://github.com/seu-repositorio/issues/new) e forneça informações detalhadas:
   - Descrição da melhoria sugerida
   - Benefícios esperados
   - Qualquer implementação inicial, se aplicável

### Contribuir com código

Se você deseja contribuir com código, siga estas etapas:

1. **Fork o repositório**: Clique em "Fork" no topo da página do GitHub para criar uma cópia do repositório em sua conta.
2. **Clone o repositório**: 
    ```sh
    git clone https://github.com/seu-usuario/seu-repositorio.git
    ```
3. **Crie um branch para sua alteração**:
    ```sh
    git checkout -b minha-contribuicao
    ```
4. **Faça as alterações necessárias**: Implemente as mudanças desejadas no código.
5. **Adicione commits com mensagens claras**:
    ```sh
    git commit -m "Descrição clara do que foi alterado"
    ```
6. **Envie as alterações para o seu repositório forked**:
    ```sh
    git push origin minha-contribuicao
    ```
7. **Abra um Pull Request**: Vá até a página do repositório original e clique em "New Pull Request". Descreva suas alterações detalhadamente.

### Padrões de Codificação

- Siga as convenções de código do projeto.
- Certifique-se de que seu código está bem comentado.
- Utilize os padrões de nomenclatura adequados.

### Testes

Para garantir que seu código não quebre funcionalidades existentes, por favor, escreva testes para suas alterações e execute os testes existentes:

```sh
python3 -m pytest teste_functions.py
```

### Documentação

Se sua alteração afetar a documentação, por favor, atualize-a. A documentação está localizada na pasta `docs`.

## Feedback

Se você tem perguntas ou precisa de ajuda, sinta-se à vontade para abrir um issue ou entrar em contato com a equipe de desenvolvimento.

## Código de Conduta

Por favor, leia nosso [Código de Conduta](./CODE_OF_CONDUCT.md) para entender as expectativas em relação ao comportamento ao contribuir para este projeto.

## Agradecimentos

Agradecemos a todos os nossos colaboradores e aqueles que consideram contribuir para o Licita BSB!
