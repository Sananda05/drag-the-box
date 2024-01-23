export const handleResizeWrapper = (e, direction, wrapperRef, boxRef) => {
  e.preventDefault();

  const handleMouseMove = (e) => {
    const wrapperRect = wrapperRef?.current?.getBoundingClientRect();
    const innerBoxRect = boxRef?.current?.getBoundingClientRect();

    if (direction === "right") {
      wrapperRef.current.style.width =
        e.clientX - wrapperRef?.current?.getBoundingClientRect().left + "px";

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

      if (
        innerBoxRect.left - e.clientX >=
        wrapperRect.width - innerBoxRect.width
      ) {
        boxRef.current.style.left =
          wrapperRect.width - innerBoxRect.width + "px";
      }
      if (newWidth >= innerBoxRect.width) {
        wrapperRef.current.style.width = newWidth + "px";
        wrapperRef.current.style.left = `${e.clientX}px`;
      }
      if (wrapperRect.left === innerBoxRect.left) {
        const innerBoxLeft = wrapperRect.width - newWidth;
        boxRef.current.style.left = innerBoxLeft + "px";
      }
    } else if (direction === "up") {
      const newHeight = wrapperRect.bottom - e.clientY;

      if (
        innerBoxRect.top - e.clientY >=
        wrapperRect.height - innerBoxRect.height
      ) {
        boxRef.current.style.top =
          wrapperRect.height - innerBoxRect.height + "px";
      }
      if (newHeight >= innerBoxRect.height) {
        wrapperRef.current.style.height = newHeight + "px";
        wrapperRef.current.style.top = `${e.clientY}px`;

        if (wrapperRect.top === innerBoxRect.top) {
          const innerBoxTop = wrapperRect.height - newHeight;
          boxRef.current.style.top = innerBoxTop + "px";
        }
      }
    } else if (direction === "right-bottom") {
      wrapperRef.current.style.width =
        e.clientX - wrapperRef.current.getBoundingClientRect().left + "px";
      wrapperRef.current.style.height =
        e.clientY - wrapperRef.current.getBoundingClientRect().top + "px";

      if (wrapperRect.right <= innerBoxRect.right) {
        const innerBoxLeft = wrapperRect.width - innerBoxRect.width;

        boxRef.current.style.left = innerBoxLeft + "px";
      }
      if (wrapperRect.bottom <= innerBoxRect.bottom) {
        const innerBoxTop = wrapperRect.height - innerBoxRect.height;

        boxRef.current.style.top = innerBoxTop + "px";
      }
    } else {
      const newWidth = wrapperRect.right - e.clientX;
      const newHeight = wrapperRect.bottom - e.clientY;

      if (
        innerBoxRect.left - e.clientX >=
          wrapperRect.width - innerBoxRect.width ||
        innerBoxRect.top - e.clientY >= wrapperRect.height - innerBoxRect.height
      ) {
        boxRef.current.style.left =
          wrapperRect.width - innerBoxRect.width + "px";
        boxRef.current.style.top =
          wrapperRect.height - innerBoxRect.height + "px";
      }

      if (newHeight >= innerBoxRect.height && newWidth >= innerBoxRect.width) {
        wrapperRef.current.style.width = newWidth + "px";
        wrapperRef.current.style.left = `${e.clientX}px`;
        wrapperRef.current.style.height = newHeight + "px";
        wrapperRef.current.style.top = `${e.clientY}px`;
      }
    }
  };

  const handleMouseUp = () => {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  document.addEventListener("mousemove", handleMouseMove);
  document.addEventListener("mouseup", handleMouseUp);
};
