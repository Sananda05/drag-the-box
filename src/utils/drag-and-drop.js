export const handleDragWrapper = (e, wrapperRef) => {
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

export const handleDragBox = (
  e,
  boxRef,
  wrapperRef,
  setIsvisible,
  setBoxPosition
) => {
  e.preventDefault();
  setIsvisible(false);

  let offsetX, offsetY;

  offsetX = e.clientX - boxRef.current.getBoundingClientRect().left;
  offsetY = e.clientY - boxRef.current.getBoundingClientRect().top;

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

  document.addEventListener("mousemove", handleDragMove);
  document.addEventListener("mouseup", handleDragEnd);
};
