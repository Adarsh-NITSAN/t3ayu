"use client";

import { createContext, useState } from "react";

const GlobalContext = createContext();
export default GlobalContext;

const GlobalProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [headerMenus, setHeaderMenus] = useState(null);
  const [cookie, setCookie] = useState(null);
  const [footerData, setFooterData] = useState(null);
  const [availbaleLanguage, setAvailableLanguage] = useState(null);
  const [videoModalURL, setVideoModalURL] = useState({});
  const [themeSwitcher, setThemeSwitcher] = useState({});
  const [breadcrumbs, setBreadcrumbs] = useState(null);
  const [cursorVariant, setCursorVariant] = useState("default");
  const [cursorText, setCursorText] = useState("");
  const [baseThemeData, setBaseThemeData] = useState({});
  const [socialLinks, setSocialLinks] = useState({});
  const [styleData, setStyleData] = useState();
  const [footerMenus, setFooterMenus] = useState(null);
  const [showPagination, setShowPagination] = useState(true);

  return (
    <GlobalContext.Provider
      value={{
        loading,
        setLoading,
        headerMenus,
        setHeaderMenus,
        cookie,
        setCookie,
        availbaleLanguage,
        setAvailableLanguage,
        videoModalURL,
        setVideoModalURL,
        themeSwitcher,
        setThemeSwitcher,
        cursorVariant,
        setCursorVariant,
        cursorText,
        setCursorText,
        footerData,
        setFooterData,
        baseThemeData,
        setBaseThemeData,
        socialLinks,
        setSocialLinks,
        breadcrumbs,
        setBreadcrumbs,
        setStyleData,
        styleData,
        footerMenus,
        setFooterMenus,
        showPagination,
        setShowPagination,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
export { GlobalProvider };
