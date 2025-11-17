import { db } from "../../../../prisma";
import { AppError } from "../../../../shared/errors/app-error";
import { ICreateAppointmentRequest } from "../dtos/appointment-request";

class CreateAppointmentService {
  async execute({
    serviceId,
    clientName,
    clientPhone,
    appointmentDateTime,
  }: ICreateAppointmentRequest) {
    if (!serviceId || !clientName || !appointmentDateTime) {
      throw new AppError("Dados de agendamento incompletos.", 400);
    }

    // 1️⃣ Verifica se o serviço existe
    const serviceExists = await db.service.findUnique({
      where: { id: serviceId },
    });

    if (!serviceExists) {
      throw new AppError("Serviço selecionado não encontrado.", 404);
    }

    // 2️⃣ Cria o agendamento diretamente com o relacionamento service_id
    const appointment = await db.appointment.create({
      data: {
        client_name: clientName,
        client_phone: clientPhone,
        appointment_date: appointmentDateTime,
        status: false,
        draft: false,
        name: serviceExists.name,
        service_id: serviceId,
      },
    });

    return appointment;
  }
}

export { CreateAppointmentService };
