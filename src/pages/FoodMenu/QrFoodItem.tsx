import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { Food } from "model/Api";
import Header from "../../components/Menu/Header";
import CategoryBar from "../../components/Menu/CategoryBar";
import QrFoodList from "../../components/Menu/QrFoodList";
import { useNavigation } from "context/NavigationContext";
import PrimaryImage from "../../components/PrimaryImage";

interface LocationState {
  subCategoryMap?: Map<string, Food[]>;
}

const QrFoodItem: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const location = useLocation();
  const { goBack } = useNavigation();

  const state = location.state as LocationState;
  const subCategoryMap: Map<string, Food[]> =
    state?.subCategoryMap || new Map();

  const subCategoryName = Array.from(subCategoryMap.keys())[0];
  const filteredFoods: Food[] = subCategoryMap.get(subCategoryName) || [];

  // Filter out null or undefined category names
  const categories: string[] = Array.from(
    new Set(
      filteredFoods
        .map((food) => food.categoryName)
        .filter((category): category is string => category != null)
    )
  );

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

  return (
    <div className="w-screen bg-background-color">
      <PrimaryImage
        src="/shajhya.jpg"
        alt="Shajhya"
        mobileHeight="175px"
        desktopHeight="300px"
        objectFit="cover"
      />

      {/* Sticky Header and Category List */}
      <div className="sticky top-0 bg-background-color z-10">
        <Header subCategoryName={subCategoryName} goBack={goBack} />

        {/* Horizontal Scrollable Category Bar */}
        <CategoryBar
          categories={categories}
          selectedCategory={selectedCategory}
          scrollToCategory={scrollToCategory}
        />
      </div>

      <main>
        <QrFoodList
          categories={categories}
          filteredFoods={filteredFoods}
          categoryRefs={categoryRefs}
        />
      </main>
    </div>
  );
};

export default QrFoodItem;
