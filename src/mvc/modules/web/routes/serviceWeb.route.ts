import { FastifyInstance } from "fastify";
import {
  createService,
  deleteService,
  editService,
  showServiceEditForm,
  showServiceForm,
  showServiceList,
} from "../controllers/service.controller";

export async function serviceWebRoutes(app: FastifyInstance) {
  app.get("/admin/service/list", showServiceList);

  app.get("/admin/service/create", showServiceForm);

  app.post("/admin/service/create", createService);

  app.get("/admin/service/edit/:id", showServiceEditForm);

  app.post("/admin/service/edit/:id", editService);

  app.post("/admin/service/:id/delete", deleteService);
}
