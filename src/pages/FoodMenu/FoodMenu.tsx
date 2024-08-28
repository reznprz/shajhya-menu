import React from "react";
import SubCategoryContainer from "../../components/FoodMenu/SubCategoryContainer";
import { useFood } from "../../hooks/useFood";

const FoodMenu: React.FC = () => {
  const { groupedFoods } = useFood();

  return (
    <div className="menu container mt-5">
      <h2 className="text-center">Menu</h2>
      {(Object.keys(groupedFoods) as Array<keyof typeof groupedFoods>).map(
        (subCategory, index) => (
          <SubCategoryContainer
            key={index}
            title={subCategory}
            items={groupedFoods[subCategory].map((food) => food)}
          />
        )
      )}
    </div>
  );
};

export default FoodMenu;
