import { Direction } from "../components/ImageTooltip";

const GAP = 5;

export const calcTooltipPosition = (
  child: HTMLElement,
  tooltip: HTMLElement,
  direction: Direction
) => {
  const {
    top: childTop,
    left: childLeft,
    height: childHeight,
    width: childWidth,
  } = child.getBoundingClientRect();
  const { width: tooltipWidth, height: tooltipHeight } =
    tooltip.getBoundingClientRect();

  let baseLeft = childLeft;
  let baseTop = childTop;


  switch (direction) {
    case "top": {
      baseLeft = baseLeft + childWidth / 2 - tooltipWidth / 2;
      baseTop = baseTop - tooltipHeight - GAP;
      break;
    }
    case "bottom": {
      baseLeft = baseLeft + childWidth / 2 - tooltipWidth / 2;
      baseTop = baseTop + childHeight + GAP;
      break;
    }
    default: {
      console.error("Bad direction supplied");
      break;
    }
  }

  return {
    left: baseLeft,
    top: baseTop,
  };
};
