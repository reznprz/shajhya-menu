class ApiResponse<T> {
  data: T | null;
  status: "success" | "error" | "network_error";
  statusCode: number;
  message?: string;

  private constructor(
    data: T | null,
    status: "success" | "error" | "network_error",
    statusCode: number,
    message?: string
  ) {
    this.data = data;
    this.status = status;
    this.statusCode = statusCode;
    this.message = message;
  }

  static networkError<T>(): ApiResponse<T> {
    return new ApiResponse<T>(
      null,
      "network_error",
      0,
      "Invalid JSON response or network error"
    );
  }

  static genericError<T>(statusCode: number, message: string): ApiResponse<T> {
    return new ApiResponse<T>(null, "error", statusCode, message);
  }

  static success<T>(
    data: T,
    statusCode: number = 200,
    message: string = ""
  ): ApiResponse<T> {
    return new ApiResponse<T>(data, "success", statusCode, message);
  }
}

export default ApiResponse;
