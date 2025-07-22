"use client";

import dynamic from "next/dynamic";
import { Col, Row } from "react-bootstrap";
import React, {
  createRef,
  forwardRef,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import * as FontAwesome from "react-icons/fa6";

const CountUp = dynamic(() => import("react-countup"), {
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

const SingleCricularCounter = forwardRef(
  ({ data, keyIndex, isInViewport1 }, ref) => {
    const { counterNumber, counterSymbolText, title, icons, content } = data;

    const [progress, setProgress] = useState(0);

    const percentValue = counterNumber;
    const size = 100;
    const strokeWidth = 5;

    useEffect(() => {
      const incrementValue = Math.ceil(percentValue / 100); // Calculate increment to complete in approximately the same time
      const piechartTimer = setTimeout(() => {
        if (progress < percentValue) {
          setProgress(prev => Math.min(prev + incrementValue, percentValue));
        }
      }, 50);
      return () => {
        clearTimeout(piechartTimer);
      };
    }, [progress, percentValue]);

    useEffect(() => {
      if (!isInViewport1) {
        setProgress(0);
      }
    }, [isInViewport1]);

    const viewBox = `0 0 ${size} ${size}`;
    const radius = (size - strokeWidth) / 2;

    const circumference = radius * Math.PI * 2;
    // Calculate dash based on the actual counter number as the maximum
    const dash = (progress / percentValue) * circumference;

    const CustomIcon = ({ iconName }) => {
      const Icon = FontAwesome[iconName];
      return Icon ? <Icon /> : null;
    };
    return (
      <section className={`counter-progressbar`} key={keyIndex} ref={ref}>
        <div className="counter-progressbar-wrapper">
          <div className="counter-progressbar__circle">
            <svg
              width={size}
              height={size}
              viewBox={viewBox}
              className="counter-progressbar__circle-stroke"
            >
              <circle
                fill="none"
                stroke="#ccc"
                cx={size / 2}
                cy={size / 2}
                r={radius}
                strokeWidth={`${strokeWidth}px`}
              />
              <circle
                fill="none"
                cx={size / 2}
                cy={size / 2}
                r={radius}
                strokeWidth={`${strokeWidth}px`}
                transform={`rotate(-90 ${size / 2} ${size / 2})`}
                strokeDasharray={[dash, circumference - dash]}
                strokeLinecap=""
                className="counter-progressbar__circle-stroke-main"
              />
            </svg>
            {icons && (
              <div className="counter-progressbar__icon">
                <CustomIcon iconName={icons} />
              </div>
            )}
          </div>
          <div className="counter-progressbar__number">
            <span>{`${progress} ${counterSymbolText}`}</span>
          </div>
        </div>
        <div className="counter-progressbar__text">
          {title && <h4>{title}</h4>}
          {content && <p>{content}</p>}
        </div>
      </section>
    );
  }
);

const Counter = ({ data, spaceBefore, spaceAfter }) => {
  let isInViewport1 = false;
  const ref1 = useRef([]);

  ref1.current = data?.items?.map((_, i) => ref1.current[i] ?? createRef());
  if (ref1.current && ref1.current.length > 0)
    isInViewport1 = useIsInViewport(ref1.current[0]);

  return (
    <div
      className={`counter-section ${
        spaceBefore && `frame-space-before-${spaceBefore}`
      } ${spaceAfter && `frame-space-after-${spaceAfter}`}`}
    >
      {data.counterVariations === "1" ? (
        <section className="counter-inner">
          <Row className="g-0">
            {data &&
              data.items &&
              data.items.length > 0 &&
              data.items.map(
                ({ counterNumber, counterSymbolText, title }, index) => {
                  return (
                    <Col key={index} md={3} className="col-6">
                      <div className="counter-item">
                        <h1>
                          {counterNumber && (
                            <span ref={ref1.current[index]}>
                              {isInViewport1 && (
                                <CountUp
                                  end={counterNumber}
                                  duration={2}
                                  enableScrollSpy={true}
                                />
                              )}
                            </span>
                          )}
                          {counterSymbolText && (
                            <span className="counter-symbol-text">
                              {counterSymbolText}
                            </span>
                          )}
                        </h1>
                        {title && <p className="counter-title">{title}</p>}
                      </div>
                    </Col>
                  );
                }
              )}
          </Row>
          {data.counterBackgroundText && (
            <span className="counter-bg-text">
              {data.counterBackgroundText}
            </span>
          )}
        </section>
      ) : (
        data &&
        data.items &&
        data.items.length > 0 &&
        data.items.map((item, index) => {
          return (
            <SingleCricularCounter
              data={item}
              keyIndex={index}
              key={index}
              ref={ref1.current[index]}
              isInViewport1={isInViewport1}
            />
          );
        })
      )}
    </div>
  );
};
export default Counter;
