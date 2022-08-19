import React, {
  Children,
  cloneElement,
  useEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { AnimationProps } from "framer-motion";

import { calcTooltipPosition } from "../utils/calc";

export type Direction = "top" | "bottom";

type ImageTooltipProps = {
  animationProps?: AnimationProps;
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
  animationProps = null,
  alt = "",
  direction = "bottom",
}: ImageTooltipProps) => {
  const baseChildElement = Children.only(children);
  const childRef = useRef<HTMLElement>();
  const imageTooltipRef = useRef<HTMLDivElement>();
  const bodyRef = useRef<HTMLElement>();

  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Fixed hydration errors by only rendering the portal when the upper DOM has also been established
  useEffect(() => {
    bodyRef.current = document.getElementById("body");
    setMounted(true);
  }, []);

  // Render the component only when it is visible, this means it's ref is non null
  useEffect(() => {
    const childElement = childRef.current;
    if (!childElement) {
      return;
    }

    if (visible) {
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
    }
  }, [direction, visible]);

  // Add event listeners
  useEffect(() => {
    const childElement = childRef.current;
    if (!childElement) {
      return;
    }

    const handleMouseOver = () => {
      setVisible(true);
    };

    const handleMouseLeave = () => {
      setVisible(false);
    };

    childElement.addEventListener("mouseenter", handleMouseOver);
    childElement.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      childElement.removeEventListener("mouseover", handleMouseOver);
      childElement.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <>
      {cloneElement(baseChildElement, { ref: childRef })}
      {mounted &&
        createPortal(
          <div
            className="absolute drop-shadow-xl bg-transparent "
            ref={imageTooltipRef}
          >
            <AnimatePresence>
              {visible && (
                <motion.img
                  key={src}
                  {...animationProps}
                  className="inline-flex rounded-md m-0 "
                  src={src}
                  width={size}
                  height={size}
                  alt={alt}
                />
              )}
            </AnimatePresence>
          </div>,
          bodyRef.current
        )}
    </>
  );
};
