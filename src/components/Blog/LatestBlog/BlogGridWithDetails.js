"use client";

import moment from "moment/moment";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";

const BlogGridWithDetails = ({ blogData, spaceAfter, spaceBefore, id }) => {
  return (
    <section
      className={`grid-blog-section  ${
        spaceBefore && `frame-space-before-${spaceBefore}`
      } ${spaceAfter && `frame-space-after-${spaceAfter}`} `}
    >
      <Container>
        <Row className="g-4">
          {blogData &&
            blogData.length > 0 &&
            blogData.map((item, index) => {
              let commit = item.comments?.listComments?.length;
              let image =
                item.featuredImage[0]?.images?.defaultImage?.publicUrl;
              return (
                <Col key={index} lg={4} md={6} sm={12}>
                  <div className="grid-blog">
                    <div className="grid-blog__meta">
                      <div className="meta__date">
                        <svg
                          stroke="currentColor"
                          fill="currentColor"
                          strokeWidth="0"
                          viewBox="0 0 448 512"
                          height="1em"
                          width="1em"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M128 0c17.7 0 32 14.3 32 32V64H288V32c0-17.7 14.3-32 32-32s32 14.3 32 32V64h48c26.5 0 48 21.5 48 48v48H0V112C0 85.5 21.5 64 48 64H96V32c0-17.7 14.3-32 32-32zM0 192H448V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V192zm64 80v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16zm128 0v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H208c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H336zM64 400v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H208zm112 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H336c-8.8 0-16 7.2-16 16z"></path>
                        </svg>
                        <span>
                          {moment(item.publishDate, "DD-MM-YY").format(
                            "Do MMMM YYYY"
                          )}
                        </span>
                      </div>
                    </div>
                    <div className="grid-blog__image">
                      <Image
                        src={image}
                        height={0}
                        width={0}
                        alt={`${
                          item.featuredImage[0]?.properties?.alternative === ""
                            ? "grid-blog-image"
                            : item.featuredImage[0]?.properties?.alternative
                        }`}
                        title={`${
                          item.featuredImage[0]?.properties?.title === ""
                            ? "grid-blog-image"
                            : item.featuredImage[0]?.properties?.title
                        }`}
                        style={{ width: "100%", height: "100%" }}
                      />
                    </div>
                    <div className="grid-blog__description">
                      <h3 className="h3">
                        <Link href={`${item.detail}`} aria-label="blog_title">
                          {item.title}
                        </Link>
                      </h3>
                      {item.description && <p>{item.description}</p>}
                      <Link
                        href={`${item.detail}`}
                        className="description__link"
                        aria-label="blog_title"
                      >
                        Read More
                      </Link>
                    </div>
                  </div>
                </Col>
              );
            })}
        </Row>
      </Container>
    </section>
  );
};

export default BlogGridWithDetails;
