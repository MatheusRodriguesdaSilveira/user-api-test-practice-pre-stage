import { FastifyReply, FastifyRequest } from "fastify";
import { GetAppointmentsService } from "../../appointment/services/get-all.service";

export async function showDashboard(req: FastifyRequest, reply: FastifyReply) {
  try {
    const getAppointmentsService = new GetAppointmentsService();
    const appointments = await getAppointmentsService.execute();

    // Contagem de agendamentos
    const pendingCount = appointments.filter((a) => !a.status).length;
    const completedCount = appointments.filter((a) => a.status).length;

    // Receita total com base nos serviços concluídos
    const totalRevenue = appointments.reduce((sum, a) => {
      if (a.status && a.service?.price) {
        return sum + Number(a.service.price);
      }
      return sum;
    }, 0);

    return reply.view("admin/dashboard.ejs", {
      title: "Painel de Controle",
      pendingCount,
      completedCount,
      totalRevenue,
    });
  } catch (error) {
    console.error("Erro ao carregar o dashboard:", error);
    return reply.status(500).send({
      message: "Erro interno ao carregar o painel administrativo.",
    });
  }
}

export async function showHomePage(req: FastifyRequest, reply: FastifyReply) {
  try {
    return reply.view("web/home.ejs", {
      appName: "Sistema de Agendamentos",
      welcomeMessage: "Bem-vindo! Agende seu serviço com praticidade.",
    });
  } catch (error) {
    console.error("Erro ao carregar a página inicial:", error);
    return reply.status(500).send({
      message: "Erro interno ao carregar a página inicial.",
    });
  }
}
