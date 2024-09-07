import React, {useRef, useState} from "react";
// Import Swiper React components
import {Swiper, SwiperSlide} from "swiper/react";
import lagosBuilding1 from "../assets/jpg/lagos-building-1.jpg";
import lagosBuilding2 from "../assets/jpg/lagos-building-2.jpg";
import abujaBuilding1 from "../assets/jpg/abuja-building-1.jpg";
import abujaBuilding2 from "../assets/jpg/abuja-building-2.jpg";

// Import Swiper styles
import "swiper/css";

import "../styles/swiper.css";

// import required modules
import {Autoplay, Pagination, Navigation} from "swiper/modules";

const carouselImages = [
  lagosBuilding1,
  lagosBuilding2,
  abujaBuilding1,
  abujaBuilding2,
];

const ImageCarousel = () => {
  return (
    <>
      <Swiper
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {carouselImages.map((image, index) => (
          <SwiperSlide key={index} className="relative">
            <img src={image} alt="" />
            <div className="absolute top-0 left-0 h-full w-full bg-black bg-opacity-25"></div>
          </SwiperSlide>
        ))}
        {/* <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
        <SwiperSlide>Slide 5</SwiperSlide>
        <SwiperSlide>Slide 6</SwiperSlide>
        <SwiperSlide>Slide 7</SwiperSlide>
        <SwiperSlide>Slide 8</SwiperSlide>
        <SwiperSlide>Slide 9</SwiperSlide> */}
      </Swiper>
    </>
  );
};

export default ImageCarousel;
