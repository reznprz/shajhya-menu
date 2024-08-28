import ApiResponse from "../api/ApiResponse";

export class ApiResult<T> {
  private constructor(
    public readonly isSuccess: boolean,
    public readonly data?: T,
    public readonly error?: string,
    public readonly errorType?: ApiErrorType
  ) {}

  static success<T>(data: T): ApiResult<T> {
    return new ApiResult(true, data);
  }

  static error<T>(
    error: string,
    errorType: ApiErrorType = ApiErrorType.GENERAL,
    defaultValue: T
  ): ApiResult<T> {
    return new ApiResult<T>(false, defaultValue, error, errorType);
  }

  static fromApiResponse<D, R>(
    apiResponse: ApiResponse<D>,
    transformForSuccess: (data: D) => R,
    defaultValue: R
  ): ApiResult<R> {
    if (apiResponse.status === "success") {
      return ApiResult.success(transformForSuccess(apiResponse.data as D));
    } else {
      return ApiResult.createErrorFromApiResponse<R>(apiResponse, defaultValue);
    }
  }

  static createErrorFromApiResponse<R>(
    apiResponse: ApiResponse<any>,
    defaultValue: R
  ): ApiResult<R> {
    const { statusCode, message } = apiResponse;

    let errorMessage = message || "An error occurred";
    let errorType = ApiErrorType.GENERAL;

    switch (statusCode) {
      case 400:
        errorType = ApiErrorType.BAD_REQUEST;
        errorMessage = message || "Bad request";
        break;
      case 401:
        errorType = ApiErrorType.UNAUTHORIZED;
        errorMessage = message || "Unauthorized";
        break;
      case 403:
        errorType = ApiErrorType.FORBIDDEN;
        errorMessage = message || "Forbidden";
        break;
      case 404:
        errorType = ApiErrorType.NOT_FOUND;
        errorMessage = message || "Resource not found";
        break;
      case 500:
        errorType = ApiErrorType.INTERNAL_SERVER_ERROR;
        errorMessage = message || "Internal server error";
        break;
      case 502:
        errorType = ApiErrorType.BAD_GATEWAY;
        errorMessage = message || "Bad gateway";
        break;
      case 503:
        errorType = ApiErrorType.SERVICE_UNAVAILABLE;
        errorMessage = message || "Service unavailable";
        break;
      case 504:
        errorType = ApiErrorType.GATEWAY_TIMEOUT;
        errorMessage = message || "Gateway timeout";
        break;
      default:
        errorType = ApiErrorType.GENERAL;
        errorMessage = message || `Error with status code ${statusCode}`;
    }

    return ApiResult.error(errorMessage, errorType, defaultValue);
  }
}

export enum ApiErrorType {
  GENERAL = "GENERAL",
  NETWORK = "NETWORK",
  NOT_FOUND = "NOT_FOUND",
  BAD_REQUEST = "BAD_REQUEST",
  INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR",
  UNAUTHORIZED = "UNAUTHORIZED",
  FORBIDDEN = "FORBIDDEN",
  BAD_GATEWAY = "BAD_GATEWAY",
  SERVICE_UNAVAILABLE = "SERVICE_UNAVAILABLE",
  GATEWAY_TIMEOUT = "GATEWAY_TIMEOUT",
}
