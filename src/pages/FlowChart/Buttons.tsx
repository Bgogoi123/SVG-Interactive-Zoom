import { TFlowChartButtons } from "../../types";

const Buttons = ({ zoomIn, zoomOut, resetAll }: TFlowChartButtons) => {
  return (
    <div className="buttonsContainer">
      <button
        className="zoomButtons"
        onClick={() => resetAll()}
        title="Reset All"
      >
        Reset All
      </button>
      <button className="zoomButtons" onClick={zoomIn} title="Zoom In">
        +
      </button>
      <button className="zoomButtons" onClick={zoomOut} title="Zoom Out">
        -
      </button>
    </div>
  );
};

export default Buttons;
