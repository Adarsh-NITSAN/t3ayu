import React, { Suspense } from "react";
import Routes from "@/utils/Routes";
import getAPIData from "@/utils/GetData";
// import getAPIData from "@/app/route";
import ContentType from "@/utils/ContentType";
import { i18n } from "../../../../i18n-config";
import dynamic from "next/dynamic";
import { unstable_setRequestLocale, getTranslations } from "next-intl/server";
import { Col, Container, Row } from "react-bootstrap";
import RenderComponents from "@/utils/RenderComponents";
import PageHeader from "@/components/PageHeader";
import BlogDetail from "@/components/Blog/BlogDetails";

const HolyLoader = dynamic(() => import("holy-loader"), { ssr: false });

export async function generateStaticParams() {
  const { defaultLocale, locales } = i18n;
  let pageRoutes = [];

  await Promise.all(
    locales.map(async (locale) => {
      const localPaths = await Routes({
        locale,
        defaultLocale,
      });
      pageRoutes = [...pageRoutes, ...localPaths];
    })
  );

  locales.map((locale) => {
    pageRoutes = [
      ...pageRoutes,
      {
        params: { slug: [""] },
        locale,
      },
      {
        params: { slug: ["search"] },
        locale,
      },
    ];
  });

  const filteredPaths = pageRoutes.filter((path) => {
    if (path.params.slug[0] == "sitemap") {
      return false;
    } else {
      return true;
    }
  });
  return filteredPaths;
}

const getAllData = async (params, searchParams) => {
  const { defaultLocale } = i18n;
  const { slug, locale } = params;
  let pageData;
  var paramSlug;
  let string = "?";
  for (let key in searchParams) {
    string += key + "=" + searchParams[key] + "&";
  }
  if (slug && slug.length > 2) {
    paramSlug = slug.toString().replaceAll(",", "/");
  } else if (slug && slug.length > 1) {
    paramSlug = slug.toString().replaceAll(",", "/");
  } else if (slug) {
    if (slug[0] === "page") {
      paramSlug = "";
    } else {
      paramSlug = slug[0];
    }
  }
  if (string.includes("?search_query")) {
    string = "";
  }

  pageData = await getAPIData(
    `${locale === defaultLocale ? "" : `${locale}/`}${
      paramSlug
        ? searchParams && Object.keys(searchParams).length
          ? paramSlug + string.slice(0, -1)
          : paramSlug
        : ""
    }`
  );

  if (!pageData.error && pageData.data === 404) {
    notFound();
  }
  return {
    pageData,
  };
};

