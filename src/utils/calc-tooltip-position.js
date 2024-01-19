export const calculateTopPosition = (
  boxRef,
  selectedOption,
  boxPosition,
  tooltipPosition
) => {
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

export const calculateLeftPosition = (
  boxRef,
  selectedOption,
  boxPosition,
  tooltipPosition
) => {
  const boxRight = boxRef?.current?.getBoundingClientRect()?.right || 0;
  const boxLeft = boxRef?.current?.getBoundingClientRect()?.left || 0;

  if (selectedOption === "right") {
    return boxPosition.x >= 0 && boxPosition.x <= 470
      ? tooltipPosition.x + boxRight + 20
      : tooltipPosition.x + boxRight - 250;
  } else if (selectedOption === "left") {
    return boxPosition.x <= 100
      ? tooltipPosition.x + boxRight + 20
      : tooltipPosition.x + boxRight - 250;
  }
  return tooltipPosition.x + boxLeft + 5;
};
