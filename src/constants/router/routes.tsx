import React, { lazy } from "react";
import { RouteObject } from "react-router-dom";

const Home = lazy(() => import("../../pages/FoodMenu/FoodMenu"));
const FoodMenu = lazy(() => import("../../pages/FoodMenu/FoodMenu"));
const FoodItem = lazy(() => import("../../pages/FoodMenu/FoodItem"));
const FoodMenuItem = lazy(() => import("../../pages/FoodMenu/FoodMenuItem"));
const NotFound = lazy(() => import("../../pages/NotFound/NotFound"));

export const PATHS = {
  HOME: "/", // Now handled by Providers/Layout
  FOOD_MENU: "/menu",
  ITEM: "/foodItem/:id",
  FOOD_MENU_ITEM: "/foodItem",
} as const;

export const ROUTES: RouteObject[] = [
  {
    index: true, // Corresponds to the HOME path
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
