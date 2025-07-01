import GlobalContext from "@/context/GlobalContext";
import baseTheme from "@/utils/Theme";
import Link from "next/link";
import React, { useContext } from "react";

const BackgroundSwitcher = () => {
  const { themeSwitcher, setThemeSwitcher } = useContext(GlobalContext);
  const handleBackground = (e, type) => {
    e.preventDefault();
    setThemeSwitcher({
      ...themeSwitcher,
      bg_dark: type === baseTheme.background.dark ? "1" : "0",
    });
  };
  return (
    <div className="category">
      <div className="category-headline">
        <h5>Background Color</h5>
      </div>
      <div className="options-links site-bg">
        <Link
          href="#"
          title=""
          target="_self"
          onClick={(e) => handleBackground(e, baseTheme.background.light)}
          className={`${
            themeSwitcher.bg_dark !== "1" ? "active" : ""
          } bg-color-light`}
          aria-label="back_light"
        >
          Light
        </Link>
        <Link
          href="#"
          title=""
          target="_self"
          onClick={(e) => handleBackground(e, baseTheme.background.dark)}
          className={`${
            themeSwitcher.bg_dark === "1" ? "active" : ""
          } bg-color-dark`}
          aria-label="back_dark"
        >
          Dark
        </Link>
      </div>
    </div>
  );
};

export default BackgroundSwitcher;
