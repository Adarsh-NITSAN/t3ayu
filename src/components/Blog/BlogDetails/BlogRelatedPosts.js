"use client";

import Link from "next/link";
import React from "react";
import { Col, Row } from "react-bootstrap";

const BlogRelatedPosts = ({ data, spaceAfter, spaceBefore }) => {
  return (
    <div
      className={`${spaceBefore && `frame-space-before-${spaceBefore}`} ${
        spaceAfter && `frame-space-after-${spaceAfter}`
      }`}
    >
      {data &&
        data.data &&
        data.data.relatedPosts &&
        data.data.relatedPosts.length > 0 && (
          <div className="related-post-area">
            <h3>Releted Post</h3>
            <Row>
              {data.data.relatedPosts.map((post) => {
                return (
                  <Col>
                    <div className="related-post-item">
                      {post &&
                        post.featuredImage &&
                        post.featuredImage.length > 0 &&
                        post.featuredImage.map((image) => {
                          return (
                            image &&
                            image.images &&
                            image.images.defaultImage &&
                            image.images.defaultImage.publicUrl && (
                              <div
                                className="post-thumb"
                                style={{
                                  backgroundImage: `url(${image.images.defaultImage.publicUrl})`,
                                }}
                              />
                            )
                          );
                        })}

                      <div className="post-desc">
                        {post && post.publishDate && (
                          <Link href={"#"} aria-label="date">
                            <svg
                              width="20px"
                              height="20px"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                              <g
                                id="SVGRepo_tracerCarrier"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              ></g>
                              <g id="SVGRepo_iconCarrier">
                                {" "}
                                <path
                                  d="M8 12C7.44772 12 7 12.4477 7 13C7 13.5523 7.44772 14 8 14H16C16.5523 14 17 13.5523 17 13C17 12.4477 16.5523 12 16 12H8Z"
                                  fill="#000000"
                                ></path>{" "}
                                <path
                                  d="M7 17C7 16.4477 7.44772 16 8 16H12C12.5523 16 13 16.4477 13 17C13 17.5523 12.5523 18 12 18H8C7.44772 18 7 17.5523 7 17Z"
                                  fill="#000000"
                                ></path>{" "}
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M7 2C7.55228 2 8 2.44772 8 3V4H16V3C16 2.44772 16.4477 2 17 2C17.5523 2 18 2.44772 18 3V4.10002C20.2822 4.56329 22 6.58104 22 9V17C22 19.7614 19.7614 22 17 22H7C4.23858 22 2 19.7614 2 17V9C2 6.58104 3.71776 4.56329 6 4.10002V3C6 2.44772 6.44772 2 7 2ZM20 10H4V17C4 18.6569 5.34315 20 7 20H17C18.6569 20 20 18.6569 20 17V10Z"
                                  fill="#000000"
                                ></path>{" "}
                              </g>
                            </svg>
                            {post.publishDate}
                          </Link>
                        )}

                        <h4>
                          <Link
                            href={`${post.detail ? post.detail : "#"}`}
                            aria-label="blog_title"
                          >
                            {post.title}
                          </Link>
                        </h4>
                        {post.description && <p>{post.description}</p>}
                      </div>
                    </div>
                  </Col>
                );
              })}
            </Row>
          </div>
        )}
    </div>
  );
};

export default BlogRelatedPosts;
