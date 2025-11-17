import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { CreateAppointmentSchema } from "../schema/appointment";
import { CreateAppointmentService } from "../services/create.service";
import { AppError } from "../../../../shared/errors/app-error";

type AppointmentBody = z.infer<typeof CreateAppointmentSchema>;

class CreateAppointmentController {
  async handle(req: FastifyRequest, reply: FastifyReply) {
    try {
      // 1. Validação e Parse do corpo da requisição
      const {
        serviceId,
        clientName,
        clientPhone,
        appointmentDateTime: dateString,
      } = CreateAppointmentSchema.parse(req.body as AppointmentBody);

      // 2. Formata a data para objeto Date (como o Service espera)
      const appointmentDateTime = new Date(dateString);

      // 3. Instancia e Executa o Service
      const createAppointmentService = new CreateAppointmentService();

      const appointment = await createAppointmentService.execute({
        serviceId,
        clientName,
        clientPhone,
        appointmentDateTime,
      });

      // 4. Retorno de sucesso (201 Created)
      return reply.status(201).send(appointment);
    } catch (error: any) {
      // 5. Tratamento de Erros

      // Erros de validação Zod
      if (error instanceof z.ZodError) {
        return reply.status(400).send({
          error: "Validation Failed",
          issues: error.issues.map((issue) => ({
            field: issue.path.join("."),
            message: issue.message,
          })),
        });
      }

      // Erros de Negócio (ex: Serviço não encontrado, Horário ocupado)
      if (error instanceof AppError) {
        return reply.status(error.statusCode).send({ error: error.message });
      }

      // Erro Genérico 500
      console.error("Erro interno ao criar agendamento:", error);
      return reply
        .status(500)
        .send({ error: "Internal Server Error", message: error.message });
    }
  }
}

export { CreateAppointmentController };
