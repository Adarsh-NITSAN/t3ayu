"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Pagination from "./Pagination";
import getAPIData from "@/utils/GetData";
// import getAPIData from "@/app/route";

const BlogIsotop = ({ content, spaceAfter, spaceBefore }) => {
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

        <Row className="blog-isotop__list gx-4 gy-4">
          {blogs &&
            blogs.length > 0 &&
            blogs.map((item, index) => {
              return (
                item &&
                item.featuredImage &&
                item.featuredImage.length > 0 &&
                item.featuredImage[0].images &&
                item.featuredImage[0].images.defaultImage &&
                item.featuredImage[0].images.defaultImage.publicUrl && (
                  <Col lg={4} sm={6} key={index}>
                    <div className="blog-isotop__box">
                      <Image
                        src={
                          item.featuredImage[0].images.defaultImage.publicUrl
                        }
                        height={0}
                        width={0}
                        style={{ width: "100%", height: "auto" }}
                        alt={"BlogImage"}
                      />
                      <Link
                        href={`${item.detail}`}
                        className="blog-isotop__box-link"
                        aria-label="blog_link"
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
                          <path d="M0 180V56c0-13.3 10.7-24 24-24h124c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12H64v84c0 6.6-5.4 12-12 12H12c-6.6 0-12-5.4-12-12zM288 44v40c0 6.6 5.4 12 12 12h84v84c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12V56c0-13.3-10.7-24-24-24H300c-6.6 0-12 5.4-12 12zm148 276h-40c-6.6 0-12 5.4-12 12v84h-84c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h124c13.3 0 24-10.7 24-24V332c0-6.6-5.4-12-12-12zM160 468v-40c0-6.6-5.4-12-12-12H64v-84c0-6.6-5.4-12-12-12H12c-6.6 0-12 5.4-12 12v124c0 13.3 10.7 24 24 24h124c6.6 0 12-5.4 12-12z"></path>
                        </svg>
                      </Link>
                    </div>
                  </Col>
                )
              );
            })}
        </Row>
      </>
    );
  };

  return (
    <section
      className={`blog-isotop ${
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

export default BlogIsotop;
