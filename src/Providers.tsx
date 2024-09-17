import React from "react";
import { FoodProvider } from "context/FoodContext";
import { Outlet } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import { NavigationProvider } from "context/NavigationContext";

const Providers: React.FC = () => {
  return (
    <NavigationProvider>
      <FoodProvider>
        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>
      </FoodProvider>
    </NavigationProvider>
  );
};

export default Providers;
