// src/pages/FoodMenu/QrFoodItem.tsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { Food } from "model/Api";
import Header from "../../components/Menu/Header";
import CategoryBar from "../../components/Menu/CategoryBar";
import QrFoodList from "../../components/Menu/QrFoodList";
import { useNavigation } from "../../context/NavigationContext";
import PrimaryImage from "../../components/PrimaryImage";
import ErrorNotification from "../../components/ErrorNotification";

interface LocationState {
  subCategoryMap?: Map<string, Food[]>;
}

const QrFoodItem: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState<string>("");

  const location = useLocation();
  const { goBack } = useNavigation();

  const state = location.state as LocationState;

  const subCategoryMap = useMemo(() => {
    return state?.subCategoryMap || new Map<string, Food[]>();
  }, [state?.subCategoryMap]);

  const subCategoryName = useMemo(() => {
    return Array.from(subCategoryMap.keys())[0];
  }, [subCategoryMap]);

  const filteredFoods = useMemo(() => {
    return subCategoryMap.get(subCategoryName) || [];
  }, [subCategoryMap, subCategoryName]);

  const categories = useMemo(() => {
    return Array.from(
      new Set(
        filteredFoods
          .map((food) => food.categoryName)
          .filter((category): category is string => category != null)
      )
    );
  }, [filteredFoods]);

  const categoryRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    categories.forEach((category) => {
      if (!categoryRefs.current[category]) {
        categoryRefs.current[category] = null;
      }
    });
  }, [categories]);

  const scrollToCategory = (category: string) => {
    const categoryRef = categoryRefs.current[category];
    if (categoryRef) {
      const headerOffset = 115;
      const elementPosition =
        categoryRef.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      setSelectedCategory(category);
    }
  };

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    if (subCategoryMap.size === 0) {
      setErrorMessage("No data available for the selected category.");
    } else if (filteredFoods.length === 0) {
      setErrorMessage("No food items found in this category.");
    } else {
      setErrorMessage("");
    }
  }, [subCategoryMap, filteredFoods]);

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage("");
      }, 5000); // Auto-dismiss after 5 seconds

      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  const closeError = () => setErrorMessage("");

  return (
    <div className="w-screen bg-background-color min-h-screen relative">
      <PrimaryImage
        src="/shajhya.jpg"
        alt="Shajhya"
        mobileHeight="175px"
        desktopHeight="300px"
        objectFit="cover"
      />

      <div className="sticky top-0 bg-background-color z-10">
        <Header subCategoryName={subCategoryName} goBack={goBack} />

        <CategoryBar
          categories={categories}
          selectedCategory={selectedCategory}
          scrollToCategory={scrollToCategory}
        />
      </div>

      <main className="p-4">
        {subCategoryMap.size > 0 && filteredFoods.length > 0 && (
          <QrFoodList
            categories={categories}
            filteredFoods={filteredFoods}
            categoryRefs={categoryRefs}
          />
        )}
      </main>

      {errorMessage && (
        <ErrorNotification message={errorMessage} onClose={closeError} />
      )}
    </div>
  );
};

export default QrFoodItem;
