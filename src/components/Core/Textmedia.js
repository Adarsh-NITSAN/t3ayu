"use client";

import React from "react";
import DOMPurify from "dompurify";
import { useTranslations } from "next-intl";
import FancyBox from "./FancyBox";
import Heading from "./Heading";
import { Col, Row } from "react-bootstrap";
import { useRouter } from "next/navigation";
import { sanitizeLink } from "@/utils/sanitizeLink";

const Textmedia = ({
  data,
  layoutType,
  elementType,
  spaceBefore,
  spaceAfter,
}) => {
  const { gallery, bodytext } = data;
  const router = useRouter();
  const t = useTranslations();
  const mediaElement = ({ properties, publicUrl }, border) => {
    if (!publicUrl) {
      return <>{t("no_data_found")}</>;
    }

    return (
      <div className="ce-row">
        <div className="ce-column">
          <figure className={properties.type}>
            <FancyBox
              options={{
                Carousel: {
                  infinite: false,
                },
                hideScrollbar: false,
              }}
            >
              <div className={`${properties.type}-embed`}>
                {properties.type === "audio" ? (
                  <audio className="audio-embed-item" controls>
                    <source src={publicUrl} type="audio/mpeg" />
                  </audio>
                ) : properties.extension !== "mp4" ? (
                  <iframe
                    src={publicUrl}
                    className={`${
                      border.enabled
                        ? "video-embed-item rounded"
                        : "video-embed-item"
                    }`}
                    height={properties.dimensions.height}
                    width={properties.dimensions.width}
                    allowFullScreen
                  />
                ) : (
                  <video
                    width={2000}
                    className={`${
                      border.enabled
                        ? "video-embed-item rounded"
                        : "video-embed-item"
                    }`}
                    controls
                  >
                    <source src={publicUrl} type="video/mp4" />
                  </video>
                )}
              </div>
            </FancyBox>
            {properties.description && (
              <figcaption className="video-caption">
                {properties.description}
              </figcaption>
            )}
          </figure>
        </div>
      </div>
    );
  };

  const renderVideoElement = ({ position, rows, border }, bodytext) => {
    return (
      <Heading data={data} layoutType={layoutType} elementType={elementType}>
        <div
          className={`ce-textpic ${
            position.horizontal && `ce-${position.horizontal}`
          } ${position.vertical && `ce-${position.vertical}`} ${
            position.noWrap ? `ce-nowrap` : ""
          }`}
        >
          {position.vertical === "below" ? (
            <>
              {bodytext && (
                <div className="ce-bodytext">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(bodytext),
                    }}
                    onClick={(e) => sanitizeLink(e, router)}
                  />
                </div>
              )}
              <div
                className="ce-gallery"
                data-ce-columns="1"
                data-ce-images="1"
              >
                {rows &&
                  Object.values(rows).length &&
                  Object.values(rows).map(({ columns }, index) => {
                    return (
                      <Row key={index}>
                        {columns &&
                          Object.values(columns) &&
                          Object.values(columns).map((column, index) => {
                            return (
                              <Col key={index}>
                                {mediaElement(column, border)}
                              </Col>
                            );
                          })}
                      </Row>
                    );
                  })}
              </div>
            </>
          ) : (
            <>
              <div
                className="ce-gallery"
                data-ce-columns="1"
                data-ce-images="1"
              >
                {rows &&
                  Object.values(rows).length &&
                  Object.values(rows).map(({ columns }, index) => {
                    return (
                      <Row key={index}>
                        {columns &&
                          Object.values(columns) &&
                          Object.values(columns).map((column, index) => {
                            return (
                              <Col key={index}>
                                {mediaElement(column, border)}
                              </Col>
                            );
                          })}
                      </Row>
                    );
                  })}
              </div>
              {bodytext && (
                <div className="ce-bodytext">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(bodytext),
                    }}
                    onClick={(e) => sanitizeLink(e, router)}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </Heading>
    );
  };

  return (
    <section
      className={`textmedia ${
        spaceAfter && `frame-space-after-${spaceAfter}`
      } ${spaceBefore && `frame-space-after-${spaceBefore}`}`}
    >
      {renderVideoElement(gallery, bodytext)}
    </section>
  );
};
export default Textmedia;
