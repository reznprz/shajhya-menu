import React from "react";
import { Food } from "model/Api";

interface QrFoodCardProps {
  food: Food;
}

const QrFoodCard: React.FC<QrFoodCardProps> = ({ food }) => {
  let processedDescription = food.description || "";
  let processedName = food.name;

  // if foodName has parentheses, we extract data within the parentheses and append to the description
  if (
    food.categoryName?.toLowerCase() === "ice cream" &&
    food.name.includes("(")
  ) {
    const nameParts = food.name.match(/(.*?)\((.*?)\)/);
    if (nameParts && nameParts.length > 2) {
      processedName = nameParts[1].trim();
      const additionalDescription = nameParts[2].trim();

      // Append to the existing description if food.description already exists
      if (processedDescription) {
        processedDescription += `\n${additionalDescription}`;
      } else {
        processedDescription = additionalDescription;
      }
    }
  }

  return (
    <div className="mb-4 pl-4 pr-4">
      <div className="flex justify-between items-center">
        <h3 className="text-base font-normal font-arsenal text-primary-text-color">
          {processedName}
        </h3>
        <p className="text-sm font-medium font-arsenal text-primary-text-color">
          रु {food.price}
        </p>
      </div>
      {processedDescription && (
        <p className="text-black font-arsenal italic text-sm mt-1 whitespace-pre-line">
          {processedDescription}
        </p>
      )}
    </div>
  );
};

export default QrFoodCard;
