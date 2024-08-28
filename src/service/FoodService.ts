import { foodApi, FoodApi } from "../api/FoodApi";
import { GetAllFoodsResponse } from "../model/Api";
import { ApiErrorType, ApiResult } from "./ApiResult";

class FoodService {
  private foodApi: FoodApi;

  constructor(foodApi: FoodApi) {
    this.foodApi = foodApi;
  }
  async getFoods(): Promise<ApiResult<GetAllFoodsResponse>> {
    const emptyObject = {} as GetAllFoodsResponse;
    try {
      const res = await this.foodApi.getFoods();

      return ApiResult.fromApiResponse(
        res,
        (data) => {
          return data as GetAllFoodsResponse;
        },
        emptyObject
      );
    } catch (error: any) {
      return ApiResult.error(
        error.message || "An unexpected error occurred",
        ApiErrorType.GENERAL,
        emptyObject
      );
    }
  }
}

export const foodService = new FoodService(foodApi);
