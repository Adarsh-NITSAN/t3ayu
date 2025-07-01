"use client";

import React from "react";

const Map = ({ data, spaceBefore, spaceAfter, id }) => {
  return (
    <div
      id={id}
      className={`${spaceBefore && `frame-space-before-${spaceBefore}`} ${
        spaceAfter && `frame-space-after-${spaceAfter}`
      }
  map-section`}
    >
      <div
        className="embed-responsive embed-responsive-21by9"
        data-aos={data.selectAnimation && data.selectAnimation}
      >
        <iframe
          src={data?.mapIframeLink}
          className="embed-responsive-item"
          width={"100%"}
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default Map;
