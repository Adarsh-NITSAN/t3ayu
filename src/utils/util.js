"use client";
import Link from "next/link";

export const EmailText = (props) => {
  if (props) {
    const { emailValue } = props;
    const handleEmailClick = () => {
      window.location.href = `mailto:${emailValue}`;
    };
    return (
      <Link href={`#`} title="" target="_self" onClick={handleEmailClick}>
        <span>{emailValue}</span>
      </Link>
    );
  } else {
    return "";
  }
};

export const MobileText = (props) => {
  if (props) {
    const { phoneValue } = props;
    const handleMobileClick = () => {
      window.location.href = `tel:${phoneValue}`;
    };
    return (
      <Link
        href={`#`}
        title=""
        target="_self"
        onClick={handleMobileClick}
        aria-label="mobile"
      >
        <span>{phoneValue}</span>
      </Link>
    );
  } else {
    return "";
  }
};
