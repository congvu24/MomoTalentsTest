import Api from '.';

export default class UserApi {
  apiClient = new Api('https://reqres.in/api');

  public async postLogin({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<string> {
    const response = await this.apiClient.post('/login', null, {
      email,
      password,
    });
    return response.token;
  }
}
