import { db } from "../../../../prisma";
import { AppError } from "../../../../shared/errors/app-error";

class DeleteAppointmentService {
  async execute(appointment_id: string) {
    // 1. Verificar se o agendamento existe
    const appointmentExists = await db.appointment.findUnique({
      where: { id: appointment_id },
    });

    if (!appointmentExists) {
      throw new AppError("Agendamento não encontrado.", 404);
    }

    // 2. Verificar se o agendamento pode ser deletado (se estiver confirmado ou agendado, ele pode ser deletado)
    if (appointmentExists.status) {
      throw new AppError("Agendamento confirmado não pode ser deletado.", 400);
    }

    // 3. Deletar o agendamento
    const appointment = await db.appointment.delete({
      where: { id: appointment_id },
    });

    return appointment;
  }
}

export { DeleteAppointmentService };
