import FoodMenu from "pages/foodMenu/FoodMenu";
import { FoodMenuItem } from "pages/foodMenu/FoodMenuItem";
import React from "react";

interface RouteConfig {
  path: string;
  element: React.ReactNode;
}

export const ROUTES: RouteConfig[] = [
  {
    path: "/",
    element: React.createElement(FoodMenu),
  },
  {
    path: "/foodItem",
    element: React.createElement(FoodMenuItem),
  },
];
