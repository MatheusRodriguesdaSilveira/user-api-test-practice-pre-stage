import {
  authUserRoute,
  createUserRoute,
  deleteUserRoute,
  getUserByIdRoute,
  getUsersRoute,
  updateUserRoute,
} from "./modules/users/routes";
import { createCategoryRoute, getCategoriesRoute } from "./modules/category";
import { createServiceRoute, getServicesRoute } from "./modules/service";

import dotenv from "dotenv";
import { env } from "./validators/env.schema";

import { fastify } from "fastify";
import fastifyCors from "@fastify/cors";
import { fastifySwagger } from "@fastify/swagger";
import { fastifySwaggerUi } from "@fastify/swagger-ui";
import fastifyStatic from "@fastify/static";
import multipart from "@fastify/multipart";

import { resolve } from "path";

import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";

dotenv.config();

const app = fastify();

app.register(multipart);

app.register(fastifyCors, {
  origin: "*",
});

app.register(fastifyStatic, {
  root: resolve(process.cwd(), "uploads"),
  prefix: "/uploads/",
});

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: "User API Test Practice (Pré-Estágio)",
      description:
        "Mini aplicação Node.js com foco em boas práticas de testes, validação de usuários e integração com banco de dados.",
      version: "1.0.0",
    },
  },
  transform: jsonSchemaTransform,
});

app.register(fastifySwaggerUi, {
  routePrefix: "/docs",
});

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

// Routes
// Auth
app.register(createUserRoute);
app.register(authUserRoute);

// Users
app.register(getUsersRoute);
app.register(getUserByIdRoute);
app.register(updateUserRoute);
app.register(deleteUserRoute);

// Categories
app.register(createCategoryRoute);
app.register(getCategoriesRoute);

// Services
app.register(createServiceRoute);
app.register(getServicesRoute);

// Server
const port = env.PORT || 3333;

if (process.env.NODE_ENV !== "test") {
  app
    .listen({
      host: "0.0.0.0",
      port,
    })
    .then(() => {
      console.log(`Server: http://localhost:${port} is running ⚡⚡⚡`);
      console.log(`Swagger: http://localhost:${port}/docs`);
    });
}

export default app;
