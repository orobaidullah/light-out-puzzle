import "./Light.css";

const Light = ({ isLit, onClick }) => {
  const className = "light" + (isLit ? " light-on" : " light-off");
  return (
    <button
      className={className}
      onClick={onClick}
      aria-label={isLit ? "Light on" : "Light off"}
    />
  );
};

export default Light;
