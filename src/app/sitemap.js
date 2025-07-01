import getAPIData from "@/utils/GetData";
import { i18n } from "../../i18n-config";
import moment from "moment";

const getRoutes = (menuData, lang) => {
  let mainMenu = [];

  const mainNavMenu = menuData.data.page.mainNavigation.map((article) => {
    // return article.link;
    return {
      params: {
        link: article.link,
        date: article.data.publish_date,
      },
    };
  });

  const subNavMenu = menuData.data.page.subNavigation.map((article) => {
    // return article.link;
    return {
      params: {
        link: article.link,
        date: article.data.publish_date,
      },
    };
  });

  const footerNavMenu = menuData.data.page.footerNavigation.map((article) => {
    // return article.link;
    return {
      params: {
        link: article.link,
        date: article.data.publish_date,
      },
    };
  });

  const miscNavMenu = menuData.data.page.misc.map((article) => {
    // return article.link;
    return {
      params: {
        link: article.link,
        date: article.data.publish_date,
      },
    };
  });

  mainMenu = [...mainNavMenu, ...subNavMenu, ...footerNavMenu, ...miscNavMenu];

  let menuChildren = [];

  menuData.data.page.mainNavigation.map((menus) => {
    if (!menus.children || !menus.children.length) {
      return;
    }
    let spreadMenuChildren = menus.children.map((child) => {
      // return child.link;
      return {
        params: {
          link: child.link,
          date: child.data.publish_date,
        },
      };
    });
    menuChildren = [...menuChildren, ...spreadMenuChildren];
  });

  let subMenuChildren = [];

  menuData.data.page.mainNavigation.map((menus) => {
    if (!menus.children || !menus.children.length) {
      return;
    }
    menus.children.map((child) => {
      if (!child.children || !child.children.length) {
        return;
      }
      let spreadSubMenuChildren;
      spreadSubMenuChildren = child.children.map((subChild) => {
        // return subChild.link;
        return {
          params: {
            link: subChild.link,
            date: subChild.data.publish_date,
          },
        };
      });
      subMenuChildren = [...subMenuChildren, ...spreadSubMenuChildren];
    });
  });

  let footerMenuChildren = [];

  menuData.data.page.footerNavigation.map((menus) => {
    if (!menus.children || !menus.children.length) {
      return;
    }
    let spreadMenuChildren = menus.children.map((child) => {
      // return child.link;
      return {
        params: {
          link: child.link,
          date: child.data.publish_date,
        },
      };
    });
    footerMenuChildren = [...footerMenuChildren, ...spreadMenuChildren];
  });

  menuData.data.page.footerNavigation.map((menus) => {
    if (!menus.children || !menus.children.length) {
      return;
    }
    menus.children.map((child) => {
      if (!child.children || !child.children.length) {
        return;
      }
      let spreadSubMenuChildren;
      spreadSubMenuChildren = child.children.map((subChild) => {
        // return subChild.link;
        return {
          params: {
            link: subChild.link,
            date: subChild.data.publish_date,
          },
        };
      });
      footerMenuChildren = [...footerMenuChildren, ...spreadSubMenuChildren];
    });
  });

  let miscMenuChildren = [];

  menuData.data.page.misc.map((menus) => {
    if (!menus.children || !menus.children.length) {
      return;
    }
    let spreadMenuChildren = menus.children.map((child) => {
      // return child.link;
      return {
        params: {
          link: child.link,
          date: child.data.publish_date,
        },
      };
    });
    miscMenuChildren = [...miscMenuChildren, ...spreadMenuChildren];
  });

  menuData.data.page.misc.map((menus) => {
    if (!menus.children || !menus.children.length) {
      return;
    }
    menus.children.map((child) => {
      if (!child.children || !child.children.length) {
        return;
      }
      let spreadSubMenuChildren;
      spreadSubMenuChildren = child.children.map((subChild) => {
        // return subChild.link;
        return {
          params: {
            link: subChild.link,
            date: subChild.data.publish_date,
          },
        };
      });
      miscMenuChildren = [...miscMenuChildren, ...spreadSubMenuChildren];
    });
  });

  mainMenu = [
    ...mainMenu,
    ...menuChildren,
    ...subMenuChildren,
    ...footerMenuChildren,
    ...miscMenuChildren,
  ];

  return mainMenu;
};

const Routes = async ({ locale, defaultLocale }) => {
  const menuData = await getAPIData(`${locale !== "en" ? locale : ""}`);
  let pages = [];

  let getENRoutes = [];

  if (menuData && menuData.data) {
    getENRoutes = getRoutes(menuData, locale);
  }

  pages = [...pages, ...getENRoutes];
  let paths = pages;

  return paths;
};

export default async function Sitemap() {
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

  const posts = pageRoutes.map(({ params }) => ({
    url: `${params.link}`,
    lastModified: `${moment.unix(params.date).format("YYYY-MM-DD HH:mm ZZ")}`,
    priority: 0.5,
  }));

  return posts;
}
