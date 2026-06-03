import { TOAST_DEFAULT_DURATION } from "./../consts/config";
import { normalizeError } from "@/utils/errorHandler";
import { ERROR_KIND, type ErrorKind } from "@/consts/errorKinds";
import axios, { type AxiosRequestConfig, type AxiosResponse } from "axios";
import toast from "react-hot-toast";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "https://api.quocnva09.me/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const apiError = normalizeError(error);

    const GLOBAL_TOAST_KINDS: ErrorKind[] = [
      ERROR_KIND.NETWORK,
      ERROR_KIND.TIMEOUT,
      ERROR_KIND.SERVER,
    ];

    if (GLOBAL_TOAST_KINDS.includes(apiError.kind)) {
      toast.error(apiError.uiMessage, {
        id: apiError.kind,
        duration: TOAST_DEFAULT_DURATION,
      });
    }

    return Promise.reject(apiError);
  },
);

export async function post<T>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig,
): Promise<T> {
  const response: AxiosResponse<T> = await axiosClient.post(url, data, config);
  return response.data;
}

export async function get<T>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<T> {
  const response: AxiosResponse<T> = await axiosClient.get(url, config);
  return response.data;
}

export async function put<T>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig,
): Promise<T> {
  const response: AxiosResponse<T> = await axiosClient.put(url, data, config);
  return response.data;
}

export async function patch<T>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig,
): Promise<T> {
  const response: AxiosResponse<T> = await axiosClient.patch(url, data, config);
  return response.data;
}

export async function del<T>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<T> {
  const response: AxiosResponse<T> = await axiosClient.delete(url, config);
  return response.data;
}

export default axiosClient;
