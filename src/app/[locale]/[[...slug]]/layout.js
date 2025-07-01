import { i18n } from "../../../../i18n-config";
import { NextIntlClientProvider } from "next-intl";
import Layout from "@/components/Layout";
import { unstable_setRequestLocale } from "next-intl/server";
import localFont from "next/font/local";
import { notFound } from "next/navigation";
import getAPIData from "@/utils/GetData";
// import getAPIData from "@/app/route";
import { GlobalProvider } from "@/context/GlobalContext";
import "@/scss/main.scss";
import Routes from "@/utils/Routes";
import "aos/dist/aos.css";
import Maintenance from "@/components/Maintenance";
const { locales, defaultLocale } = i18n;

const roboto_font = localFont({
  src: [
    {
      path: "../../../assets/fonts/roboto/Roboto-Regular.woff2",
      weight: "400",
      style: "normal",
      display: "swap",
      preload: false,
    },
    {
      path: "../../../assets/fonts/roboto/Roboto-Bold.woff2",
      weight: "700",
      style: "normal",
      display: "swap",
      preload: false,
    },
  ],
  fallback: ["sans-serif"],
  variable: "--font-roboto",
  display: "swap",
  preload: false,
});

const oswald_font = localFont({
  src: [
    {
      path: "../../../assets/fonts/oswald/Oswald-Regular.woff2",
      weight: "400",
      style: "normal",
      display: "swap",
      preload: false,
    },
    {
      path: "../../../assets/fonts/oswald/Oswald-Bold.woff2",
      weight: "700",
      style: "normal",
      display: "swap",
      preload: false,
    },
  ],
  fallback: ["sans-serif"],
  variable: "--font-oswald",
  display: "swap",
  preload: false,
});

export async function generateMetadata({ params }) {
  const { pageData } = await getAllData(params);
  let pageTitle,
    generalTitlePrefix,
    generalTitleSufix,
    generalMetaDescription,
    generalMetaKeywords,
    favicon,
    ogImage,
    ogTitle,
    ogDescription;
  if (pageData && pageData.data) {
    // pageTitle = pageData?.data?.meta?.title;
    pageTitle = pageData?.data?.meta?.metaTitle;
    generalTitlePrefix =
      pageData?.data?.page?.constants?.ns_seo?.seo_title_prefix?.value;
    generalTitleSufix =
      pageData?.data?.page?.constants?.ns_seo?.seo_title_sufix?.value;
    generalMetaDescription =
      pageData?.data?.page?.constants?.ns_seo?.seo_meta_description?.value;
    generalMetaKeywords =
      pageData?.data?.page?.constants?.ns_seo?.seo_meta_keywords?.value;
    favicon = pageData?.data?.page?.constants?.ns_basetheme?.favicon?.value;
    ogImage = pageData?.data?.meta?.ogImage?.publicUrl;
    ogTitle = pageData?.data?.meta?.ogTitle;
    ogDescription = pageData?.data?.meta?.ogDescription;
  }

  return {
    title: `${generalTitlePrefix && generalTitlePrefix} ${
      generalTitlePrefix
        ? pageTitle && " - " + pageTitle
        : generalTitleSufix
        ? pageTitle && pageTitle + " - "
        : pageTitle
    } ${generalTitleSufix && generalTitleSufix}`,
    description: `${ogDescription && ogDescription}`,
    keywords: `${generalMetaKeywords && generalMetaKeywords}`,
    icons: [
      {
        rel: "icon",
        url: `${process.env.NEXT_PUBLIC_API_URL + favicon}`,
        type: "image/x-icon",
      },
    ],
    openGraph: {
      title: `${ogTitle && ogTitle}`,
      description: `${ogDescription && ogDescription}`,
      images: [
        {
          url: `${ogImage && ogImage}`,
          width: 800,
          height: 600,
        },
      ],
      type: "website",
    },
  };
}

export async function generateStaticParams() {
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
    if (path.params.slug[0] == "404") {
      return false;
    } else if (path.params.slug[0] == "sitemap") {
      return false;
    } else {
      return true;
    }
  });
  return filteredPaths;
}

const getAllData = async (params) => {
  let pageData;
  const { defaultLocale } = i18n;
  const { locale, slug } = params;

  var paramSlug;
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

  pageData = await getAPIData(
    `${locale === defaultLocale ? "" : `${locale}/`}${
      paramSlug ? paramSlug : ""
    }`
  );

  return {
    pageData,
  };
};

export default async function RootLayout({ children, params }) {
  const { locale } = params;

  let messages;
  try {
    messages = (await import(`../../../assets/localization/${locale}.json`))
      .default;
  } catch (error) {
    notFound();
  }

  if (!i18n.locales.includes(locale)) notFound();

  unstable_setRequestLocale(locale);

  const { pageData } = await getAllData(params);
  let maintenance = pageData?.data?.page?.constants?.ns_basetheme;

  return (
    <html
      lang={defaultLocale}
      className={` ${oswald_font.variable} ${roboto_font.variable}`}
    >
      <body>
        <GlobalProvider>
          <NextIntlClientProvider locale={locale} messages={messages}>
            {maintenance?.maintenance_mode?.value === "1" ? (
              <Maintenance
                headline={maintenance?.maintenance_headline?.value}
                message={maintenance?.maintenance_message?.value}
              />
            ) : (
              <Layout pageData={pageData}>{children}</Layout>
            )}
          </NextIntlClientProvider>
        </GlobalProvider>
      </body>
    </html>
  );
}
