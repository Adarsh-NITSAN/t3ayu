import GlobalContext from "@/context/GlobalContext";
import { useTranslations } from "next-intl";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import HeaderSwitcher from "./HeaderSwitcher";
import FooterSwitcher from "./FooterSwitcher";
import FontSwitcher from "./FontSwitcher";
import LayoutSwithcer from "./LayoutSwithcer";
import BackgroundSwitcher from "./BackgroundSwitcher";
import SearchSwitch from "./SearchSwitch";
import LanguageSwitcher from "./LanguageSwitcher";
import { Button } from "react-bootstrap";
import ColorSwitcher from "./ColorSwitcher";

let themeInfo;

if (typeof window !== "undefined") {
  themeInfo = JSON.parse(localStorage.getItem("theme")) || {};
}

const ThemeSwitcher = ({ styleData }) => {
  const { themeSwitcher, setThemeSwitcher } = useContext(GlobalContext);
  const t = useTranslations();
  const [isMobile, setIsMobile] = useState(false);
  const [width, setWidth] = useState(0);

  let primary_color = styleData && styleData.primary;
  let secondary_color = styleData && styleData.secondary;
  let text_color = styleData && styleData.textcolor;
  let light_color = styleData && styleData.lightcolor;
  let header = styleData && styleData.headerLayout;
  let headerText = styleData && styleData.headerTextColor;
  let footer = styleData && styleData.footerLayout;
  let boxed_layout = styleData && styleData.boxed_layout;
  let font_family_name = styleData && styleData.site_font_family_name;
  let fonts_link = styleData && styleData.site_fonts_link;
  let languagemenu = styleData && styleData.enable_language;
  let searchbar = styleData && styleData.enable_search;
  let theme_color = styleData && styleData.bg_dark;
  let bg_pattern = styleData && styleData.bg_pattern;

  const [primary, setPrimary] = useState({
    color: primary_color?.value,
  });

  const [secondary, setSecondary] = useState({
    color: secondary_color?.value,
  });

  const [text, setText] = useState({
    color: text_color?.value,
  });

  const [lightColor, setLightColor] = useState({
    color: light_color?.value,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      themeInfo = JSON.parse(localStorage.getItem("theme")) || {};
    }
  });

  const initThemeSwitcher = {
    sideBarVisible: false,
    primary: themeInfo?.primary || "",
    secondary: themeInfo?.secondary || "",
    text: themeInfo?.text || "",
    teritory: themeInfo?.teritory || "",
    lightColor: themeInfo?.lightColor || "",
    headerLayout:
      themeInfo && themeInfo.headerLayout
        ? themeInfo.headerLayout
        : header && header.value,
    headerTextColor: headerText && headerText.value,
    footerLayout:
      themeInfo && themeInfo.footerLayout
        ? themeInfo.footerLayout
        : footer && footer.value,
    fontFamilyLink:
      themeInfo && themeInfo.fontFamilyLink
        ? themeInfo.fontFamilyLink
        : fonts_link && fonts_link.value
        ? fonts_link.value
        : "",
    fontFamilyName:
      themeInfo && themeInfo.fontFamilyName
        ? themeInfo.fontFamilyName
        : font_family_name && font_family_name.value
        ? font_family_name.value
        : "",
    boxedLayout:
      themeInfo && themeInfo.boxedLayout
        ? themeInfo.boxedLayout
        : boxed_layout && boxed_layout.value,
    showLanguage:
      themeInfo && themeInfo.showLanguage
        ? themeInfo.showLanguage
        : languagemenu && languagemenu.value,
    showSearch:
      themeInfo && themeInfo.showSearch
        ? themeInfo.showSearch
        : searchbar && searchbar.value,
    bg_dark:
      themeInfo && themeInfo.bg_dark
        ? themeInfo.bg_dark
        : theme_color && theme_color.value,
    bgPattern:
      themeInfo && themeInfo.bg_pattern
        ? themeInfo.bg_pattern
        : bg_pattern && bg_pattern.value,
  };
  useEffect(() => {
    window.addEventListener("resize", () => {
      window.innerWidth <= 768 ? setIsMobile(true) : setIsMobile(false),
        setWidth(window.innerWidth);
    });
  }, [width]);
  useEffect(() => {
    window.innerWidth <= 768 ? setIsMobile(true) : setIsMobile(false),
      setWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    function getThemeVariable(themeVar) {
      const theme = JSON.parse(localStorage.getItem("theme"));
      if (theme && theme[themeVar]) {
        return theme[themeVar];
      } else {
        return false;
      }
    }
    setPrimary({
      ...primary,
      color: getThemeVariable("primary")
        ? getThemeVariable("primary")
        : primary_color?.value,
    });
    setSecondary({
      ...secondary,
      color: getThemeVariable("secondary")
        ? getThemeVariable("secondary")
        : secondary_color?.value,
    });
    setText({
      ...text,
      color: getThemeVariable("text")
        ? getThemeVariable("text")
        : text_color?.value,
    });
    setLightColor({
      ...lightColor,
      color: getThemeVariable("light")
        ? getThemeVariable("light")
        : light_color?.value,
    });
    setThemeSwitcher(initThemeSwitcher);
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--primary-color",
      `${primary.color}`
    );
    document.documentElement.style.setProperty(
      "--secondary-color",
      `${secondary.color}`
    );
    document.documentElement.style.setProperty("--text-color", `${text.color}`);

    document.documentElement.style.setProperty(
      "--light-color",
      `${lightColor.color}`
    );
  }, [primary, secondary, text, lightColor]);

  useEffect(() => {
    if (themeSwitcher.boxedLayout === "1") {
      document.body.classList.add("boxed");
    } else {
      document.body.classList.remove("boxed");
    }
    if (themeSwitcher.bg_dark == 1) {
      document.body.classList.add("theme-dark");
    } else {
      document.body.classList.remove("theme-dark");
    }
  }, [themeSwitcher]);

  const resetTheme = () => {
    localStorage.removeItem("theme");

    setPrimary({
      ...primary,
      color: primary_color.value,
    });
    setSecondary({
      ...secondary,
      color: secondary_color.value,
    });
    setText({
      ...text,
      color: text_color.value,
    });

    setLightColor({
      ...lightColor,
      color: light_color.value,
    });

    setThemeSwitcher({
      ...themeSwitcher,
      headerLayout: header.value,
      footerLayout: footer.value,
      fontFamilyLink: fonts_link.value,
      fontFamilyName: font_family_name.value,
      boxedLayout: boxed_layout.value,
      showLanguage: languagemenu.value,
      showSearch: searchbar.value,
      bg_dark: theme_color.value,
      bgPattern: bg_pattern.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const theme = {
      primary: primary.color,
      secondary: secondary.color,
      text: text.color,
      lightColor: lightColor.color,
      headerTextColor: themeSwitcher.headerTextColor,
      footerLayout: themeSwitcher.footerLayout,
      fontFamilyLink: themeSwitcher.fontFamilyLink,
      fontFamilyName: themeSwitcher.fontFamilyName,
      boxedLayout: themeSwitcher.boxedLayout,
      showLanguage: themeSwitcher.showLanguage,
      showSearch: themeSwitcher.showSearch,
      bg_dark: themeSwitcher.bg_dark,
      bgPattern: themeSwitcher.bgPattern,
    };

    localStorage.setItem("theme", JSON.stringify(theme));
    handleSettingsBar(e);
  };

  const handleSettingsBar = (e) => {
    e.preventDefault();
    setThemeSwitcher({
      ...themeSwitcher,
      sideBarVisible: !themeSwitcher.sideBarVisible,
    });
  };
  return (
    <section
      id="styleSwitcher"
      className={`style-switcher ${
        themeSwitcher.sideBarVisible ? "active" : ""
      } ${isMobile ? "d-none" : ""}`}
    >
      <div className="style-switcher-action-links">
        <Link
          href={"#"}
          onClick={(e) => {
            handleSettingsBar(e);
          }}
          className="style-switcher-open"
          scroll={false}
          aria-label="settings"
        >
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 640 512"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M308.5 135.3c7.1-6.3 9.9-16.2 6.2-25c-2.3-5.3-4.8-10.5-7.6-15.5L304 89.4c-3-5-6.3-9.9-9.8-14.6c-5.7-7.6-15.7-10.1-24.7-7.1l-28.2 9.3c-10.7-8.8-23-16-36.2-20.9L199 27.1c-1.9-9.3-9.1-16.7-18.5-17.8C173.9 8.4 167.2 8 160.4 8h-.7c-6.8 0-13.5 .4-20.1 1.2c-9.4 1.1-16.6 8.6-18.5 17.8L115 56.1c-13.3 5-25.5 12.1-36.2 20.9L50.5 67.8c-9-3-19-.5-24.7 7.1c-3.5 4.7-6.8 9.6-9.9 14.6l-3 5.3c-2.8 5-5.3 10.2-7.6 15.6c-3.7 8.7-.9 18.6 6.2 25l22.2 19.8C32.6 161.9 32 168.9 32 176s.6 14.1 1.7 20.9L11.5 216.7c-7.1 6.3-9.9 16.2-6.2 25c2.3 5.3 4.8 10.5 7.6 15.6l3 5.2c3 5.1 6.3 9.9 9.9 14.6c5.7 7.6 15.7 10.1 24.7 7.1l28.2-9.3c10.7 8.8 23 16 36.2 20.9l6.1 29.1c1.9 9.3 9.1 16.7 18.5 17.8c6.7 .8 13.5 1.2 20.4 1.2s13.7-.4 20.4-1.2c9.4-1.1 16.6-8.6 18.5-17.8l6.1-29.1c13.3-5 25.5-12.1 36.2-20.9l28.2 9.3c9 3 19 .5 24.7-7.1c3.5-4.7 6.8-9.5 9.8-14.6l3.1-5.4c2.8-5 5.3-10.2 7.6-15.5c3.7-8.7 .9-18.6-6.2-25l-22.2-19.8c1.1-6.8 1.7-13.8 1.7-20.9s-.6-14.1-1.7-20.9l22.2-19.8zM112 176a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zM504.7 500.5c6.3 7.1 16.2 9.9 25 6.2c5.3-2.3 10.5-4.8 15.5-7.6l5.4-3.1c5-3 9.9-6.3 14.6-9.8c7.6-5.7 10.1-15.7 7.1-24.7l-9.3-28.2c8.8-10.7 16-23 20.9-36.2l29.1-6.1c9.3-1.9 16.7-9.1 17.8-18.5c.8-6.7 1.2-13.5 1.2-20.4s-.4-13.7-1.2-20.4c-1.1-9.4-8.6-16.6-17.8-18.5L583.9 307c-5-13.3-12.1-25.5-20.9-36.2l9.3-28.2c3-9 .5-19-7.1-24.7c-4.7-3.5-9.6-6.8-14.6-9.9l-5.3-3c-5-2.8-10.2-5.3-15.6-7.6c-8.7-3.7-18.6-.9-25 6.2l-19.8 22.2c-6.8-1.1-13.8-1.7-20.9-1.7s-14.1 .6-20.9 1.7l-19.8-22.2c-6.3-7.1-16.2-9.9-25-6.2c-5.3 2.3-10.5 4.8-15.6 7.6l-5.2 3c-5.1 3-9.9 6.3-14.6 9.9c-7.6 5.7-10.1 15.7-7.1 24.7l9.3 28.2c-8.8 10.7-16 23-20.9 36.2L315.1 313c-9.3 1.9-16.7 9.1-17.8 18.5c-.8 6.7-1.2 13.5-1.2 20.4s.4 13.7 1.2 20.4c1.1 9.4 8.6 16.6 17.8 18.5l29.1 6.1c5 13.3 12.1 25.5 20.9 36.2l-9.3 28.2c-3 9-.5 19 7.1 24.7c4.7 3.5 9.5 6.8 14.6 9.8l5.4 3.1c5 2.8 10.2 5.3 15.5 7.6c8.7 3.7 18.6 .9 25-6.2l19.8-22.2c6.8 1.1 13.8 1.7 20.9 1.7s14.1-.6 20.9-1.7l19.8 22.2zM464 304a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"></path>
          </svg>
        </Link>
        <Link href="/" target="_blank" title="" aria-label="cart">
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 576 512"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"></path>
          </svg>
        </Link>
      </div>
      <div className="style-switcher-wrap">
        <form id="myForm" onSubmit={(e) => handleSubmit(e)}>
          <div className="form-inner">
            <div className="category">
              <div className="category-headline">
                <h4>{t("theme_color")}</h4>
              </div>
              {primary.color && (
                <ColorSwitcher
                  title={t("primary_color")}
                  color={primary}
                  setColor={setPrimary}
                  colorType="primary"
                />
              )}
              {secondary.color && (
                <ColorSwitcher
                  title={t("secondary_color")}
                  color={secondary}
                  setColor={setSecondary}
                  colorType="primary"
                />
              )}
              {text.color && (
                <ColorSwitcher
                  title={t("text_color")}
                  color={text}
                  setColor={setText}
                  colorType="primary"
                />
              )}
              {lightColor.color && (
                <ColorSwitcher
                  title={"Light Color"}
                  color={lightColor}
                  setColor={setLightColor}
                  colorType="primary"
                />
              )}
              {header && <HeaderSwitcher headerType={header} />}
              {footer && <FooterSwitcher footerType={footer} />}
              <FontSwitcher />
              <LayoutSwithcer bgPatterns={bg_pattern.labelValueArray} />
              <BackgroundSwitcher />
              <SearchSwitch />
              <LanguageSwitcher />
            </div>
          </div>
          <div className="style-switcher-buttons options-links">
            <Button type="submit" className="submit" variant="primary">
              {t("submitBtn")}
            </Button>
            <Button type="button" className="reset" onClick={resetTheme}>
              {t("resetBtn")}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ThemeSwitcher;
