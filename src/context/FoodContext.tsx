import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useCallback,
  useMemo,
} from "react";
import { Food } from "model/Api";
import { StateType, useApiState } from "util/State";
import { foodService } from "service/FoodService";

interface FoodContextProps {
  subCategoryNames: string[];
  foodList: Food[];
  fetchFood: () => Promise<void>;
  foodState: StateType;
}

const FoodContext = createContext<FoodContextProps | undefined>(undefined);

interface FoodProviderProps {
  children: ReactNode;
}

export const FoodProvider: React.FC<FoodProviderProps> = ({ children }) => {
  const foodState = useApiState();
  const [subCategoryNames, setSubCategoryNames] = useState<string[]>([]);
  const [foodList, setFoodList] = useState<Food[]>([]);

  const fetchFood = useCallback(async () => {
    if (foodState.state === StateType.Loading || foodList.length > 0) {
      // Already loading or data exists; no need to fetch again
      return;
    }

    foodState.loading();

    try {
      const result = await foodService.getFoods();

      if (result.isSuccess) {
        const foods = result.data?.payload || [];
        const subCategoryNames = [
          ...new Set(
            foods
              .map((food) => food.categoryNameTwo)
              .filter((value): value is string => value !== null)
          ),
        ];
        setSubCategoryNames(subCategoryNames);
        setFoodList(foods);
        foodState.success();
      } else {
        const errorMessage = `${result.error || "Failed to fetch foods"}${
          result.errorType ? ` | ${result.errorType}` : ""
        }`;
        foodState.failure(errorMessage);
      }
    } catch (error) {
      foodState.failure("An unexpected error occurred while fetching foods.");
    }
  }, [foodState, foodList.length]);

  const value: FoodContextProps = useMemo(
    () => ({
      subCategoryNames,
      foodList,
      fetchFood,
      foodState: foodState.state,
    }),
    [subCategoryNames, foodList, fetchFood, foodState.state]
  );

  return <FoodContext.Provider value={value}>{children}</FoodContext.Provider>;
};

export const useFoodContext = (): FoodContextProps => {
  const context = useContext(FoodContext);
  if (!context) {
    throw new Error("useFoodContext must be used within a FoodProvider");
  }
  return context;
};
