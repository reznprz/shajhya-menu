import { PATHS } from "constants/router/paths";
import { useNavigate } from "react-router-dom";

const useAppNavigation = () => {
  const navigate = useNavigate();

  const goToMenu = () => {
    navigate(PATHS.MENU);
  };

  const goToFoodItem = (itemId?: string) => {
    if (itemId) {
      navigate(`${PATHS.FOOD_ITEM}`);
    } else {
      navigate(PATHS.FOOD_ITEM);
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
