# 📦 User API Test Practice (Pré-Estágio)

Mini aplicação Node.js com foco em **boas práticas de testes**, **validação de usuários**, **documentação com Swagger** e **integração de banco de dados**. Desenvolvido como parte do desafio pré-estágio.

## 🚀 Funcionalidades

- ✅ Cadastro de usuário (nome e e-mail)
- ✅ Validação de e-mail e nome com Zod
- ✅ Verificação de e-mails duplicados (case-insensitive)
- ✅ Atualização de usuários
- ✅ Exclusão de usuários
- ✅ Listagem de todos os usuários
- ✅ Documentação automática com Swagger
- ✅ Tratamento global de erros
- ✅ Arquitetura modular com Design Patterns
- ✅ Testes automatizados com Jest
- ✅ Integração com banco de dados via Prisma

## 📁 Tecnologias utilizadas

- Node.js
- Fastify
- TypeScript
- Prisma ORM
- Zod
- Swagger (Fastify Swagger)
- Jest

## 🧪 Testes

Utiliza `Jest` para testar os seguintes cenários:

- Criar um usuário com sucesso
- Erro ao tentar criar usuário com e-mail vazio
- Erro ao tentar criar usuário com e-mail inválido
- Erro ao tentar criar usuário com e-mail já existente (case-insensitive)
- Retornar a lista dos usuários cadastrados
- Atualizar um usuário
- Excluir um usuário


## Estrutura das pastas 🗂️ 

src/
├─ controllers/
│  ├─ user/
│  │  ├─ create.controller.ts
│  │  ├─ delete.controller.ts
│  │  ├─ get-all.controller.ts
│  │  └─ update.controller.ts
│  └─ index.ts
├─ prisma/
│  └─ index.ts
├─ routes/
│  ├─ user/
│  │  ├─ create.route.ts
│  │  ├─ delete.route.ts
│  │  ├─ get-all.route.ts
│  │  └─ update.route.ts
│  └─ index.ts
├─ services/
│  ├─ user/
│  │  ├─ create.service.ts
│  │  ├─ delete.service.ts
│  │  ├─ get-all.service.ts
│  │  └─ update.service.ts
│  └─ index.ts
├─ shared/
│  ├─ errors/
│  │  └─ app-error.ts
│  └─ middlewares/
│     └─ error-handler.ts
├─ tests/
│  ├─ factories/
│  │  └─ user-factory.ts
│  └─ user/
│     ├─ create-user.test.ts
│     ├─ get-users.test.ts
│     └─ update-user.test.ts
├─ validators/
│  └─ env.schema.ts
└─ server.ts



## 🚀 Como usar

### 1. Clonar o projeto
```bash
git clone https://github.com/MatheusRodriguesdaSilveira/user-api-test-practice-pre-stage.git
cd user-api-test-practice-pre-stage
```

### 2. Instalar as dependências
```bash
npm install
```

### 3. Rodar as migrations do Prisma
```bash
npx prisma migrate dev --name init
```

### 4. Iniciar o servidor
```bash
npm run dev
```

### 5. Executar os testes
```bash
npm test
```

## 📂 Estrutura da Tabela `User`

| Campo   | Tipo     | Descrição                      |
|---------|----------|-------------------------------|
| `id`    | `string` | Identificador único (UUID)     |
| `name`  | `string` | Nome do usuário                |
| `email` | `string` | E-mail do usuário (único)      |

### Prisma Model:
```prisma
model User {
  id    String @id @default(uuid())
  name  String
  email String @unique
}
```

## 🧠 Aprendizados

- Validação robusta com Zod
- Escrita de testes unitários e boas práticas com Jest
- Estruturação de serviços e controllers de forma desacoplada
- Integração com banco de dados de forma limpa com Prisma
- Uso do Fastify para alta performance
- Documentação automática com Swagger
- Design escalável baseado em domain-driven design (DDD)

## 📄 Documentação Swagger

Após iniciar o projeto, acesse:

```
http://localhost:3333/docs
```

A documentação completa da API estará disponível com todos os endpoints e schemas validados.

---


## 📃 Licença

Este projeto está sob a licença MIT. <br>
Copyright (c) 2025 Matheus Rodrigues da Silveira


---

Feito com 💻 por **Matheus Rodrigues**

