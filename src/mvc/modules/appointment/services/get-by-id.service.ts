import { db } from "../../../../prisma";
import { AppError } from "../../../../shared/errors/app-error";

class GetAppointmentByIdService {
  async execute(appointment_id: string) {
    if (!appointment_id) {
      throw new AppError("ID do agendamento é obrigatório.", 400);
    }

    const appointment = await db.appointment.findUnique({
      where: { id: appointment_id },
      include: {
        service: {
          select: { id: true, name: true, price: true },
        },
      },
    });

    if (!appointment) {
      throw new AppError("Agendamento não encontrado.", 404);
    }

    return appointment;
  }
}

export { GetAppointmentByIdService };
