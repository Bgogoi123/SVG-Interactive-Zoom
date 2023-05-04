import "./buttonstyles.css";

const ControllerButton = ({
  text,
  title,
  onClickFunction,
}: {
  title: string;
  text: string;
  onClickFunction: () => {} | void;
}) => {
  return (
    <button
      className="controllerbutton"
      onClick={onClickFunction}
      title={title}
    >
      {text}
    </button>
  );
};

export default ControllerButton;
