import React, { createContext, useContext, ReactNode, useState } from "react";
import { Food } from "model/Api";

interface FoodContextType {
  foodList: Food[];
}

const FoodContext = createContext<FoodContextType | undefined>(undefined);

interface FoodProviderProps {
  children: ReactNode;
}

export const FoodProvider: React.FC<FoodProviderProps> = ({ children }) => {
  // TODO: currently not in used, maybe in future if needed
  const [foodList, setFoodList] = useState<Food[]>([]);

  return (
    <FoodContext.Provider value={{ foodList }}>{children}</FoodContext.Provider>
  );
};

export const useFoodContext = (): FoodContextType => {
  const context = useContext(FoodContext);
  if (!context) {
    throw new Error("useFoodContext must be used within a FoodProvider");
  }
  return context;
};
