
import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';
import { BASE_URL } from '../config/endpoints';
import { store } from '../store/store';
import { startRequest, finishRequest } from '../store/slices/appSlice';
import { handleHttpError } from './errorHandler';

class HttpClient {
  private axiosInstance: AxiosInstance;

  constructor(baseURL?: string) {
    this.axiosInstance = axios.create({
      baseURL: baseURL ? baseURL : BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.axiosInstance.interceptors.request.use((config) => {
      store.dispatch(startRequest());
      return config;
    });

    this.axiosInstance.interceptors.response.use(
      (response) => {
        setTimeout(() => {
          store.dispatch(finishRequest());
        }, 500);
        return response;
      },
      handleHttpError,
    );
  }

  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.axiosInstance.get(url, config);
  }

  public async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.axiosInstance.post(url, data, config);
  }

  public async postMultipart<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
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

  public async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.axiosInstance.put(url, data, config);
  }

  public async putMultipart<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    const multipartConfig = {
      ...config,
      headers: {
        'Content-Type': 'multipart/form-data',
        ...config?.headers,
      },
    };

    return this.axiosInstance.put(url, data, multipartConfig);
  }

  public async patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.axiosInstance.patch(url, data, config);
  }

  public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.axiosInstance.delete(url, config);
  }
}

export const httpClient = new HttpClient();
export default HttpClient;
