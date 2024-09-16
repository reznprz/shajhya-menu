import React, { lazy } from "react";
import { RouteObject } from "react-router-dom";

// Lazy load components for better performance
const Home = lazy(() => import("../../pages/FoodMenu/FoodMenu"));
const FoodMenu = lazy(() => import("../../pages/FoodMenu/FoodMenu"));
const FoodMenuItem = lazy(() => import("../../pages/FoodMenu/FoodMenuItem"));
const FoodItem = lazy(() => import("../../pages/FoodMenu/FoodItem"));
const NotFound = lazy(() => import("../../pages/NotFound/NotFound"));

export const PATHS = {
  HOME: "/",
  FOOD_MENU: "/menu",
  ITEM: "/foodItem/:id",
  FOOD_MENU_ITEM: "/foodItem",
} as const;

export const ROUTES: RouteObject[] = [
  {
    path: PATHS.HOME,
    element: <Home />,
  },
  {
    path: PATHS.FOOD_MENU,
    element: <FoodMenu />,
  },
  {
    path: PATHS.FOOD_MENU_ITEM,
    element: <FoodMenuItem />,
  },
  {
    path: PATHS.ITEM,
    element: <FoodItem />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];
