export type TSVGControllersProps = {
  zoomIn(): void;
  zoomOut(): void;
  resetAll(): void;
};

export type TPanningEvent = PointerEvent | MouseEvent;
export type TSVGCoordinates = { x: number; y: number };
export type TSVGDimensions = TSVGCoordinates & {
  width: number;
  height: number;
};
