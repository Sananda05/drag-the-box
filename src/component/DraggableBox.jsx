import { useRef, useState } from "react";
import Tooltip from "./Tooltip";

import "./component.css";

const DraggableBox = ({ wrapperRef }) => {
  const [isHovered, setIsHovered] = useState(false);

  const boxRef = useRef(null);
  const tooltipRef = useRef(null);

  const [isVisible, setIsvisible] = useState(false);

  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [boxPosition, setBoxPosition] = useState({ x: 0, y: 0 });

  let offsetX, offsetY;

  const handleDragStart = (e) => {
    e.preventDefault();
    setIsvisible(false);

    offsetX = e.clientX - boxRef.current.getBoundingClientRect().left;
    offsetY = e.clientY - boxRef.current.getBoundingClientRect().top;

    document.addEventListener("mousemove", handleDragMove);
    document.addEventListener("mouseup", handleDragEnd);
  };

  const handleDragMove = (e) => {
    e.preventDefault();
    setIsvisible(false);

    const wrapperRect = wrapperRef.current.getBoundingClientRect(null);
    const boxRect = boxRef.current.getBoundingClientRect(null);

    if (boxRef.current && wrapperRef.current) {
      let x = e.clientX - offsetX - wrapperRect.left;
      let y = e.clientY - offsetY - wrapperRect.top;

      x = Math.max(0, Math.min(wrapperRect.width - boxRect.width, x));
      y = Math.max(0, Math.min(wrapperRect.height - boxRect.height, y));

      boxRef.current.style.left = x + "px";
      boxRef.current.style.top = y + "px";

      setBoxPosition({ x: x, y: y });
    }
  };

  const handleDragEnd = () => {
    document.removeEventListener("mousemove", handleDragMove);
    document.removeEventListener("mouseup", handleDragEnd);
  };

  const handleBoxHover = () => {
    setIsHovered(true);
    setIsvisible(true);
  };

  const handleBoxLeave = () => {
    setIsHovered(false);
  };

  const tooltipStyle = {
    top: `${
      boxPosition.y >= 0 && boxPosition.y <= 60
        ? tooltipPosition.y +
          (boxRef?.current?.getBoundingClientRect()?.top || 0) +
          100
        : tooltipPosition.y +
          (boxRef?.current?.getBoundingClientRect()?.top || 0) -
          100
    }px`,
    left: `${
      tooltipPosition.x +
      (boxRef?.current?.getBoundingClientRect()?.left + 10 || 0)
    }px`,
    display: isVisible ? "block" : "none",
  };

  return (
    <div style={{ position: "", top: 0, left: 0 }}>
      <div
        ref={boxRef}
        style={{
          position: "absolute",
          height: "100px",
          width: "200px",
          backgroundColor: "rgb(132, 206, 229)",
          border: "none",
          borderRadius: "5px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          color: "white",
          fontWeight: "bold",
          top: "0",
          left: "0",
        }}
        onMouseDown={handleDragStart}
        onMouseEnter={handleBoxHover}
        onMouseLeave={handleBoxLeave}
      >
        Drag the box
      </div>

      {isHovered && (
        <div ref={tooltipRef}>
          <Tooltip wrapperRef={wrapperRef} tooltipStyle={tooltipStyle} />
        </div>
      )}
    </div>
  );
};

export default DraggableBox;
