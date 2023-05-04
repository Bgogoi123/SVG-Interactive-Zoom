import * as d3 from "d3";
import { TPanningEvent, TSVGCoordinates, TSVGDimensions } from "../../types";

//get svg canvas
export function getSVGCanvas({
  svgAreaRef,
  setSVGCanvas,
}: {
  svgAreaRef: React.RefObject<SVGSVGElement>;
  setSVGCanvas: (
    value: React.SetStateAction<
      d3.Selection<SVGSVGElement | null, unknown, null, undefined> | undefined
    >
  ) => void;
}) {
  const svgArea = d3.select(svgAreaRef.current);
  setSVGCanvas(svgArea);
}

// pointer functions
export function onPointerDown({
  event,
  setIsPointerDown,
  setPointerOrigin,
}: {
  event: TPanningEvent;
  setIsPointerDown: (value: React.SetStateAction<boolean>) => void;
  setPointerOrigin: (value: React.SetStateAction<TSVGCoordinates>) => void;
}) {
  d3.select(event.target as HTMLElement).attr(
    "style",
    `cursor: grabbing; 
     border: 2px solid silver; 
     border-radius: 5px; 
     background-color: #d6d6d6`
  );

  setIsPointerDown(true);
  setPointerOrigin({
    x: event.clientX,
    y: event.clientY,
  });
}

export function onPointerMove({
  event,
  isPointerDown,
  viewBox,
  pointerOrigin,
  ratio,
  setNewViewBox,
}: {
  event: TPanningEvent;
  isPointerDown: boolean;
  viewBox: TSVGDimensions;
  pointerOrigin: TSVGCoordinates;
  ratio: number;
  setNewViewBox: (value: React.SetStateAction<TSVGCoordinates>) => void;
}) {
  // Prevent user to do a selection on the page:
  event.preventDefault();

  // Only run this function if the pointer is down, else return
  if (!isPointerDown) {
    return;
  }

  setNewViewBox({
    x: viewBox.x - (event.clientX - pointerOrigin.x) * ratio,
    y: viewBox.y - (event.clientY - pointerOrigin.y) * ratio,
  });
}

export function onPointerUp({
  event,
  setIsPointerDown,
  setViewBox,
  newViewBox,
}: {
  event: TPanningEvent;
  setIsPointerDown: (value: React.SetStateAction<boolean>) => void;
  setViewBox: (value: React.SetStateAction<TSVGDimensions>) => void;
  newViewBox: TSVGCoordinates;
}) {
  d3.select(event.target as HTMLElement).attr(
    "style",
    `cursor: grab;
     border: 2px solid silver; 
     border-radius: 5px;
     background-color: #d6d6d6`
  );

  setIsPointerDown(false);
  setViewBox((prev) => {
    return {
      height: prev.height,
      width: prev.width,
      x: newViewBox.x,
      y: newViewBox.y,
    };
  });
}
