import React from "react";
import { Food } from "model/Api";

interface QrFoodCardProps {
  food: Food;
}

const QrFoodCard: React.FC<QrFoodCardProps> = ({ food }) => {
  return (
    <div className="mb-4">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-bold font-custom text-light-brown">
          {food.name}
        </h3>
        <p className="text-sm font-medium font-custom text-light-brown">
          रु {food.price}
        </p>
      </div>
      {food.description && (
        <p className="text-black italic text-sm mt-1">{food.description}</p>
      )}
    </div>
  );
};

export default QrFoodCard;
