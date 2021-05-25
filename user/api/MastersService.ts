import authenticatedClient from '../../common/api/authenticatedClient';
import { WorkingHours } from '../entities/working-hours';

const BASE_PATH = '/masters';

export class MastersService {
  static async addWorkingHours(workingHours: WorkingHours): Promise<void> {
    const url = `${BASE_PATH}/working-hours`;

    await authenticatedClient.put(url, workingHours);
  }
}
