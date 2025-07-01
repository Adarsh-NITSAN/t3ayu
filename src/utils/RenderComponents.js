import { Row } from "react-bootstrap";
import ContentType from "./ContentType";
import React from "react";

const RenderComponents = ({ pageData, settings, type }) => {
  const renderContent = (contentElements) => {
    return <ContentType pageData={contentElements} />;
  };
  const findValuesObject = (currentElement) => {
    return currentElement?.content?.items?.map(({ contentElements }, index) => {
      const settings = currentElement?.content?.settings;
      let col_lg = `width_column_lg_${index + 1}`;
      let col_md = `width_column_md_${index + 1}`;
      let col_sm = `width_column_sm_${index + 1}`;
      let col_xl = `width_column_xl_${index + 1}`;
      let col_xxl = `width_column_xxl_${index + 1}`;

      let offset_lg = `offset_column_lg_${index + 1}`;
      let offset_md = `offset_column_md_${index + 1}`;
      let offset_sm = `offset_column_sm_${index + 1}`;
      let offset_xl = `offset_column_xl_${index + 1}`;
      let offset_xxl = `offset_column_xxl_${index + 1}`;
      return (
        <div
          key={index}
          className={`col-layout
          ${settings && settings[`${col_lg}`] ? settings[`${col_lg}`] : ""} ${
            settings && settings[`${col_md}`] ? settings[`${col_md}`] : ""
          } ${settings && settings[`${col_sm}`] ? settings[`${col_sm}`] : ""} ${
            settings && settings[`${col_xl}`] ? settings[`${col_xl}`] : ""
          } ${
            settings && settings[`${col_xxl}`] ? settings[`${col_xxl}`] : ""
          } ${
            settings && settings[`${offset_lg}`] ? settings[`${offset_lg}`] : ""
          } ${
            settings && settings[`${offset_md}`] ? settings[`${offset_md}`] : ""
          } ${
            settings && settings[`${offset_sm}`] ? settings[`${offset_sm}`] : ""
          } ${
            settings && settings[`${offset_xl}`] ? settings[`${offset_xl}`] : ""
          } ${
            settings && settings[`${offset_xxl}`]
              ? settings[`${offset_xxl}`]
              : ""
          } 
           `}
        >
          {contentElements.map((current, ids) => {
            if (current !== null) {
              if (
                current.type === "ns_base_2Cols" ||
                current.type === "ns_base_3Cols" ||
                current.type === "ns_base_4Cols" ||
                current.type === "ns_base_6Cols"
              ) {
                if (
                  current.content &&
                  current.content.items &&
                  current.content.items.length
                ) {
                  return (
                    <Row
                      key={ids}
                      className={`${
                        current.appearance.spaceBefore &&
                        `frame-space-before-${current.appearance.spaceBefore}`
                      } ${
                        current.appearance.spaceAfter &&
                        `frame-space-after-${current.appearance.spaceAfter}`
                      }`}
                    >
                      {findValuesObject(current)}
                    </Row>
                  );
                }
              } else {
                return renderContent(current);
              }
            }
          })}
        </div>
      );
    });
  };

  const renderElements = (contentElements) => {
    return contentElements.map((currentElement, index) => {
      if (currentElement !== null) {
        if (
          currentElement.type === "ns_base_2Cols" ||
          currentElement.type === "ns_base_3Cols" ||
          currentElement.type === "ns_base_4Cols" ||
          currentElement.type === "ns_base_6Cols"
        ) {
          if (
            currentElement.content &&
            currentElement.content.items &&
            currentElement.content.items.length
          ) {
            return (
              <Row
                key={index}
                className={`${
                  currentElement.appearance.spaceBefore &&
                  `frame-space-before-${currentElement.appearance.spaceBefore}`
                } ${
                  currentElement.appearance.spaceAfter &&
                  `frame-space-after-${currentElement.appearance.spaceAfter}`
                } ${
                  currentElement.content?.settings?.background_option ===
                  "light"
                    ? "section--bg-light-color"
                    : currentElement.content?.settings?.background_option ===
                      "dark"
                    ? "section--bg-dark-color"
                    : currentElement.content?.settings?.background_option ===
                      "transport"
                    ? "section--bg-white-color"
                    : `section--bg-image ${
                        currentElement.content?.settings?.overlaytext === true
                          ? "bg-image-overlay"
                          : ""
                      }`
                } ${
                  currentElement.content?.settings?.nogoutter === true
                    ? "g-0"
                    : "gy-4"
                }`}
                style={
                  currentElement.content?.settings?.background_option ===
                    "image" &&
                  currentElement.content &&
                  currentElement.content.settings &&
                  currentElement.content.settings.image &&
                  currentElement.content.settings.image.length
                    ? {
                        backgroundImage: `url(${`${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_TYPO3_MEDIA}${currentElement.content.settings.image[0]}`})`,
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                        backgroundPosition: "50%",
                      }
                    : {}
                }
              >
                {findValuesObject(currentElement)}
              </Row>
            );
          }
        } else {
          return (
            <React.Fragment key={index}>
              {renderContent(currentElement)}
            </React.Fragment>
          );
        }
      }
    });
  };

  return (
    <>
      {type === "ns_base_2Cols" ||
      type === "ns_base_3Cols" ||
      type === "ns_base_4Cols" ||
      type === "ns_base_6Cols"
        ? pageData?.map(({ contentElements }, index) => {
            let col_lg = `width_column_lg_${index + 1}`;
            let col_md = `width_column_md_${index + 1}`;
            let col_sm = `width_column_sm_${index + 1}`;
            let col_xl = `width_column_xl_${index + 1}`;
            let col_xxl = `width_column_xxl_${index + 1}`;

            let offset_lg = `offset_column_lg_${index + 1}`;
            let offset_md = `offset_column_md_${index + 1}`;
            let offset_sm = `offset_column_sm_${index + 1}`;
            let offset_xl = `offset_column_xl_${index + 1}`;
            let offset_xxl = `offset_column_xxl_${index + 1}`;
            return (
              <div
                key={index}
                className={`col-layout ${
                  settings && settings[`${col_lg}`] ? settings[`${col_lg}`] : ""
                } ${
                  settings && settings[`${col_md}`] ? settings[`${col_md}`] : ""
                } ${
                  settings && settings[`${col_sm}`] ? settings[`${col_sm}`] : ""
                } ${
                  settings && settings[`${col_xl}`] ? settings[`${col_xl}`] : ""
                } ${
                  settings && settings[`${col_xxl}`]
                    ? settings[`${col_xxl}`]
                    : ""
                } ${
                  settings && settings[`${offset_lg}`]
                    ? settings[`${offset_lg}`]
                    : ""
                } ${
                  settings && settings[`${offset_md}`]
                    ? settings[`${offset_md}`]
                    : ""
                } ${
                  settings && settings[`${offset_sm}`]
                    ? settings[`${offset_sm}`]
                    : ""
                } ${
                  settings && settings[`${offset_xl}`]
                    ? settings[`${offset_xl}`]
                    : ""
                } ${
                  settings && settings[`${offset_xxl}`]
                    ? settings[`${offset_xxl}`]
                    : ""
                } `}
              >
                {contentElements.length > 0
                  ? renderElements(contentElements)
                  : ""}
              </div>
            );
          })
        : pageData?.map(({ contentElements }, index) => {
            return (
              <React.Fragment key={index}>
                {contentElements.length > 0
                  ? renderElements(contentElements)
                  : ""}
              </React.Fragment>
            );
          })}
    </>
  );
};
export default RenderComponents;
