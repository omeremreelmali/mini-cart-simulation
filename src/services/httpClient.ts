
import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';
import { BASE_URL } from '../config/endpoints';


class HttpClient {
  private axiosInstance: AxiosInstance;

  constructor(baseURL?: string) {
    this.axiosInstance = axios.create({
      baseURL: baseURL ? baseURL : BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.axiosInstance.get(url, config);
  }

  public async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return this.axiosInstance.post(url, data, config);
  }

  public async postMultipart<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const multipartConfig = {
      ...config,
      headers: {
        Accept: 'text/plain',
        'Content-Type': 'multipart/form-data',
        ...config?.headers,
      },
    };

    return this.axiosInstance.post(url, data, multipartConfig);
  }

  public async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return this.axiosInstance.put(url, data, config);
  }

  public async putMultipart<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const multipartConfig = {
      ...config,
      headers: {
        'Content-Type': 'multipart/form-data',
        ...config?.headers,
      },
    };

    return this.axiosInstance.put(url, data, multipartConfig);
  }

  public async patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return this.axiosInstance.patch(url, data, config);
  }

  public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.axiosInstance.delete(url, config);
  }
}

export const httpClient = new HttpClient();
export default HttpClient;
