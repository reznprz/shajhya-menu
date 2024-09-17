import React from "react";
import useAppNavigation from "../../hooks/navigation/navigation";

const NotFound: React.FC = () => {
  const { goToHome } = useAppNavigation();

  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <button onClick={goToHome}>Go to Home</button>
    </div>
  );
};

export default NotFound;
