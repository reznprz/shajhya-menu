import React, { useEffect } from "react";
import SubCategoryContainer from "../../components/FoodMenu/SubCategoryContainer";
import { useFood } from "../../hooks/useFood";
import { StateType } from "../../util/State";
import { useQuery } from "@tanstack/react-query";
import { getFoodItems } from "../../service/FoodService";
// import { Alert, Spinner } from "react-bootstrap";

const FoodMenu: React.FC = () => {
  const { groupedFoods, foodState } = useFood();

  const { data, isLoading } = useQuery({
    queryKey: ["foodItems"],
    queryFn: getFoodItems,
  });

  if (foodState.state === StateType.Loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        {/* <Spinner animation="border" variant="primary" /> */}
      </div>
    );
  }

  if (foodState.state === StateType.Failure) {
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
    <div className="w-full bg-backgroundColor min-h-screen mx-auto py-20 flex justify-center font-roboto">
      <div className="w-[350px] bg-white rounded-md py-6 shadow-xl shadow-gray-600 px-6 h-auto">
        <h2 className="text-center font-bold pb-6 border-b-[1px] text-primaryFontColor text-4xl mb-10 font-mono">
          Sha-jhya
          <span className="block text-xl font-mono">Menu</span>
        </h2>
        <div className="mt-10">
          {(Object.keys(groupedFoods) as Array<keyof typeof groupedFoods>).map(
            (subCategory, index) => (
              <SubCategoryContainer
                key={index}
                title={subCategory}
                items={groupedFoods[subCategory].map((food) => food)}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default FoodMenu;
