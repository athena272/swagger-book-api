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
3. Configure as variáveis de ambiente:
   - Copie o arquivo `.env.example` para `.env`:
   ```bash
   copy .env.example .env
   ```
   - Edite o arquivo `.env` e defina uma chave secreta para o JWT:
   ```
   JWT_SECRET=sua-chave-secreta-aqui
   ```
   **Importante**: 
   - Use uma chave secreta forte e segura em produção. A autenticação JWT não funcionará sem esta variável configurada.
   - O arquivo `.env` **deve estar em UTF-8**. Se você criar/editá-lo no Windows, certifique-se de salvar como UTF-8 (não Unicode/UTF-16).
   - Para verificar se o encoding está correto, execute: `npm run check-env`
   - Se houver problema de encoding, execute: `npm run fix-env`
4. Suba o MongoDB com Docker (Necessário estar com o Docker em execução):
```bash
npm run db
```
5. Inicie a aplicação:
```bash
npm start
```
6. Acesse a documentação Swagger:

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

## 🔧 Scripts Disponíveis

- `npm start` - Inicia o servidor em modo desenvolvimento com nodemon
- `npm run db` - Sobe o MongoDB usando Docker Compose
- `npm run check-env` - Verifica se o arquivo `.env` está em UTF-8 e se as variáveis estão sendo carregadas corretamente
- `npm run fix-env` - Corrige automaticamente problemas de encoding no arquivo `.env` (converte UTF-16 para UTF-8)

## ⚠️ Troubleshooting

### Problema: `JWT_SECRET` retorna `undefined`

**Causa comum:** O arquivo `.env` está em UTF-16 (Unicode) em vez de UTF-8.

**Solução:**
1. Execute `npm run check-env` para verificar o problema
2. Execute `npm run fix-env` para corrigir automaticamente
3. Ou converta manualmente:
   - **VS Code:** Abra o arquivo, clique no encoding (canto inferior direito) → "Save with Encoding" → "UTF-8"
   - **Notepad++:** Encoding → Convert to UTF-8
   - **Node.js:** `node -e "const fs=require('fs');fs.writeFileSync('.env',fs.readFileSync('.env','utf16le'),'utf8')"`

**Prevenção:** Sempre salve arquivos `.env` em UTF-8. O VS Code mostra o encoding atual no canto inferior direito da janela.
