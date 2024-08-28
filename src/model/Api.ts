export interface GetAllFoodsResponse extends BaseResponse {
  requestId: string | null;
  timeStamp: string | null;
  payload: Food[];
}

export interface BaseResponse {
  success: boolean;
  message?: string;
}

export interface Food {
  id: number;
  name: string;
  authorId: number | null;
  description: string | null;
  price: number;
  categoryId: number | null;
  categoryName: string | null;
  img: string | null;
  ingredients: string | null;
  calories: number | null;
  servingSize: string | null;
  priceTwo: number;
}
