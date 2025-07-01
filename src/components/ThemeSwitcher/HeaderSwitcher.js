import GlobalContext from "@/context/GlobalContext";
import React, { useContext } from "react";

const HeaderSwitcher = ({ headerType }) => {
  const { themeSwitcher, setThemeSwitcher } = useContext(GlobalContext);

  const handleHeaderSwitcher = (e) => {
    setThemeSwitcher({ ...themeSwitcher, headerLayout: e.target.value });
  };

  const renderLabel = (label) => {
    const spacedString = label.split("_").join(" ");
    return spacedString;
  };
  return (
    <div className="category">
      <h5>Header Menu</h5>
      <div className="custom-select-1 pre-loader">
        <select
          className="form-select form-control loading-overlay-select h-auto"
          onChange={handleHeaderSwitcher}
          value={themeSwitcher.headerLayout}
          aria-label={"Header Menu"}
        >
          {headerType.labelValueArray.map(({ label, value }, index) => {
            return (
              <option key={index} value={value}>
                {renderLabel(label)}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
};

export default HeaderSwitcher;
