"use client";

import Link from "next/link";
import React from "react";

const Pagination = ({ data, setPaginationLink }) => {
  const handlePagination = async (e, link) => {
    e.preventDefault();
    setPaginationLink(link);
  };
  return (
    <section className="blog__pagination">
      <ul className="pagination">
        {data?.prev !== null && (
          <li className="page-item">
            <Link
              href={"#"}
              onClick={(e) => handlePagination(e, data.prev)}
              scroll={false}
              aria-label="prev"
            >
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 320 512"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"></path>
              </svg>
            </Link>
          </li>
        )}
        {data?.pages &&
          data.pages.length > 1 &&
          data.pages.map((page) => {
            return (
              <li
                className={`page-item ${page.current === 1 ? "active" : ""}`}
                key={page.page}
              >
                <Link
                  href={"#"}
                  onClick={(e) => handlePagination(e, page.link)}
                  scroll={false}
                  aria-label="page"
                >
                  {page.page}
                </Link>
              </li>
            );
          })}
        {data?.next !== null && (
          <li className="page-item">
            <Link
              href={"#"}
              onClick={(e) => handlePagination(e, data.next)}
              scroll={false}
              aria-label="next"
            >
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 320 512"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z"></path>
              </svg>
            </Link>
          </li>
        )}
      </ul>
    </section>
  );
};

export default Pagination;
