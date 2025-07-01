"use client";

import Link from "next/link";

export const HeadingType = ({
  level,
  data,
  position,
  subheader,
  headerLink,
}) => {
  const CustomComponent = `${level === 0 ? "p" : `h${level}`}`;
  return (
    <>
      <CustomComponent
        className={`${position ? `text-${position}` : ""} headings`}
      >
        {data && headerLink ? (
          <Link
            title={headerLink.title}
            target={headerLink.target}
            href={headerLink.href}
            aria-label="link"
          >
            {data}
          </Link>
        ) : (
          data
        )}
      </CustomComponent>
      {subheader && <h4>{subheader}</h4>}
    </>
  );
};

const Heading = ({ data, spaceAfter, spaceBefore, children }) => {
  return (
    <section
      className={`headings ${
        spaceBefore && `frame-space-before-${spaceBefore}`
      } ${spaceAfter && `frame-space-after-${spaceAfter}`}`}
    >
      <HeadingType
        level={data.headerLayout}
        data={data.header}
        position={data.headerPosition}
        subheader={data.subheader}
        headerLink={data.headerLink}
      />

      {children}
    </section>
  );
};
export default Heading;
