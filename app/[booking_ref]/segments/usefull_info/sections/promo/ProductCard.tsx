"use client";
//import placeholder from "@/public/elementor-placeholder-image.webp";
import placeholder from "@/public/test_image.avif";
import Button from "@mui/material/Button";
import { FaCheckCircle } from "react-icons/fa";
import { IoTime } from "react-icons/io5";
import Chip from "@mui/material/Chip";
import { IProduct } from "@/app/server/getaways-shared-models/schemas/productsSchema";
import Image from "next/image";

//---------------------------------------------------------

const ProductCard = ({ product }: { product: IProduct }) => {
  return (
    <div
      style={{
        flex: 1,
        height: "100%",
        minHeight: "350px",
        display: "flex",
        flexDirection: "column",
        gap: "15px",
        padding: "13px",
        borderRadius: "10px",
        backgroundColor: "rgb(246 246 246)",
        borderTop: "4px solid rgb(158 193 229)",
        boxShadow: "0 4px 5px -5px rgba(0, 0, 0, 0.4)",
      }}
    >
      <div>{product.platform_product_name}</div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "15px",
        }}
      >
        <Image
          src={placeholder}
          style={{
            width: "40%",
            minHeight: "150px",
            height: "100%",
            borderRadius: "10px",
            objectFit: "cover",
          }}
          width={0}
          height={0}
          sizes="(max-width: 800px) 100vw, 800px"
          alt="No image available"
          quality={20}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: "10px",
          }}
        >
          <div
            style={{
              fontSize: "12px",
              display: "flex",
            }}
          >
            {product.product_short_description}
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "10px",
          flexWrap: "wrap",
          flex: 1,
          //backgroundColor: "rgb(246 246 100)",
        }}
      >
        <Chip
          icon={<FaCheckCircle size={15} color="darkgreen" />}
          label="Free cancellation"
        />
        <Chip
          icon={<IoTime size={18} color="darkgreen" />}
          label={product.tour_duration}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
            gap: "5px",
            fontSize: "12px",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "5px",
            }}
          >
            <span>From</span>
            <span
              style={{
                textDecoration: "line-through",
                color: "indianred",
                fontWeight: "bold",
              }}
            >
              €{(product?.market_price || 0).toFixed(2)}
            </span>
          </div>

          <span
            style={{
              fontWeight: "bold",
              color: "darkgreen",
              fontSize: "15px",
            }}
          >
            {/* 15% discount */}€
            {(
              (product?.market_price || 0) -
              (product?.market_price || 0) * 0.15
            ).toFixed(2)}
          </span>
        </div>
        <Button
          variant="contained"
          size="small"
          className="bokunButton"
          //data-src={`https://widgets.bokun.io/online-sales/db6fd107-983c-4e5e-8d51-b37b123ddd0d/experience-calendar/${product.bokun_product_code}?partialView=1`}
          data-src={`data-src="https://widgets.bokun.io/online-sales/db6fd107-983c-4e5e-8d51-b37b123ddd0d/experience/${product.bokun_product_code}?partialView=1"`}
        >
          Book Now
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;