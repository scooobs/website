import { ReactNode } from "react";

type SocialProps = {
  icon: JSX.Element;
  handle: string;
  link?: string;
};

export const Social = ({ icon, handle, link = null }: SocialProps) => {
  return (
    <span className="flex flex-row gap-1 items-center">
      {icon}
      <span className="text-sm">
        {link ? (
          <a
            className="underline decoration-indigo-500 hover:font-medium"
            href={link}
            target="_blank"
            rel="noreferrer"
          >
            {handle}
          </a>
        ) : (
          handle
        )}
      </span>
    </span>
  );
};
