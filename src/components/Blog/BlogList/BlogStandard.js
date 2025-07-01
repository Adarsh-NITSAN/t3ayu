"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Pagination from "./Pagination";
import getAPIData from "@/utils/GetData";
// import getAPIData from "@/app/route";

const BlogStandard = ({ content, spaceAfter, spaceBefore }) => {
  const [showPagination, setShowPagination] = useState(true);
  const [paginationLink, setPaginationLink] = useState();
  const [blogData, setBlogData] = useState(content || []);

  useEffect(() => {
    async function getblogs() {
      if (paginationLink) {
        const blogData = await getAPIData(paginationLink);

        const reCall = (content) => {
          if (content.items && content.items.length > 0) {
            content.items.map(({ contentElements }) => {
              contentElements.map(({ content, type }) => {
                if (type === "blog_posts") {
                  setBlogData(content.data);
                } else {
                  reCall(content);
                }
              });
            });
          }
        };

        blogData.data.content.colPos0.map(({ content, type }) => {
          if (type === "blog_posts") {
            setBlogData(content.data);
          } else {
            if (content.items && content.items.length > 0) {
              content.items.map((item) => {
                item &&
                  item.contentElements &&
                  item.contentElements.length > 0 &&
                  item.contentElements.map(({ content, type }) => {
                    if (type === "blog_posts") {
                      setBlogData(content.data);
                    } else {
                      reCall(content);
                    }
                  });
              });
            }
          }
        });
      }
    }
    getblogs();
  }, [paginationLink]);

  const renderBlogs = (blogs) => {
    return (
      <>
        {blogs.map((item, index) => {
          return (
            <Col md={12} key={index}>
              <div className="blog-standard__box">
                <div className="blog-media">
                  <Image
                    src={item.featuredImage[0].images.defaultImage.publicUrl}
                    height={0}
                    width={0}
                    style={{ width: "100%", height: "auto" }}
                    alt={"blog-image"}
                  />
                </div>
                <div className="blog-desc">
                  {item &&
                    item.categories &&
                    item.categories.listCategories &&
                    item.categories.listCategories.length > 0 && (
                      <Link
                        className="btn blog-cat"
                        href="#"
                        aria-label="tag_title"
                      >
                        {item.categories.listCategories.map(
                          (category, index) => {
                            return item.categories.listCategories.length ===
                              index + 1 ? (
                              <>{`${category.title}`}</>
                            ) : (
                              <>{`${category.title}, `}</>
                            );
                          }
                        )}
                      </Link>
                    )}

                  <h2>
                    <Link href={`${item.detail}`} aria-label="blog_title">
                      {item.title}
                    </Link>
                  </h2>
                  <ul className="blog-meta">
                    {/* <li>
                      <Link href="#" aria-label="category_title">
                        <svg
                          stroke="currentColor"
                          fill="currentColor"
                          strokeWidth="0"
                          viewBox="0 0 576 512"
                          height="1em"
                          width="1em"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M288 144a110.94 110.94 0 0 0-31.24 5 55.4 55.4 0 0 1 7.24 27 56 56 0 0 1-56 56 55.4 55.4 0 0 1-27-7.24A111.71 111.71 0 1 0 288 144zm284.52 97.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400c-98.65 0-189.09-55-237.93-144C98.91 167 189.34 112 288 112s189.09 55 237.93 144C477.1 345 386.66 400 288 400z"></path>
                        </svg>
                        232 views
                      </Link>
                    </li> */}
                    {/* <li>
                      <Link href="#" aria-label="category_title">
                        <svg
                          stroke="currentColor"
                          fill="currentColor"
                          strokeWidth="0"
                          viewBox="0 0 640 512"
                          height="1em"
                          width="1em"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M88.2 309.1c9.8-18.3 6.8-40.8-7.5-55.8C59.4 230.9 48 204 48 176c0-63.5 63.8-128 160-128s160 64.5 160 128s-63.8 128-160 128c-13.1 0-25.8-1.3-37.8-3.6c-10.4-2-21.2-.6-30.7 4.2c-4.1 2.1-8.3 4.1-12.6 6c-16 7.2-32.9 13.5-49.9 18c2.8-4.6 5.4-9.1 7.9-13.6c1.1-1.9 2.2-3.9 3.2-5.9zM0 176c0 41.8 17.2 80.1 45.9 110.3c-.9 1.7-1.9 3.5-2.8 5.1c-10.3 18.4-22.3 36.5-36.6 52.1c-6.6 7-8.3 17.2-4.6 25.9C5.8 378.3 14.4 384 24 384c43 0 86.5-13.3 122.7-29.7c4.8-2.2 9.6-4.5 14.2-6.8c15.1 3 30.9 4.5 47.1 4.5c114.9 0 208-78.8 208-176S322.9 0 208 0S0 78.8 0 176zM432 480c16.2 0 31.9-1.6 47.1-4.5c4.6 2.3 9.4 4.6 14.2 6.8C529.5 498.7 573 512 616 512c9.6 0 18.2-5.7 22-14.5c3.8-8.8 2-19-4.6-25.9c-14.2-15.6-26.2-33.7-36.6-52.1c-.9-1.7-1.9-3.4-2.8-5.1C622.8 384.1 640 345.8 640 304c0-94.4-87.9-171.5-198.2-175.8c4.1 15.2 6.2 31.2 6.2 47.8l0 .6c87.2 6.7 144 67.5 144 127.4c0 28-11.4 54.9-32.7 77.2c-14.3 15-17.3 37.6-7.5 55.8c1.1 2 2.2 4 3.2 5.9c2.5 4.5 5.2 9 7.9 13.6c-17-4.5-33.9-10.7-49.9-18c-4.3-1.9-8.5-3.9-12.6-6c-9.5-4.8-20.3-6.2-30.7-4.2c-12.1 2.4-24.7 3.6-37.8 3.6c-61.7 0-110-26.5-136.8-62.3c-16 5.4-32.8 9.4-50 11.8C279 439.8 350 480 432 480z"></path>
                        </svg>
                        35 Comments
                      </Link>
                    </li> */}
                    {item && item.publishDate && (
                      <li>
                        <Link href="#" aria-label="published_date">
                          <svg
                            stroke="currentColor"
                            fill="currentColor"
                            strokeWidth="0"
                            viewBox="0 0 1024 1024"
                            height="1em"
                            width="1em"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M960 95.888l-256.224.001V32.113c0-17.68-14.32-32-32-32s-32 14.32-32 32v63.76h-256v-63.76c0-17.68-14.32-32-32-32s-32 14.32-32 32v63.76H64c-35.344 0-64 28.656-64 64v800c0 35.343 28.656 64 64 64h896c35.344 0 64-28.657 64-64v-800c0-35.329-28.656-63.985-64-63.985zm0 863.985H64v-800h255.776v32.24c0 17.679 14.32 32 32 32s32-14.321 32-32v-32.224h256v32.24c0 17.68 14.32 32 32 32s32-14.32 32-32v-32.24H960v799.984zM736 511.888h64c17.664 0 32-14.336 32-32v-64c0-17.664-14.336-32-32-32h-64c-17.664 0-32 14.336-32 32v64c0 17.664 14.336 32 32 32zm0 255.984h64c17.664 0 32-14.32 32-32v-64c0-17.664-14.336-32-32-32h-64c-17.664 0-32 14.336-32 32v64c0 17.696 14.336 32 32 32zm-192-128h-64c-17.664 0-32 14.336-32 32v64c0 17.68 14.336 32 32 32h64c17.664 0 32-14.32 32-32v-64c0-17.648-14.336-32-32-32zm0-255.984h-64c-17.664 0-32 14.336-32 32v64c0 17.664 14.336 32 32 32h64c17.664 0 32-14.336 32-32v-64c0-17.68-14.336-32-32-32zm-256 0h-64c-17.664 0-32 14.336-32 32v64c0 17.664 14.336 32 32 32h64c17.664 0 32-14.336 32-32v-64c0-17.68-14.336-32-32-32zm0 255.984h-64c-17.664 0-32 14.336-32 32v64c0 17.68 14.336 32 32 32h64c17.664 0 32-14.32 32-32v-64c0-17.648-14.336-32-32-32z"></path>
                          </svg>
                          {item.publishDate}
                        </Link>
                      </li>
                    )}
                  </ul>
                  <p> {item.description}</p>
                  <div className="blog-footer">
                    {item &&
                      item.authors &&
                      item.authors.listAuthors &&
                      item.authors.listAuthors.length > 0 && (
                        <div className="blog-author">
                          <Link
                            href={`${
                              item?.authors?.listAuthors[0]?.website
                                ? item?.authors?.listAuthors[0]?.website
                                : "#"
                            }`}
                            aria-label="blog_image"
                          >
                            <Image
                              src={
                                "https://androthemes.com/themes/html/onitir/assets/img/author-small.png"
                              }
                              width={0}
                              height={0}
                              style={{ width: "auto", height: "auto" }}
                              alt={"blog-image"}
                            />
                            {`By ${item.authors.listAuthors[0].name}`}
                          </Link>
                        </div>
                      )}
                    {item && item.detail && (
                      <div className="blog-readmore">
                        <Link href={`${item.detail}`} aria-label="read_more">
                          <svg
                            stroke="currentColor"
                            fill="currentColor"
                            strokeWidth="0"
                            viewBox="0 0 16 16"
                            height="1em"
                            width="1em"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
                            ></path>
                          </svg>
                          Read More...
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Col>
          );
        })}
      </>
    );
  };
  return (
    <section
      className={`blog-standard ${
        spaceBefore && `frame-space-before-${spaceBefore}`
      } ${spaceAfter && `frame-space-after-${spaceAfter}`}`}
    >
      <Container>
        {blogData && blogData.list && blogData.list.length && (
          <Row>{renderBlogs(blogData.list)}</Row>
        )}

        {showPagination &&
        blogData.paginationBelow &&
        blogData.paginationBelow.pages &&
        blogData.paginationBelow.pages.length > 1 ? (
          <Pagination
            data={blogData.paginationBelow}
            setPaginationLink={setPaginationLink}
          />
        ) : null}
      </Container>
    </section>
  );
};

export default BlogStandard;
