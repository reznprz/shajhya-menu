import React from "react";
import "./App.css";
// import FoodMenu from "./pages/FoodMenu/FoodMenu";
import { BrowserRouter } from "react-router-dom";
import CustomRoutes from "./core/routing/Index";

function App() {
  return (
    <div className="App">
      {/* <FoodMenu /> */}

      <BrowserRouter>
        <CustomRoutes />
      </BrowserRouter>
    </div>
  );
}

export default App;
