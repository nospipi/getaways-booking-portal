"use client";

import { FiArrowRight } from "react-icons/fi";
import { motion } from "framer-motion";

//---------------------------------------------------------

interface ProductNavigationProps {
  nextProductTitle: string;
  onNext: () => void;
  currentIndex: number;
  totalProducts: number;
  progress: number;
  isPaused: boolean;
  onPause: () => void;
  onResume: () => void;
}

const ProductNavigation = ({
  nextProductTitle,
  onNext,
  currentIndex,
  totalProducts,
  progress,
  isPaused,
  onPause,
  onResume,
}: ProductNavigationProps) => {
  return (
    <div 
      className="product-navigation-container"
      onMouseEnter={onPause}
      onMouseLeave={onResume}
    >
      <div className="product-navigation-indicator">
        {currentIndex + 1} / {totalProducts}
      </div>
      <button
        className="product-navigation-button"
        onClick={onNext}
      >
        <div className="product-navigation-button-content">
          <div className="product-navigation-text">
            <span>See Next:</span>
            <span className="product-navigation-title">{nextProductTitle}</span>
          </div>
          <FiArrowRight size={16} className="product-navigation-arrow" />
        </div>
        <div className="product-navigation-progress-bar">
          <motion.div
            className="product-navigation-progress-fill"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1, ease: "linear" }}
            style={{
              opacity: isPaused ? 0.5 : 1,
            }}
          />
        </div>
      </button>
    </div>
  );
};

export default ProductNavigation;

