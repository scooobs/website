import { ReactNode, useState } from "react";
import Image from "next/image";

type HoverTypes = "img" | "page";
type UnderlineColour = "light-blue" | "pink" | "purple" | "inherit";
type DirectionType = "up" | "down";

const ColourMap = new Map<string, string>([
  ["light-blue", "decoration-sky-500"],
  ["pink", "decoration-pink-500"],
  ["purple", "decoration-indigo-500"],
  ["inherit", "decoration-inherit"],
]);

type HoverProps = {
  children: ReactNode;
  hoverType: HoverTypes;
  src: string;
  underlineColour: UnderlineColour;
  direction?: DirectionType;
  alt?: string;
};

const Hover = ({
  children,
  src,
  hoverType = "page",
  underlineColour = "inherit",
  direction = "down",
  alt = null,
}: HoverProps) => {
  const [hover, setHover] = useState<boolean>(false);

  const position = direction === "down" ? "-bottom-[125px]" : "bottom-[25px]";

  const handleMouseOver = () => {
    setHover(true);
  };
  const handleMouseOut = () => {
    setTimeout(() => {
      setHover(false);
    }, 50);
  };
  // TODO: Fix that Images in this way have a fixed size of their relative container
  return (
    <div className="inline-flex relative transition-all">
      <div
        className={`inline-flex hover:cursor-pointer underline ${ColourMap.get(
          underlineColour
        )}`}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        {children}
      </div>
      <div
        className={
          hover
            ? `inline-flex absolute ${position} inset-x-0 z-50 transition ease-in duration-200`
            : "h-0 w-0  opacity-0"
        }
      >
        <div className="bg-white rounded-lg px-2 pt-2 drop-shadow-md align-middle">
          {hoverType == "img" ? (
            <Image
              className="rounded-md m-0 p-0"
              src={src}
              alt={alt}
              width={250}
              height={250}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Hover;
