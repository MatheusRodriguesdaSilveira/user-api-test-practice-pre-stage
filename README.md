# 💇‍♀️ Agendamento de Serviços - API (Estudos-Estágio)

Mini aplicação Node.js voltada para **gestão de agendamentos de uma profissional autônoma (ex: manicure)**. Utiliza boas práticas de arquitetura, testes, validações, autenticação e documentação via Swagger. Criado como parte da preparação para estágio.

---

## 🚀 Funcionalidades

- ✅ Cadastro e autenticação do usuário administrador
- ✅ Criação de categorias de serviço (ex: mão, pé, depilação)
- ✅ Criação de serviços vinculados a categorias (ex: "Mão + Pé")
- ✅ Agendamento de clientes com nome, data e serviços
- ✅ Visualização e gerenciamento de todos os agendamentos
- ✅ Validações com Zod
- ✅ Swagger para documentação automática
- ✅ Testes com Jest
- ✅ Arquitetura desacoplada e escalável
- ✅ Integração com banco PostgreSQL via Prisma

---

## 🛠️ Tecnologias utilizadas

- Node.js
- TypeScript
- Fastify
- Prisma ORM
- PostgreSQL
- Zod
- Swagger (Fastify Swagger)
- Jest

---

## 📂 Estrutura do Prisma

```prisma
model User {
  id         String    @id @default(uuid())
  name       String
  email      String    @unique
  password   String
  created_at DateTime? @default(now())
  updated_at DateTime? @default(now())
}

model Category {
  id         String    @id @default(uuid())
  name       String
  created_at DateTime? @default(now())
  updated_at DateTime? @default(now())
  services   Service[]
}

model Service {
  id          String    @id @default(uuid())
  name        String
  description String
  image       String
  created_at  DateTime? @default(now())
  updated_at  DateTime? @default(now())
  category    Category  @relation(fields: [category_id], references: [id])
  category_id String
  items       Item[]
}

model Appointment {
  id               String    @id @default(uuid())
  client_name      String
  appointment_date DateTime
  status           Boolean   @default(false)
  draft            Boolean   @default(true)
  created_at       DateTime? @default(now())
  updated_at       DateTime? @default(now())
  items            Item[]
}

model Item {
  id             String       @id @default(uuid())
  amount         Int
  created_at     DateTime?    @default(now())
  updated_at     DateTime?    @default(now())
  appointment    Appointment? @relation(fields: [appointment_id], references: [id])
  service        Service      @relation(fields: [service_id], references: [id])
  appointment_id String?
  service_id     String
}
```

---

## 📁 Estrutura das pastas

