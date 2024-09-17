import { useNavigate } from "react-router-dom";
import { PATHS } from "../../constants/router/routes";
import { Food } from "model/Api";

const useAppNavigation = () => {
  const navigate = useNavigate();

  const goToMenu = () => {
    navigate(PATHS.FOOD_MENU);
  };

  const goToFoodItem = (subCategoryMap: Map<string, Food[]>) => {
    navigate(PATHS.FOOD_MENU_ITEM, { state: { subCategoryMap } });
  };

  const goToItem = (itemId?: string) => {
    if (itemId) {
      navigate(PATHS.ITEM.replace(":id", itemId));
    } else {
      navigate(PATHS.HOME); // Redirect to home or a fallback page
    }
  };

  const goToHome = () => {
    navigate(PATHS.HOME);
  };

  // Generic function to handle navigation with fallback (for more flexibility)
  const navigateTo = (path: string, fallback: string = PATHS.HOME) => {
    try {
      navigate(path);
    } catch (error) {
      navigate(fallback);
    }
  };

  return {
    goToMenu,
    goToFoodItem,
    goToItem,
    goToHome,
    navigateTo, // Added for generic navigation needs
  };
};

export default useAppNavigation;
