import authenticatedClient from '../../common/api/authenticatedClient';
import { Client } from '../entities/client';

const BASE_PATH = '/clients';

export class ClientsService {
  static async search(query: string): Promise<Client[]> {
    const url = `${BASE_PATH}/search`;

    const searchResultsResponse = await authenticatedClient.get(url, {
      params: { query },
    });

    return searchResultsResponse.data;
  }
}
