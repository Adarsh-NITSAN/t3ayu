"use client";

import DOMPurify from "dompurify";
import React, { useEffect, useState, useRef, useMemo, createRef } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
const sanitizeLink = dynamic(() => import("@/utils/sanitizeLink"), {
  ssr: false,
});

function useIsInViewport(ref) {
  const [isIntersecting, setIsIntersecting] = useState(false);

  const observer = useMemo(
    () =>
      new IntersectionObserver(([entry]) =>
        setIsIntersecting(entry.isIntersecting)
      ),
    []
  );

  useEffect(() => {
    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [ref, observer]);

  return isIntersecting;
}

const ProgressBar = ({ data, spaceAfter, spaceBefore }) => {
  const router = useRouter();
  const ref1 = useRef([]);
  ref1.current = data?.items?.map((_, i) => ref1.current[i] ?? createRef());
  const isInViewport1 = useIsInViewport(ref1.current[0]);
  const [progress, setProgress] = useState(Array(data?.items.length).fill(0));

  useEffect(() => {
    const targetWidths = data?.items.map(
      (item) => parseFloat(item.progressNumber) / 100
    );
    const intervals = targetWidths.map((targetWidth, index) => {
      return setInterval(() => {
        if (progress[index] < targetWidth) {
          setProgress((prevProgress) => {
            const newProgress = [...prevProgress];
            newProgress[index] = Math.min(
              newProgress[index] + 0.01,
              targetWidth
            );
            return newProgress;
          });
        } else {
          clearInterval(intervals[index]);
        }
      }, 20);
    });
    return () => {
      intervals.forEach((interval) => clearInterval(interval));
    };
  }, [progress]);

  return (
    <section
      className={`progress-bars ${
        spaceBefore && `frame-space-before-${spaceBefore}`
      } ${spaceAfter && `frame-space-after-${spaceAfter}`}`}
    >
      {data?.items?.map((item, index) => {
        return (
          <div className="progress-bar" key={index}>
            <div className="progress-bar__title">
              <span
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(item.title),
                }}
                onClick={(e) => sanitizeLink(e, router)}
              />
              <span>{Number(progress[index] * 100).toFixed(0)}%</span>
            </div>

            <div className="progress-bar__fill">
              <div
                className="fill__line"
                ref={ref1.current[index]}
                style={
                  isInViewport1 ? { width: `${progress[index] * 100}%` } : {}
                }
              />
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default ProgressBar;
