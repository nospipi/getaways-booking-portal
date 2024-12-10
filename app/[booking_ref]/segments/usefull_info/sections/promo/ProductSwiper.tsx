"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import IconButton from "@mui/material/IconButton";
import { PiCaretLeft, PiCaretRight } from "react-icons/pi";
import ProductCard from "./ProductCard";
import { IProduct } from "@/app/server/getaways-shared-models/schemas/productsSchema";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

//---------------------------------------------------------

const ProductSwiper = ({ products }: { products: string }) => {
  //its passed from a server component, so it comes serialized
  const parsedProducts: IProduct[] = JSON.parse(products);

  return (
    <Swiper
      loop
      pagination={{
        type: "bullets",
        clickable: true,
        el: ".custom-swiper-pagination",
      }}
      navigation={{
        nextEl: ".custom-swiper-button-next",
        prevEl: ".custom-swiper-button-prev",
      }}
      modules={[Autoplay, Navigation, Pagination]}
      autoplay={{
        delay: 2500,
        disableOnInteraction: true,
      }}
      spaceBetween={20}
      slidesPerView={1}
    >
      {parsedProducts.map((product: IProduct) => {
        return (
          <SwiperSlide key={product.id}>
            <ProductCard product={product} />
          </SwiperSlide>
        );
      })}

      {/* Custom pagination */}

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          gap: "10px",
          marginTop: "10px",
        }}
      >
        <IconButton className="custom-swiper-button-prev">
          <PiCaretLeft />
        </IconButton>

        <div
          className="custom-swiper-pagination"
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
          }}
        />

        <IconButton className="custom-swiper-button-next">
          <PiCaretRight />
        </IconButton>
      </div>
    </Swiper>
  );
};

export default ProductSwiper;
