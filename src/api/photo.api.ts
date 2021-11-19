import Photo from '@/model/photo.model';
import Api from '.';

export default class PhotoApi {
  apiClient = new Api('https://jsonplaceholder.typicode.com');

  public async getListPhoto(): Promise<Photo[]> {
    const result = await this.apiClient.get('/photos', null);
    return result;
  }

  public async getPhotoDetail(id: number): Promise<Photo> {
    const result = await this.apiClient.get(`/photos/${id}`, null);
    return result;
  }
}
