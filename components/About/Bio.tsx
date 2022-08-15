import React from "react";
import { work } from "../../data/work";
import { Status } from "../Status";
import { FaDiscord, FaGithub, FaTwitter } from "react-icons/fa";
import { Social } from "../Social";
import { ImageTooltip } from "../ImageTooltip";

type Props = {
  className?: string;
};

// Scuffed random div underneath the Image ToolTip otherwise Portal renders the Image Tooltip in the next div...
export const Bio = ({ className = "" }: Props) => {
  return (
    <div className={className}>
      <ImageTooltip src="/images/me.png" size={150}>
        <p className="hover:cursor-pointer underline decoration-sky-500 inline-flex font-semibold whitespace-nowrap">
          {"Conal O'Leary"}
        </p>
      </ImageTooltip>

      <div className="flex flex-row gap-2 items-center">
        <Status />
        <p className="whitespace-nowrap text-sm">Brisbane, Australia</p>
      </div>
      <p className="opacity-70 italic text-sm">
        Mathematics Tutor,{" "}
        <a
          target="_blank"
          href="https://smp.uq.edu.au/profile/9972/conal-oleary"
          className="not-italic underline decoration-indigo-500 hover:font-semibold"
          rel="noreferrer"
        >
          The University of Queensland
        </a>
      </p>
    </div>
  );
};

export const Contact = ({ className = "" }: Props) => {
  return (
    <div className={className}>
      <p className="font-semibold mb-4">Contact</p>
      <div className="flex flex-row flex-wrap gap-x-8 gap-y-4">
        <Social
          icon={<FaTwitter />}
          handle="@notconal"
          link="https://twitter.com/notconal"
        />
        <Social
          icon={<FaGithub />}
          handle="@scooobs"
          link="https://github.com/scooobs"
        />
        <Social icon={<FaDiscord />} handle="conal#6229" />
      </div>
    </div>
  );
};

export const Work = ({ className = "" }: Props) => {
  return (
    <div className={className}>
      <p className="font-semibold mb-4">Employment</p>
      <div className="flex flex-col lg:flex-row gap-8">
        {[...work].map((entry) => {
          const workplace = entry[0];
          const bio = entry[1][0];
          const date = entry[1][1];
          return (
            <div className="flex-grow basis-1 text-sm" key={workplace}>
              <div className="flex flex-col pb-1 lg:items-center lg:flex-row lg:pb-0">
                <p className="font-semibold whitespace-nowrap">{workplace}</p>
                <p className="lg:pl-2 text-xs opacity-70 font-normal italic">
                  {date}
                </p>
              </div>
              <p>{bio}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const Education = ({ className = "" }: Props) => {
  return (
    <div className={className}>
      <p className="font-semibold mb-4">Education</p>
      <div className="flex md:flex-row gap-8">
        <div className="flex-grow   text-sm">
          <div className="flex flex-col pb-1 lg:flex-row lg:items-center lg:pb-0">
            <p className="font-semibold whitespace-nowrap">
              The University of Queensland
            </p>
            <p className="lg:pl-2 text-xs opacity-70 font-normal italic">
              2019-2022
            </p>
          </div>
          <p>
            Bachelor of Computer Science and Bachelor of Mathematics. Majoring
            in Machine Learning and Pure Mathematics respectively.
          </p>
        </div>
      </div>
    </div>
  );
};
