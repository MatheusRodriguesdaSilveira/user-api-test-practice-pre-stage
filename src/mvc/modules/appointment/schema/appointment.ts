import { z } from "zod";

const CreateAppointmentSchema = z.object({
  serviceId: z.string().uuid("ID do serviço inválido."),
  clientName: z
    .string()
    .min(3, "Nome do cliente deve ter pelo menos 3 caracteres."),
  clientPhone: z.string().min(1, "Phone is required"),
  appointmentDateTime: z
    .string()
    .datetime({ message: "Formato de data/hora inválido." }),
});

export { CreateAppointmentSchema };
