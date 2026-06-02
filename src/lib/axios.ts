import axios, {
  AxiosError,
  type AxiosRequestConfig,
  type AxiosResponse,
} from "axios";

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
  (error: AxiosError) => {
    // API thất bại -> Bắt lỗi và thông báo

    // 1. Lỗi mạng hoặc Server không phản hồi
    if (!error.response) {
      // toast.error("Không thể kết nối đến máy chủ. Vui lòng thử lại!");
      console.error("Network Error:", error);
      return Promise.reject(error);
    }

    const status = error.response.status;
    const data = error.response.data as any;

    // 2. Xử lý theo HTTP Status Code (Dành cho Public API)
    switch (status) {
      case 404:
        console.error("Resource not found:", error.config?.url);
        break;

      case 422: // Lỗi Validation từ Laravel
        const firstErrorKey = Object.keys(data.errors)[0];
        const firstErrorMessage = data.errors[firstErrorKey][0];
        // toast.error(firstErrorMessage || "Dữ liệu không hợp lệ!");
        console.error("Validation Error:", firstErrorMessage);
        break;

      case 500:
      case 502:
      case 503:
        // toast.error("Hệ thống đang bảo trì. Vui lòng quay lại sau!");
        console.error("Server Error:", data.message);
        break;

      default:
        // toast.error(data.message || "Đã có lỗi xảy ra!");
        console.error("API Error:", data.message);
        break;
    }

    // Luôn reject để các hàm get, post bên dưới quăng lỗi tiếp ra Component
    return Promise.reject(error);
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
