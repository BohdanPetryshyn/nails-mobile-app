import authenticatedClient from '../../common/api/authenticatedClient';
import { PublishedPhoto } from '../entities/PublishedPhoto';

const BASE_PATH = '/photos';

export class PhotosService {
  static async create(photoUrl: string): Promise<void> {
    await authenticatedClient.post(BASE_PATH, { photoUrl });
  }

  static async getAll(): Promise<PublishedPhoto[]> {
    const photosResponse = await authenticatedClient.get(BASE_PATH);
    return photosResponse.data;
  }
}
