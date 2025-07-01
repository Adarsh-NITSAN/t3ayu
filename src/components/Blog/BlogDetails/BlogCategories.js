"use client";
import Link from "next/link";
import React from "react";

const BlogCategories = ({ data, spaceAfter, spaceBefore }) => {
  return (
    <div
      className={`${spaceBefore && `frame-space-before-${spaceBefore}`} ${
        spaceAfter && `frame-space-after-${spaceAfter}`
      }`}
    >
      {data && data.data.listCategory && data.data.listCategory.length > 0 && (
        <div className="blog-detail-meta blog-related-categories">
          <h5 className="blog-meta-title">Categories</h5>
          <ul>
            {data.data.listCategory.map((cat) => {
              return (
                <li>
                  <Link href="#" aria-label="category_title">
                    {cat.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};
export default BlogCategories;
