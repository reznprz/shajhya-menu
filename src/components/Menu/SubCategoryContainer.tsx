import React from "react";
import { Food } from "../../model/Api";
import useAppNavigation from "../../constants/navigation/navigation";

interface SubCategoryContainerProps {
  title: string;
  items: Food[];
}

const SubCategoryContainer: React.FC<SubCategoryContainerProps> = ({
  title,
  items,
}) => {
  const { goToFoodItem } = useAppNavigation();

  return (
    <div className="bg-secondaryBackgroundColor mb-4 p-4">
      <button onClick={() => goToFoodItem()}>
        <h3 className="text-white font-medium">{title}</h3>
      </button>
    </div>
  );
};

export default SubCategoryContainer;
