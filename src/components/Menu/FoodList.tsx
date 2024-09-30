import React from "react";
import { Food } from "model/Api";
import FoodCard from "./FoodCard";

interface FoodListProps {
  categories: string[];
  filteredFoods: Food[];
  categoryRefs: React.MutableRefObject<{
    [key: string]: HTMLDivElement | null;
  }>;
}

const FoodList: React.FC<FoodListProps> = ({
  categories,
  filteredFoods,
  categoryRefs,
}) => {
  return (
    <>
      {categories.map((category, index) => (
        <div
          key={index}
          ref={(el) => {
            categoryRefs.current[category!] = el;
          }}
          className="mb-6"
        >
          <h2 className="text-xl font-bold mb-4 border-b-2 border-gray-200">
            {category}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredFoods
              .filter((food) => food.categoryName === category)
              .map((food) => (
                <FoodCard key={food.id} food={food} />
              ))}
          </div>
        </div>
      ))}
    </>
  );
};

export default FoodList;
