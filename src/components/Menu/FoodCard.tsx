import React from "react";
import { Food } from "model/Api";

interface FoodCardProps {
  food: Food;
}

const FoodCard: React.FC<FoodCardProps> = ({ food }) => {
  return (
    <div className="p-4 border rounded-lg shadow hover:shadow-lg transition-shadow">
      <h3 className="text-lg font-semibold">{food.name}</h3>
      {food.img && (
        <img
          src={food.img}
          alt={food.name}
          className="w-full h-32 object-cover rounded-lg mt-2"
        />
      )}
      {food.description && (
        <p className="text-gray-600 mt-2">{food.description}</p>
      )}
      <p className="text-lg font-bold mt-2">${food.price}</p>
    </div>
  );
};

export default FoodCard;
