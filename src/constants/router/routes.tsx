import React, { lazy } from "react";
import { RouteObject } from "react-router-dom";

const Home = lazy(() => import("../../pages/FoodMenu/QrMenu"));
const QrMenu = lazy(() => import("../../pages/FoodMenu/QrMenu"));
const FoodItem = lazy(() => import("../../pages/FoodMenu/FoodItem"));
const QrFoodItem = lazy(() => import("../../pages/FoodMenu/QrFoodItem"));
const NotFound = lazy(() => import("../../pages/NotFound/NotFound"));

export const PATHS = {
  HOME: "/",
  QR_MENU: "qr/menu",
  ITEM: "/foodItem/:id",
  QR_FOOD_ITEM: "qr/foodItem",
} as const;

export const ROUTES: RouteObject[] = [
  {
    index: true, // Corresponds to the HOME path
    element: <Home />,
  },
  {
    path: PATHS.QR_MENU,
    element: <QrMenu />,
  },
  {
    path: PATHS.QR_FOOD_ITEM,
    element: <QrFoodItem />,
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
