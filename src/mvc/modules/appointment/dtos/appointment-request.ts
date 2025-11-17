export interface ICreateAppointmentRequest {
  serviceId: string;
  clientName: string;
  clientPhone: string;
  appointmentDateTime: Date;
}

export interface IUpdateAppointmentRequest {
  appointment_id: string;
  status?: boolean;
  draft?: boolean;
  clientName?: string;
  clientPhone?: string;
  serviceId?: string;
}
