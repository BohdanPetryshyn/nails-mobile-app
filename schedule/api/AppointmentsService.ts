import {
  Appointment,
  AppointmentCreateRequest,
} from '../../user/entities/appointment';
import authenticatedClient from '../../common/api/authenticatedClient';

const BASE_PATH = '/appointments';

export class AppointmentsService {
  static async getAppointmentsByMasterEmail(
    masterEmail: string,
    from: Date,
    to: Date,
  ): Promise<Appointment[]> {
    const url = `${BASE_PATH}/master`;

    const appointmentsResponse = await authenticatedClient.get(url, {
      params: {
        from,
        to,
      },
    });

    return appointmentsResponse.data;
  }

  static async getAppointmentsByClientEmail(
    clientEmail: string,
    from: Date,
    to: Date,
  ): Promise<Appointment[]> {
    const url = `${BASE_PATH}/client`;

    const appointmentsResponse = await authenticatedClient.get(url, {
      params: {
        from,
        to,
      },
    });

    return appointmentsResponse.data;
  }

  static async createAppointment(
    createRequest: AppointmentCreateRequest,
  ): Promise<Appointment> {
    const url = BASE_PATH;

    const appointmentResponse = await authenticatedClient.post(
      url,
      createRequest,
    );

    return appointmentResponse.data;
  }
}
