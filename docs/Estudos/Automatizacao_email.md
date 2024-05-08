# Viabilidade de Envio de Emails aos Usuários

Com base na pesquisa que conduzi, identifiquei a necessidade dos seguintes procedimentos:

1. **Criação de um Formulário de Inscrição:** Dada a natureza do nosso site, desprovido de qualquer sistema de login, proponho a implementação de um formulário simples para coleta de emails dos usuários interessados em receber atualizações por meio deste canal.

2. **Gerenciamento de Emails:** Para tal, torna-se imperativo o estabelecimento de um banco de dados privado, a fim de armazenar as informações dos usuários. Nesse sentido, é essencial atentar-se à conformidade com a Lei Geral de Proteção de Dados (LGPD), evitando a exposição indevida de dados sensíveis.

3. **Seleção de uma Tecnologia para Envio de Emails:** Embora opções como Mailchimp e SendGrid ofereçam soluções automatizadas, a viabilidade financeira pode ser uma questão, considerando seus planos de assinatura mensal, mesmo que ofereçam versões gratuitas com funcionalidades limitadas. Portanto, uma alternativa viável identificada é a utilização da biblioteca Python chamada PyWin32, conhecida por sua facilidade de aplicação e gratuidade.

4. **Desenvolvimento do Modelo e Disparador de Emails:** Esta etapa será integrada ao término da coleta de dados e consistirá na criação de um sistema de disparo de emails, integrando-se ao banco de dados para alcançar múltiplos usuários de forma eficiente.

5. **Cumprimento dos Regulamentos de Proteção de Dados:** No contexto do meu projeto, três fatores são de suma importância: o consentimento do usuário, a segurança dos dados e a transparência na coleta dessas informações. O consentimento e a transparência estão diretamente ligados à fase inicial de coleta de dados, com a adição de um sistema para que os usuários possam facilmente cancelar a inscrição na lista de emails. Quanto à segurança dos dados, é crucial a implementação de um banco de dados separado, em conformidade com a LGPD, para evitar possíveis violações.

Em síntese, identifiquei a possibilidade de implementar um sistema automatizado de envio de emails aos usuários, utilizando a biblioteca PyWin32, de fácil utilização e gratuita. No entanto, ressalto que o principal desafio será a criação de um banco de dados segregado para armazenamento das informações dos usuários, visando a conformidade com a LGPD, o que implica em um aumento da complexidade do backend do projeto.

Fontes:
- [https://sendgrid.com/en-us/resources/guides](https://sendgrid.com/en-us/resources/guides)
- [https://mailchimp.com/pt-br/resources/marketing-automations/](https://mailchimp.com/pt-br/resources/marketing-automations/)
- [https://www.youtube.com/watch?v=N97q96BygUg](https://www.youtube.com/watch?v=N97q96BygUg)
- [https://pypi.org/project/pywin32/](https://pypi.org/project/pywin32/)
- [https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm](https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm)
