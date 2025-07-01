"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import DOMPurify from "dompurify";

const Team = ({ data, spaceAfter, spaceBefore }) => {
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
    slidesPerView: 1,
    spaceBetween: 30,
    loop: data && data.sliderLoop === "1" ? true : false,
    navigation: data && data.navigations === "1" ? true : false,
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
    pagination:
      data && data.dotsDynamicStyle === "1"
        ? {
            clickable: true,
            dynamicBullets: true,
          }
        : data && data.sliderFractionNumbers === "1"
        ? {
            type: "fraction",
          }
        : data && data.sliderDots === "1"
        ? {
            clickable: true,
          }
        : false,
    breakpoints: {
      576: {
        slidesPerView: 2,
      },
      768: {
        slidesPerView: 3,
      },
      992: {
        slidesPerView: 4,
      },
      1200: {
        slidesPerView: 4,
      },
    },
  };

  const renderMember = ({ name, designation, link, image }) => {
    return (
      <div className="members">
        {image.length > 0 && image[0].publicUrl && (
          <div className="member-img">
            <Image
              src={`${image[0].publicUrl}`}
              alt={image[0].properties?.alternative || "Image"}
              title={image[0].properties?.title}
              width={0}
              height={0}
              style={{ width: "100%", height: "auto" }}
            />
          </div>
        )}

        <div className="member-info">
          {name && <h3>{name}</h3>}

          {designation && (
            <span
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(designation),
              }}
            />
          )}
        </div>
        <Link
          href={link.href ? link.href : "/"}
          className="social-info"
          aria-label="social"
          target={link.target}
        >
          +
        </Link>
      </div>
    );
  };
  return (
    <section
      className={`team-list  ${
        spaceBefore && `frame-space-before-${spaceBefore}`
      } ${spaceAfter && `frame-space-after-${spaceAfter}`}`}
    >
      <div className="team-wrapper">
        <Row
          className={`g-0 ${
            data.variations === "0" ? "justify-content-center" : ""
          }`}
        >
          {data && data.variations && data.variations === "0"
            ? data.items &&
              data.items.length > 0 &&
              data.items.map((item, index) => {
                return (
                  <Col lg={12 / 4} sm={6} className="g-4" key={index}>
                    {renderMember(item)}
                  </Col>
                );
              })
            : swiperModules.length > 0 &&
              Swiper &&
              SwiperSlide && (
                <Swiper
                  modules={swiperModules}
                  {...settings}
                  className="swiper-slider"
                >
                  {data.items &&
                    data.items.length > 0 &&
                    data.items.map((item, index) => {
                      return (
                        <SwiperSlide key={index}>
                          <Col className="g-4">{renderMember(item)}</Col>
                        </SwiperSlide>
                      );
                    })}
                </Swiper>
              )}
        </Row>
      </div>
    </section>
  );
};
export default Team;
