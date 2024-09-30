import React from "react";
import { useParams } from "react-router-dom";

const FoodItem: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div>
      <h1>Food Item {id}</h1>
      {/* Additional content */}
    </div>
  );
};

export default FoodItem;
