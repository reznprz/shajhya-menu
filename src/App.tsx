import React, { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./constants/router/router";

function App() {
  return (
    <div className="App">
      <Suspense fallback={<div>Loading...</div>}>
        <RouterProvider router={router} />
      </Suspense>
    </div>
  );
}

export default App;
