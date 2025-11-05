"use client";

import placeholder from "@/public/elementor-placeholder-image.webp";
import { FaCheckCircle } from "react-icons/fa";
import { IoTime } from "react-icons/io5";
import { IProduct } from "@/app/server/getaways-shared-models/schemas/productsSchema";
import Image from "next/image";
import useAddUserAction from "@/app/useAddUserAction";
const NEXT_PUBLIC_FILE_SERVE_BASE_URL =
  process.env.NEXT_PUBLIC_FILE_SERVE_BASE_URL;

//---------------------------------------------------------

const ProductCard = ({ product }: { product: IProduct }) => {
  const { triggerUserAction } = useAddUserAction();
  const hasImage = product.product_pictures[0] ? true : false;
  const image_url = hasImage
    ? `${NEXT_PUBLIC_FILE_SERVE_BASE_URL}${product.product_pictures[0].file_id}`
    : placeholder;

  const originalPrice = product?.market_price || 0;
  const discountedPrice = originalPrice - originalPrice * 0.15;

  return (
    <div className="promo-product-card">
      <div className="promo-product-image-container">
        <Image
          src={image_url}
          fill
          style={{
            objectFit: "cover",
          }}
          sizes="(max-width: 800px) 100vw, 400px"
          alt={
            hasImage
              ? product?.product_pictures[0]?.alt
                ? product?.product_pictures[0]?.alt
                : "No image available"
              : "No image available"
          }
          quality={20}
        />
        <div className="promo-product-badge">
          <FaCheckCircle size={14} />
          <span>Free cancellation</span>
        </div>
      </div>
      
      <div className="promo-product-content">
        <h3 className="promo-product-title">{product.platform_product_name}</h3>
        
        {product.product_short_description && (
          <p className="promo-product-description">
            {product.product_short_description}
          </p>
        )}
        
        <div className="promo-product-footer">
          <div className="promo-product-info">
            {product.tour_duration && (
              <div className="promo-product-duration">
                <IoTime size={16} />
                <span>{product.tour_duration}</span>
              </div>
            )}
          </div>
          
          <div className="promo-product-pricing">
            <div className="promo-product-price-original">
              <span>From</span>
              <span className="strikethrough">€{originalPrice.toFixed(2)}</span>
            </div>
            <div className="promo-product-price-discounted">
              €{discountedPrice.toFixed(2)}
            </div>
          </div>
        </div>
        
        <button
          className="promo-product-button bokunButton"
          data-src={`data-src="https://widgets.bokun.io/online-sales/db6fd107-983c-4e5e-8d51-b37b123ddd0d/experience/${product.bokun_product_code}?partialView=1"`}
          onClick={async () => {
            await triggerUserAction("PROMO_PRODUCT_CLICK", {
              clickedPromoProductId: product._id,
            });
          }}
        >
          <span>Book Now</span>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
