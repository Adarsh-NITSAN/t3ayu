"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import FancyBox from "../Core/FancyBox";

const Slider = ({ data, spaceBefore, spaceAfter }) => {
  const [swiperModules, setSwiperModules] = useState([]);
  const [Swiper, setSwiper] = useState(null);
  const [SwiperSlide, setSwiperSlide] = useState(null);

  useEffect(() => {
    const getSwiperModules = async () => {
      const modules = await import("swiper/modules");
      const { Pagination, Autoplay, Navigation } = modules;
      const swiperComponents = await import("swiper/react");

      setSwiperModules([Pagination, Autoplay, Navigation]);
      setSwiper(swiperComponents.Swiper);
      setSwiperSlide(swiperComponents.SwiperSlide);
    };

    getSwiperModules();
  }, []);

  const settings = {
    pagination:
      data && data.dotsDynamicStyle === "1"
        ? {
            clickable: true,
            dynamicBullets: true,
          }
        : data && data.sliderFractionsNumbers === "1"
        ? {
            type: "fraction",
          }
        : data && data.sliderDots === "1"
        ? {
            clickable: true,
          }
        : false,
    navigation: data && data.sliderNavigations === "1" ? true : false,
    autoplay:
      data && data.sliderAutoplay === "1"
        ? {
            delay:
              data.autoplayTimeInMilliSeconds !== "0"
                ? data.autoplayTimeInMilliSeconds
                : 2000,
            disableOnInteraction: false,
          }
        : false,
    loop: data && data.sliderLoop === "1" ? true : false,
    slidesPerView: 1,
    spaceBetween: 25,
    centeredSlides: true,
    breakpoints: {
      769: {
        slidesPerView: 1.2,
      },
      1200: {
        slidesPerView: 1.8,
      },
    },
  };

  return (
    <section
      className={`sliding-blog ${
        spaceBefore && `frame-space-before-${spaceBefore}`
      } ${spaceAfter && `frame-space-after-${spaceAfter}`}`}
    >
      <FancyBox
        options={{
          Carousel: {
            infinite: false,
          },
          hideScrollbar: false,
        }}
      >
        <div className="sliding-blog-wrapper">
          {swiperModules.length > 0 && Swiper && SwiperSlide && (
            <Swiper
              modules={swiperModules}
              {...settings}
              className="swiper-slider"
            >
              {data &&
                data.items &&
                data.items.length > 0 &&
                data.items.map(({ title, subTitle, link, image }, index) => {
                  return (
                    <SwiperSlide key={index}>
                      <div className="sliding-blog-item">
                        <div className="sliding-blog-img">
                          {image && image.length > 0 && (
                            <Link
                              href={image[0].publicUrl}
                              data-fancybox="gallery"
                              aria-label="gallery"
                            >
                              <div
                                className="blog-bg-img"
                                style={{
                                  backgroundImage: `url(${image[0].publicUrl})`,
                                }}
                              />
                            </Link>
                          )}
                        </div>
                        <div className="sliding-blog-desc">
                          {title && (
                            <span className="blog-category">{title}</span>
                          )}

                          {subTitle && (
                            <h2>
                              {link.href ? (
                                <Link
                                  href={`${link.href}`}
                                  aria-label="subtitle"
                                >
                                  {subTitle}
                                </Link>
                              ) : (
                                subTitle
                              )}
                            </h2>
                          )}

                          {link && (
                            <Link
                              href={`${link.href}`}
                              className="blog-link"
                              aria-label="link"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 448 512"
                              >
                                <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
                              </svg>
                            </Link>
                          )}
                        </div>
                      </div>
                    </SwiperSlide>
                  );
                })}
            </Swiper>
          )}
        </div>
      </FancyBox>
    </section>
  );
};
export default Slider;
