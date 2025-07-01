"use client";

import Link from "next/link";
import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import ModalVideo from "./ModalVideo";

const Video = ({ data, spaceAfter, spaceBefore }) => {
  const [videoModal, setVideoModal] = useState(false);
  const [videoModalURL, setVideoModalURL] = useState();

  const renderVideo = () => {
    return (
      <Container>
        <Row className="justify-content-center">
          <Col xl={6} lg={8} md={10}>
            <div className="video__text text-center">
              <div className="video__text-link">
                <Link
                  href={"#"}
                  className="mediaplayer__playbtn"
                  onClick={(e) => {
                    e.preventDefault();
                    setVideoModal(!videoModal);
                    setVideoModalURL({
                      url: `${data.video[0].publicUrl}`,
                      autoplay: data.video[0].properties.autoplay,
                    });
                  }}
                  aria-label="video"
                >
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
                </Link>
              </div>
              <p>{data.subheadline}</p>
              <h1>{data.headline}</h1>
            </div>
          </Col>
        </Row>
      </Container>
    );
  };

  return (
    <>
      {data &&
        data.video &&
        data.video.length > 0 &&
        data.video[0].publicUrl && (
          <section
            className={`video-section ${
              data &&
              data.backgroundImage &&
              data.backgroundImage.length > 0 &&
              data.backgroundImage[0].publicUrl &&
              data.overlay === "1"
                ? "video-overlay"
                : ""
            } ${spaceBefore && `frame-space-before-${spaceBefore}`} ${
              spaceAfter && `frame-space-after-${spaceAfter}`
            }`}
            style={
              data &&
              data.backgroundImage &&
              data.backgroundImage.length > 0 &&
              data.backgroundImage[0].publicUrl
                ? {
                    backgroundImage: `url(${data.backgroundImage[0].publicUrl})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "50%",
                    height: "760px",
                    zIndex: "1",
                  }
                : {}
            }
          >
            {renderVideo()}

            {videoModal && (
              <ModalVideo
                videoModal={videoModal}
                setVideoModal={setVideoModal}
                videoModalURL={videoModalURL}
              />
            )}
          </section>
        )}
    </>
  );
};

export default Video;
