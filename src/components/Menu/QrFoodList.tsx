// QrFoodList.tsx

import React from "react";
import { Food } from "model/Api";
import QrFoodCard from "./QrFoodCard";

interface QrFoodListProps {
  categories: string[];
  filteredFoods: Food[];
  categoryRefs: React.MutableRefObject<{
    [key: string]: HTMLDivElement | null;
  }>;
}

const QrFoodList: React.FC<QrFoodListProps> = ({
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
            categoryRefs.current[category] = el;
          }}
          className="mb-6"
        >
          <h2 className="text-xl font-bold mb-4 text-center font-custom text-secondary-background-color scroll-mt-[112px]">
            {category}
          </h2>
          <div>
            {filteredFoods
              .filter((food) => food.categoryName === category)
              .map((food) => (
                <QrFoodCard key={food.id} food={food} />
              ))}
          </div>
        </div>
      ))}
    </>
  );
};

export default QrFoodList;
