import React, { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./constants/router/router";
import FoodLoadingSpinner from "./components/FoodLoadingSpinner";

function App() {
  return (
    <div className="App">
      <Suspense
        fallback={
          <div>
            <FoodLoadingSpinner />
          </div>
        }
      >
        <RouterProvider router={router} />
      </Suspense>
    </div>
  );
}

export default App;
