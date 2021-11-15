import axios, { AxiosRequestConfig, Method as axiosMethod } from 'axios';
import { cloneDeep, isEmpty } from 'lodash';
import pathToRegexp from 'path-to-regexp';
import qs from 'qs';

interface ResponseData<T> {
  code?: number;
  success: boolean;
  message?: string;
  data?: T;
}

export type Method = axiosMethod;
export interface RequestConfig extends AxiosRequestConfig {}

function matchRestfulUrl(url: string, data: any): string {
  let newUrl = url;

  try {
    let domain = '';
    const urlMatch = newUrl.match(/[a-zA-z]+:\/\/[^/]*/);

    if (urlMatch) {
      [domain] = urlMatch;
      newUrl = newUrl.slice(domain.length);
    }

    const match = pathToRegexp.parse(newUrl);
    newUrl = pathToRegexp.compile(newUrl)(data);

    for (const item of match) {
      if (item instanceof Object && item.name in data) {
        delete data[item.name];
      }
    }

    newUrl = domain + newUrl;
  } catch (e) {
    newUrl = url;
  }
  return newUrl;
}

export default function request(
  options: AxiosRequestConfig,
): Promise<ResponseData<any> | undefined> {
  const { data, url, method = 'get' } = options;
  if (!url) {
    throw new Error('request url none');
  }
  const cloneData = cloneDeep(data);

  const newUrl = matchRestfulUrl(url, cloneData);

  options.url =
    method.toLocaleLowerCase() === 'get'
      ? `${newUrl}${isEmpty(cloneData) ? '' : '?'}${qs.stringify(cloneData)}`
      : newUrl;
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
