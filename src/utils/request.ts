import axios, { AxiosRequestConfig, Method as axiosMethod } from 'axios';

interface ResponseData<T> {
  code?: number;
  success: boolean;
  message?: string;
  data?: T;
}

export type Method = axiosMethod;
export interface RequestConfig extends AxiosRequestConfig {}

export default function request(
  options: AxiosRequestConfig,
): Promise<ResponseData<any> | undefined> {
  return axios(options)
    .then((response) => {
      const { success, code, message, data } = response.data;

      if (!success) {
        throw new Error(message);
      } else {
        return Promise.resolve({
          success,
          message,
          code,
          data,
        });
      }
    })
    .catch((error) => {
      const { message } = error;
      return {
        success: false,
        message,
      };
    });
}
