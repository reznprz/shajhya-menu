import React from "react";

const FoodLoadingSpinner: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="animate-spin w-24 h-24">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 64 64"
          className="w-full h-full text-gray-800 fill-current"
        >
          <path d="M32 2C14.879 2 2 14.879 2 32s12.879 30 30 30 30-12.879 30-30S49.121 2 32 2zm0 4c14.359 0 26 11.641 26 26S46.359 58 32 58 6 46.359 6 32 17.641 6 32 6zm-3 15v26h6V21h-6zm-7 0v26h4V21h-4zm17 0v26h4V21h-4z" />
        </svg>
      </div>
    </div>
  );
};

export default FoodLoadingSpinner;
