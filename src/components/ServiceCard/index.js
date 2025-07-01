"use client";

import Link from "next/link";
import React from "react";
import { Col, Row } from "react-bootstrap";
import * as FontAwesome from "react-icons/fa6";

const ServiceCard = ({ data, spaceBefore, spaceAfter }) => {
  function IconComponent({ iconName }) {
    const Icon = FontAwesome[iconName];
    return Icon ? <Icon /> : null;
  }

  return (
    <section
      className={`service-card-section ${
        spaceBefore && `frame-space-before-${spaceBefore}`
      } ${spaceAfter && `frame-space-after-${spaceAfter}`}`}
    >
      <Row>
        {data?.items?.map((item, index) => {
          return (
            <Col key={index} lg={3} md={6} sm={12}>
              <div className="service-card">
                <div className="service-card__link">
                  {item.link?.href && (
                    <Link
                      href={item.link?.href}
                      title="service-card link"
                      aria-label="link"
                    >
                      <FontAwesome.FaArrowRightLong />
                    </Link>
                  )}
                </div>
                {item.title && <h4>{item.title}</h4>}
                {item.content && <p>{item.content}</p>}
                <div className="service-card__icon">
                  <IconComponent iconName={item?.icons} />
                </div>
              </div>
            </Col>
          );
        })}
      </Row>
    </section>
  );
};

export default ServiceCard;
