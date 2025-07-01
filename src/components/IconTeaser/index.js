"use client";

import DOMPurify from "dompurify";
import Link from "next/link";
import React from "react";
import * as FontAwesome from "react-icons/fa6";
import { sanitizeLink } from "@/utils/sanitizeLink";
import { useRouter } from "next/navigation";

const IconTeaser = ({ data, spaceAfter, spaceBefore }) => {
  function IconComponent({ iconName }) {
    const Icon = FontAwesome[iconName];
    return Icon ? <Icon /> : null;
  }

  const router = useRouter();

  return (
    <div
      className={`icon-teaser ${
        spaceBefore && `frame-space-before-${spaceBefore}`
      } ${spaceAfter && `frame-space-after-${spaceAfter}`} ${
        data.background === "1"
          ? "bg-dark-color"
          : data.background === "2"
          ? "bg-primary-color"
          : "bg-light-color"
      } ${data.imagePattern === "1" ? "icon-doted-path" : ""}`}
    >
      {data?.icons && (
        <div className="icon-teaser__icon">
          <IconComponent iconName={data?.icons} />
        </div>
      )}
      {data.title && (
        <h4
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(data.title),
          }}
          onClick={(e) => sanitizeLink(e, router)}
        />
      )}
      {data.content && <p>{data.content}</p>}
      {data && data.link && data.link.href && (
        <Link
          href={data.link.href}
          className="icon-teaser__link"
          title="icon-teaser-link"
          aria-label="icon_link"
        >
          {data.linkText}
        </Link>
      )}
    </div>
  );
};

export default IconTeaser;
