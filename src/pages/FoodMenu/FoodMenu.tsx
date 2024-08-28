import React from "react";
import SubCategoryContainer from "../../components/FoodMenu/SubCategoryContainer";
import { useFood } from "../../hooks/useFood";
import { StateType } from "../../util/State";
import { Alert, Spinner } from "react-bootstrap";

const FoodMenu: React.FC = () => {
  const { groupedFoods, foodState } = useFood();

  if (foodState.state === StateType.Loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (foodState.state === StateType.Failure) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Alert variant="danger">{foodState.error}</Alert>
      </div>
    );
  }

  return (
    <div className="menu container mt-5">
      <h2 className="text-center">Menu</h2>
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
  );
};

export default FoodMenu;
