import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { PaginationOptions } from "swiper/types";
import { Pagination } from "swiper";
import Step1 from "./steps/Step1";
import Step2 from "./steps/Step2";
import Step3 from "./steps/Step3";
import "./styles/pagination.css";

export const LeadForm: React.FC<{ id: number; title: string }> = ({
  id,
  title,
}) => {
  const [postId, setPostId] = useState<number | undefined>();
  const pagination: PaginationOptions = {
    clickable: false,
    renderBullet: (index, className) =>
      `<span class="${className}" data-bullet="${index}"><output>${
        index + 1
      }</output></span>`,
  };

  return (
    <section className="font-custom">
      <div className="">
        <Swiper
          modules={[Pagination /*, EffectFade*/]}
          slidesPerView={1}
          pagination={pagination}
          loop={false}
          /*effect="coverflow"*/
          allowTouchMove={false}
          onSlideChange={(slide) => {
            const bullets = document.querySelectorAll(
              ".swiper-pagination-bullet"
            );
            bullets.forEach((item) => {
              const currentItem =
                item instanceof HTMLElement && item.dataset
                  ? Number(item.dataset.bullet)
                  : undefined;
              if (currentItem && currentItem <= slide.activeIndex) {
                bullets[0].classList.add("swiper-pagination-bullet-active");
                item.classList.add("swiper-pagination-bullet-active");
              }
            });
          }}
        >
          <SwiperSlide>
            {({ isActive }) => {
              if (isActive) return <Step1 id={id} title={title} setPostId={setPostId}/>;
            }}
          </SwiperSlide>
          <SwiperSlide>
            {({ isActive }) => {
              if (isActive) return <Step2 id={id} title={title} postId={postId}/>;
            }}
          </SwiperSlide>
          <SwiperSlide>
            {({ isActive }) => {
              if (isActive) return <Step3 id={id} title={title}/>;
            }}
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
};
