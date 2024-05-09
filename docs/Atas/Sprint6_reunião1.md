# Ata de Reunião - 08/05

## Discussões:

### Opinião do pessoal sobre motivação do projeto:

* Adrian disse que não se sente desmotivado e acha que devemos continuar com o projeto para adiantar quando as aulas voltarem
* Maria Helena disse que a aula já não era 100% necessária porém a definição de datas e entregas ajudava na motivação e ela tem medo disso afetar nosso rendimento e motivação do membros do nosso grupo
* Thales enfatizou que em semanas de prova a prioridade não será o projeto 
* Todos os demais membros disseram que estão bem e querem continuar com o projeto normalmente
* Foi decidido que vamos continuar no mesmo ritmo e que caso algum membro precise desacelerar comunicar com a Maria Helena

### Retrospective
* Marllon terminou de codar a página do “Sobre Nós” e logo irá commitar.
* Maria Helena utilizou a api do governo para obter dados dos diários oficiais, porém ela encontrou problemas de logística para utilizar essa API sozinha, ela tem dados defasados, a API só é atualizada mensalmente o que pode ajudar a preencher a nossa base de dados de licitações passadas. A api tem dados desde 2013.
* Adrian encontrou uma biblioteca para envio automatizado de emails via python, tem preocupações com o LGPD por causa da proteção dos emails dos usuários. Ele concluiu que a biblioteca do python é a melhor solução.
* Nathan encontrou uma biblioteca (TextRazor) para simplificar o Objeto das licitações, o que soluciona um dos nossos objetivos que é deixar mais acessível ao público.
* Víctor pesquisou sobre aviso de licitações e obteve um padrão. Problemas, o valor estimado pode estar somente previsto em lei e não ter o valor bruto. Pontos positivos, temos sempre avisos de licitações de maneira destacada no diário oficial o que vai facilitar na hora de raspar. Segue o necessário 
    1. Objetivo/objeto
    2. Dados da empresa proponente
    3. Valor estimado
    4. Tipo de licitação
    5. Data e horário de abertura
    6. Local de obtenção do edital e realização da fase de lances
    7. Número do processo
    8. Formas de contato para mais informações
* Thales entrou em contato com o discord do querido diário, para obter informações de busca do querido diário, além disso, ele informou que encontrou 3 keywords diferentes sobre o encerramento de licitações, são elas: extrato de dispensa de licitações; extrato de contrato; aviso de adjudicação e homologação.

### Demais assuntos discutidos na reunião:
* Foi abordado sobre o objetivo que temos no nosso projeto
* Maria Helena sugeriu fazermos um dashboard igual os projetos anteriores como uma nova feature ao nosso projeto. Adrian comentou que parece simples de implementar baseado em projetos anteriores. Maria Helena falou que é somente fazer uma análise dos csv obtidos da api da controladoria geral da união  ;
* Adrian propôs organizar os diretórios do github;
* Lembrete aos membros para que eles realizem os commits semanais

### Objetivos da próxima sprint:
* Analisar os dados da planilha da Controladoria geral da união numa modalidade (pregão, etc.) , também podendo ser de outra fonte- Backend
* Descobrir como a api atualiza o .csv na api da controladoria geral da união e também realizar um tratamento dos dados - Backend
* Definir as personas de usuário - Frontend
* Integrar os dados do json no frontend - Frontend
* Definir um banco de dados para armazenar o email - Backend

## Membros Presentes:

- Maria Helena Carvalho
- Otavio
- Nathan Benigno
- Thales Henrique Euflauzino dos Santos
- Víctor Hugo Lima Schmidt
- Marcelo Adrian Ribeiro de Araujo

## Tempo de Reunião:

- Hora de início: 21:10h
- Hora de término: 22:15h
- Duração: 65 minutos
