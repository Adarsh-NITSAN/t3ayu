"use client";

import DOMPurify from "dompurify";
import { useRouter } from "next/navigation";
import { sanitizeLink } from "@/utils/sanitizeLink";

const SimpleHTML = ({
  data,
  elementType,
  layoutType,
  spaceAfter,
  spaceBefore,
}) => {
  const { bodytext, header } = data;
  const router = useRouter();
  return (
    <section
      className={`frame frame-${layoutType} frame-type-${elementType} frame-layout-0 ${
        spaceAfter && `frame-space-after-${spaceAfter}`
      } ${spaceBefore && `frame-space-before-${spaceBefore}`}`}
    >
      {header && <h2>{header}</h2>}
      <div
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(bodytext) }}
        onClick={(e) => sanitizeLink(e, router)}
      />
    </section>
  );
};

export default SimpleHTML;
