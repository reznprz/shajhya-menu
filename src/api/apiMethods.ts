import ApiResponse from "./ApiResponse";
import { fetchApi } from "./fetchApi";

export const api = {
  get: async <T>(
    url: string,
    params?: Record<string, string>,
    headers?: Record<string, string>
  ): Promise<ApiResponse<T>> => {
    const queryString = params
      ? `?${new URLSearchParams(params).toString()}`
      : "";

    return await fetchApi<T>(`${url}${queryString}`, {
      method: "GET",
      headers,
    });
  },

  post: async <T>(
    url: string,
    body: any,
    headers?: Record<string, string>
  ): Promise<ApiResponse<T>> => {
    return await fetchApi<T>(url, {
      method: "POST",
      body: JSON.stringify(body),
      headers,
    });
  },

  put: async <T>(
    url: string,
    body: any,
    headers?: Record<string, string>
  ): Promise<ApiResponse<T>> => {
    return await fetchApi<T>(url, {
      method: "PUT",
      body: JSON.stringify(body),
      headers,
    });
  },

  delete: async <T>(
    url: string,
    headers?: Record<string, string>
  ): Promise<ApiResponse<T>> => {
    return await fetchApi<T>(url, {
      method: "DELETE",
      headers,
    });
  },
};
