import { useRef, useState } from "react";
import Tooltip from "./Tooltip";

import "./component.css";

import dragIcon from "../assets/all-directions.png";
import expandIcon from "../assets/expand-arrows.png";

import { handleResizeWrapper } from "../utils/resize-wrapper";
import { handleDragWrapper, handleDragBox } from "../utils/drag-and-drop";
import {
  calculateTopPosition,
  calculateLeftPosition,
} from "../utils/calc-tooltip-position";

const DraggableBox = ({ wrapperRef, selectedOption }) => {
  const [isHovered, setIsHovered] = useState(false);

  const boxRef = useRef(null);
  const tooltipRef = useRef(null);

  const [isVisible, setIsvisible] = useState(false);

  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [boxPosition, setBoxPosition] = useState({ x: 0, y: 0 });

  const handleBoxHover = () => {
    setIsHovered(true);
    setIsvisible(true);
  };

  const tooltipStyle = {
    top: `${calculateTopPosition(
      boxRef,
      selectedOption,
      boxPosition,
      tooltipPosition
    )}px`,
    left: `${calculateLeftPosition(
      boxRef,
      selectedOption,
      boxPosition,
      tooltipPosition
    )}px`,
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
        onMouseDown={(e) => handleDragWrapper(e, wrapperRef)}
      />
      <div
        className="resize-handler right"
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          bottom: 0,
          width: "5px",
          cursor: "e-resize",
        }}
        onMouseDown={(e) => handleResizeWrapper(e, "right", wrapperRef, boxRef)}
      ></div>
      <div
        className="resize-handle left"
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: "5px",
          cursor: "w-resize",
          height: "100%",
        }}
        onMouseDown={(e) => handleResizeWrapper(e, "left", wrapperRef, boxRef)}
      ></div>
      <div
        className="resize-handler bottom"
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: "5px",
          cursor: "s-resize",
        }}
        onMouseDown={(e) =>
          handleResizeWrapper(e, "bottom", wrapperRef, boxRef)
        }
      ></div>
      <div
        className="resize-handler up"
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          right: 0,
          height: "5px",
          cursor: "n-resize",
        }}
        onMouseDown={(e) => handleResizeWrapper(e, "up", wrapperRef, boxRef)}
      ></div>
      <div
        className="resize-handler"
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          height: "20px",
          width: "20px",
          cursor: "nw-resize",
        }}
        onMouseDown={(e) =>
          handleResizeWrapper(e, "left-top", wrapperRef, boxRef)
        }
      ></div>
      <img
        src={expandIcon}
        alt="expand"
        className="resize-handle"
        onMouseDown={(e) =>
          handleResizeWrapper(e, "right-bottom", wrapperRef, boxRef)
        }
      />
      <div
        ref={boxRef}
        className="inner_box"
        onMouseDown={(e) =>
          handleDragBox(e, boxRef, wrapperRef, setIsvisible, setBoxPosition)
        }
        onMouseEnter={handleBoxHover}
        onMouseLeave={() => setIsHovered(false)}
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
