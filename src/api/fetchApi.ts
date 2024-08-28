import { apiHandler } from "./apiHandler";
import ApiResponse from "./ApiResponse";

const APP_API_URL = process.env.REACT_APP_API_BASE_URL || "";

export const fetchApi = async <T>(
  url: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> => {
  try {
    const response = await fetch(`${APP_API_URL}${url}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    return await apiHandler<T>(response);
  } catch (error: any) {
    return {
      data: null,
      status: "error",
      statusCode: 500,
      message: error.message || "Network error",
    };
  }
};
