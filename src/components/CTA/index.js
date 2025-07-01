"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

const CallToAction = ({ data, spaceAfter, spaceBefore }) => {
  return (
    <section
      className={`call-to-action ${
        spaceBefore && `frame-space-before-${spaceBefore}`
      } ${spaceAfter && `frame-space-after-${spaceAfter}`}`}
    >
      {data &&
        data.image &&
        data.image.length > 0 &&
        data.image[0].publicUrl && (
          <div
            className={`call-to-action__image ${
              data.backgroundPattern === "1"
                ? "call-to-action__image--clip-path"
                : ""
            }`}
          >
            <Image
              src={data?.image[0]?.publicUrl}
              height={0}
              width={0}
              alt={
                data?.image[0]?.properties.alternative
                  ? data?.image[0]?.properties.alternative
                  : "CTA-image"
              }
              title={
                data?.image[0]?.properties.title === ""
                  ? "CTA-image"
                  : data?.image[0]?.properties.title
              }
              style={{ width: "auto", height: "100%" }}
            />
          </div>
        )}

      <div
        className={`call-to-action__content ${
          data.backgroundColor === "0" ? "bg-primary-color" : "bg-dark-color"
        } ${
          data.backgroundPattern === "1"
            ? "call-to-action__content--clip-path"
            : ""
        }`}
      >
        <div className="content__text">
          {data.subheadline && (
            <span className="text-tag__right">{data.subheadline}</span>
          )}
          {data.headline && <h2>{data.headline}</h2>}
        </div>
        {data?.link?.href && (
          <Link
            href={`${data.link.href}`}
            className={`content__link ${
              data.backgroundColor === "0"
                ? "bg-dark-color"
                : "bg-primary-color"
            }`}
            aria-label="link"
          >
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 512 512"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M295.6 163.7c-5.1 5-5.1 13.3-.1 18.4l60.8 60.9H124.9c-7.1 0-12.9 5.8-12.9 13s5.8 13 12.9 13h231.3l-60.8 60.9c-5 5.1-4.9 13.3.1 18.4 5.1 5 13.2 5 18.3-.1l82.4-83c1.1-1.2 2-2.5 2.7-4.1.7-1.6 1-3.3 1-5 0-3.4-1.3-6.6-3.7-9.1l-82.4-83c-4.9-5.2-13.1-5.3-18.2-.3z"></path>
            </svg>
          </Link>
        )}
      </div>
    </section>
  );
};

export default CallToAction;
