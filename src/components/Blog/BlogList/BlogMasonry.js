"use client";

import React, { useEffect, useState } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import Pagination from "./Pagination";
import { Col, Container, Row } from "react-bootstrap";
import Link from "next/link";
import Image from "next/image";
import getAPIData from "@/utils/GetData";
// import getAPIData from "@/app/route";

const BlogMasonry = ({ content, spaceAfter, spaceBefore }) => {
  const [categories, setCategories] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [paginationLink, setPaginationLink] = useState();
  const [showPagination, setShowPagination] = useState(true);
  const [blogData, setBlogData] = useState(content || []);
  const [blogs, setBlogs] = useState(blogData.list || []);

  let allCategories = [];
  useEffect(() => {
    async function getblogs() {
      if (paginationLink) {
        const blogData = await getAPIData(paginationLink);

        const reCall = (content) => {
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

  useEffect(() => {
    if (blogs && blogs.length > 0) {
      blogs.map((blog) => {
        if (
          blog &&
          blog.featuredImage &&
          blog.featuredImage.length > 0 &&
          blog.featuredImage[0].images &&
          blog.featuredImage[0].images.defaultImage &&
          blog.featuredImage[0].images.defaultImage.publicUrl
        ) {
          if (
            blog &&
            blog.categories &&
            blog.categories.listCategories &&
            blog.categories.listCategories.length > 0
          ) {
            for (let i = 0; i < blog.categories.listCategories.length; i++) {
              allCategories.push(blog.categories.listCategories[i].title);
            }
          }
        }
      });
      const uniqueArray = allCategories.filter((value, index, self) => {
        return self.indexOf(value) === index;
      });
      setCategories(uniqueArray);
    }
  }, []);

  useEffect(() => {
    setBlogs(blogData.list);
  }, [blogData]);

  const getItem = async (value, index) => {
    if (value !== "All") {
      const filteredBlogs = await content.list.filter((item) => {
        if (item.categories.listCategories.length === 0) {
          return null;
        } else {
          return item.categories.listCategories.some((category) => {
            return category.title === value;
          });
        }
      });

      setBlogs(filteredBlogs);
    } else {
      setBlogs(content.list);
    }
    setActiveIndex(index);
  };

  const renderBlogs = (blogs) => {
    return (
      <>
        <Row className="justify-content-center">
          <Col lg={8}>
            <div className="blog-filter">
              <ul>
                <li
                  className={`${activeIndex === -1 ? "active" : ""}`}
                  onClick={() => getItem("All", -1)}
                >
                  All
                </li>
                {categories &&
                  categories.length > 0 &&
                  categories.map((cat, index) => {
                    return (
                      <li
                        className={`${index === activeIndex ? "active" : ""}`}
                        onClick={() => getItem(cat, index)}
                        key={index}
                      >
                        {cat}
                      </li>
                    );
                  })}
              </ul>
            </div>
          </Col>
        </Row>

        <div className="blog-masonry__list">
          <ResponsiveMasonry
            columnsCountBreakPoints={{ 300: 1, 576: 2, 1200: 3 }}
          >
            {blogs && blogs.length > 0 ? (
              <Masonry columnsCount={3} gutter="30px">
                {blogs.map((item, index) => {
                  return (
                    <div className="blog-masonry__box" key={index}>
                      {item.featuredImage[0].images !== undefined && (
                        <div className="blog-image">
                          <Image
                            src={
                              item?.featuredImage[0]?.images?.defaultImage
                                ?.publicUrl
                            }
                            alt="image"
                            height={0}
                            width={0}
                            sizes="100vw"
                            style={{
                              width: "auto",
                              height: "auto",
                              maxWidth: "100%",
                            }}
                          />
                        </div>
                      )}
                      <div className="blog-desc">
                        {item &&
                          item.categories &&
                          item.categories.listCategories &&
                          item.categories.listCategories.length > 0 && (
                            <span className="blog-category">
                              {" "}
                              {item.categories.listCategories.map(
                                (category, index) => {
                                  return item.categories.listCategories
                                    .length ===
                                    index + 1 ? (
                                    <React.Fragment
                                      key={index}
                                    >{`${category.title}`}</React.Fragment>
                                  ) : (
                                    <React.Fragment
                                      key={index}
                                    >{`${category.title}, `}</React.Fragment>
                                  );
                                }
                              )}
                            </span>
                          )}
                        <h4>
                          <Link
                            href={`${item.detail}`}
                            title=""
                            target="_self"
                            key={index}
                            aria-label="blog_title"
                          >
                            {item.title}
                          </Link>
                        </h4>
                      </div>
                    </div>
                  );
                })}
              </Masonry>
            ) : (
              <h1>No Data Found!</h1>
            )}
          </ResponsiveMasonry>
        </div>
      </>
    );
  };

  return (
    <section
      className={`blog-masonry ${
        spaceBefore && `frame-space-before-${spaceBefore}`
      } ${spaceAfter && `frame-space-after-${spaceAfter}`}`}
    >
      <Container>
        {blogs && blogs.length > 0 && <>{renderBlogs(blogs)}</>}
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
export default BlogMasonry;
