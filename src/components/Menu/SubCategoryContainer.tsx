import React from "react";

interface SubCategoryContainerProps {
  title: string;
  onSubCategoryClick: (subCategoryName: string) => void;
}

const SubCategoryContainer: React.FC<SubCategoryContainerProps> = ({
  title,
  onSubCategoryClick,
}) => {
  return (
    <div className="bg-secondary-background-color mb-4 p-4">
      <button onClick={() => onSubCategoryClick(title)}>
        <h3 className="text-white font-medium">{title}</h3>
      </button>
    </div>
  );
};

export default SubCategoryContainer;
