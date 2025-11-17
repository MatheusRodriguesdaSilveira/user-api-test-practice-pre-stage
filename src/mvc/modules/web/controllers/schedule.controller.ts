// src/mvc/modules/web/controllers/schedule.controller.ts

import { FastifyReply, FastifyRequest } from "fastify";
import { GetByIdService } from "../../service/services/get-by-id.service";
import { createAppointmentService } from "../../appointment/services/create.service";
import { AppError } from "../../../../shared/errors/app-error";
import { z } from "zod";

// Tipagem para o GET (parâmetro de rota)
interface ScheduleRequest {
  Params: {
    serviceId: string;
  };
}

// Tipagem para o POST (dados do formulário)
// A validação completa deve estar no Service/API, mas aqui usamos o DTO do formulário
interface CreateScheduleBody {
  serviceId: string;
  clientName: string;
  clientPhone: string;
  date: string;
  time: string;
}

// --- 1. CONTROLLER para Exibir o Formulário (GET) ---
export async function scheduleFormController(
  request: FastifyRequest<ScheduleRequest>,
  reply: FastifyReply
) {
  const { serviceId } = request.params;

  try {
    // Busca os detalhes do serviço para mostrar na página
    const service = await new GetByIdService().execute(serviceId);

    if (!service) {
      return reply
        .status(404)
        .view("error", { title: "404", message: "Serviço não encontrado." });
    }

    // 🚨 RENDERIZA A VIEW: Use o caminho onde você colocou o formulário (service/form ou schedule/form)
    return reply.view("service/form", {
      title: `Agendar: ${service.name}`,
      service: service,
    });
  } catch (error) {
    console.error("Erro ao carregar o formulário de agendamento:", error);
    return reply.status(500).send("Erro interno ao carregar o formulário.");
  }
}

// --- 2. CONTROLLER para Processar o Formulário (POST) ---
export async function createScheduleController(
  request: FastifyRequest<{ Body: CreateScheduleBody }>,
  reply: FastifyReply
) {
  const { serviceId, clientName, date, time, clientPhone } = request.body;

  try {
    // Combina data e hora, e valida a string antes de passar para o Date
    const appointmentDateTime = new Date(`${date}T${time}:00.000Z`);

    // Chama o Service API que salva a Appointment e o Item
    const appointment = await createAppointmentService.execute({
      serviceId,
      clientName,
      clientPhone,
      appointmentDateTime,
    });

    // Redirecionamento de SUCESSO com dados de confirmação
    const nameParam = encodeURIComponent(appointment.client_name);
    const dateParam = encodeURIComponent(
      appointment.appointment_date.toISOString()
    );

    return reply.redirect(
      `/schedule/success?name=${nameParam}&date=${dateParam}`
    );
  } catch (error: any) {
    console.error("Erro ao criar agendamento via Web:", error);

    // Tratamento de erro para o usuário final
    let errorMessage = "Erro ao agendar. Tente novamente.";
    if (error instanceof AppError) {
      errorMessage = error.message;
    } else if (error instanceof z.ZodError) {
      errorMessage = "Dados inválidos no formulário.";
    }

    const errorParam = encodeURIComponent(errorMessage);
    // Redireciona de volta para a lista de serviços ou para o formulário com a mensagem de erro
    return reply.redirect(`/service?error=${errorParam}`);
  }
}
