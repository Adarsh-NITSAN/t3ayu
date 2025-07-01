import Header from "./Heading";

const Table = ({ data, spaceAfter, spaceBefore, layoutType, elementType }) => {
  const { bodytext, tableClass } = data;
  return (
    <Header
      data={data}
      layoutType={layoutType}
      elementType={elementType}
      spaceBefore={spaceBefore}
      spaceAfter={spaceAfter}
    >
      <div className="table-responsive">
        <table
          className={`table ${
            tableClass
              ? tableClass !== "borderless"
                ? `table-bordered table-${tableClass}`
                : `table-${tableClass}`
              : ""
          }`}
        >
          <thead>
            <tr>
              {bodytext[0].map((heading, index) => {
                return <th key={heading + index}>{heading}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {bodytext
              .map((item, index) => {
                return (
                  <tr key={index}>
                    {item.map((data, index) => {
                      return <td key={index}>{data}</td>;
                    })}
                  </tr>
                );
              })
              .slice(1)}
          </tbody>
        </table>
      </div>
    </Header>
  );
};
export default Table;
