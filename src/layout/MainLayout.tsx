import React from "react";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="w-full mx-auto bg-backgroundColor">
      <Outlet />
    </div>
  );
};

export default MainLayout;
