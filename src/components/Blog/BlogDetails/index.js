"use client";

import moment from "moment/moment";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import {
  FacebookIcon,
  FacebookShareButton,
  InstapaperShareButton,
  InstapaperIcon,
  TwitterShareButton,
  TwitterIcon,
} from "react-share";
import { RenderContainerSection } from "@/components/Footer";

const ContentType = dynamic(() => import("@/utils/ContentType"), {
  ssr: false,
});

const BlogDetail = ({ image, title, authors, tags, publishDate, pageData }) => {
  const [pageUrl, setPageUrl] = useState("#");
  useEffect(() => {
    if (typeof window !== "undefined") setPageUrl(window.location.href);
  }, []);
  return (
    <>
      {/* {image && image.properties && image.properties.originalUrl && ( */}
      <div
        className="blog-details-image"
        style={
          image && image.publicUrl
            ? {
                // backgroundImage: `url(${process.env.NEXT_PUBLIC_API_URL}${image.properties.originalUrl})`,
                backgroundImage: `url(${image.publicUrl})`,
              }
            : {}
        }
      >
        <div className="blog-details-info">
          <ul>
            <li>
              <span>blog Title</span>
              <p>{title}</p>
            </li>
            <li>
              <span>Date</span>
              <p>{moment(publishDate * 1000).format("DD MMM YYYY")}</p>
            </li>
            <li>
              <span>Tags</span>
              <p>
                {tags.length > 0 && (
                  <>
                    {tags.map((tag, index) => {
                      return tags.length === index + 1 ? (
                        <>{`${tag.title}`}</>
                      ) : (
                        <>{`${tag.title}, `}</>
                      );
                    })}
                  </>
                )}
              </p>
            </li>
            {authors && authors.length > 0 && authors[0].name && (
              <li>
                <span>Blog Author</span>
                <p>{authors[0].name}</p>
              </li>
            )}
          </ul>
        </div>
      </div>
      {/* )} */}

      <Row>
        <Col lg={8}>
          <div className="blog-detail-meta">
            {pageData &&
              pageData.colPos0 &&
              pageData.colPos0.length > 0 &&
              pageData.colPos0.map((singleCol, index) => {
                return (
                  <React.Fragment key={index}>
                    {singleCol.type === "ns_base_2Cols" ||
                    singleCol.type === "ns_base_3Cols" ||
                    singleCol.type === "ns_base_4Cols" ||
                    singleCol.type === "ns_base_6Cols" ? (
                      <RenderContainerSection singleCol={singleCol} />
                    ) : singleCol.type === "ns_base_container" ? (
                      <RenderContainerSection singleCol={singleCol} />
                    ) : (
                      <Container>
                        <ContentType pageData={singleCol} />
                      </Container>
                    )}
                  </React.Fragment>
                );
              })}
          </div>
        </Col>
        <Col lg={4}>
          {authors && authors.length > 0 && (
            <div className="blog-detail-meta blog-author-detail">
              <h5 className="blog-meta-title">About Me</h5>
              {authors.map((author, index) => {
                return (
                  <div className="blog-author" key={index}>
                    {author.image && (
                      <Image
                        src={author.image.publicUrl}
                        height={0}
                        width={0}
                        style={{ width: "100%", height: "auto" }}
                        alt={author?.image?.properties?.alternative}
                      />
                    )}

                    {author.name && <h6>{author.name}</h6>}
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      sed do eiusmod tempor incididunt ut labore.
                    </p>
                  </div>
                );
              })}
            </div>
          )}
          <div className="blog-detail-meta blog-social-sharing">
            <h5 className="blog-meta-title">Never Miss News</h5>
            <ul>
              <li>
                <FacebookShareButton url={pageUrl}>
                  <FacebookIcon size={40} />
                </FacebookShareButton>
              </li>
              <li>
                <InstapaperShareButton url={pageUrl}>
                  <InstapaperIcon size={40} />
                </InstapaperShareButton>
              </li>
              <li>
                <TwitterShareButton url={pageUrl}>
                  <TwitterIcon size={40} />
                </TwitterShareButton>
              </li>
            </ul>
          </div>
          {pageData &&
            pageData.colPos7 &&
            pageData.colPos7.length > 0 &&
            pageData.colPos7.map((singleCol, index) => {
              return (
                <React.Fragment key={index}>
                  {singleCol.type === "ns_base_2Cols" ||
                  singleCol.type === "ns_base_3Cols" ||
                  singleCol.type === "ns_base_4Cols" ||
                  singleCol.type === "ns_base_6Cols" ? (
                    <RenderContainerSection singleCol={singleCol} />
                  ) : singleCol.type === "ns_base_container" ? (
                    <RenderContainerSection singleCol={singleCol} />
                  ) : (
                    <ContentType pageData={singleCol} />
                  )}
                </React.Fragment>
              );
            })}
        </Col>
      </Row>
    </>
  );
};
export default BlogDetail;
