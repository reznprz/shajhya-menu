import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { foodService } from "../service/FoodService";
import { StateType, useApiState } from "../util/State";
import { Food } from "../model/Api";
import useAppNavigation from "./navigation/navigation";

export function useFood() {
  const foodState = useApiState();
  const { goToFoodItem } = useAppNavigation();
  const [subCategoryNames, setSubCategoryNames] = useState<string[]>([]);
  const [foodList, setFoodList] = useState<Food[]>([]);

  // Ref to track if fetch has been called
  const hasFetchedRef = useRef(false);

  const fetchAndSetFood = async () => {
    console.log("fetchAndSetFood");
    foodState.loading();

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
  };

  useEffect(() => {
    if (
      !hasFetchedRef.current &&
      foodList.length === 0 &&
      foodState.state !== StateType.Loading
    ) {
      hasFetchedRef.current = true;
      fetchAndSetFood();
    }
  }, [fetchAndSetFood, foodList.length, foodState.state]);

  const categoryMap = useMemo(() => {
    const map = new Map<string, Food[]>();
    foodList.forEach((food) => {
      const category = food.categoryNameTwo;
      if (category) {
        if (!map.has(category)) {
          map.set(category, []);
        }
        map.get(category)!.push(food);
      }
    });
    return map;
  }, [foodList]);

  const onSubCategoryClick = useCallback(
    (subCategoryName: string) => {
      const filteredFoods = categoryMap.get(subCategoryName) || [];
      const subCategoryMap = new Map([[subCategoryName, filteredFoods]]);
      goToFoodItem(subCategoryMap);
    },
    [categoryMap, goToFoodItem]
  );

  return {
    foodState,
    subCategoryNames,
    foodList,
    onSubCategoryClick,
  };
}
