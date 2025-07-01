"use client";
import dynamic from "next/dynamic";

const BlogIsotop = dynamic(() => import("./BlogIsotop"), { ssr: false });
const BlogMasonryWithDetails = dynamic(
  () => import("./BlogMasonryWithDetails"),
  {
    ssr: false,
  }
);
const BlogStandard = dynamic(() => import("./BlogStandard"), { ssr: false });
const SlidingBlog = dynamic(() => import("./SlidingBlog"), { ssr: false });
const BlogMasonry = dynamic(() => import("./BlogMasonry"), { ssr: false });

const BlogList = ({ data, layoutType, spaceAfter, spaceBefore, id }) => {
  const layout = data?.data?.settings?.layout;
  switch (layout) {
    case "Isotop":
      return (
        <BlogIsotop
          content={data.data}
          spaceAfter={spaceAfter}
          spaceBefore={spaceBefore}
        />
      );

    case "Masonry":
      return (
        <BlogMasonry
          content={data.data}
          spaceAfter={spaceAfter}
          spaceBefore={spaceBefore}
        />
      );
    case "Standard":
      return (
        <BlogStandard
          content={data.data}
          spaceAfter={spaceAfter}
          spaceBefore={spaceBefore}
        />
      );

    case "Slider":
      return (
        <SlidingBlog
          content={data.data}
          spaceAfter={spaceAfter}
          spaceBefore={spaceBefore}
        />
      );

    case "Masonry With Details":
      return (
        <BlogMasonryWithDetails
          content={data.data}
          spaceAfter={spaceAfter}
          spaceBefore={spaceBefore}
        />
      );
    default:
      return (
        <BlogIsotop
          content={data.data}
          spaceAfter={spaceAfter}
          spaceBefore={spaceBefore}
        />
      );
  }
};

export default BlogList;
