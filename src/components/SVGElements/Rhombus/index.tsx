const Rhombus = ({
  x,
  y,
  width,
  height,
  textContent,
}: {
  x: string;
  y: string;
  width: string;
  height: string;
  textContent: string;
}) => {
  return (
    <g>
      <g className="rhombus">
        <rect
          x={x}
          y={y}
          rx="20"
          ry="20"
          width={width}
          height={height}
          fill="none"
          stroke="#000"
        ></rect>
      </g>
      <text
        x={parseInt(x) + 170}
        y={parseInt(y) + 120}
        textAnchor="middle"
        fill="#000"
        style={{
          fontSize: "15px",
        }}
      >
        {textContent}
      </text>
    </g>
  );
};

export default Rhombus;
