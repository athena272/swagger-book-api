# 📚 swagger-book-api

Esta é uma API RESTful desenvolvida para facilitar o gerenciamento de uma coleção de livros, permitindo operações de cadastro, consulta, atualização e remoção de livros em um banco de dados MongoDB. O projeto foi construído com Node.js, Express e TypeScript, e oferece autenticação segura via JWT, além de uma documentação interativa utilizando Swagger. Ideal para quem deseja um ponto de partida para sistemas de biblioteca, catálogos digitais ou estudos sobre integração de autenticação e documentação em APIs modernas.

## 🚀 Tecnologias Utilizadas

- Node.js
- Express
- TypeScript
- MongoDB (via Mongoose)
- JWT (JSON Web Token)
- Swagger (OpenAPI)
- Docker

## 🛠️ Como rodar o projeto

1. Clone o repositório e acesse a pasta do projeto.
2. Instale as dependências:
```bash
npm install
```
3. Suba o MongoDB com Docker (Necessário estar com o Docker em execução):
```bash
npm run db
```
4. Inicie a aplicação:
```bash
npm start
```
5. Acesse a documentação Swagger:

[http://localhost:3000/api-docs/](http://localhost:3000/api-docs/)

## 📝 Modelos

### Livro (Book)
```json
{
  "title": "string",
  "author": "string",
  "ISBN": "string"
}
```

### Usuário (User)
```json
{
  "username": "string",
  "password": "string"
}
```

## 🔐 Autenticação

- Para acessar endpoints protegidos, faça login em `/auth/login` para obter um token JWT.
- Envie o token no header `Authorization: Bearer <token>`.

## 📚 Endpoints Principais

### Auth

- `POST /auth/register` — Cria um novo usuário
- `POST /auth/login` — Realiza login e retorna um token JWT

### Livros

- `POST /books` — Cria um novo livro
- `GET /books` — Lista todos os livros (requer autenticação)
- `GET /books/{title}` — Busca livro pelo título
- `PUT /books/{id}` — Atualiza um livro
- `DELETE /books/{id}` — Remove um livro

## 💡 Exemplos de Requisição

### Registrar Usuário
```http
POST /auth/register
Content-Type: application/json
{
  "username": "usuario1",
  "password": "senha123"
}
```

### Login
```http
POST /auth/login
Content-Type: application/json
{
  "username": "usuario1",
  "password": "senha123"
}
```

### Criar Livro (autenticado)
```http
POST /books
Authorization: Bearer <token>
Content-Type: application/json
{
  "title": "O Hobbit",
  "author": "J.R.R. Tolkien",
  "ISBN": "9780007525492"
}
```

## 🐳 Usando Docker

O projeto já inclui um `docker-compose.yml` para subir o MongoDB facilmente. Basta rodar:
```bash
docker-compose up -d
```

## 📖 Documentação Interativa

Acesse a documentação Swagger para testar todos os endpoints:
[http://localhost:3000/api-docs/](http://localhost:3000/api-docs/)

