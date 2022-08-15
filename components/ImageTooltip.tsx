import React, {
  Children,
  cloneElement,
  useEffect,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import { createPortal } from "react-dom";
import { calcTooltipPosition } from "../utils/calc";

export type Direction = "top" | "bottom";

type ImageTooltipProps = {
  children: JSX.Element;
  size: number;
  src: string;
  alt?: string;
  direction?: Direction;
};

// Clone the element to attach our own ref
// Create portal to attach the tooltip to a DOM Node outside of the heirachy of the child.

export const ImageTooltip = ({
  children,
  src,
  size,
  alt = "",
  direction = "bottom",
}: ImageTooltipProps) => {
  const baseChildElement = Children.only(children);
  const childRef = useRef<HTMLElement | null>(null);
  const imageTooltipRef = useRef<HTMLDivElement | null>(null);

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const childElement = childRef.current;
    if (!childElement) {
      return;
    }

    const handleMouseOver = () => {
      setVisible(true);

      const imageTooltipElement = imageTooltipRef.current;
      if (!imageTooltipElement) {
        return;
      }

      const { left, top } = calcTooltipPosition(
        childElement,
        imageTooltipElement,
        direction
      );

      imageTooltipElement.style.left = `${left.toString()}px`;
      imageTooltipElement.style.top = `${top.toString()}px`;

      // Have to hard code this otherwise things aren't inherited correctly
      imageTooltipElement.style.position = "absolute";
      imageTooltipElement.style.background = "transparent";
    };

    const handleMouseLeave = () => {
      setTimeout(() => {
        setVisible(false);
      }, 200);

      const imageTooltipElement = imageTooltipRef.current;
      if (!imageTooltipElement) {
        return;
      }

      imageTooltipElement.style.transition = "all";
      imageTooltipElement.style.transitionDuration = "200ms";
      imageTooltipElement.style.opacity = "0";
    };

    childElement.addEventListener("mouseenter", handleMouseOver);
    childElement.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      childElement.removeEventListener("mouseover", handleMouseOver);
      childElement.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [childRef, imageTooltipRef, direction]);

  return (
    <>
      {cloneElement(baseChildElement, { ref: childRef })}
      {visible &&
        typeof window !== "undefined" &&
        createPortal(
          <div className="absolute" ref={imageTooltipRef}>
            <Image
              className="inline-flex rounded-md m-0"
              src={src}
              width={size}
              height={size}
              alt={alt}
            />
          </div>,
          document.getElementById("body")
        )}
    </>
  );
};
