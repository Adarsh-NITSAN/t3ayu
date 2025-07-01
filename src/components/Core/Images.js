"use client";

import React from "react";
import Image from "next/image";

const Images = ({ data, spaceAfter, spaceBefore, id }) => {
  return (
    <div
      className={`${spaceBefore && `frame-space-before-${spaceBefore}`} ${
        spaceAfter && `frame-space-after-${spaceAfter}`
      }`}
    >
      <Image
        src={data.gallery.rows[1].columns[1].publicUrl}
        // src={`${process.env.NEXT_PUBLIC_API_URL}${data.gallery.rows[1].columns[1].properties.originalUrl}`}
        alt={data.gallery.rows[1].columns[1].properties.alternative || "image"}
        title={data.gallery.rows[1].columns[1].properties.title || "image"}
        width={0}
        height={0}
        style={{ width: "auto", height: "auto", maxWidth: "100%" }} // optional
      />
    </div>
  );
};

export default Images;
