"use client";
import React from "react";
import { Container } from "react-bootstrap";
import Breadcrumb from "../Breadcrumb";

const PageHeader = ({
  pageTitle,
  pageSubTitle,
  pageMedia,
  HeaderTransparentText,
}) => {
  return (
    <section
      className="page-header"
      style={
        pageMedia
          ? {
              backgroundImage: `url(${`${pageMedia}`})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }
          : {}
      }
    >
      <Container>
        <div className="page-header__title">
          <h1>{pageTitle}</h1>
          {pageSubTitle && <p>{pageSubTitle}</p>}
        </div>
        <Breadcrumb />
        <span className="page-header__bgtext">{HeaderTransparentText}</span>
      </Container>
      <div className="page-header__curve">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1000 100"
          preserveAspectRatio="none"
        >
          <path d="M500,97C126.7,96.3,0.8,19.8,0,0v100l1000,0V1C1000,19.4,873.3,97.8,500,97z"></path>
        </svg>
      </div>
    </section>
  );
};

export default PageHeader;
