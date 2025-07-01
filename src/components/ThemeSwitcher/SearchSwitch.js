import GlobalContext from "@/context/GlobalContext";
import { useTranslations } from "next-intl";
import Link from "next/link";
import React, { useContext } from "react";

const SearchSwitch = () => {
  const { themeSwitcher, setThemeSwitcher } = useContext(GlobalContext);

  const t = useTranslations();

  const handleSetLanguage = (e) => {
    e.preventDefault();
    setThemeSwitcher({ ...themeSwitcher, showSearch: "1" });
  };
  const handleNotSetLanguage = (e) => {
    e.preventDefault();
    setThemeSwitcher({ ...themeSwitcher, showSearch: "0" });
  };
  return (
    <div className="category">
      <div className="category-headline">
        <h5>{t("search_type")}</h5>
      </div>
      <div className="options-links">
        <Link
          href={"#"}
          className={`${
            themeSwitcher.showSearch === "1"
              ? "active bg-color-light"
              : "bg-color-dark"
          }`}
          onClick={(e) => handleSetLanguage(e)}
          aria-label="show"
        >
          {t("showBtn")}
        </Link>
        <Link
          href={"#"}
          className={`${
            themeSwitcher.showSearch === "0"
              ? "active bg-color-light"
              : "bg-color-dark"
          }`}
          onClick={(e) => handleNotSetLanguage(e)}
          aria-label="hide"
        >
          {t("hideBtn")}
        </Link>
      </div>
    </div>
  );
};

export default SearchSwitch;
