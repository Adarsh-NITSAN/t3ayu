"use client";
import Link from "next/link";

const SideBar = ({ pageData, sidebar }) => {
  const renderSidbarMenus = () => {
    return (
      <ul>
        {pageData &&
          pageData.map(({ link, title, active, children }, index) => (
            <li key={title + index} className={active ? "sidemenu-active" : ""}>
              <Link href={link} title={title}>
                <span>{title}</span>
              </Link>
              {children && (
                <ul>
                  {children.map(({ title, link, active }, index) => (
                    <li
                      key={title + index}
                      className={active ? "sidemenu-active" : ""}
                    >
                      <Link href={link} title={title} aria-label="title">
                        <span>{title}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
      </ul>
    );
  };

  return (
    <>
      {sidebar === "subnavigation_left" ? (
        <>{renderSidbarMenus()}</>
      ) : (
        <div className="frame frame-default frame-type-menu_subpages frame-layout-0">
          {renderSidbarMenus()}
        </div>
      )}
    </>
  );
};
export default SideBar;
