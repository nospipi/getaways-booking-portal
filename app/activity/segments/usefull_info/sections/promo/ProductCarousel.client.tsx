"use client";

import { useState } from "react";
import { IProduct } from "@/app/server/getaways-shared-models/schemas/productsSchema";
import ProductCard from "./ProductCard";
import ProductNavigation from "./ProductNavigation.client";
import { Suspense } from "react";

//---------------------------------------------------------

const ProductCarousel = ({ products }: { products: string }) => {
  //its passed from a server component, so it comes serialized
  const parsedProducts: IProduct[] = JSON.parse(products);
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!parsedProducts || parsedProducts.length === 0) {
    return null;
  }

  const currentProduct = parsedProducts[currentIndex];
  const nextIndex = (currentIndex + 1) % parsedProducts.length;
  const nextProduct = parsedProducts[nextIndex];

  const handleNext = () => {
    setCurrentIndex(nextIndex);
  };

  return (
    <div className="product-carousel-container">
      <Suspense>
        <ProductCard product={currentProduct} />
      </Suspense>

      {parsedProducts.length > 1 && (
        <ProductNavigation
          nextProductTitle={nextProduct.platform_product_name || "Next Tour"}
          onNext={handleNext}
          currentIndex={currentIndex}
          totalProducts={parsedProducts.length}
        />
      )}
    </div>
  );
};

export default ProductCarousel;
