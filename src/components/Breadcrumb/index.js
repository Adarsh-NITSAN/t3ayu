"use client";

import React, { useContext } from "react";
import GlobalContext from "@/context/GlobalContext";
import Link from "next/link";

const Breadcrumb = () => {
  const { breadcrumbs } = useContext(GlobalContext);

  return (
    <section className="breadcrumbs ">
      {breadcrumbs &&
        breadcrumbs.map(({ active, current, link, target, title }, index) => {
          return (
            <React.Fragment key={index}>
              <span>
                {current !== 1 ? (
                  <Link
                    href={`${link}`}
                    aria-label="blog_title"
                    className="breadcrumbs__Link"
                  >
                    {title}
                  </Link>
                ) : (
                  <span>{title}</span>
                )}
              </span>
              {current !== 1 && (
                <span className="breadcrumbs-separator"> | </span>
              )}
            </React.Fragment>
          );
        })}
    </section>
  );
};
export default Breadcrumb;
