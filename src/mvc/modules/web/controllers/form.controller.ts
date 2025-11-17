import { db } from "../../../../prisma";
import { AppError } from "../../../../shared/errors/app-error";
import { ICreateScheduleRequest } from "../dtos/service-request";

class CreateScheduleService {
  async execute({
    serviceId,
    clientName,
    clientPhone,
    appointmentDateTime,
  }: ICreateScheduleRequest) {
    // 1. Validação Básica
    if (!serviceId || !clientName || !clientPhone || !appointmentDateTime) {
      throw new AppError(
        "Todos os campos de agendamento são obrigatórios.",
        400
      );
    }

    // 2. Verifica se o Serviço existe
    // Reutilizando um Service existente para buscar um serviço por ID
    // ⚠️ Ajuste o GetByIdService se você o tiver em outro local ou se não existir
    const serviceExists = await new GetByIdService().execute(serviceId);

    if (!serviceExists) {
      throw new AppError("Serviço selecionado não encontrado.", 404);
    }

    // 3. Validação de Data/Horário (Exemplo Básico)
    const now = new Date();
    if (appointmentDateTime <= now) {
      throw new AppError("Não é possível agendar um horário no passado.", 400);
    }

    // 4. Criação do Agendamento
    // ⚠️ ATENÇÃO: Use o nome da sua tabela de agendamento no Prisma (ex: appointment ou schedule)
    const appointment = await db.appointment.create({
      data: {
        client_name: clientName,
        client_phone: clientPhone,
        appointment_date: appointmentDateTime,
        service_id: serviceId,
        // status padrão pode ser 'PENDING' ou 'CONFIRMED', dependendo do seu schema
      },
      select: {
        id: true,
        appointment_date: true,
        service: {
          select: { name: true },
        },
      },
    });

    return appointment;
  }
}

// Garanta que a exportação siga o padrão de instância única
const createScheduleService = new CreateScheduleService();
export { createScheduleService };
