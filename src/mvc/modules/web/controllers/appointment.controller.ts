import { FastifyReply, FastifyRequest } from "fastify";
import { AppError } from "../../../../shared/errors/app-error";
import { GetAppointmentsService } from "../../appointment/services/get-all.service";
import { CreateAppointmentService } from "../../appointment/services/create.service";
import { GetServicesService } from "../../service";
import { UpdateAppointmentService } from "../../appointment/services/update.service";
import { GetAppointmentByIdService } from "../../appointment/services/get-by-id.service";
import { DeleteAppointmentService } from "../../appointment/services/delete.service";

const getAppointmentsService = new GetAppointmentsService();
const createAppointmentService = new CreateAppointmentService();
const getServicesService = new GetServicesService();

export async function showAppointmentList(
  req: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const appointments = await getAppointmentsService.execute();

    return reply.view("appointment/list.ejs", {
      title: "Gerenciar Agendamentos",
      appointments,
    });
  } catch (error) {
    console.error("Erro ao carregar lista de agendamentos:", error);
    return reply
      .status(500)
      .send({ message: "Erro interno ao carregar dados." });
  }
}

export async function showAppointmentForm(
  req: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const services = await getServicesService.execute();

    return reply.view("appointment/create-appointment.ejs", {
      title: "Criar Novo Agendamento",
      services,
      error: undefined,
      formData: undefined,
    });
  } catch (error) {
    console.error("Erro ao carregar formulário de agendamento:", error);
    return reply
      .status(500)
      .send({ message: "Erro interno ao carregar dados." });
  }
}

export async function createAppointment(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const data = req.body as {
    serviceId: string;
    clientName: string;
    clientPhone: string;
    appointmentDateTime: string;
  };

  try {
    const appointmentDateObject = new Date(data.appointmentDateTime);
    if (isNaN(appointmentDateObject.getTime())) {
      throw new AppError(
        "Formato de data e hora de agendamento inválido.",
        400
      );
    }

    await createAppointmentService.execute({
      serviceId: data.serviceId,
      clientName: data.clientName,
      clientPhone: data.clientPhone,
      appointmentDateTime: appointmentDateObject,
    });

    return reply.redirect("/admin/appointments");
  } catch (error) {
    let errorMessage = "Falha ao criar agendamento. Tente novamente.";
    if (error instanceof AppError) {
      errorMessage = error.message;
    } else {
      console.error(error);
    }

    const services = await getServicesService.execute();

    return reply.view("appointment/create-appointment.ejs", {
      title: "Criar Novo Agendamento",
      services,
      error: errorMessage,
      formData: data,
    });
  }
}

export async function updateAppointment(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const { appointment_id } = req.params as { appointment_id: string };
  const data = req.body as {
    clientName?: string;
    clientPhone?: string;
    serviceId?: string;
    status?: string | boolean;
  };

  try {
    const updateAppointmentService = new UpdateAppointmentService();

    const updatedAppointment = await updateAppointmentService.execute({
      appointment_id,
      clientName: data.clientName,
      clientPhone: data.clientPhone,
      serviceId: data.serviceId,
      status: data.status === "true" || data.status === true ? true : false,
    });

    return reply.redirect("/admin/appointments");
  } catch (error) {
    console.error("Erro ao atualizar agendamento:", error);

    if (error instanceof AppError) {
      return reply.status(error.statusCode).send({ message: error.message });
    }

    return reply
      .status(500)
      .send({ message: "Erro interno ao atualizar agendamento." });
  }
}

export async function showEditAppointmentForm(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const { appointment_id } = req.params as { appointment_id: string };
  const getAppointmentByIdService = new GetAppointmentByIdService();

  try {
    const appointment = await getAppointmentByIdService.execute(appointment_id);
    const services = await getServicesService.execute();

    return reply.view("appointment/edit-appointment.ejs", {
      title: "Editar Agendamento",
      appointment,
      services,
      error: undefined,
    });
  } catch (error) {
    console.error("Erro ao carregar formulário de edição:", error);

    if (error instanceof AppError) {
      return reply.status(error.statusCode).send({ message: error.message });
    }

    return reply
      .status(500)
      .send({ message: "Erro ao carregar formulário de edição." });
  }
}

export async function deleteAppointment(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const { appointment_id } = req.params as { appointment_id: string };

  try {
    const deleteAppointmentService = new DeleteAppointmentService();
    await deleteAppointmentService.execute(appointment_id);

    return reply.redirect("/admin/appointments");
  } catch (error) {
    console.error("Erro ao deletar agendamento:", error);

    if (error instanceof AppError) {
      return reply.status(error.statusCode).send({ message: error.message });
    }

    return reply
      .status(500)
      .send({ message: "Erro interno ao deletar agendamento." });
  }
}
