"use client";

import React from "react";
import * as FontAwesome from "react-icons/fa6";

const Stepper = ({ data, spaceBefore, spaceAfter }) => {
  function IconComponent({ iconName }) {
    const Icon = FontAwesome[iconName];
    return Icon ? <Icon /> : null;
  }

  return (
    <div
      className={`stepper-section ${
        spaceBefore && `frame-space-before-${spaceBefore}`
      } ${spaceAfter && `frame-space-after-${spaceAfter}`}`}
    >
      {data.variations === "1" ? (
        <div className={"stepper"}>
          <div className="stepper__icon">
            <IconComponent iconName={data?.icons} />
          </div>
          <h4>{data.title}</h4>
          <p>{data.content}</p>
          <span className="stepper__count">{data.steps}</span>
        </div>
      ) : (
        <div className="stepper-grid">
          <h4>{data.title}</h4>
          <p>{data.content}</p>
          <div className="stepper-grid__icon">
            <FontAwesome.FaCheck />
          </div>
          <span className="stepper-grid__count">{data.steps}</span>
        </div>
      )}
    </div>
  );
};

export default Stepper;
