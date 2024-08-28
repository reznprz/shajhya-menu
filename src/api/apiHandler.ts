import ApiResponse from "./ApiResponse";

export const apiHandler = async <T>(
  response: Response
): Promise<ApiResponse<T>> => {
  let responseData: T | null = null;

  try {
    responseData = (await response.json()) as T;
  } catch (error) {
    return ApiResponse.networkError<T>();
  }

  if (response.ok && responseData !== null) {
    return ApiResponse.success<T>(responseData, response.status);
  } else {
    const errorMessage =
      (responseData as { message?: string }).message ||
      "An unexpected error occurred";

    return ApiResponse.genericError<T>(response.status, errorMessage);
  }
};

function hasMessage(obj: any): obj is { message: string } {
  return obj && typeof obj.message === "string";
}
