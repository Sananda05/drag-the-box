import { useRef, useState } from "react";
import Tooltip from "./Tooltip";

import "./component.css";

import dragIcon from "../assets/all-directions.png";

import { handleResizeWrapper } from "../utils/resize-wrapper";

const DraggableBox = ({ wrapperRef, selectedOption }) => {
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

  const handleMouseDown = (e) => {
    e.preventDefault();

    const handleMouseMove = (e) => {
      wrapperRef.current.style.width =
        e.clientX - wrapperRef.current.getBoundingClientRect().left + "px";
      wrapperRef.current.style.height =
        e.clientY - wrapperRef.current.getBoundingClientRect().top + "px";
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
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

  const handleDragWrapper = (e) => {
    e.preventDefault();

    if (wrapperRef.current) {
      const wrapperRect = wrapperRef.current.getBoundingClientRect();
      const offsetX = e.clientX - wrapperRect.left;
      const offsetY = e.clientY - wrapperRect.top;

      const handleMouseMove = (e) => {
        const x = e.clientX - offsetX;
        const y = e.clientY - offsetY;

        wrapperRef.current.style.left = `${x}px`;
        wrapperRef.current.style.top = `${y}px`;
      };

      const handleMouseUp = () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }
  };

  const calculateTopPosition = () => {
    const boxTop = boxRef?.current?.getBoundingClientRect()?.top || 0;
    const boxBottom = boxRef?.current?.getBoundingClientRect()?.bottom || 0;

    if (selectedOption === "top") {
      return boxPosition.y >= 0 && boxPosition.y <= 40
        ? tooltipPosition.y + boxTop + 80
        : tooltipPosition.y + boxTop - 50;
    } else if (selectedOption === "bottom") {
      return boxPosition.y >= 330
        ? tooltipPosition.y + boxBottom - 100
        : tooltipPosition.y + boxBottom + 20;
    }
    return tooltipPosition.y + boxTop + 15;
  };

  const calculateLeftPosition = () => {
    const boxRight = boxRef?.current?.getBoundingClientRect()?.right || 0;
    const boxLeft = boxRef?.current?.getBoundingClientRect()?.left || 0;

    if (selectedOption === "right") {
      return boxPosition.x >= 0 && boxPosition.x <= 470
        ? tooltipPosition.x + boxRight + 20
        : tooltipPosition.x + boxRight - 250;
    } else if (selectedOption === "left") {
      return boxPosition.x <= 50
        ? tooltipPosition.x + boxRight + 20
        : tooltipPosition.x + boxRight - 250;
    }
    return tooltipPosition.x + boxLeft + 5;
  };

  const tooltipStyle = {
    top: `${calculateTopPosition()}px`,
    left: `${calculateLeftPosition()}px`,
    display: isVisible ? "block" : "none",
  };

  return (
    <div style={{ position: "", top: 0, left: 0 }}>
      <img
        src={dragIcon}
        alt="drag"
        style={{
          height: "20px",
          width: "20px",
          position: "absolute",
          right: "5px",
          top: "5px",
        }}
        onMouseDown={handleDragWrapper}
      />
      <div
        className="resize-handle right"
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          bottom: 0,
          width: "5px",
          cursor: "e-resize",
        }}
        onMouseDown={(e) => handleResizeWrapper(e, "right", wrapperRef)}
      ></div>
      <div
        className="resize-handle bottom"
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: "5px",
          cursor: "s-resize",
        }}
        onMouseDown={(e) => handleResizeWrapper(e, "bottom", wrapperRef)}
      ></div>
      <div
        className="resize-handle"
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          cursor: "se-resize",
          backgroundColor: "pink",
          height: "20px",
          width: "20px",
        }}
        onMouseDown={handleMouseDown}
      ></div>
      <div
        ref={boxRef}
        style={{
          position: "absolute",
          height: "60px",
          width: "130px",
          backgroundColor: "rgb(132, 206, 229)",
          border: "none",
          borderRadius: "5px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          color: "white",
          fontWeight: "bold",
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
