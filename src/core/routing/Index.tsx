import { Route, Routes } from "react-router-dom";
import FoodMenu from "../../pages/FoodMenu/FoodMenu";
import MainLayout from "../../layout/MainLayout";

const CustomRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="menu" element={<FoodMenu />} />
        {/* other routes after "/" goes here */}
      </Route>
    </Routes>
  );
};

export default CustomRoutes;
