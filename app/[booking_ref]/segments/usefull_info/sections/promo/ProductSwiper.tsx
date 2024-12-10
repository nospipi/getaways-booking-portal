"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import IconButton from "@mui/material/IconButton";
import { PiCaretLeft, PiCaretRight } from "react-icons/pi";
import ProductCard from "./ProductCard";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

//---------------------------------------------------------

export default () => {
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
      <SwiperSlide>
        <ProductCard />
      </SwiperSlide>
      <SwiperSlide>
        <ProductCard />
      </SwiperSlide>
      <SwiperSlide>
        <ProductCard />
      </SwiperSlide>
      <SwiperSlide>
        <ProductCard />
      </SwiperSlide>
      <SwiperSlide>
        <ProductCard />
      </SwiperSlide>
      <SwiperSlide>
        <ProductCard />
      </SwiperSlide>
      <SwiperSlide>
        <ProductCard />
      </SwiperSlide>
      <SwiperSlide>
        <ProductCard />
      </SwiperSlide>
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
