import authenticatedClient from '../../common/api/authenticatedClient';
import { WorkingHours } from '../entities/working-hours';
import { Filter } from '../../master-search/entities/Filter';
import { MasterSearchResult } from '../../master-search/entities/MasterSearchResult';

const BASE_PATH = '/masters';

export class MastersService {
  static async addWorkingHours(workingHours: WorkingHours): Promise<void> {
    const url = `${BASE_PATH}/working-hours`;

    await authenticatedClient.put(url, workingHours);
  }

  static async search(filter: Filter): Promise<MasterSearchResult[]> {
    const url = `${BASE_PATH}/search`;

    const searchResultsResponse = await authenticatedClient.post(url, filter);

    return searchResultsResponse.data;
  }
}
