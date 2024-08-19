# LicitaBSB Email Notification Script

Este projeto é um script Node.js que envia notificações semanais por e-mail para os assinantes utilizando o Mailchimp API e Nodemailer. O objetivo é manter os assinantes informados sobre as últimas licitações em Brasília.

## Estrutura do Projeto

- `index.js`: Script principal que lida com a lógica de envio de e-mails para os assinantes.
- `.env`: Arquivo que contém as variáveis de ambiente necessárias para configurar o Mailchimp e o Nodemailer.

## Requisitos

- Node.js (versão 14 ou superior)
- Conta no Gmail para o envio de e-mails
- Conta na Mailchimp para gerenciamento de assinantes

### Instalação de Dependências

Instale as dependências necessárias utilizando npm:

```sh
npm install nodemailer axios dotenv
```

### Configuração
#### Variáveis de Ambiente
Crie um arquivo .env na raiz do projeto com o seguinte conteúdo:

```env
URL_CHIMP=<URL_DA_LISTA_MAILCHIMP>
API=<CHAVE_API_MAILCHIMP>
GMAIL_USER=<SEU_EMAIL_GMAIL>
GMAIL_PASS=<SUA_SENHA_DE_APLICATIVO_GMAIL>
```

- **URL_CHIMP**: A URL da lista de assinantes no Mailchimp.
- **API**: Sua chave API do Mailchimp.
- **GMAIL_USER**: O endereço de e-mail do Gmail que será usado para enviar os e-mails.
- **GMAIL_PASS**: A senha do aplicativo do Gmail. Nota: Não use sua senha regular do Gmail. Em vez disso, crie uma senha de aplicativo específica para maior segurança.

### Funcionamento
1. **Recuperar Assinantes do Mailchimp**
O script faz uma requisição à API do Mailchimp para recuperar a lista de assinantes que estão com o status "subscribed". Esses assinantes são armazenados em uma lista para envio de e-mails.

2. **Envio de E-mails com Nodemailer**
Para cada assinante, o script envia um e-mail utilizando o Nodemailer, configurado para trabalhar com o serviço do Gmail.

3. **Estrutura do E-mail**
O e-mail enviado contém um texto simples e uma versão em HTML, informando os assinantes sobre as últimas atualizações de licitações em Brasília. Também há um link para o perfil do projeto na rede social X (anteriormente Twitter).

### Execução
Para executar o script, utilize o seguinte comando no terminal:

```sh
node index.js
```

### Considerações de Segurança
1. Senhas e APIs: Não compartilhe seu arquivo .env publicamente, pois ele contém informações sensíveis, como a chave API do Mailchimp e a senha do Gmail.
2. Senha de Aplicativo: Reforce o uso de senhas de aplicativo ao invés da senha normal do Gmail para maior segurança.

### Logs e Mensagens
O script contém diversos logs para auxiliar no monitoramento do processo, incluindo a confirmação de que e-mails foram enviados ou falhas no envio.
