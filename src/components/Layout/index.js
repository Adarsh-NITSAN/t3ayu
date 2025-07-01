"use client";

import { useContext, useEffect, useState } from "react";
import GlobalContext from "@/context/GlobalContext";
import Header from "../Header";
import Footer from "../Footer";
import CookieConsent from "react-cookie-consent";
import Link from "next/link";
import ThemeSwitcher from "../ThemeSwitcher";
import GoToTop from "../Core/GoToTop";

const Layout = ({ children, pageData }) => {
  const {
    setHeaderMenus,
    setAvailableLanguage,
    setFooterData,
    setBaseThemeData,
    setSocialLinks,
    setBreadcrumbs,
    setStyleData,
    cookie,
    setCookie,
    setFooterMenus,
    setShowPagination,
  } = useContext(GlobalContext);

  useEffect(() => {
    let breadcrumbs = pageData.data.breadcrumbs;
    setAvailableLanguage(pageData.data.i18n);
    setHeaderMenus(pageData?.data?.page?.mainNavigation);
    setFooterMenus(pageData?.data.page?.footerNavigation);
    setBaseThemeData(pageData?.data?.page?.constants?.ns_basetheme);
    setSocialLinks(pageData?.data?.page?.constants?.ns_seo);
    setBreadcrumbs(breadcrumbs);
    setStyleData(pageData?.data?.page?.constants?.ns_style);
    setCookie(pageData?.data?.page?.cookie);
    pageData?.data?.page?.constants?.blog?.enablePager?.value === "0"
      ? setShowPagination(false)
      : setShowPagination(true);
    if (
      pageData.data.content &&
      pageData.data.content.colPos2 &&
      pageData.data.content.colPos2.length
    ) {
      let footerInfo = pageData.data.content.colPos2;
      setFooterData(footerInfo);
    }
  }, [pageData]);

  useEffect(() => {
    async function getAos() {
      const AOS = (await import("aos")).default;
      AOS.init({
        duration: 800,
        once: true,
      });
    }
    getAos();
    smoothScroll();
  }, []);

  const smoothScroll = () => {
    const html = document.querySelector("html");
    if (html) {
      html.style.scrollBehavior = "smooth";
    }
  };

  useEffect(() => {
    if (document !== "undefined") {
      document.documentElement.style.setProperty(
        "--cookieBtnBgColor",
        `${cookie?.settings.palette.button.background}`
      );
      document.documentElement.style.setProperty(
        "--cookieBtnTextColor",
        `${cookie?.settings.palette.button.text}`
      );
    }
  }, [cookie]);

  return (
    <>
      <Header pageData={pageData} />

      {children}
      <Footer pageData={pageData} />

      {pageData?.data?.page?.constants?.ns_basetheme?.back_to_top.value ===
        "1" && <GoToTop />}
      {pageData?.data?.page?.constants?.ns_style?.enable_style_switcher
        ?.value === "1" && (
        <ThemeSwitcher styleData={pageData?.data?.page?.constants?.ns_style} />
      )}

      {cookie && cookie.settings && cookie.settings.cookie_enable === "1" && (
        <CookieConsent
          location="bottom"
          buttonText={cookie ? cookie.dismiss : ""}
          enableDeclineButton
          declineButtonText={cookie ? cookie.deny : ""}
          style={{
            background:
              pageData && pageData.data
                ? cookie.settings.palette.popup.background
                : "#473bf0",

            right: "16px",
            bottom: "16px",
            maxWidth: "384px",
            left: "auto",
          }}
        >
          {cookie && (
            <p
              className="mb-0"
              style={{ color: `${cookie.settings.palette.popup.text}` }}
            >
              {cookie.message}{" "}
              {cookie && cookie.settings.url && (
                <Link
                  href={`${cookie.settings.url}`}
                  className="mb-0 ml-5 text-white text-decoration-underline"
                  aria-label="cookie_link"
                >
                  {cookie.link}
                </Link>
              )}
            </p>
          )}
        </CookieConsent>
      )}
    </>
  );
};
export default Layout;
