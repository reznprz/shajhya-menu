import React from "react";

interface HeaderProps {
  subCategoryName: string;
  goBack: () => void;
}

const Header: React.FC<HeaderProps> = ({ subCategoryName, goBack }) => {
  return (
    <header className="flex items-center justify-between mb-2 text-secondary-background-color border-b border-gray-200">
      <button onClick={goBack} className="text-primary-font-color">
        ← Back
      </button>
      <h1 className="text-2xl font-bold">{subCategoryName}</h1>
      <div /> {/* Empty div to keep the header centered */}
    </header>
  );
};

export default Header;
