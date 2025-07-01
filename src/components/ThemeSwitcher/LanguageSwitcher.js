import GlobalContext from "@/context/GlobalContext";
import Link from "next/link";
import React, { useContext } from "react";

const LanguageSwitcher = () => {
  const { themeSwitcher, setThemeSwitcher } = useContext(GlobalContext);

  const handleSetLanguage = (e) => {
    e.preventDefault();
    setThemeSwitcher({ ...themeSwitcher, showLanguage: "1" });
  };
  const handleNotSetLanguage = (e) => {
    e.preventDefault();
    setThemeSwitcher({ ...themeSwitcher, showLanguage: "0" });
  };

  return (
    <div className="category">
      <div className="category-headline">
        <h5>Language Type</h5>
      </div>
      <div className="options-links">
        <Link
          href={"#"}
          className={`${
            themeSwitcher.showLanguage === "1"
              ? "active bg-color-light"
              : "bg-color-dark"
          }`}
          onClick={(e) => handleSetLanguage(e)}
          aria-label="show"
        >
          Show
        </Link>
        <Link
          href={"#"}
          className={`${
            themeSwitcher.showLanguage === "0"
              ? "active bg-color-light"
              : "bg-color-dark"
          }`}
          onClick={(e) => handleNotSetLanguage(e)}
          aria-label="hide"
        >
          Hide
        </Link>
      </div>
    </div>
  );
};

export default LanguageSwitcher;
