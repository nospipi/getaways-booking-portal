"use client";

import placeholder from "@/public/elementor-placeholder-image.webp";
import Button from "@mui/material/Button";
import { FaCheckCircle } from "react-icons/fa";
import { IoTime } from "react-icons/io5";
import Chip from "@mui/material/Chip";
import { IProduct } from "@/app/server/getaways-shared-models/schemas/productsSchema";
import Image from "next/image";
//import useAddUserAction from "@/app/useAddUserAction";
const NEXT_PUBLIC_FILE_SERVE_BASE_URL =
  process.env.NEXT_PUBLIC_FILE_SERVE_BASE_URL;

//---------------------------------------------------------

const ProductCard = ({ product }: { product: IProduct }) => {
  //const { triggerUserAction } = useAddUserAction();
  const hasImage = product.product_pictures[0] ? true : false;
  const image_url = hasImage
    ? `${NEXT_PUBLIC_FILE_SERVE_BASE_URL}${product.product_pictures[0].file_id}`
    : placeholder;

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
        borderRadius: "9px 9px 10px 10px",
        background: "linear-gradient(to bottom, white, rgb(232 232 232))",
        borderTop: "7px solid rgb(76, 110, 150)",
        boxShadow: "0 4px 5px -5px rgba(0, 0, 0, 0.6)",
        position: "relative",
      }}
    >
      <div
        style={{
          color: "rgb(50, 75, 104)",
          fontWeight: "bold",
          fontSize: "16px",
        }}
      >
        {product.platform_product_name}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "15px",
          // paddingTop: "10px",
          // paddingRight: "10px",
          // paddingBottom: "10px",
          // borderTopRightRadius: "10px",
          // borderBottomRightRadius: "10px",
        }}
      >
        <Image
          src={image_url}
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
          alt={
            hasImage
              ? product?.product_pictures[0]?.alt
                ? product?.product_pictures[0]?.alt
                : "No image available"
              : "No image available"
          }
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
          // onClick={async () => {
          //   await triggerUserAction("PROMO_PRODUCT_CLICK");
          // }}
        >
          Book Now
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
