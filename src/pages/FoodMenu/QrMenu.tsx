import React from "react";
import SubCategoryContainer from "../../components/Menu/SubCategoryContainer";
import { useFood } from "../../hooks/useFood";
import { StateType } from "../../util/State";
import FoodLoadingSpinner from "../../components/FoodLoadingSpinner";

const FoodMenu: React.FC = () => {
  const { subCategoryNames, foodState, onSubCategoryClick } = useFood();

  if (foodState === StateType.Loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <FoodLoadingSpinner />
      </div>
    );
  }

  // TODO: revise the state logic
  if (foodState === StateType.Failure) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        {/* <Alert variant="danger">{foodState.error}</Alert> */}
      </div>
    );
  }

  return (
    <div className="w-full bg-background-color min-h-screen mx-auto py-20 flex justify-center font-roboto">
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
    </div>
  );
};

export default FoodMenu;
