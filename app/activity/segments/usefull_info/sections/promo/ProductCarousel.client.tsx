"use client";

import { useState, useEffect, useCallback } from "react";
import { IProduct } from "@/app/server/getaways-shared-models/schemas/productsSchema";
import ProductCard from "./ProductCard";
import ProductNavigation from "./ProductNavigation.client";
import { AnimatePresence, motion } from "framer-motion";
import { Suspense } from "react";

//---------------------------------------------------------

const ProductCarousel = ({ products }: { products: string }) => {
  //its passed from a server component, so it comes serialized
  const parsedProducts: IProduct[] = JSON.parse(products);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const currentProduct = parsedProducts[currentIndex];
  const nextIndex =
    parsedProducts.length > 0 ? (currentIndex + 1) % parsedProducts.length : 0;
  const nextProduct = parsedProducts[nextIndex];

  const handleNext = useCallback(() => {
    setProgress(0);
    setCurrentIndex(nextIndex);
  }, [nextIndex]);

  // Auto-progress with pause on hover
  useEffect(() => {
    if (!parsedProducts || parsedProducts.length <= 1 || isPaused) {
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          handleNext();
          return 0;
        }
        return prev + 0.3; // Adjust speed (0.3 = slower, ~33 seconds total)
      });
    }, 10); // Update every 10ms for smooth animation

    return () => clearInterval(interval);
  }, [parsedProducts, isPaused, handleNext]);

  if (!parsedProducts || parsedProducts.length === 0) {
    return null;
  }

  return (
    <div className="product-carousel-container">
      <div className="product-carousel-card-wrapper">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <Suspense>
              <ProductCard product={currentProduct} />
            </Suspense>
          </motion.div>
        </AnimatePresence>
      </div>

      {parsedProducts.length > 1 && (
        <ProductNavigation
          nextProductTitle={nextProduct.platform_product_name || "Next Tour"}
          onNext={handleNext}
          currentIndex={currentIndex}
          totalProducts={parsedProducts.length}
          progress={progress}
          isPaused={isPaused}
          onPause={() => setIsPaused(true)}
          onResume={() => setIsPaused(false)}
        />
      )}
    </div>
  );
};

export default ProductCarousel;
