"use client";

import { FiArrowRight } from "react-icons/fi";

//---------------------------------------------------------

interface ProductNavigationProps {
  nextProductTitle: string;
  onNext: () => void;
  currentIndex: number;
  totalProducts: number;
}

const ProductNavigation = ({
  nextProductTitle,
  onNext,
  currentIndex,
  totalProducts,
}: ProductNavigationProps) => {
  return (
    <div className="product-navigation-container">
      <div className="product-navigation-indicator">
        {currentIndex + 1} / {totalProducts}
      </div>
      <button
        className="product-navigation-button"
        onClick={onNext}
      >
        <span>See Next:</span>
        <span className="product-navigation-title">{nextProductTitle}</span>
        <FiArrowRight size={16} />
      </button>
    </div>
  );
};

export default ProductNavigation;

