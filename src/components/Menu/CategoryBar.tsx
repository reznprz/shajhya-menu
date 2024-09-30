import React from "react";

interface CategoryBarProps {
  categories: string[];
  selectedCategory: string | null;
  scrollToCategory: (category: string) => void;
}

const CategoryBar: React.FC<CategoryBarProps> = ({
  categories,
  selectedCategory,
  scrollToCategory,
}) => {
  return (
    <div className="flex space-x-4 overflow-x-auto p-2 mb-4 border-b border-gray-200">
      {categories.map((category, index) => (
        <span
          key={index}
          className={`px-4 py-2 whitespace-nowrap cursor-pointer border-b-2 ${
            selectedCategory === category
              ? "text-primary-font-color bg-light-primary-bg-color border-transparent"
              : "text-black border-transparent hover:border-primary-font-color active:border-primary-font-color"
          }`}
          onClick={() => scrollToCategory(category)}
        >
          {category}
        </span>
      ))}
    </div>
  );
};

export default CategoryBar;
