import React from "react";
import { Food } from "../../model/Api";

interface SubCategoryContainerProps {
  title: string;
  items: Food[];
}

const SubCategoryContainer: React.FC<SubCategoryContainerProps> = ({
  title,
  items,
}) => {
  return (
    <div className="sub-category-container card my-3">
      <div className="card-header">
        <h3>{title}</h3>
      </div>
    </div>
  );
};

export default SubCategoryContainer;