```
src/
├─ @types/
│  └─ fastify/
│     └─ index.d.ts
├─ modules/
│  ├─ category/
│  │  ├─ controllers/
│  │  │  ├─ create.controller.ts
│  │  │  ├─ get-all.controller.ts
│  │  │  └─ index.ts
│  │  ├─ dtos/
│  │  │  └─ category-request.ts
│  │  ├─ routes/
│  │  │  ├─ create.route.ts
│  │  │  ├─ get-all.route.ts
│  │  │  └─ index.ts
│  │  ├─ schema/
│  │  │  └─ category.ts
│  │  ├─ services/
│  │  │  ├─ create.service.ts
│  │  │  ├─ get-all.service.ts
│  │  │  └─ index.ts
│  │  └─ index.ts
│  ├─ service/
│  │  ├─ controllers/
│  │  │  ├─ create.controller.ts
│  │  │  ├─ get-all.controller.ts
│  │  │  └─ index.ts
│  │  ├─ dtos/
│  │  │  └─ service-request.ts
│  │  ├─ routes/
│  │  │  ├─ create.route.ts
│  │  │  ├─ get-all.route.ts
│  │  │  └─ index.ts
│  │  ├─ schema/
│  │  │  └─ service.ts
│  │  ├─ services/
│  │  │  ├─ create.service.ts
│  │  │  ├─ get-all.service.ts
│  │  │  └─ index.ts
│  │  └─ index.ts
│  └─ users/
│     ├─ controllers/
│     │  ├─ auth.controller.ts
│     │  ├─ create.controller.ts
│     │  ├─ delete.controller.ts
│     │  ├─ get-all.controller.ts
│     │  ├─ get-by-id.controller.ts
│     │  ├─ index.ts
│     │  └─ update.controller.ts
│     ├─ dtos/
│     │  └─ user-request.ts
│     ├─ routes/
│     │  ├─ auth.route.ts
│     │  ├─ create.route.ts
│     │  ├─ delete.route.ts
│     │  ├─ get-all.route.ts
│     │  ├─ get-by-id.route.ts
│     │  ├─ index.ts
│     │  └─ update.route.ts
│     ├─ schema/
│     │  └─ user.ts
│     ├─ services/
│     │  ├─ auth.service.ts
│     │  ├─ create.service.ts
│     │  ├─ delete.service.ts
│     │  ├─ get-all.service.ts
│     │  ├─ get-by-id.service.ts
│     │  ├─ index.ts
│     │  └─ update.service.ts
│     └─ index.ts
├─ prisma/
│  └─ index.ts
├─ shared/
│  ├─ errors/
│  │  └─ app-error.ts
│  └─ middlewares/
│     ├─ auth-handler.ts
│     ├─ error-handler.ts
│     └─ upload.ts
├─ tests/
│  ├─ auth/
│  │  ├─ auth-user.test.ts
│  │  └─ create-user.test.ts
│  ├─ category/
│  │  ├─ create-category.test.ts
│  │  └─ get-categories.test.ts
│  ├─ factories/
│  │  ├─ categories-factory.ts
│  │  └─ user-factory.ts
│  └─ user/
│     ├─ delete-user.test.ts
│     ├─ get-user-by-id.test.ts
│     ├─ get-users.test.ts
│     └─ update-user.test.ts
├─ uploads/
├─ validators/
│  └─ env.schema.ts
└─ server.ts
src/
├─ @types/
│  └─ fastify/
│     └─ index.d.ts
├─ modules/
│  ├─ category/
│  │  ├─ controllers/
│  │  │  ├─ create.controller.ts
│  │  │  ├─ get-all.controller.ts
│  │  │  └─ index.ts
│  │  ├─ dtos/
│  │  │  └─ category-request.ts
│  │  ├─ routes/
│  │  │  ├─ create.route.ts
│  │  │  ├─ get-all.route.ts
│  │  │  └─ index.ts
│  │  ├─ schema/
│  │  │  └─ category.ts
│  │  ├─ services/
│  │  │  ├─ create.service.ts
│  │  │  ├─ get-all.service.ts
│  │  │  └─ index.ts
│  │  └─ index.ts
│  ├─ service/
│  │  ├─ controllers/
│  │  │  ├─ create.controller.ts
│  │  │  ├─ get-all.controller.ts
│  │  │  └─ index.ts
│  │  ├─ dtos/
│  │  │  └─ service-request.ts
│  │  ├─ routes/
│  │  │  ├─ create.route.ts
│  │  │  ├─ get-all.route.ts
│  │  │  └─ index.ts
│  │  ├─ schema/
│  │  │  └─ service.ts
│  │  ├─ services/
│  │  │  ├─ create.service.ts
│  │  │  ├─ get-all.service.ts
│  │  │  └─ index.ts
│  │  └─ index.ts
│  └─ users/
│     ├─ controllers/
│     │  ├─ auth.controller.ts
│     │  ├─ create.controller.ts
│     │  ├─ delete.controller.ts
│     │  ├─ get-all.controller.ts
│     │  ├─ get-by-id.controller.ts
│     │  ├─ index.ts
│     │  └─ update.controller.ts
│     ├─ dtos/
│     │  └─ user-request.ts
│     ├─ routes/
│     │  ├─ auth.route.ts
│     │  ├─ create.route.ts
│     │  ├─ delete.route.ts
│     │  ├─ get-all.route.ts
│     │  ├─ get-by-id.route.ts
│     │  ├─ index.ts
│     │  └─ update.route.ts
│     ├─ schema/
│     │  └─ user.ts
│     ├─ services/
│     │  ├─ auth.service.ts
│     │  ├─ create.service.ts
│     │  ├─ delete.service.ts
│     │  ├─ get-all.service.ts
│     │  ├─ get-by-id.service.ts
│     │  ├─ index.ts
│     │  └─ update.service.ts
│     └─ index.ts
├─ prisma/
│  └─ index.ts
├─ shared/
│  ├─ errors/
│  │  └─ app-error.ts
│  └─ middlewares/
│     ├─ auth-handler.ts
│     ├─ error-handler.ts
│     └─ upload.ts
├─ tests/
│  ├─ auth/
│  │  ├─ auth-user.test.ts
│  │  └─ create-user.test.ts
│  ├─ category/
│  │  ├─ create-category.test.ts
│  │  └─ get-categories.test.ts
│  ├─ factories/
│  │  ├─ categories-factory.ts
│  │  └─ user-factory.ts
│  └─ user/
│     ├─ delete-user.test.ts
│     ├─ get-user-by-id.test.ts
│     ├─ get-users.test.ts
│     └─ update-user.test.ts
├─ uploads/
│  ├─ 877fb0ff953de37a464f883d047d301b-BannerOficialGoogleForms-Opcao12.jpg
│  └─ d4f7ae143c760acf406c6ae893e0067d-BannerOficialGoogleForms-Opcao12.jpg
├─ validators/
│  └─ env.schema.ts
└─ server.ts




```

---

## 🧪 Testes

Utiliza `Jest` para garantir:

- Validações corretas de agendamentos
- Criação e listagem de serviços
- Autenticação do admin
- Cobertura dos fluxos principais de uso

---

## 📚 Documentação Swagger

Após iniciar o projeto, acesse:

```
http://localhost:3333/docs
```

---

## 📜 Como rodar o projeto

```bash
# Clonar repositório
git clone https://github.com/MatheusRodriguesdaSilveira/user-api-test-practice-pre-stage.git

# Instalar dependências
npm install

# Rodar migrations
npx prisma migrate dev --name init

# Iniciar servidor
npm run dev

# Rodar testes
npm test
```

---

## 📌 Observações

- Este projeto simula a rotina de uma profissional de serviços com agendamentos personalizados.
- Pode ser facilmente adaptado para barbearia, estética, fisioterapia, etc.

---

## 🧠 Aprendizados

- Autenticação com JWT
- Manipulação de datas e horas
- Relacionamentos em banco de dados
- Arquitetura escalável e coesa
- Escrita de testes reais de aplicação
- Modelagem voltada a domínio (DDD)

---

## 📄 Licença

MIT © 2025 - Matheus Rodrigues da Silveira

---

Feito com 💻 por **Matheus Rodrigues**
