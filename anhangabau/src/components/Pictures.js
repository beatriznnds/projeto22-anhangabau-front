/* eslint-disable react/prop-types */
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import { Virtual } from "swiper";

export default function Pictures({ info }) {
  const slides = info.map((el) => (
    <>
      <img src={el.imageUrl} />
      <a href={`${el.imageUrl}`}>
        <h3>{el.caption}</h3>
      </a>
      <h4>Postado por {el.user.name}</h4>
    </>
  ));
  return (
    <Swiper
      // install Swiper modules
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
    >
      <Swiper modules={[Virtual]} spaceBetween={50} slidesPerView={3} virtual>
        {slides.map((slideContent, index) => (
          <SwiperSlide key={slideContent} virtualIndex={index}>
            {slideContent}
          </SwiperSlide>
        ))}
      </Swiper>
    </Swiper>
  );
}
