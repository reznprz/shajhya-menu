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
    // Extract error message from the responseData object
    const errorMessage =
      (responseData as any).error || // Check if there's an 'error' property
      (responseData as any).message || // Check if there's a 'message' property
      "An unexpected error occurred"; // Fallback to a generic message

    return ApiResponse.genericError<T>(response.status, errorMessage);
  }
};