export default async function Page({ params, searchParams }) {
  unstable_setRequestLocale(params.locale);

  const t = await getTranslations();
  const { pageData } = await getAllData(params, searchParams);

  // const pageTitle = pageData?.data?.meta?.title;
  const pageTitle = pageData?.data?.meta?.metaTitle;
  const pageSubTitle = pageData?.data?.meta?.subtitle;
  const HeaderTransparentText = pageData?.data?.meta?.transparent;
  const pageMedia = pageData?.data?.media[0]?.publicUrl;
  const layoutType = pageData?.data?.appearance?.backendLayout;
  let BlogImage = pageData?.data?.page?.featureImage;
  let BlogTitle = pageData?.data?.page?.title;
  let BlogAuthor = pageData?.data?.page?.authors;
  let BlogCategories = pageData?.data?.page?.categories;
  let BlogTags = pageData?.data?.page?.tags;
  let BlogDate = pageData?.data?.page?.publishDate;
  let BlogDetails = pageData?.data?.content;

  return (
    <>
      <HolyLoader showSpinner={false} color={`var(--primary-color)`} />

      <main className="wrapper">
        {pageMedia && (
          <PageHeader
            pageTitle={pageTitle}
            pageSubTitle={pageSubTitle}
            pageMedia={pageMedia}
            HeaderTransparentText={HeaderTransparentText}
          />
        )}
        {pageData &&
          pageData.data &&
          pageData.data.content &&
          pageData.data.content.colPos1 &&
          pageData.data.content.colPos1.length && (
            <>
              {pageData.data.content.colPos1.map((layout, index) => {
                return (
                  <React.Fragment key={index}>
                    {layout.type === "ns_base_2Cols" ||
                    layout.type === "ns_base_3Cols" ||
                    layout.type === "ns_base_4Cols" ||
                    layout.type === "ns_base_6Cols" ? (
                      <div
                        className={`${
                          layout.appearance.spaceBefore &&
                          `frame-space-before-${layout.appearance.spaceBefore}`
                        } ${
                          layout.appearance.spaceAfter &&
                          `frame-space-after-${layout.appearance.spaceAfter}`
                        } ${
                          layout.content?.settings?.background_option ===
                          "light"
                            ? "section--bg-light-color"
                            : layout.content?.settings?.background_option ===
                              "dark"
                            ? `section--bg-dark-color ${
                                layout.content?.settings?.overlaytext === true
                                  ? "bg-dark-overlay"
                                  : ""
                              }`
                            : layout.content?.settings?.background_option ===
                              "transport"
                            ? "section--bg-white-color"
                            : `section--bg-image ${
                                layout.content?.settings?.overlaytext === true
                                  ? "bg-image-overlay"
                                  : ""
                              }`
                        }`}
                        style={
                          layout.content?.settings?.background_option ===
                            "image" &&
                          layout.content &&
                          layout.content.settings &&
                          layout.content.settings.image &&
                          layout.content.settings.image.length
                            ? {
                                backgroundImage: `url(${`${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_TYPO3_MEDIA}${layout.content.settings.image[0]}`})`,
                                backgroundRepeat: "no-repeat",
                                backgroundSize: "cover",
                              }
                            : {}
                        }
                      >
                        {layout.content?.settings?.containerfluid === true ||
                        layout.content?.settings?.containerfluid === "1" ? (
                          <Container fluid>
                            <Row>
                              <RenderComponents
                                pageData={layout.content.items}
                                settings={layout.content?.settings}
                                type={layout.type}
                              />
                            </Row>
                          </Container>
                        ) : (
                          <Container>
                            <Row>
                              <RenderComponents
                                pageData={layout.content.items}
                                settings={layout.content?.settings}
                                type={layout.type}
                              />
                            </Row>
                          </Container>
                        )}
                      </div>
                    ) : layout.type === "ns_base_container" ? (
                      <div
                        className={`${
                          layout.appearance.spaceBefore &&
                          `frame-space-before-${layout.appearance.spaceBefore}`
                        } ${
                          layout.appearance.spaceAfter &&
                          `frame-space-after-${layout.appearance.spaceAfter}`
                        } ${
                          layout.content?.settings?.background_option ===
                          "light"
                            ? "section--bg-light-color"
                            : layout.content?.settings?.background_option ===
                              "dark"
                            ? `section--bg-dark-color ${
                                layout.content?.settings?.overlaytext === true
                                  ? "bg-dark-overlay"
                                  : ""
                              }`
                            : layout.content?.settings?.background_option ===
                              "transport"
                            ? "section--bg-white-color"
                            : `section--bg-image ${
                                layout.content?.settings?.overlaytext === true
                                  ? "bg-image-overlay"
                                  : ""
                              }`
                        }`}
                        style={
                          layout.content?.settings?.background_option ===
                            "image" &&
                          layout.content &&
                          layout.content.settings &&
                          layout.content.settings.image &&
                          layout.content.settings.image.length
                            ? {
                                backgroundImage: `url(${`${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_TYPO3_MEDIA}${layout.content.settings.image[0]}`})`,
                                backgroundRepeat: "no-repeat",
                                backgroundSize: "cover",
                                backgroundPosition: "50%",
                              }
                            : {}
                        }
                      >
                        {layout.content?.settings?.containerfluid === true ||
                        layout.content?.settings?.containerfluid === "1" ? (
                          <Container fluid>
                            <Row>
                              <RenderComponents
                                pageData={layout.content.items}
                                settings={layout.content?.settings}
                                type={layout.type}
                              />
                            </Row>
                          </Container>
                        ) : (
                          <Container>
                            <Row>
                              <RenderComponents
                                pageData={layout.content.items}
                                settings={layout.content?.settings}
                                type={layout.type}
                              />
                            </Row>
                          </Container>
                        )}
                      </div>
                    ) : (
                      <Container>
                        <ContentType pageData={layout} />
                      </Container>
                    )}
                  </React.Fragment>
                );
              })}
            </>
          )}

        {layoutType === "blog_detail" ? (
          <>
            {pageData &&
              pageData.data &&
              pageData.data.page &&
              pageData.data.page.doktype &&
              pageData.data.page.doktype === "137" && (
                <Container className={`frame-space-before-medium`}>
                  <BlogDetail
                    image={BlogImage}
                    title={BlogTitle}
                    authors={BlogAuthor}
                    categories={BlogCategories}
                    tags={BlogTags}
                    publishDate={BlogDate}
                    pageData={BlogDetails}
                  />
                </Container>
              )}
          </>
        ) : (
          <>
            {pageData &&
              pageData.data &&
              pageData.data.content &&
              pageData.data.content.colPos0 &&
              pageData.data.content.colPos0.length &&
              pageData.data.content.colPos0.map((layout, index) => {
                return (
                  <React.Fragment key={index}>
                    {layout.type === "ns_base_2Cols" ||
                    layout.type === "ns_base_3Cols" ||
                    layout.type === "ns_base_4Cols" ||
                    layout.type === "ns_base_6Cols" ? (
                      <div
                        className={`${
                          layout.appearance.spaceBefore &&
                          `frame-space-before-${layout.appearance.spaceBefore}`
                        } ${
                          layout.appearance.spaceAfter &&
                          `frame-space-after-${layout.appearance.spaceAfter}`
                        } ${
                          layout.content?.settings?.background_option === "gray"
                            ? "section--bg-gray-color"
                            : layout.content?.settings?.background_option ===
                              "dark"
                            ? `section--bg-dark-color ${
                                layout.content?.settings?.overlaytext === true
                                  ? "bg-dark-overlay"
                                  : ""
                              }`
                            : layout.content?.settings?.background_option ===
                              "light"
                            ? "section--bg-light-color"
                            : `section--bg-image ${
                                layout.content?.settings?.overlaytext === true
                                  ? "bg-image-overlay"
                                  : ""
                              }`
                        }`}
                        style={
                          layout.content?.settings?.background_option ===
                            "image" &&
                          layout.content &&
                          layout.content.settings &&
                          layout.content.settings.image &&
                          layout.content.settings.image.length
                            ? {
                                backgroundImage: `url(${`${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_TYPO3_MEDIA}${layout.content.settings.image[0]}`})`,
                                backgroundRepeat: "no-repeat",
                                backgroundSize: "cover",
                                backgroundPosition: "50%",
                              }
                            : {}
                        }
                      >
                        {layout.content?.settings?.containerfluid === true ||
                        layout.content?.settings?.containerfluid === "1" ? (
                          <Container
                            fluid
                            className={`${
                              layout.content?.settings?.nogoutter === true
                                ? "g-0"
                                : "gy-4"
                            }`}
                          >
                            <Row
                              className={`${
                                layout.content?.settings?.nogoutter === true
                                  ? "g-0"
                                  : "gy-4"
                              }`}
                            >
                              <RenderComponents
                                pageData={layout.content.items}
                                settings={layout.content?.settings}
                                type={layout.type}
                              />
                            </Row>
                          </Container>
                        ) : (
                          <Container
                            className={`${
                              layout.content?.settings?.nogoutter === true
                                ? "g-0"
                                : "gy-4"
                            }`}
                          >
                            <Row
                              className={`${
                                layout.content?.settings?.nogoutter === true
                                  ? "g-0"
                                  : "gy-4"
                              }`}
                            >
                              <RenderComponents
                                pageData={layout.content.items}
                                settings={layout.content?.settings}
                                type={layout.type}
                              />
                            </Row>
                          </Container>
                        )}
                      </div>
                    ) : layout.type === "ns_base_container" ? (
                      <div
                        className={`${
                          layout.appearance.spaceBefore &&
                          `frame-space-before-${layout.appearance.spaceBefore}`
                        } ${
                          layout.appearance.spaceAfter &&
                          `frame-space-after-${layout.appearance.spaceAfter}`
                        } ${
                          layout.content?.settings?.background_option === "gray"
                            ? "section--bg-gray-color"
                            : layout.content?.settings?.background_option ===
                              "dark"
                            ? `section--bg-dark-color ${
                                layout.content?.settings?.overlaytext === true
                                  ? "bg-dark-overlay"
                                  : ""
                              }`
                            : layout.content?.settings?.background_option ===
                              "light"
                            ? "section--bg-light-color"
                            : `section--bg-image ${
                                layout.content?.settings?.overlaytext === true
                                  ? "bg-image-overlay"
                                  : ""
                              }`
                        }`}
                        style={
                          layout.content?.settings?.background_option ===
                            "image" &&
                          layout.content &&
                          layout.content.settings &&
                          layout.content.settings.image &&
                          layout.content.settings.image.length
                            ? {
                                backgroundImage: `url(${`${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_TYPO3_MEDIA}${layout.content.settings.image[0]}`})`,
                                backgroundRepeat: "no-repeat",
                                backgroundSize: "cover",
                                backgroundPosition: "50%",
                              }
                            : {}
                        }
                      >
                        {layout.content?.settings?.containerfluid === true ||
                        layout.content?.settings?.containerfluid === "1" ? (
                          <Container
                            fluid
                            className={`${
                              layout.content?.settings?.nogoutter === true
                                ? "g-0"
                                : "gy-4"
                            }`}
                          >
                            <RenderComponents
                              pageData={layout.content.items}
                              settings={layout.content?.settings}
                              type={layout.type}
                            />
                          </Container>
                        ) : (
                          <Container
                            className={`${
                              layout.content?.settings?.nogoutter === true
                                ? "g-0"
                                : "gy-4"
                            }`}
                          >
                            <RenderComponents
                              pageData={layout.content.items}
                              settings={layout.content?.settings}
                              type={layout.type}
                            />
                          </Container>
                        )}
                      </div>
                    ) : (
                      <Container>
                        <ContentType pageData={layout} />
                      </Container>
                    )}
                  </React.Fragment>
                );
              })}
          </>
        )}
      </main>
    </>
  );
}
