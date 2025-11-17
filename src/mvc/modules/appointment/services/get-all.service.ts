import { db } from "../../../../prisma";

class GetAppointmentsService {
  async execute() {
    const appointments = await db.appointment.findMany({
      include: {
        service: {
          select: {
            id: true,
            name: true,
            price: true,
          },
        },
      },
      orderBy: {
        appointment_date: "desc",
      },
    });

    return appointments;
  }
}

export { GetAppointmentsService };
