export const handleResizeWrapper = (e, direction, wrapperRef) => {
  e.preventDefault();

  const handleMouseMove = (e) => {
    if (direction === "right") {
      wrapperRef.current.style.width =
        e.clientX - wrapperRef.current.getBoundingClientRect().left + "px";
    } else if (direction === "bottom") {
      wrapperRef.current.style.height =
        e.clientY - wrapperRef.current.getBoundingClientRect().top + "px";
    }
  };

  const handleMouseUp = () => {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  document.addEventListener("mousemove", handleMouseMove);
  document.addEventListener("mouseup", handleMouseUp);
};
