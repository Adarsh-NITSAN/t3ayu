"use client";

import Link from "next/link";
import React from "react";
import FancyBox from "./FancyBox";
import Heading from "./Heading";
import DOMPurify from "dompurify";
import { sanitizeLink } from "@/utils/sanitizeLink";
import { useRouter } from "next/navigation";
import Image from "next/image";

const TextPic = ({ data, spaceAfter, spaceBefore, id }) => {
  const router = useRouter();
  const { bodytext, gallery, enlargeImageOnClick } = data;

  const images = ({ properties, publicUrl }, border) => {
    if (!publicUrl) {
      return <>No Data Found!</>;
    }

    return (
      <React.Fragment key={publicUrl}>
        <FancyBox
          options={{
            Carousel: {
              infinite: false,
            },
            hideScrollbar: false,
          }}
        >
          {properties.link
            ? publicUrl && (
                <Link
                  href={`${properties.link}`}
                  target={`${properties.linkData.target}`}
                  aria-label="image"
                >
                  <Image
                    alt={
                      properties.alternative ? properties.alternative : "image"
                    }
                    src={publicUrl}
                    title={properties.title}
                    height={properties.height ? properties.height : 0}
                    width={properties.width ? properties.width : 0}
                    sizes="100vw"
                    className={` ${
                      border.enabled ? "img-fluid rounded mb-4" : "mb-0"
                    }`}
                    style={{ width: "auto", height: "auto", maxWidth: "100%" }}
                  />
                </Link>
              )
            : publicUrl &&
              (enlargeImageOnClick ? (
                <Link
                  href={publicUrl}
                  data-fancybox="gallery"
                  aria-label="gallery"
                >
                  <Image
                    alt={
                      properties.alternative ? properties.alternative : "image"
                    }
                    src={publicUrl}
                    title={properties.title}
                    height={properties.height ? properties.height : 0}
                    width={properties.width ? properties.width : 0}
                    sizes="100vw"
                    className={` ${
                      border.enabled ? "img-fluid rounded mb-4" : "mb-0"
                    }`}
                    style={{
                      width: "auto",
                      height: "auto",
                      maxWidth: "100%",
                    }}
                  />
                </Link>
              ) : (
                <Image
                  alt={
                    properties.alternative ? properties.alternative : "image"
                  }
                  src={publicUrl}
                  title={properties.title}
                  height={properties.height ? properties.height : 0}
                  width={properties.width ? properties.width : 0}
                  sizes="100vw"
                  className={` ${
                    border.enabled ? "img-fluid rounded mb-4" : "mb-0"
                  }`}
                  style={{
                    width: "auto",
                    height: "auto",
                    display: "inline-block",
                    maxWidth: "100%",
                  }}
                />
              ))}
        </FancyBox>
        {properties.description && <p>{properties.description}</p>}
      </React.Fragment>
    );
  };

  const renderImage = (bodytext, { position, rows, border }) => {
    return (
      <Heading data={data}>
        <div
          className={`ce-textpic ce-${
            position.horizontal && position.horizontal
          } ${position.vertical && `ce-${position.vertical}`} ${
            position.noWrap ? "ce-nowrap" : ""
          }`}
        >
          {position.vertical === "below" ? (
            <>
              <div className="ce-bodytext">
                <div
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(bodytext),
                  }}
                  onClick={(e) => sanitizeLink(e, router)}
                />
              </div>
              <div
                className={`ce-gallery`}
                data-ce-columns="1"
                data-ce-images="1"
              >
                {rows &&
                  Object.values(rows).length > 0 &&
                  Object.values(rows).map(({ columns }, index) => {
                    return (
                      <div className="ce-row" key={index}>
                        {" "}
                        {columns &&
                          Object.values(columns) &&
                          Object.values(columns).map((column, index) => {
                            return (
                              <div className="ce-column" key={index}>
                                {images(column, border)}
                              </div>
                            );
                          })}
                      </div>
                    );
                  })}
              </div>
            </>
          ) : (
            <>
              <div
                className={`ce-gallery`}
                data-ce-columns="1"
                data-ce-images="1"
              >
                {rows &&
                  Object.values(rows).length > 0 &&
                  Object.values(rows).map(({ columns }, index) => {
                    return (
                      <div className="ce-row" key={index}>
                        {columns &&
                          Object.values(columns) &&
                          Object.values(columns).map((column, index) => {
                            return (
                              <div className="ce-column" key={index}>
                                {images(column, border)}
                              </div>
                            );
                          })}
                      </div>
                    );
                  })}
              </div>
              <div className="ce-bodytext">
                <div
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(bodytext),
                  }}
                  onClick={(e) => sanitizeLink(e, router)}
                />
              </div>
            </>
          )}
        </div>
      </Heading>
    );
  };
  return (
    <section
      id={id}
      className={` ${spaceBefore && `frame-space-before-${spaceBefore}`} ${
        spaceAfter && `frame-space-after-${spaceAfter}`
      }`}
    >
      {renderImage(bodytext, gallery)}
    </section>
  );
};
export default TextPic;
