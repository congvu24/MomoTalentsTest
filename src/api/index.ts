import {store} from '@/redux/store';
import axios, {AxiosInstance} from 'axios';

export default class Api {
  client!: AxiosInstance;

  public constructor(baseURL: string) {
    this.client = axios.create({
      baseURL: baseURL,
    });
    this.client.interceptors.request.use(
      function (config) {
        const state = store.getState();
        const token: string | undefined | null = state.auth.token;
        if (config.headers && token) {
          config.headers['token'] = token;
        }
        return config;
      },
      function (error) {
        return Promise.reject(error);
      },
    );
  }

  public async get(endpoint: string, params: any): Promise<any> {
    const response = await this.client.get(endpoint, {params: params});
    console.log(response.request);
    return response.data;
  }

  public async post(endpoint: string, params: any, body: any): Promise<any> {
    try {
      const response = await this.client.post(endpoint, {
        ...body,
      });
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  // implement patch put delete later
}
