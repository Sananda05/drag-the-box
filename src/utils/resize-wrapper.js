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
      const newWidth = Math.max(
        innerBoxRect.width,
        wrapperRect.right - e.clientX
      );
      if (newWidth > innerBoxRect.width) {
        wrapperRef.current.style.width = newWidth + "px";
        wrapperRef.current.style.left = `${e.clientX}px`;
        if (innerBoxRect.left - e.clientX >= 0) {
          boxRef.current.style.left = innerBoxRect.left - e.clientX + "px";

          if (wrapperRect.left >= innerBoxRect.left) {
            const innerBoxright = newWidth - innerBoxRect.width;
            boxRef.current.style.right = innerBoxright + "px";
          }
        } else {
          boxRef.current.style.left = "0px";
        }
      }
    } else if (direction === "up") {
      const newHeight = Math.max(
        innerBoxRect.height,
        wrapperRect.bottom - e.clientY
      );

      if (newHeight > innerBoxRect.height) {
        wrapperRef.current.style.height = newHeight + "px";
        wrapperRef.current.style.top = `${e.clientY}px`;

        console.log(innerBoxRect, "and", wrapperRect);

        if (
          innerBoxRect.top - e.clientY >= 0 &&
          innerBoxRect.bottom < wrapperRect.bottom
        ) {
          boxRef.current.style.top = innerBoxRect.top - e.clientY + "px";

          if (wrapperRect.top > innerBoxRect.top) {
            const innerBoxTop = wrapperRect.height - newHeight;
            boxRef.current.style.top = innerBoxTop + "px";
          }
        } else {
          boxRef.current.style.top = "0px";
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
      const newWidth = Math.max(
        innerBoxRect.width,
        wrapperRect.right - e.clientX
      );
      const newHeight = Math.max(
        innerBoxRect.height,
        wrapperRect.bottom - e.clientY
      );

      if (newHeight > innerBoxRect.height && newWidth > innerBoxRect.width) {
        wrapperRef.current.style.width = newWidth + "px";
        wrapperRef.current.style.left = `${e.clientX}px`;
        wrapperRef.current.style.height = newHeight + "px";
        wrapperRef.current.style.top = `${e.clientY}px`;

        if (
          innerBoxRect.left - e.clientX >= 0 &&
          innerBoxRect.right < wrapperRect.right
        ) {
          boxRef.current.style.left = innerBoxRect.left - e.clientX + "px";

          if (wrapperRect.left >= innerBoxRect.left) {
            const innerBoxright = newWidth - innerBoxRect.width;
            boxRef.current.style.right = innerBoxright + "px";
          }
        } else {
          boxRef.current.style.left = "0px";
        }

        if (
          innerBoxRect.top - e.clientY >= 0 &&
          innerBoxRect.bottom < wrapperRect.bottom
        ) {
          boxRef.current.style.top = innerBoxRect.top - e.clientY + "px";

          if (wrapperRect.top >= innerBoxRect.top) {
            const innerBoxTop = wrapperRect.height - newHeight;
            boxRef.current.style.top = innerBoxTop + "px";
          }
        } else {
          boxRef.current.style.top = "0px";
        }
      }
    }
  };

  //   const changeInnerBoxPosition = (wrapperRect, newWidth) => {
  //     const innerBoxLeft = Math.max(
  //       0,
  //       (wrapperRect.width || 0) - (newWidth || 0)
  //     );
  //     console.log(innerBoxLeft, wrapperRect.width, newWidth);
  //     boxRef.current.style.left = innerBoxLeft + "px";
  //   };

  //   function throttle(func, delay) {
  //     let lastCallTime = 0;

  //     return function (...args) {
  //       const now = Date.now();

  //       if (now - lastCallTime >= delay) {
  //         func.apply(this, args);
  //         lastCallTime = now;
  //       }
  //     };
  //   }

  //   const throttledFunction = throttle(changeInnerBoxPosition, 300);
  //   document.addEventListener("mousemove", throttledFunction);

  const handleMouseUp = () => {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  document.addEventListener("mousemove", handleMouseMove);
  document.addEventListener("mouseup", handleMouseUp);
};
