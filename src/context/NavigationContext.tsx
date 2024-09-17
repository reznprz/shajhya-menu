import React, {
  createContext,
  ReactNode,
  useContext,
  useCallback,
  useMemo,
} from "react";
import { useNavigate } from "react-router-dom";
import { Food } from "model/Api";
import { PATHS } from "../constants/router/routes";

interface NavigationContextProps {
  goToMenu: () => void;
  goToFoodItem: (subCategoryMap: Map<string, Food[]>) => void;
  goToItem: (itemId?: string) => void;
  goToHome: () => void;
  navigateTo: (path: string, fallback?: string) => void;
  goBack: () => void;
}

const NavigationContext = createContext<NavigationContextProps | undefined>(
  undefined
);

interface NavigationProviderProps {
  children: ReactNode;
}

export const NavigationProvider: React.FC<NavigationProviderProps> = ({
  children,
}) => {
  const navigate = useNavigate();

  const goToMenu = useCallback(() => {
    navigate(PATHS.QR_MENU);
  }, [navigate]);

  const goToFoodItem = useCallback(
    (subCategoryMap: Map<string, Food[]>) => {
      navigate(PATHS.QR_FOOD_ITEM, { state: { subCategoryMap } });
    },
    [navigate]
  );

  const goToItem = useCallback(
    (itemId?: string) => {
      if (itemId) {
        navigate(PATHS.ITEM.replace(":id", itemId));
      } else {
        navigate(PATHS.HOME); // Redirect to home or a fallback page
      }
    },
    [navigate]
  );

  const goToHome = useCallback(() => {
    navigate(PATHS.HOME);
  }, [navigate]);

  const navigateTo = useCallback(
    (path: string, fallback: string = PATHS.HOME) => {
      try {
        navigate(path);
      } catch (error) {
        navigate(fallback);
      }
    },
    [navigate]
  );

  const goBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const value: NavigationContextProps = useMemo(
    () => ({
      goToMenu,
      goToFoodItem,
      goToItem,
      goToHome,
      navigateTo,
      goBack,
    }),
    [goToMenu, goToFoodItem, goToItem, goToHome, navigateTo, goBack]
  );

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = (): NavigationContextProps => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error("useNavigation must be used within a NavigationProvider");
  }
  return context;
};
