import GlobalContext from "@/context/GlobalContext";
import { useTranslations } from "next-intl";
import React, { useContext } from "react";

const FooterSwitcher = ({ footerType }) => {
  const { themeSwitcher, setThemeSwitcher } = useContext(GlobalContext);
  const t = useTranslations();
  const handleFooterSwitcher = (e) => {
    setThemeSwitcher({ ...themeSwitcher, footerLayout: e.target.value });
  };
  return (
    <div className="category">
      <h5>Footer Menu</h5>
      <div className="custom-select-1 pre-loader">
        <select
          className="form-select form-control loading-overlay-select h-auto"
          onChange={handleFooterSwitcher}
          value={
            themeSwitcher.footerLayout
              ? themeSwitcher.footerLayout
              : footerType.value
          }
          aria-label={"Footer Menu"}
        >
          {footerType.labelValueArray.map(({ label, value }, index) => {
            return (
              <option key={index} value={value}>
                {label}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
};

export default FooterSwitcher;
