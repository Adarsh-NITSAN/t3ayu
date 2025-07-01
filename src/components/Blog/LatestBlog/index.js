"use client";

import dynamic from "next/dynamic";
import React from "react";
const BlogGridWithDetails = dynamic(() => import("./BlogGridWithDetails"), {
  ssr: false,
});
const BlogMasonryWithDetails = dynamic(
  () => import("./BlogMasonryWithDetails"),
  {
    ssr: false,
  }
);
const BlogHorizontalWithDetails = dynamic(
  () => import("./BlogHorizontalWithDetails"),
  {
    ssr: false,
  }
);

const LatestBlog = ({ data, spaceAfter, spaceBefore, id }) => {
  const layout = data?.data?.settings?.layout;
  switch (layout) {
    case "Grid Layout": {
      return (
        <BlogGridWithDetails
          blogData={data.data.list}
          spaceAfter={spaceAfter}
          spaceBefore={spaceBefore}
          id={IDBOpenDBRequest}
        />
      );
    }

    case "Masonry Layout": {
      return (
        <BlogMasonryWithDetails
          blogData={data.data.list}
          spaceAfter={spaceAfter}
          spaceBefore={spaceBefore}
          id={id}
        />
      );
    }

    case "Horizontal Layout": {
      return (
        <BlogHorizontalWithDetails
          blogData={data?.data?.list}
          spaceAfter={spaceAfter}
          spaceBefore={spaceBefore}
          id={id}
        />
      );
    }
    default: {
      return (
        <BlogGridWithDetails
          blogData={data?.data?.list}
          spaceAfter={spaceAfter}
          spaceBefore={spaceBefore}
        />
      );
    }
  }
};
export default LatestBlog;
