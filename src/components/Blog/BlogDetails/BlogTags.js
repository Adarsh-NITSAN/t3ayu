"use client";
import Link from "next/link";
import React from "react";

const BlogTags = ({ data, spaceAfter, spaceBefore }) => {
  return (
    <div
      className={`${spaceBefore && `frame-space-before-${spaceBefore}`} ${
        spaceAfter && `frame-space-after-${spaceAfter}`
      }`}
    >
      {data && data.data.listTags && data.data.listTags.length > 0 && (
        <div className="blog-detail-meta blog-related-tags">
          <h5 className="blog-meta-title">Popular Tags</h5>
          <ul>
            {data.data.listTags.map((cat) => {
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
export default BlogTags;
