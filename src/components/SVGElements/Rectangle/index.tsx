const Rectangle = ({
  x,
  y,
  width,
  height,
  textData,
}: {
  x: string;
  y: string;
  width: string;
  height: string;
  textData: string;
}) => {
  const leftLineX = (parseInt(x) + 10).toString();
  // const leftLineY1 = (parseInt(y) + 10).toString();
  // const leftLineY2 = (parseInt(y) + 40).toString();

  // const rightLineX = parseInt(x) + parseInt(width) - 10;
  // const rightLineY1 = (parseInt(y) + 10).toString();
  // const rightLineY2 = (parseInt(y) + 40).toString();

  return (
    <g>
      <rect
        width={width}
        height={height}
        x={x}
        y={y}
        rx="5"
        ry="5"
        fill="none"
        stroke="#000"
      ></rect>
      <text
        x={(parseInt(leftLineX) + 90).toString()}
        y={(parseInt(y) + 30).toString()}
        fill="#000"
        textAnchor="middle"
      >
        {textData}
      </text>

      {/* <line
        stroke="#000"
        x1={leftLineX}
        y1={leftLineY1}
        x2={leftLineX}
        y2={leftLineY2}
      ></line>
      <line
        stroke="#000"
        x1={rightLineX}
        y1={rightLineY1}
        x2={rightLineX}
        y2={rightLineY2}
      ></line> */}
    </g>
  );
};

export default Rectangle;
