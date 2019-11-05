# Gympoint - Sistema de Gestão para Academias

Sistema de controle de alunos para academias.

## Features
### Gestão de planos
- [x] Permitir que o usuário possa cadastrar planos para matrícula de alunos;

Obs.: Essa funcionalidade é para administradores autenticados na aplicação.

### Gestão de matrículas
- [x] Apesar do aluno estar cadastrado na plataforma, isso não significa que o mesmo tem uma matrícula ativa e que pode acessar a academia. Nessa funcionalidade deverá ser criado um cadastro de matrículas por aluno
- [x] A data de início da matrícula deve ser escolhida pelo usuário.
- [x] A data de término e preço da matrícula deve ser calculada com base no plano selecionado.
- [ ] Quando um aluno realiza uma matrícula ele recebe um e-mail com detalhes da sua inscrição na academia como plano, data de término, valor e uma mensagem de boas-vidas.

Obs.: Essa funcionalidade é para administradores autenticados na aplicação.

### Checkins
- [ ] Quando o aluno chega na academia o mesmo realiza um check-in apenas informando seu ID de cadastro (ID do banco de dados);
- [ ] Esse check-in serve para monitorar quantas vezes o usuário frequentou a academia na semana.
- [ ] O usuário só pode fazer 5 checkins dentro de um período de 7 dias corridos.
- [ ] Crie uma rota para listagem de todos checkins realizados por um usuário com base em seu ID de cadastro;

### Pedidos de auxílio
- [ ] O aluno pode criar pedidos de auxílio para a academia em relação a algum exercício, alimentação ou instrução qualquer;
- [ ] Crie uma rota para a academia listar todos pedidos de auxílio sem resposta;
- [ ] Crie uma rota para o aluno cadastrar pedidos de auxílio apenas informando seu ID de cadastro (ID do banco de dados);
- [ ] Crie uma rota para listar todos pedidos de auxílio de um usuário com base em seu ID de cadastro;
- [ ] Crie uma rota para a academia responder um pedido de auxílio:
- [ ] Quando um pedido de auxílio for respondido, o aluno deve receber um e-mail da plataforma com a pergunta e resposta da academia;
