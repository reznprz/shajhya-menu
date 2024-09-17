import { useEffect, useCallback, useRef } from "react";
import { useNavigation } from "context/NavigationContext";
import { useFoodContext } from "context/FoodContext";
import { StateType } from "util/State";

export function useFood() {
  const { subCategoryNames, foodList, fetchFood, foodState } = useFoodContext();
  const { goToFoodItem } = useNavigation();

  // Ref to track if fetchFood has been called
  const hasFetchedRef = useRef(false);

  useEffect(() => {
    if (
      !hasFetchedRef.current &&
      foodList.length === 0 &&
      foodState !== StateType.Loading
    ) {
      fetchFood();
      hasFetchedRef.current = true;
    }
  }, [fetchFood, foodList.length, foodState]);

  const onSubCategoryClick = useCallback(
    (subCategoryName: string) => {
      const filteredFoods = foodList.filter(
        (food) => food.categoryNameTwo === subCategoryName
      );
      const subCategoryMap = new Map([[subCategoryName, filteredFoods]]);
      goToFoodItem(subCategoryMap);
    },
    [foodList, goToFoodItem]
  );

  return {
    foodState,
    subCategoryNames,
    foodList,
    onSubCategoryClick,
  };
}
