import {
  createUserRoute,
  getUsersRoute,
  updateUserRoute,
  deleteUserRoute,
} from "./routes";
import dotenv from "dotenv";
import { env } from "./validators/env.schema";
import fastifyCors from "@fastify/cors";
import { fastifySwagger } from "@fastify/swagger";
import { fastifySwaggerUi } from "@fastify/swagger-ui";
import { fastify } from "fastify";
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";

dotenv.config();

const app = fastify();
app.register(fastifyCors);

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
app.register(createUserRoute);
app.register(getUsersRoute);
app.register(updateUserRoute);
app.register(deleteUserRoute);

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
