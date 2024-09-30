import React, { useEffect, useState } from "react";
import SubCategoryContainer from "../../components/Menu/SubCategoryContainer";
import { useFood } from "../../hooks/useFood";
import { StateType } from "../../util/State";
import FoodLoadingSpinner from "../../components/FoodLoadingSpinner";
import ErrorNotification from "../../components/ErrorNotification";

const FoodMenu: React.FC = () => {
  const [showError, setShowError] = useState(false);

  const { subCategoryNames, foodState, onSubCategoryClick, errorMsg } =
    useFood();

  const closeError = () => setShowError(false);

  useEffect(() => {
    if (foodState === StateType.Failure && errorMsg) {
      setShowError(true);
      const timer = setTimeout(() => {
        setShowError(false);
      }, 5000); // Auto-dismiss after 5 seconds

      return () => clearTimeout(timer);
    }
  }, [foodState, errorMsg]);

  return (
    <div className="w-full bg-background-color min-h-screen mx-auto py-20 flex justify-center font-roboto relative">
      {foodState === StateType.Loading && (
        <div className="flex justify-center items-center absolute inset-0 bg-white bg-opacity-75">
          <FoodLoadingSpinner />
        </div>
      )}
      <div className="w-[350px] bg-white rounded-md py-6 shadow-xl shadow-gray-600 px-6 h-auto">
        <h2 className="text-center font-bold pb-6 border-b-[1px] text-primary-font-color text-4xl mb-10 font-mono">
          Sha-jhya
          <span className="block text-xl font-mono">Menu</span>
        </h2>
        <div className="mt-10">
          {subCategoryNames.map((subCategory, index) => (
            <SubCategoryContainer
              key={index}
              title={subCategory}
              onSubCategoryClick={onSubCategoryClick}
            />
          ))}
        </div>
      </div>
      {showError && (
        <ErrorNotification
          message={"Opps Something went wrong!"}
          onClose={closeError}
        />
      )}
    </div>
  );
};

export default FoodMenu;
