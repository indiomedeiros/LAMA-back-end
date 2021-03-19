#
PROJETO LAMA
===
Desenvolvedora e desenvolvedor:
---
Diana Monteiro e Indio Medeiros 

O que funciona:
----
1. Cadastro (com testes)
2. Login (com testes)
3. Endpoint de registrar banda (com testes)
4. Endpoint de visualização de detalhes sobre a banda (sem testes)
5. Endpoint de adicionar um show a um dia (com testes)
6. Endpoint de pegar todos os shows de uma data (sem testes)

O que não funciona
---
testes dos endpoints:
4 e 5
#
 

Instruções
===
`npm install`: Instala as dependências do projeto.
Deve ser criado o arquivo .env com as informações do seu banco de dados.
```
DB_HOST = host
DB_USER = usuario
DB_PASSWORD = senha
DB_NAME = nome-do-banco-de-dados
```
Criar e popular as tabelas
---
* `npm run createTables` - Cria as tabelas necessárias para o projeto com dois tipos de usuários: ADMIN e NORMAL.



* `npm run start `- Inicia a conexão com o banco de dados e roda o projeto. Precisa dar o comando ctrl + C para parar a execução.

* `npm run dev`: Reinicia o servidor automaticamente toda a vez que o projeto for salvo.

Como testar os endpoints da API?
---

* pesquise e instale a extensão no seu vscode: `humao.rest-client`
* utilize o arquivo `request.rest` para fazer as requisições clicando no texto `Send Request`.
```
### creat User
Send Request
POST http://localhost:3003/user/signup`
Content-Type: application/json

{
    "name": "indio",
    "email": "indio@gmail.com",
    "password": "154769284" , 
    "role": "ADMIN"
}
```
