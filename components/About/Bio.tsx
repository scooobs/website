import { work } from "../../data/work";
import Hover from "../Hover";

type Props = {
  className?: string;
};

export const Bio = ({ className = "" }: Props) => {
  return (
    <div className={className}>
      <Hover hoverType="img" src="/images/me.png" underlineColour="light-blue">
        <p className="font-semibold">{"Conal O'Leary"}</p>
      </Hover>
      <p className="text-sm">Brisbane, Australia</p>
      <p className="opacity-70 italic text-sm">
        Forward Deployed Software Engineer,{" "}
        <a
          target="_blank"
          href="https://www.palantir.com/"
          className="not-italic underline decoration-indigo-500 hover:font-semibold"
          rel="noreferrer"
        >
          Palantir
        </a>
      </p>
    </div>
  );
};

export const Work = ({ className = "" }: Props) => {
  return (
    <div className={className}>
      <p className="font-semibold mb-4">Work</p>
      <div className="flex flex-row gap-8">
        {[...work].map((entry) => {
          let workplace = entry[0];
          let bio = entry[1][0];
          let date = entry[1][1];
          return (
            <div
              className="flex-grow basis-1 text-sm text-justify"
              key={workplace}
            >
              <p className="font-semibold">
                {workplace}
                <span className="pl-2 text-xs font-normal italic">{date}</span>
              </p>
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
      <div className="flex flex-row gap-8">
        <div className="flex-grow basis-1 text-sm text-justify">
          <p className="font-semibold">
            The University of Queensland
            <span className="pl-2 text-xs font-normal italic">2019-2022</span>
          </p>
          <p>
            Bachelor of Computer Science and Bachelor of Mathematics. Majoring
            in Machine Learning and Pure Mathematics respectively.
          </p>
        </div>

        <div className="flex-grow basis-1 text-sm text-justify"></div>
      </div>
    </div>
  );
};
