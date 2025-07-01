"use client";

import moment from "moment";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

const BlogMasonryWithDetails = ({ blogData, spaceAfter, spaceBefore, id }) => {
  const [masonryFirstArray, setMasonryFirstArray] = useState([]);
  const [masonrySecondArray, setMasonrySecondArray] = useState([]);
  const [masonryThirdArray, setMasonryThirdArray] = useState([]);

  useEffect(() => {
    const midIndex1 = Math.ceil(blogData.length / 3);
    const midIndex2 = Math.ceil((blogData.length * 2) / 3);
    setMasonryFirstArray(blogData.slice(0, midIndex1));
    setMasonrySecondArray(blogData.slice(midIndex1, midIndex2));
    setMasonryThirdArray(blogData.slice(midIndex2));
  }, [blogData]);

  return (
    <section
      className={`masonry-grid-blog ${
        spaceBefore && `frame-space-before-${spaceBefore}`
      } ${spaceAfter && `frame-space-after-${spaceAfter}`}`}
    >
      <Container>
        <Row>
          <Col lg={7} md={12} sm={12} className="order-2 order-lg-1">
            <Row>
              <Col lg={6} md={6} sm={12}>
                {masonryFirstArray.map((item, index) => {
                  let commit = item.comments?.listComments?.length;
                  return (
                    <div className="masonry-blog" key={index}>
                      {item?.tags?.listTags.length !== 0 && (
                        <div className="masonry-blog__teg">
                          {item?.tags?.listTags?.map((tag, index) => {
                            return (
                              <Link
                                href={`${tag.tagLink}`}
                                key={index}
                                aria-label="blog_title"
                              >
                                {tag.title}
                              </Link>
                            );
                          })}
                        </div>
                      )}
                      <div className="masonry-blog__description">
                        <h4>
                          <Link href={`${item.detail}`} aria-label="blog_title">
                            {item.title}
                          </Link>
                        </h4>
                        {item.description && <p>{item.description}</p>}
                      </div>
                      <div className="masonry-blog__meta">
                        <Link
                          href={`${item.detail}`}
                          className="meta__date"
                          aria-label="blog_detail"
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
                            <path d="M128 0c17.7 0 32 14.3 32 32V64H288V32c0-17.7 14.3-32 32-32s32 14.3 32 32V64h48c26.5 0 48 21.5 48 48v48H0V112C0 85.5 21.5 64 48 64H96V32c0-17.7 14.3-32 32-32zM0 192H448V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V192zm64 80v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16zm128 0v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H208c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H336zM64 400v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H208zm112 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H336c-8.8 0-16 7.2-16 16z"></path>
                          </svg>
                          <span>
                            {moment(item.publishDate, "DD-MM-YY").format(
                              "Do MMMM YYYY"
                            )}
                          </span>
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </Col>
              <Col lg={6} md={6} sm={12}>
                {masonrySecondArray.map((item, index) => {
                  let commit = item.comments?.listComments?.length;
                  return (
                    <div className="masonry-blog" key={index}>
                      {item?.tags?.listTags.length !== 0 && (
                        <div className="masonry-blog__teg">
                          {item?.tags?.listTags?.map((tag, index) => {
                            return (
                              <Link
                                href={`${tag.tagLink}`}
                                key={index}
                                aria-label="blog_title"
                              >
                                {tag.title}
                              </Link>
                            );
                          })}
                        </div>
                      )}
                      <div className="masonry-blog__description">
                        <h4>
                          <Link href={`${item.detail}`} aria-label="blog_title">
                            {item.title}
                          </Link>
                        </h4>
                        {item.description && <p>{item.description}</p>}
                      </div>
                      <div className="masonry-blog__meta">
                        <Link
                          href={`${item.detail}`}
                          className="meta__date"
                          aria-label="published_date"
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
                            <path d="M128 0c17.7 0 32 14.3 32 32V64H288V32c0-17.7 14.3-32 32-32s32 14.3 32 32V64h48c26.5 0 48 21.5 48 48v48H0V112C0 85.5 21.5 64 48 64H96V32c0-17.7 14.3-32 32-32zM0 192H448V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V192zm64 80v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16zm128 0v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H208c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H336zM64 400v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H208zm112 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H336c-8.8 0-16 7.2-16 16z"></path>
                          </svg>
                          <span>
                            {moment(item.publishDate, "DD-MM-YY").format(
                              "Do MMMM YYYY"
                            )}
                          </span>
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </Col>
            </Row>
          </Col>
          <Col lg={5} md={12} sm={12} className="order-1 order-lg-2 ">
            {masonryThirdArray.map((item, index) => {
              let commit = item.comments?.listComments?.length;
              return (
                <div className="masonry-blog" key={index}>
                  {item?.tags?.listTags.length !== 0 && (
                    <div className="masonry-blog__teg">
                      {item?.tags?.listTags?.map((tag, index) => {
                        return (
                          <Link
                            href={`${tag.tagLink}`}
                            key={index}
                            aria-label="blog_title"
                          >
                            {tag.title}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                  <div className="masonry-blog__description">
                    <h4>
                      <Link href={`${item.detail}`} aria-label="blog_title">
                        {item.title}
                      </Link>
                    </h4>
                    {item.description && <p>{item.description}</p>}
                  </div>
                  <div className="masonry-blog__meta">
                    <Link
                      href={`${item.detail}`}
                      className="meta__date"
                      aria-label="published_date"
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
                        <path d="M128 0c17.7 0 32 14.3 32 32V64H288V32c0-17.7 14.3-32 32-32s32 14.3 32 32V64h48c26.5 0 48 21.5 48 48v48H0V112C0 85.5 21.5 64 48 64H96V32c0-17.7 14.3-32 32-32zM0 192H448V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V192zm64 80v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16zm128 0v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H208c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H336zM64 400v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H208zm112 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H336c-8.8 0-16 7.2-16 16z"></path>
                      </svg>
                      <span>
                        {" "}
                        {moment(item.publishDate, "DD-MM-YY").format(
                          "Do MMMM YYYY"
                        )}
                      </span>
                    </Link>
                  </div>
                </div>
              );
            })}
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default BlogMasonryWithDetails;
