import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";
import Rectangle from "../../components/SVGElements/Rectangle";
import Rhombus from "../../components/SVGElements/Rhombus";
import { INIT_COORDS, SVGHRIGHT, SVGWIDTH } from "../../constants";
import { TSVGCoordinates, TSVGDimensions } from "../../types";
import Buttons from "./Buttons";
import {
  getSVGCanvas,
  onPointerDown,
  onPointerMove,
  onPointerUp,
} from "./functions";
import "./styles.css";

const FlowChart = () => {
  const svgAreaRef = useRef<SVGSVGElement>(null);
  const [SVGCanvas, setSVGCanvas] =
    useState<d3.Selection<SVGSVGElement | null, unknown, null, undefined>>();
  const [zoomValue, setZoomValue] = useState<number>(1);

  const [isPannable, setIsPannable] = useState<boolean>(false);
  const [ratio, setRatio] = useState<number>(0);
  const [isPointerDown, setIsPointerDown] = useState<boolean>(false);
  const [pointerOrigin, setPointerOrigin] =
    useState<TSVGCoordinates>(INIT_COORDS);

  const [viewBox, setViewBox] = useState<TSVGDimensions>({
    x: 0,
    y: 0,
    width: 400,
    height: 400,
  });

  const [newViewBox, setNewViewBox] = useState<TSVGCoordinates>({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    getSVGCanvas({ svgAreaRef, setSVGCanvas });
  }, []);

  useEffect(() => {
    if (SVGCanvas !== undefined && SVGCanvas !== null) {
      SVGCanvas.on("click", togglePan);
    }
  }, [SVGCanvas]);

  useEffect(() => {
    if (svgAreaRef.current !== null) {
      const svgAreaWidth = svgAreaRef.current.width.baseVal.value;

      setRatio(viewBox.width / svgAreaWidth);
      window.addEventListener("resize", function () {
        setRatio(viewBox.width / svgAreaWidth);
      });
    }
  }, [SVGCanvas, viewBox, ratio]);

  useEffect(() => {
    d3.select("g#container").attr("transform", `scale(${zoomValue})`);
  }, [zoomValue]);

  useEffect(() => {
    enableEvents();
  }, [isPannable, viewBox, newViewBox, pointerOrigin]);

  useEffect(() => {
    let viewBoxString = `${newViewBox.x} ${newViewBox.y} ${viewBox.width} ${viewBox.height}`;
    if (SVGCanvas != undefined) {
      SVGCanvas.attr("viewBox", viewBoxString);
    }
  }, [newViewBox]);

  function togglePan() {
    setIsPannable((prev) => {
      return !prev;
    });
  }

  function enableEvents() {
    if (SVGCanvas !== undefined) {
      if (window.PointerEvent) {
        SVGCanvas.on("pointerdown", (event) =>
          onPointerDown({ event, setIsPointerDown, setPointerOrigin })
        );
        SVGCanvas.on("pointerup", (event) =>
          onPointerUp({ event, setIsPointerDown, setViewBox, newViewBox })
        );
        SVGCanvas.on("pointerleave", (event) =>
          onPointerUp({ event, setIsPointerDown, setViewBox, newViewBox })
        );
        SVGCanvas.on("pointermove", (event) =>
          onPointerMove({
            event,
            isPointerDown,
            viewBox,
            pointerOrigin,
            ratio,
            setNewViewBox,
          })
        );
      }
    }
  }

  // button functions
  function zoomIn() {
    setZoomValue((prev) => prev + 0.3);
  }
  function zoomOut() {
    if (zoomValue - 1 > 0) {
      setZoomValue((prev) => prev - 0.3);
    }
  }
  function resetAll() {
    const svg = d3.select(svgAreaRef.current);
    svg.attr("viewBox", "0 0 400 400");
    setZoomValue(1);
  }

  return (
    <div>
      <Buttons resetAll={resetAll} zoomIn={zoomIn} zoomOut={zoomOut} />
      <svg
        id="svgarea"
        ref={svgAreaRef}
        width={SVGWIDTH}
        height={SVGHRIGHT}
        viewBox="0 0 400 400"
        style={{
          border: "2px solid silver",
          borderRadius: "5px",
          cursor: "grab",
        }}
      >
        <g id="container">
          <Rectangle
            x="100"
            y="10"
            width="250"
            height="50"
            textData="300 CC Obtain .. some  text"
          />

          <Rectangle
            x="-200"
            y="100"
            width="200"
            height="50"
            textData="Perform Bladder Scan"
          />

          <Rhombus
            x="50"
            y="20"
            width="100"
            height="100"
            textContent="SOme tetx content"
          />
        </g>
      </svg>
    </div>
  );
};

export default FlowChart;
