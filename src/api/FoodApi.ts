import { GetAllFoodsResponse } from "../model/Api";
import { api } from "./apiMethods";
import ApiResponse from "./ApiResponse";

export interface FoodApi {
  getFoods(): Promise<ApiResponse<GetAllFoodsResponse>>;
}

export class FoodApiImpl implements FoodApi {
  async getFoods(): Promise<ApiResponse<GetAllFoodsResponse>> {
    const response = await api.get<GetAllFoodsResponse>("/api/foods/v2");
    return response;
  }
}

export const foodApi = new FoodApiImpl();
