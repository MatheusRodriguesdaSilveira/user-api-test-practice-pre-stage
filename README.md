# 📦 User API Test Practice (Pré-Estágio)

Mini aplicação Node.js com foco em **boas práticas de testes**, **validação de usuários** e **integração de banco de dados**. Desenvolvido como parte do desafio pré-estágio.

## 🚀 Funcionalidades

- ✅ Cadastro de usuário (nome e e-mail)
- ✅ Validação de e-mail e nome
- ✅ Verificação de e-mails duplicados
- ✅ Testes automatizados com Jest
- ✅ Integração com banco de dados via Prisma
- ✅ Cobertura de erros e boas práticas

## 📁 Tecnologias utilizadas

- Node.js
- Express.js
- TypeScript
- Prisma ORM
- Jest

## 🧪 Testes

Utiliza `Jest` para testar os seguintes cenários:

- Criar um usuário com sucesso
- Erro ao tentar criar usuário com e-mail vazio
- Erro ao tentar criar usuário com e-mail inválido
- Erro ao tentar criar usuário com e-mail já existente (case-insensitive)
- Retornar a lista dos usuários cadastrados


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

### 4. Executar os testes
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

- Validação de dados no backend
- Escrita de testes unitários e boas práticas
- Estruturação de serviços e responsabilidades
- Integração com banco de dados de forma limpa

---

## 📃 Licença

Este projeto está sob a licença MIT. <br>
Copyright (c) 2025 Matheus Rodrigues da Silveira


---

Feito com 💻 por **Matheus Rodrigues**

