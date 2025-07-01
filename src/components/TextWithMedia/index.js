"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import ModalVideo from "../Video/ModalVideo";

const TextWithMedia = ({ data, spaceAfter, spaceBefore }) => {
  const [videoModal, setVideoModal] = useState(false);
  const [videoModalURL, setVideoModalURL] = useState();
  return (
    <>
      <section
        className={`textwithmedia ${
          spaceBefore && `frame-space-before-${spaceBefore}`
        } ${spaceAfter && `frame-space-after-${spaceAfter}`} ${
          data.variation === "0" ? "textwithmedia--dark" : ""
        }`}
      >
        <Row
          className={`align-items-center ${
            data.variation === "0" ? "g-0" : ""
          }`}
        >
          <Col md={data.variation === "0" ? 12 : 6} lg={6} className={``}>
            {data &&
              data.image &&
              data.image.length > 0 &&
              data.image[0].publicUrl && (
                <div className="textwithmedia__banner">
                  <Image
                    src={`${data.image[0].publicUrl}`}
                    height={0}
                    width={0}
                    style={{ width: "100%", height: "auto" }}
                    alt={"banner"}
                  />
                </div>
              )}
          </Col>
          <Col md={data.variation === "0" ? 12 : 6} lg={6} col={12}>
            <div className="textwithmedia__text">
              {data &&
                data.media &&
                data.media.length > 0 &&
                data.media[0].publicUrl && (
                  <Link
                    href={"#"}
                    className="mediaplayer__playbtn"
                    onClick={(e) => {
                      e.preventDefault();
                      setVideoModal(!videoModal);
                      setVideoModalURL({
                        url: `${data.media[0].publicUrl}`,
                        // autoplay: data.media[0].properties.autoplay,
                        autoplay: true,
                      });
                    }}
                    aria-label="media"
                  >
                    {" "}
                    {data.variation === "0" ? (
                      <>Play</>
                    ) : (
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth="0"
                        viewBox="0 0 448 512"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z"></path>
                      </svg>
                    )}
                  </Link>
                )}
              {data.variation === "1" ? (
                <>
                  <h1>{data.headline}</h1>
                  <p className="subheading-1">{data.subheadline}</p>
                </>
              ) : (
                <>
                  <span className="overline-line--left">
                    {data.subheadline}
                  </span>
                  <h2>{data.headline}</h2>
                  <p className="subheading-0">{data.content}</p>
                </>
              )}
            </div>
          </Col>
        </Row>

        {videoModal && (
          <ModalVideo
            videoModal={videoModal}
            setVideoModal={setVideoModal}
            videoModalURL={videoModalURL}
          />
        )}
      </section>
    </>
  );
};

export default TextWithMedia;
