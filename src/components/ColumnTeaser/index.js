"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Col, Row } from "react-bootstrap";
import * as FontAwesome from "react-icons/fa6";

const ColumnTeaser = ({ data, spaceAfter, spaceBefore }) => {
  const TeaserArrayOne = [];
  const TeaserArrayTwo = [];
  function IconComponent({ iconName }) {
    const Icon = FontAwesome[iconName];
    return Icon ? <Icon /> : null;
  }

  data?.teasers?.forEach((ele, index) => {
    if (index < data?.teasers.length / 2) {
      TeaserArrayOne.push(ele);
    } else {
      TeaserArrayTwo.push(ele);
    }
  });

  return (
    <section
      className={`column-teaser-section ${
        spaceBefore && `frame-space-before-${spaceBefore}`
      } ${spaceAfter && `frame-space-after-${spaceAfter}`}`}
    >
      <div className="column-teaser__column">
        <Row className="justify-content-center justify-content-md-between">
          <Col lg={4} md={4} sm={12}>
            {TeaserArrayOne.map((item, index) => {
              return (
                <div className="column-grid" key={index}>
                  <h4>
                    <span>
                      <IconComponent iconName={item?.icon} />
                    </span>
                    {item.title}
                  </h4>
                  <p>{item.content}</p>
                </div>
              );
            })}
          </Col>
          <Col lg={4} md={4} className="column-image-gap">
            {data &&
              data.image &&
              data.image.length > 0 &&
              data.image[0].publicUrl && (
                <div className="column-teaser__image">
                  <Image
                    src={data?.image[0]?.publicUrl}
                    height={0}
                    width={0}
                    alt="column-teaser-image"
                    title="column-teaser-image"
                    style={{ width: "auto", height: "100%" }}
                  />
                </div>
              )}
          </Col>
          <Col lg={4} md={4} sm={12}>
            {TeaserArrayTwo.map((item, index) => {
              return (
                <div className="column-grid" key={index}>
                  <h4>
                    <span>
                      <IconComponent iconName={item?.icon} />
                    </span>
                    {item.title}
                  </h4>
                  <p>{item.content}</p>
                </div>
              );
            })}
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default ColumnTeaser;
