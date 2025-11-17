import { db } from "../../../../prisma";
import { AppError } from "../../../../shared/errors/app-error";

export interface UpdateAppointmentInput {
  appointment_id: string;
  status?: boolean;
  draft?: boolean;
  clientName?: string;
  clientPhone?: string;
  serviceId?: string;
}

export class UpdateAppointmentService {
  async execute({
    appointment_id,
    status,
    draft,
    clientName,
    clientPhone,
    serviceId,
  }: UpdateAppointmentInput) {
    const appointment = await db.appointment.findUnique({
      where: { id: appointment_id },
    });

    if (!appointment) {
      throw new AppError("Agendamento não encontrado.", 404);
    }

    const dataToUpdate: any = {};

    if (typeof status !== "undefined") dataToUpdate.status = status;
    if (typeof draft !== "undefined") dataToUpdate.draft = draft;
    if (clientName) dataToUpdate.client_name = clientName;
    if (clientPhone) dataToUpdate.client_phone = clientPhone;
    if (serviceId) dataToUpdate.service_id = serviceId;

    if (Object.keys(dataToUpdate).length === 0) {
      throw new AppError("Nenhum dado para atualizar.", 400);
    }

    const updatedAppointment = await db.appointment.update({
      where: { id: appointment_id },
      data: dataToUpdate,
      include: {
        service: {
          select: { id: true, name: true, price: true },
        },
      },
    });

    return updatedAppointment;
  }
}
