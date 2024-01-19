export const handleResizeWrapper = (e, direction, wrapperRef, boxRef) => {
  e.preventDefault();

  const handleMouseMove = (e) => {
    const wrapperRect = wrapperRef?.current?.getBoundingClientRect();
    const innerBoxRect = boxRef?.current?.getBoundingClientRect();

    if (direction === "right") {
      wrapperRef.current.style.width =
        e.clientX - wrapperRef?.current?.getBoundingClientRect().left + "px";

      console.log(wrapperRect, "and", innerBoxRect);

      if (wrapperRect.right <= innerBoxRect.right) {
        const innerBoxLeft = wrapperRect.width - innerBoxRect.width;

        boxRef.current.style.left = innerBoxLeft + "px";
      }
    } else if (direction === "bottom") {
      wrapperRef.current.style.height =
        e.clientY - wrapperRef?.current?.getBoundingClientRect().top + "px";

      if (wrapperRect.bottom <= innerBoxRect.bottom) {
        const innerBoxTop = wrapperRect.height - innerBoxRect.height;

        boxRef.current.style.top = innerBoxTop + "px";
      }
    } else if (direction === "left") {
      const newWidth = wrapperRect.right - e.clientX;
      if (newWidth >= innerBoxRect.right - wrapperRect.left) {
        wrapperRef.current.style.width = newWidth + "px";
        wrapperRef.current.style.left = `${e.clientX}px`;
      }
    } else if (direction === "up") {
      const newHeight = wrapperRect.bottom - e.clientY;
      if (newHeight >= innerBoxRect.bottom - wrapperRect.top) {
        wrapperRef.current.style.height = newHeight + "px";
        wrapperRef.current.style.top = `${e.clientY}px`;
      }
    } else {
      wrapperRef.current.style.width =
        e.clientX - wrapperRef.current.getBoundingClientRect().left + "px";
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
