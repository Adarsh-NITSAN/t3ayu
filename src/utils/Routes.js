import getAPIData from "./GetData";

const getRoutes = (menuData, lang) => {
  let mainMenu = [];

  const mainNavMenu = menuData.data.page.mainNavigation.map((article) => {
    return {
      params: {
        slug: [article.data.slug.substring(1)],
      },
      locale: lang,
    };
  });

  const subNavMenu = menuData.data.page.subNavigation.map((article) => {
    return {
      params: {
        slug: [article.data.slug.substring(1)],
      },
      locale: lang,
    };
  });

  const footerNavMenu = menuData.data.page.footerNavigation.map((article) => ({
    params: {
      slug: [article.data.slug.substring(1)],
    },
    locale: lang,
  }));

  const miscNavMenu = menuData.data.page.misc.map((article) => ({
    params: {
      slug: [article.data.slug.substring(1)],
    },
    locale: lang,
  }));

  mainMenu = [...mainNavMenu, ...subNavMenu, ...footerNavMenu, ...miscNavMenu];

  let menuChildren = [];

  menuData.data.page.mainNavigation.map((menus) => {
    if (!menus.children || !menus.children.length) {
      return;
    }
    let spreadMenuChildren = menus.children.map((child) => {
      return {
        params: {
          slug: child.data.slug.substring(1).split("/"),
        },
        locale: lang,
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
        return {
          params: {
            slug: subChild.data.slug.substring(1).split("/"),
          },
          locale: lang,
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
      return {
        params: {
          slug: child.data.slug.substring(1).split("/"),
        },
        locale: lang,
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
        return {
          params: {
            slug: subChild.data.slug.substring(1).split("/"),
          },
          locale: lang,
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
      return {
        params: {
          slug: child.data.slug.substring(1).split("/"),
        },
        locale: lang,
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
        return {
          params: {
            slug: subChild.data.slug.substring(1).split("/"),
          },
          locale: lang,
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

export const Routes = async ({ locale, defaultLocale }) => {
  const menuData = await getAPIData(`${locale !== "en" ? locale : ""}`);
  let pages = [
    {
      params: { slug: [""] },
      locale: locale,
    },
  ];

  let getENRoutes = [];

  if (menuData && menuData.data) {
    getENRoutes = getRoutes(menuData, locale);
  }

  pages = [...pages, ...getENRoutes];
  let paths = pages;

  return paths;
};

export default Routes;
