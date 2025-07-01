"use client";
import GlobalContext from "@/context/GlobalContext";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Container, Form, Offcanvas, Row } from "react-bootstrap";
import { useTranslations, useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import languages from "@/utils/languageConstant";
import { i18n } from "../../../i18n-config";
import Image from "next/image";
import { EmailText, MobileText } from "@/utils/util";
import Logo from "../Logo";

const Header = ({ pageData }) => {
  const { themeSwitcher, baseThemeData } = useContext(GlobalContext);
  const [show, setShow] = useState(false);
  const [hState, sethState] = useState("");
  const [openCanvasMenu, setOpenCanvasMenu] = useState(false);
  const [openMobileMenuLevel2, setOpenMobileMenuLevel2] = useState("");
  const [openMobileMenuLevel3, setOpenMobileMenuLevel3] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [width, setWidth] = useState(0);
  const [toggleSearchForm, setToggleSearchForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [openDropDownMenu, setOpenDropDownMenu] = useState(false);
  let totalLanguages = [];
  const router = useRouter();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let headerMenus =
    pageData &&
    pageData.data &&
    pageData.data.page &&
    pageData.data.page.mainNavigation.length &&
    pageData.data.page.mainNavigation;

  let headerLayout =
    pageData &&
    pageData.data &&
    pageData.data.page &&
    pageData.data.page.constants &&
    pageData.data.page.constants.ns_style &&
    pageData.data.page.constants.ns_style.headerLayout &&
    pageData.data.page.constants.ns_style.headerLayout.value;

  let socialLinks =
    pageData &&
    pageData.data &&
    pageData.data.page &&
    pageData.data.page.constants &&
    pageData.data.page.constants.ns_seo;

  let baseTheme =
    pageData &&
    pageData.data &&
    pageData.data.page &&
    pageData.data.page.constants &&
    pageData.data.page.constants.ns_basetheme;

  let availbaleLanguage = pageData && pageData.data && pageData.data.i18n;

  useEffect(() => {
    var lastVal = 0;
    let hotsportmedia = window.matchMedia("(max-width: 992px)");
    window.onscroll = function () {
      let y = window.scrollY;

      // if (hotsportmedia.matches) {
      //   sethState(" ");
      // } else {
      //   if (y > 200) {
      //     sethState("top");
      //   }

      //   if (y === 0) {
      //     sethState(" ");
      //   }
      // }
      if (y > 190) {
        sethState("top");
      }

      if (y === 0) {
        sethState(" ");
      }
      lastVal = y;
    };
  });

  useEffect(() => {
    window.addEventListener("resize", () => {
      window.innerWidth <= 991
        ? (setIsMobile(true),
          setOpenCanvasMenu(false),
          setOpenMobileMenuLevel2(""),
          setOpenMobileMenuLevel3(""))
        : setIsMobile(false),
        setWidth(window.innerWidth);
    });
  }, [width]);

  useEffect(() => {
    window.innerWidth <= 991
      ? (setIsMobile(true),
        setOpenCanvasMenu(false),
        setOpenMobileMenuLevel2(""),
        setOpenMobileMenuLevel3(""))
      : setIsMobile(false),
      setWidth(window.innerWidth);
  }, []);

  const checkLang = (language, availbaleLanguages) => {
    if (language.flag === availbaleLanguages.flag) {
      totalLanguages.push({
        path: language.path,
        lang: language.lang,
        active: availbaleLanguages.active,
      });
    }
  };

  if (availbaleLanguage) {
    availbaleLanguage.map((availbaleLanguages) => {
      languages.filter((language) => checkLang(language, availbaleLanguages));
    });
  }

  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     const Mobilemenu = document.querySelector(".mobile-menu-nav ul");
  //     if (Mobilemenu) {
  //       const List = Mobilemenu.querySelectorAll(":scope > li");
  //       List.forEach((element) => {
  //         if (element.classList.contains("menu-item-has-children")) {
  //           const childItems = element.querySelector("ul");
  //           element
  //             .querySelector(":scope > .menu-item-expand")
  //             .addEventListener("click", function () {
  //               if (this.classList.contains("menu-item-open")) {
  //                 this.classList.remove("menu-item-open");
  //                 childItems.style.display = "none";
  //               } else {
  //                 this.classList.add("menu-item-open");
  //                 childItems.style.display = "block";
  //               }
  //             });

  //           const childItemsList = childItems.querySelectorAll(":scope > li");
  //           childItemsList.forEach((childElement) => {
  //             if (childElement.classList.contains("menu-item-has-children")) {
  //               const expandInnerBtn = childElement.querySelector(
  //                 ":scope > .menu-item-expand"
  //               );

  //               expandInnerBtn.addEventListener(
  //                 "click",
  //                 function handleInnerExpanfMenu() {
  //                   const childInnerItems = childElement.querySelector("ul");
  //                   if (this.classList.contains("menu-item-open")) {
  //                     this.classList.remove("menu-item-open");
  //                     childInnerItems.style.display = "none";
  //                   } else {
  //                     this.classList.add("menu-item-open");
  //                     childInnerItems.style.display = "block";
  //                   }
  //                 }
  //               );
  //             }
  //           });
  //         }
  //       });
  //     }
  //   }
  // }, [openMobileMenuLevel3, openMobileMenuLevel2]);

  const updateDropdownMenu = (e) => {
    setOpenDropDownMenu(!openDropDownMenu);
    e.preventDefault();
  };

  const renderSearchForm = () => {
    return (
      <>
        <Link
          href={"#"}
          className="search-trigger"
          onClick={(e) => {
            e.preventDefault(), setToggleSearchForm(!toggleSearchForm);
          }}
          id="userDropdown"
          role="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="true"
          aria-label={`Search`}
        >
          {toggleSearchForm ? (
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 1024 1024"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M512 0C229.232 0 0 229.232 0 512c0 282.784 229.232 512 512 512 282.784 0 512-229.216 512-512C1024 229.232 794.784 0 512 0zm0 961.008c-247.024 0-448-201.984-448-449.01 0-247.024 200.976-448 448-448s448 200.977 448 448-200.976 449.01-448 449.01zm181.008-630.016c-12.496-12.496-32.752-12.496-45.248 0L512 466.752l-135.76-135.76c-12.496-12.496-32.752-12.496-45.264 0-12.496 12.496-12.496 32.752 0 45.248L466.736 512l-135.76 135.76c-12.496 12.48-12.496 32.769 0 45.249 12.496 12.496 32.752 12.496 45.264 0L512 557.249l135.76 135.76c12.496 12.496 32.752 12.496 45.248 0 12.496-12.48 12.496-32.769 0-45.249L557.248 512l135.76-135.76c12.512-12.512 12.512-32.768 0-45.248z"></path>
            </svg>
          ) : (
            <svg
              stroke="currentColor"
              fill="none"
              strokeWidth="2"
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </svg>
          )}
        </Link>
        <div
          className={`search-form ${
            toggleSearchForm ? "search-form-open" : ""
          }`}
        >
          <form className="search-box" onSubmit={handleSubmit}>
            <div className="align-items-center">
              <input
                className="text search-input"
                type="text"
                placeholder="Search ..."
                onChange={handleSearchTerm}
                value={searchTerm}
              />
              <span className="input-group-btn">
                <button type="submit" className="searchbox-button">
                  <svg
                    stroke="currentColor"
                    fill="none"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.3-4.3"></path>
                  </svg>
                </button>
              </span>
            </div>
          </form>
        </div>
      </>
    );
  };

  const renderLanguageSwitcher = () => {
    return (
      <div className="language-bar dropdown">
        <Link
          className=""
          href={"#"}
          as={Button}
          id="dropdownLanguage"
          data-bs-toggle="dropdown"
          onClick={(e) => {
            updateDropdownMenu(e);
          }}
          aria-label={`Language`}
        >
          {totalLanguages.map(({ active, path }, index) => {
            if (active) {
              return (
                <Image
                  key={index}
                  src={path}
                  height={19}
                  width={19}
                  alt={"lang"}
                />
              );
            }
          })}
        </Link>
        <div
          className={`dropdown-menu language-ddr ${
            openDropDownMenu ? "show" : ""
          }`}
          aria-labelledby="dropdownLanguage"
        >
          {totalLanguages.map(({ path, lang, active }, index) => {
            return (
              <Link
                href={`/${lang === i18n.defaultLanguage ? "" : lang}`}
                key={index}
                aria-label={`Language`}
                title={`Language`}
              >
                <div
                  className={`lang-flag-wrapper ${
                    active ? "active-languge" : ""
                  }`}
                >
                  <Image src={path} alt="image" height={19} width={19} />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    );
  };

  const renderMobileMenu = () => {
    return (
      <>
        {openCanvasMenu ? (
          <Row>
            <Col>
              <div className="mobile-menu">
                <nav className="mobile-menu-nav">
                  <ul>
                    {headerMenus &&
                      headerMenus.length &&
                      headerMenus.map(
                        ({ title, link, children, data, active }, index) => {
                          return (
                            <React.Fragment key={title + index}>
                              {children && children.length ? (
                                <li
                                  className={`menu-item menu-item-has-children ${
                                    active ? "active" : ""
                                  }`}
                                >
                                  <Link
                                    href={link}
                                    aria-label={title}
                                    title={title}
                                  >
                                    {title}
                                  </Link>

                                  <ul
                                    className="submenu"
                                    style={{
                                      display: `${
                                        openMobileMenuLevel2 === title
                                          ? "block"
                                          : "none"
                                      } `,
                                    }}
                                  >
                                    {children.map(
                                      (
                                        { title, children, link, active },
                                        subIndex
                                      ) => {
                                        return (
                                          <React.Fragment
                                            key={title + subIndex}
                                          >
                                            {children && children.length ? (
                                              <li
                                                className={`menu-item menu-item-has-children`}
                                              >
                                                <Link
                                                  href={link}
                                                  aria-label={title}
                                                  title={title}
                                                >
                                                  {title}
                                                </Link>

                                                <ul
                                                  className="submenu"
                                                  style={{
                                                    display: `${
                                                      openMobileMenuLevel3 ===
                                                      title
                                                        ? "block"
                                                        : "none"
                                                    }`,
                                                  }}
                                                >
                                                  {children.map(
                                                    (
                                                      { title, link, data },
                                                      innerIndex
                                                    ) => {
                                                      return (
                                                        <li
                                                          className="menu-item"
                                                          key={
                                                            title + innerIndex
                                                          }
                                                        >
                                                          <div>
                                                            <Link
                                                              href={link}
                                                              aria-label={title}
                                                              title={title}
                                                            >
                                                              {title}
                                                            </Link>
                                                          </div>
                                                        </li>
                                                      );
                                                    }
                                                  )}
                                                </ul>
                                                <span
                                                  className={`menu-item-expand`}
                                                  // href="#"
                                                  style={{ fontSize: "18px" }}
                                                  onClick={() =>
                                                    setOpenMobileMenuLevel3(
                                                      openMobileMenuLevel3 ===
                                                        title
                                                        ? ""
                                                        : title
                                                    )
                                                  }
                                                  aria-label="expand"
                                                >
                                                  {openMobileMenuLevel3 ===
                                                  title
                                                    ? "-"
                                                    : "+"}
                                                </span>
                                              </li>
                                            ) : (
                                              <li
                                                className={`menu-item ${
                                                  active ? "active-child" : ""
                                                }`}
                                              >
                                                <div>
                                                  <Link
                                                    href={link}
                                                    aria-label={title}
                                                    title={title}
                                                  >
                                                    {title}
                                                  </Link>
                                                </div>
                                              </li>
                                            )}
                                          </React.Fragment>
                                        );
                                      }
                                    )}
                                  </ul>
                                  <span
                                    className={`menu-item-expand`}
                                    style={{ fontSize: "18px" }}
                                    onClick={() => {
                                      setOpenMobileMenuLevel2(
                                        openMobileMenuLevel2 === title
                                          ? ""
                                          : title
                                      );
                                      setOpenMobileMenuLevel3("");
                                    }}
                                    aria-label="expand"
                                  >
                                    {openMobileMenuLevel2 === title ? "-" : "+"}
                                  </span>
                                </li>
                              ) : (
                                <li
                                  className={`menu-item  ${
                                    active ? "active" : ""
                                  }`}
                                >
                                  <Link
                                    href={link}
                                    aria-label={title}
                                    title={title}
                                  >
                                    {title}
                                  </Link>
                                </li>
                              )}
                            </React.Fragment>
                          );
                        }
                      )}
                  </ul>
                </nav>
              </div>
            </Col>
          </Row>
        ) : (
          ""
        )}
      </>
    );
  };

  const renderHeaderTop = () => {
    return (
      <Row>
        <Col md={6} sm={7}>
          <ul className="contact-list">
            {baseTheme.email.value && (
              <li>
                <EmailText emailValue={baseTheme.email.value} />
              </li>
            )}
            {baseTheme.mobile_number.value && (
              <li>
                <MobileText phoneValue={baseTheme.mobile_number.value} />
              </li>
            )}
          </ul>
        </Col>
        <Col md={6} sm={5}>
          <ul className="social-links">
            {socialLinks.seo_twitter_link && (
              <li>
                <Link
                  href={socialLinks.seo_twitter_link.value}
                  title={socialLinks.seo_twitter_link.label}
                  target="_blank"
                  aria-label={`Twitter`}
                >
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 512 512"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"></path>
                  </svg>
                </Link>
              </li>
            )}
            {socialLinks.seo_facebook_link && (
              <li>
                <Link
                  href={socialLinks.seo_facebook_link.value}
                  title={socialLinks.seo_facebook_link.label}
                  target="_blank"
                  aria-label="fb"
                >
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 320 512"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"></path>
                  </svg>
                </Link>
              </li>
            )}
            {socialLinks.seo_linkedin_link && (
              <li>
                <Link
                  href={socialLinks.seo_linkedin_link.value}
                  title={socialLinks.seo_linkedin_link.label}
                  target="_blank"
                  aria-label={`LinkedIn`}
                >
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 448 512"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"></path>
                  </svg>
                </Link>
              </li>
            )}
            {socialLinks.seo_instagram_link && (
              <li>
                <Link
                  href={socialLinks.seo_instagram_link.value}
                  title={socialLinks.seo_instagram_link.label}
                  target="_blank"
                  aria-label={`Instagram`}
                >
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 448 512"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"></path>
                  </svg>
                </Link>
              </li>
            )}
          </ul>
        </Col>
      </Row>
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!searchTerm && !searchTerm.trim()) return;
    setToggleSearchForm(false);
    router.push(`/search?search_query=${searchTerm}`);
  };

  const handleSearchTerm = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <header
      className={`header header--main ${hState} ${
        themeSwitcher.headerLayout
          ? themeSwitcher.headerLayout === "boxed"
            ? "header--two"
            : themeSwitcher.headerLayout === "transparent"
            ? "header--three header-absolute"
            : "header-absolute"
          : headerLayout === "boxed"
          ? "header--two"
          : headerLayout === "transparent"
          ? "header--three header-absolute"
          : "header-absolute"
      }`}
    >
      {(themeSwitcher.headerLayout && themeSwitcher.headerLayout === "boxed") ||
      headerLayout === "boxed" ? (
        <>
          <div className={`header__top header__top-secondary `}>
            <Container>
              <>{renderHeaderTop()}</>
            </Container>
          </div>
          <div className="header__main-menu ">
            <Container>
              <div className="header__main-menu-wrap">
                <nav className="main-menu">
                  {baseTheme.logo.value && <Logo data={baseTheme} />}
                  <div className="menu-items">
                    <ul>
                      {headerMenus &&
                        headerMenus.length &&
                        headerMenus.map(
                          ({ title, link, children, data, active }, index) => {
                            return (
                              <React.Fragment key={title + index}>
                                {children && children.length ? (
                                  <li
                                    className={`menu-item menu-item-has-children ${
                                      active ? "active" : ""
                                    }`}
                                  >
                                    <Link
                                      href={link}
                                      aria-label={title}
                                      title={title}
                                    >
                                      {title}
                                    </Link>
                                    <ul className="submenu">
                                      {children.map(
                                        (
                                          {
                                            title,
                                            children,
                                            link,
                                            hasSubpages,
                                            active,
                                          },
                                          subIndex
                                        ) => {
                                          return (
                                            <React.Fragment
                                              key={title + subIndex}
                                            >
                                              {children && children.length ? (
                                                <li className={`menu-item`}>
                                                  <Link
                                                    href={link}
                                                    aria-label={title}
                                                    title={title}
                                                  >
                                                    {title}
                                                  </Link>
                                                  <ul className="submenu">
                                                    {children.map(
                                                      (
                                                        { title, link, data },
                                                        innerIndex
                                                      ) => {
                                                        return (
                                                          <li
                                                            className="menu-item"
                                                            key={
                                                              title + innerIndex
                                                            }
                                                          >
                                                            <div>
                                                              <Link
                                                                href={link}
                                                                aria-label={
                                                                  title
                                                                }
                                                                title={title}
                                                              >
                                                                {title}
                                                              </Link>
                                                            </div>
                                                          </li>
                                                        );
                                                      }
                                                    )}
                                                  </ul>
                                                </li>
                                              ) : (
                                                <li
                                                  className={`${
                                                    active ? "active-child" : ""
                                                  }`}
                                                >
                                                  <div>
                                                    <Link
                                                      href={link}
                                                      aria-label={title}
                                                      title={title}
                                                    >
                                                      {title}
                                                    </Link>
                                                  </div>
                                                </li>
                                              )}
                                            </React.Fragment>
                                          );
                                        }
                                      )}
                                    </ul>
                                  </li>
                                ) : (
                                  <li
                                    className={`menu-item ${
                                      data.megaMenu ? "dropdown-mega" : ""
                                    } ${active ? "active" : ""}`}
                                  >
                                    <Link
                                      href={link}
                                      aria-label={title}
                                      title={title}
                                    >
                                      {title}
                                    </Link>
                                  </li>
                                )}
                              </React.Fragment>
                            );
                          }
                        )}
                    </ul>
                  </div>
                </nav>
                <div className="menu-right">
                  {themeSwitcher.showLanguage
                    ? themeSwitcher.showLanguage === "1" &&
                      renderLanguageSwitcher()
                    : pageData.data.page.constants.ns_style.enable_language
                        .value === "1" && renderLanguageSwitcher()}

                  {themeSwitcher.showSearch
                    ? themeSwitcher.showSearch === "1" && renderSearchForm()
                    : pageData.data.page.constants.ns_style.enable_search
                        .value === "1" && renderSearchForm()}
                </div>
                <div className="menu-burger">
                  <div
                    className={`menu-burger-wrap ${
                      openCanvasMenu ? "open" : ""
                    }`}
                    onClick={() => setOpenCanvasMenu(!openCanvasMenu)}
                  >
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            </Container>
          </div>
          {openCanvasMenu ? renderMobileMenu() : ""}
        </>
      ) : (
        <Container>
          <div
            className={`header__top ${
              themeSwitcher.headerLayout &&
              themeSwitcher.headerLayout === "transparent"
                ? "d-none"
                : headerLayout === "transparent"
                ? "d-none"
                : ""
            } `}
          >
            {renderHeaderTop()}
          </div>
          <div
            className={`header__main-menu ${
              themeSwitcher.headerLayout &&
              themeSwitcher.headerLayout === "transparent"
                ? "header__main-transparent"
                : headerLayout === "transparent"
                ? "header__main-transparent"
                : ""
            }`}
          >
            <div className="header__main-menu-wrap">
              <nav className="main-menu">
                {baseTheme.logo.value && <Logo data={baseTheme} />}
                <div className="menu-items">
                  <ul>
                    {headerMenus &&
                      headerMenus.length &&
                      headerMenus.map(
                        ({ title, link, children, data, active }, index) => {
                          return (
                            <React.Fragment key={title + index}>
                              {children && children.length ? (
                                <li
                                  className={`menu-item menu-item-has-children ${
                                    active ? "active" : ""
                                  }`}
                                >
                                  <Link
                                    href={link}
                                    aria-label={title}
                                    title={title}
                                  >
                                    {title}
                                  </Link>
                                  <ul className="submenu">
                                    {children.map(
                                      (
                                        {
                                          title,
                                          children,
                                          link,
                                          hasSubpages,
                                          active,
                                        },
                                        subIndex
                                      ) => {
                                        return (
                                          <React.Fragment
                                            key={title + subIndex}
                                          >
                                            {children && children.length ? (
                                              <li className={`menu-item`}>
                                                <Link
                                                  href={link}
                                                  aria-label={title}
                                                  title={title}
                                                >
                                                  {title}
                                                </Link>
                                                <ul className="submenu">
                                                  {children.map(
                                                    (
                                                      { title, link, data },
                                                      innerIndex
                                                    ) => {
                                                      return (
                                                        <li
                                                          className="menu-item"
                                                          key={
                                                            title + innerIndex
                                                          }
                                                        >
                                                          <div>
                                                            <Link
                                                              href={link}
                                                              aria-label={title}
                                                              title={title}
                                                            >
                                                              {title}
                                                            </Link>
                                                          </div>
                                                        </li>
                                                      );
                                                    }
                                                  )}
                                                </ul>
                                              </li>
                                            ) : (
                                              <li
                                                className={`${
                                                  active ? "active-child" : ""
                                                }`}
                                              >
                                                <div>
                                                  <Link
                                                    href={link}
                                                    aria-label={title}
                                                    title={title}
                                                  >
                                                    {title}
                                                  </Link>
                                                </div>
                                              </li>
                                            )}
                                          </React.Fragment>
                                        );
                                      }
                                    )}
                                  </ul>
                                </li>
                              ) : (
                                <li
                                  className={`menu-item ${
                                    data.megaMenu ? "dropdown-mega" : ""
                                  } ${active ? "active" : ""}`}
                                >
                                  <Link
                                    href={link}
                                    aria-label={title}
                                    title={title}
                                  >
                                    {title}
                                  </Link>
                                </li>
                              )}
                            </React.Fragment>
                          );
                        }
                      )}
                  </ul>
                </div>
              </nav>
              <div className="menu-right">
                {themeSwitcher.showLanguage
                  ? themeSwitcher.showLanguage === "1" &&
                    renderLanguageSwitcher()
                  : pageData.data.page.constants.ns_style.enable_language
                      .value === "1" && renderLanguageSwitcher()}

                {themeSwitcher.showSearch
                  ? themeSwitcher.showSearch === "1" && renderSearchForm()
                  : pageData.data.page.constants.ns_style.enable_search
                      .value === "1" && renderSearchForm()}
              </div>
              <div className="menu-burger">
                <div
                  className={`menu-burger-wrap ${openCanvasMenu ? "open" : ""}`}
                  onClick={() => setOpenCanvasMenu(!openCanvasMenu)}
                >
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          </div>
          {openCanvasMenu ? renderMobileMenu() : ""}
        </Container>
      )}

      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Offcanvas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          Some text as placeholder. In real life you can have the elements you
          have chosen. Like, text, images, lists, etc.
        </Offcanvas.Body>
      </Offcanvas>
    </header>
  );
};
export default Header;
