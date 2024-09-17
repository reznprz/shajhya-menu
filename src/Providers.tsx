import React from "react";
import { FoodProvider } from "context/FoodContext";
import { Outlet } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";

const Providers: React.FC = () => {
  return (
    <FoodProvider>
      <ErrorBoundary>
        <Outlet />
      </ErrorBoundary>
    </FoodProvider>
  );
};

export default Providers;
