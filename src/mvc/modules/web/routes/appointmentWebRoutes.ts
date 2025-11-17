import { FastifyInstance } from "fastify";
import {
  createAppointment,
  deleteAppointment,
  showAppointmentForm,
  showAppointmentList,
  showEditAppointmentForm,
  updateAppointment,
} from "../controllers/appointment.controller";

export async function appointmentWebRoutes(app: FastifyInstance) {
  app.get("/admin/appointments", showAppointmentList);

  app.get("/admin/appointments/create", showAppointmentForm);

  app.post("/admin/appointments/create", createAppointment);

  app.post("/admin/appointments/:appointment_id/update", updateAppointment);

  app.get("/admin/appointments/edit/:appointment_id", showEditAppointmentForm);

  app.post("/admin/appointments/:appointment_id/delete", deleteAppointment);
}
