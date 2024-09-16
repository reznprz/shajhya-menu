import { useNavigate } from "react-router-dom";
import { PATHS } from "../router/routes";

const useAppNavigation = () => {
  const navigate = useNavigate();

  const goToMenu = () => {
    navigate(PATHS.FOOD_MENU);
  };

  const goToFoodItem = () => {
    navigate(PATHS.FOOD_MENU_ITEM);
  };

  const goToItem = (itemId?: string) => {
    if (itemId) {
      navigate(PATHS.ITEM.replace(":id", itemId));
    } else {
      navigate(PATHS.HOME); // Redirect to home or a default page
    }
  };

  const goToHome = () => {
    navigate(PATHS.HOME);
  };

  return {
    goToMenu,
    goToFoodItem,
    goToHome,
  };
};

export default useAppNavigation;
