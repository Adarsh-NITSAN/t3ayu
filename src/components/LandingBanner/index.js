"use client";

import React, { useState, useEffect } from "react";

import DOMPurify from "dompurify";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Container } from "react-bootstrap";
import curveLine from "@/assets/images/patterns/curve-line.png";

import {
  Pagination,
  Autoplay,
  Navigation,
  Thumbs,
  Scrollbar,
  EffectFade,
  EffectCube,
  EffectCoverflow,
  EffectFlip,
  EffectCards,
  EffectCreative,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const sanitizeLink = dynamic(() => import("@/utils/sanitizeLink"), {
  ssr: false,
});

const LandingBanner = ({ data, spaceAfter, spaceBefore }) => {
  // const [swiperModules, setSwiperModules] = useState([]);
  // const [Swiper, setSwiper] = useState(null);
  // const [SwiperSlide, setSwiperSlide] = useState(null);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const router = useRouter();

  let SlideArray = data && data.slides;

  // useEffect(() => {
  // 	const getSwiperModules = async () => {
  // 		const modules = await import("swiper/modules");
  // 		const {
  // 			Pagination,
  // 			Autoplay,
  // 			Navigation,
  // 			Thumbs,
  // 			Scrollbar,
  // 			EffectFade,
  // 			EffectCube,
  // 			EffectCoverflow,
  // 			EffectFlip,
  // 			EffectCards,
  // 			EffectCreative,
  // 		} = modules;
  // 		const swiperComponents = await import("swiper/react");

  // 		setSwiperModules([
  // 			Pagination,
  // 			Autoplay,
  // 			Navigation,
  // 			Thumbs,
  // 			Scrollbar,
  // 			EffectFade,
  // 			EffectCube,
  // 			EffectCoverflow,
  // 			EffectFlip,
  // 			EffectCards,
  // 			EffectCreative,
  // 		]);
  // 		setSwiper(swiperComponents.Swiper);
  // 		setSwiperSlide(swiperComponents.SwiperSlide);
  // 	};

  // 	getSwiperModules();
  // }, []);

  const settings = {
    slidesPerView: 1,
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
        : data && data.sliderProgressbar === "1"
        ? {
            type: "progressbar",
          }
        : data && data.sliderDots === "1"
        ? {
            clickable: true,
          }
        : false,
    scrollbar: data && data.sliderProgressbar === "2" ? true : false,

    navigation:
      data && data.sliderNavigations === "1"
        ? {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }
        : false,
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
    spaceBetween: 15,
    autoHeight: data && data.sliderAdaptiveHeights === "1" ? true : false,
    effect: data
      ? data.sliderEffects === "1"
        ? "fade"
        : data.sliderEffects === "2"
        ? "cube"
        : data.sliderEffects === "3"
        ? "coverflow"
        : data.sliderEffects === "4"
        ? "flip"
        : data.sliderEffects === "5"
        ? "cards"
        : data.sliderEffects === "6"
        ? "creative"
        : false
      : "",
    cubeEffect: {
      shadow: true,
      slideShadows: true,
      shadowOffset: 20,
      shadowScale: 0.94,
    },
    creativeEffect: {
      prev: {
        shadow: true,
        translate: [0, 0, -400],
      },
      next: {
        translate: ["100%", 0, 0],
      },
    },
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    },
  };

  const thumbSlider = {
    slidesPerView: 2,
    loop: true,
    spaceBetween: 10,
    freeMode: true,
    breakpoints: {
      767: {
        slidesPerView: 3,
      },
      991: {
        slidesPerView: 4,
      },
    },
  };

  function youTubeVideoId(url) {
    let regExp = /^.*(?:youtu.be\/|v\/|e\/|u\/\w+\/|embed\/|v=)([^#\&\?]*).*/;
    let match = url?.match(regExp);
    if (match && match[1].length === 11) {
      return match[1];
    } else {
      // Handle invalid YouTube URL
      return null;
    }
  }
  return (
    <section
      className={`landing-banner ${
        spaceBefore && `frame-space-before-${spaceBefore}`
      } ${spaceAfter && `frame-space-after-${spaceAfter}`} ${
        data && data.cornerPatterns === "1" ? "with-pattern" : ""
      } ${data && data.sliderBottomCurves === "1" ? "with-curve" : ""}
			${data && data.thumbsImages === "1" ? "with-thubms" : ""}`}
    >
      {SlideArray && SlideArray.length > 0 && (
        <div className="landing-slider">
          {SlideArray.length > 0 && (
            <React.Fragment>
              <Swiper
                modules={[
                  Pagination,
                  Autoplay,
                  Navigation,
                  Thumbs,
                  Scrollbar,
                  EffectFade,
                  EffectCube,
                  EffectCoverflow,
                  EffectFlip,
                  EffectCards,
                  EffectCreative,
                ]}
                {...settings}
                thumbs={{ swiper: thumbsSwiper }}
                className={`${
                  data && data.sliderEffects === "2" ? "slider-cube-effect" : ""
                }`}
              >
                {SlideArray.length > 0 &&
                  SlideArray.map((slide, index) => {
                    let videoType =
                      slide?.sliderMedia[0]?.properties?.extension;
                    let videoURL = slide?.sliderMedia[0]?.publicUrl;
                    let videoId = youTubeVideoId(videoURL);

                    return (
                      <SwiperSlide key={index}>
                        {slide &&
                        slide.sliderMedia &&
                        slide.sliderMedia.length > 0 &&
                        slide.sliderMedia[0] &&
                        slide.sliderMedia[0].properties.type === "image" ? (
                          <div
                            className={`single-slide ${
                              slide.overlay === "1" ? "with-overlay" : ""
                            } `}
                            style={{
                              backgroundImage: `url(${slide.sliderMedia[0].publicUrl})`,
                            }}
                          >
                            <Container
                              className={`d-flex ${
                                slide.contentPositions === "0"
                                  ? "justify-content-start"
                                  : slide.contentPositions === "1"
                                  ? "justify-content-end"
                                  : "justify-content-center"
                              }`}
                            >
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: DOMPurify.sanitize(
                                    slide.sliderContent
                                  ),
                                }}
                                onClick={(e) => sanitizeLink(e, router)}
                                className={`slider-content`}
                              />
                            </Container>
                          </div>
                        ) : videoType ? (
                          videoType === "youtube" || videoType === "vimeo" ? (
                            <React.Fragment>
                              <iframe
                                allow="autoplay"
                                allowFullScreen
                                frameBorder="0"
                                src={`${videoURL.replace(
                                  "controls=1",
                                  "controls=0"
                                )}&autoplay=1&mute=1&showinfo=0&loop=1&playlist=${videoId}&vq=hd720&rel=0`}
                              />
                              <Container
                                className={`d-flex ${
                                  slide.contentPositions === "0"
                                    ? "justify-content-start"
                                    : slide.contentPositions === "1"
                                    ? "justify-content-end"
                                    : "justify-content-center"
                                }`}
                              >
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html: DOMPurify.sanitize(
                                      slide.sliderContent
                                    ),
                                  }}
                                  onClick={(e) => sanitizeLink(e, router)}
                                />
                              </Container>
                            </React.Fragment>
                          ) : (
                            <React.Fragment>
                              <video controls autoPlay muted loop playsInline>
                                <source type="video/mp4" src={`${videoURL}`} />
                              </video>
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: DOMPurify.sanitize(
                                    slide.sliderContent
                                  ),
                                }}
                                onClick={(e) => sanitizeLink(e, router)}
                                className={` ${
                                  slide.contentPositions === "0"
                                    ? "justify-content-start d-grid"
                                    : slide.contentPositions === "1"
                                    ? "justify-content-end d-grid"
                                    : "justify-content-center d-grid"
                                }`}
                              />
                            </React.Fragment>
                          )
                        ) : (
                          <React.Fragment>
                            <div
                              dangerouslySetInnerHTML={{
                                __html: DOMPurify.sanitize(slide.sliderContent),
                              }}
                              onClick={(e) => sanitizeLink(e, router)}
                              className={`single-slide ${
                                slide.contentPositions === "0"
                                  ? "justify-content-start d-grid"
                                  : slide.contentPositions === "1"
                                  ? "justify-content-end d-grid"
                                  : "justify-content-center d-grid"
                              }`}
                            />
                          </React.Fragment>
                        )}
                      </SwiperSlide>
                    );
                  })}
                {data && data.sliderNavigations === "1" && (
                  <>
                    <div className="swiper-button-prev">
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth="0"
                        viewBox="0 0 448 512"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"></path>
                      </svg>
                      <span>PREV</span>
                    </div>
                    <div className="swiper-button-next">
                      <span>NEXT</span>
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth="0"
                        viewBox="0 0 448 512"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"></path>
                      </svg>
                    </div>
                  </>
                )}
              </Swiper>
              {data && data.cornerPatterns === "1" && (
                <>
                  <div className="banner-shape-curve">
                    <Image src={curveLine} priority={true} alt="pattern" />
                  </div>
                  <div className="banner-shape-one" />
                  <div className="banner-shape-two" />
                </>
              )}

              {data && data.sliderBottomCurves === "1" && (
                <div className="banner-shape-three">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1000 100"
                    preserveAspectRatio="none"
                  >
                    <path d="M500,97C126.7,96.3,0.8,19.8,0,0v100l1000,0V1C1000,19.4,873.3,97.8,500,97z"></path>
                  </svg>
                </div>
              )}
              {data && data.thumbsImages === "1" && (
                <Swiper
                  {...thumbSlider}
                  onSwiper={setThumbsSwiper}
                  watchSlidesProgress={true}
                  className={`swiper-thumb-lists`}
                >
                  {data.slides.length > 0 &&
                    data.slides.map((slide, index) => {
                      let videoType =
                        slide?.sliderMedia[0]?.properties?.extension;
                      let videoURL = slide?.sliderMedia[0]?.publicUrl;
                      let videoId = youTubeVideoId(videoURL);

                      return (
                        <SwiperSlide key={index}>
                          {slide &&
                          slide.sliderMedia &&
                          slide.sliderMedia.length > 0 &&
                          slide.sliderMedia[0] &&
                          slide.sliderMedia[0].properties.type === "image" ? (
                            <Image
                              src={`${slide.sliderMedia[0].publicUrl}`}
                              alt={
                                slide.sliderMedia[0]?.properties?.alternative ||
                                "Image"
                              }
                              title={slide.sliderMedia[0]?.properties?.title}
                              width={0}
                              height={135}
                              className="thumbs-img"
                            />
                          ) : videoType ? (
                            videoType === "youtube" || videoType === "vimeo" ? (
                              <iframe
                                allow="autoplay"
                                allowFullScreen
                                frameBorder="0"
                                src={`${videoURL.replace(
                                  "controls=1",
                                  "controls=0"
                                )}&autoplay=1&mute=1&showinfo=0&loop=1&playlist=${videoId}&vq=hd720&rel=0`}
                              />
                            ) : (
                              <video controls autoPlay muted loop playsInline>
                                <source type="video/mp4" src={`${videoURL}`} />
                              </video>
                            )
                          ) : null}
                        </SwiperSlide>
                      );
                    })}
                </Swiper>
              )}
            </React.Fragment>
          )}
        </div>
      )}
    </section>
  );
};

export default LandingBanner;
