import { FastifyReply, FastifyRequest } from "fastify";

// Tipagem para os parâmetros que vêm na URL
interface SuccessQuery {
  Querystring: {
    name?: string;
    date?: string;
  };
}

export async function successController(
  request: FastifyRequest<SuccessQuery>,
  reply: FastifyReply
) {
  const { name, date } = request.query;

  // Converte a data ISO de volta para um formato legível
  const formattedDate = date
    ? new Date(date).toLocaleString("pt-BR", {
        dateStyle: "full",
        timeStyle: "short",
      })
    : "Detalhe não fornecido";

  return reply.view("schedule/success", {
    clientName: name || "Prezado(a) Cliente", // Nome padrão caso não seja fornecido
    appointmentDate: formattedDate,
  });
}
