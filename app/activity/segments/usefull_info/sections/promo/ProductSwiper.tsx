"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import IconButton from "@mui/material/IconButton";
import { PiCaretLeft, PiCaretRight } from "react-icons/pi";
import ProductCard from "./ProductCard";
import { nanoid } from "nanoid";
import { IProduct } from "@/app/server/getaways-shared-models/schemas/productsSchema";
import { Suspense } from "react";
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
      // autoplay={{
      //   delay: 2500,
      //   disableOnInteraction: true,
      // }}
      spaceBetween={10}
      slidesPerView={1}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      {parsedProducts.map((product: IProduct) => {
        return (
          <SwiperSlide key={product.id || nanoid()}>
            <Suspense>
              {/* wrapped in Suspense because it accesses useSearchParams hook (through useAddUserAction hook) */}
              {/* https://nextjs.org/docs/messages/missing-suspense-with-csr-bailout */}
              <ProductCard product={product} />
            </Suspense>
          </SwiperSlide>
        );
      })}

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          gap: "10px",
          //marginTop: "10px",
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
