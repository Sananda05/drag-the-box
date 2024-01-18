import ReactDOM from "react-dom";
import "./component.css";

const Tooltip = ({ wrapperRef, tooltipStyle }) => {
  return ReactDOM.createPortal(
    <div style={tooltipStyle} className="hoveredComponent">
      Tooltip
    </div>,
    wrapperRef.current
  );
};

export default Tooltip;
