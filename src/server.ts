import dotenv from "dotenv";
import { env } from "./validators/env.schema";
import { resolve } from "path";

import {
  authUserRoute,
  createUserRoute,
  deleteUserRoute,
  getUserByIdRoute,
  getUsersRoute,
  updateUserRoute,
} from "./mvc/modules/users/routes";

import {
  createCategoryRoute,
  getCategoriesRoute,
} from "./mvc/modules/category";

import {
  createServiceRoute,
  deleteServiceRoute,
  getServiceIdRoute,
  getServicesRoute,
} from "./mvc/modules/service";

import fastifyFormbody from "@fastify/formbody";
import fastifyCookie from "@fastify/cookie";
import fastifyCors from "@fastify/cors";
import fastifyView from "@fastify/view";
import fastifyStatic from "@fastify/static";
import multipart from "@fastify/multipart";
import { fastify } from "fastify";
import { fastifySwagger } from "@fastify/swagger";
import { fastifySwaggerUi } from "@fastify/swagger-ui";

import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";

import { serviceWebRoutes } from "./mvc/modules/web/routes/serviceWeb.route";
import { homeWebRoutes } from "./mvc/modules/web/routes/homeWeb.route";
import { authWebRoutes } from "./mvc/modules/web/routes/authWeb.route";
import { categoryWebRoutes } from "./mvc/modules/web/routes/categoryWeb.route";
import { appointmentWebRoutes } from "./mvc/modules/web/routes/appointmentWebRoutes";

dotenv.config({
  path: resolve(process.cwd(), ".env"),
});

const app = fastify();

app.register(fastifyCookie);

app.register(fastifyFormbody);

app.register(multipart, {
  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB
  },
});

app.register(fastifyCors, {
  origin: "*",
});

app.register(fastifyStatic, {
  root: resolve(__dirname, "..", "public"),
  prefix: "/public/",
});

app.register(fastifyView, {
  engine: { ejs: require("ejs") },
  root: resolve(process.cwd(), "src", "mvc", "modules", "web", "view"),
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
app.register(deleteServiceRoute);
app.register(getServiceIdRoute);

// Web Routes
app.register(homeWebRoutes);
app.register(serviceWebRoutes);
app.register(authWebRoutes);
app.register(categoryWebRoutes);
app.register(appointmentWebRoutes);

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
      console.log(`Web: http://localhost:${port}/admin/service/list`);
    });
}

export default app;
