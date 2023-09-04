import type { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import axios from "axios";
export enum ContentTypeEnum {
  // json
  JSON = "application/json;charset=UTF-8",
  // form-data qs
  FORM_URLENCODED = "application/x-www-form-urlencoded;charset=UTF-8",
  // form-data  upload
  FORM_DATA = "multipart/form-data;charset=UTF-8",
}
const service: AxiosInstance = axios.create({
  baseURL: "/api",
  timeout: 10 * 1000, // 请求超时时间
  headers: { "Content-Type": ContentTypeEnum.JSON },
});

service.interceptors.request.use((config) => {
  return config;
});

service.interceptors.response.use(
  (response: AxiosResponse) => {
    const data = response.data;
    if (data.status === 200 || response.status === 200) {
      return data;
    } else {
      return Promise.reject(data);
    }
  },
  (err) => {
    return Promise.reject(err.response);
  }
);

export const request = {
  get<T = any>(url: string, data?: any): Promise<T> {
    return request.request("GET", url, { params: data });
  },
  post<T = any>(url: string, data?: any): Promise<T> {
    return request.request("POST", url, { data });
  },
  put<T = any>(url: string, data?: any): Promise<T> {
    return request.request("PUT", url, { data });
  },
  delete<T = any>(url: string, data?: any): Promise<T> {
    return request.request("DELETE", url, { params: data });
  },
  request<T = any>(method = "GET", url: string, data?: any): Promise<T> {
    return new Promise((resolve, reject) => {
      service({ method, url, ...data })
        .then((res) => {
          resolve(res as unknown as Promise<T>);
        })
        .catch((e: Error | AxiosError) => {
          reject(e);
        });
    });
  },
};
