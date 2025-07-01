"use client";
import DOMPurify from "dompurify";
import { useRouter } from "next/navigation";
import { sanitizeLink } from "@/utils/sanitizeLink";
import Header from "./Heading";

const Text = ({ data, spaceAfter, spaceBefore, id }) => {
  const router = useRouter();
  return (
    <div
      className={`ce-text ${
        spaceBefore && `frame-space-before-${spaceBefore}`
      } ${spaceAfter && `frame-space-after-${spaceAfter}`}`}
      id={id}
    >
      {data.header && <Header data={data} />}

      {data.bodytext && (
        <div
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(data.bodytext),
          }}
          onClick={(e) => sanitizeLink(e, router)}
        />
      )}
    </div>
  );
};
export default Text;
