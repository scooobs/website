import React from "react";
import { work } from "../../data/work";
import { Status } from "../Status";
import { FaDiscord, FaGithub, FaTwitter } from "react-icons/fa";
import { Social } from "../Social";
import { ImageTooltip } from "../ImageTooltip";
import { useEditingStore } from "../../stores/useEditingStore";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Biography } from "@prisma/client";
import Input from "../Input";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import useSWR from "swr";

type Props = {
  className?: string;
};

type BioProps = Props & {
  payload: Biography;
};
export interface IBio {
  location: string;
  job: string;
  companyURL: string;
}

const BioSchema = z.object({
  location: z.string().min(1),
  job: z.string().min(1),
  companyURL: z.string().url(),
});

const chooseProfilePicture = () => {
  let profPicture = "/images/me.png";
  if (Math.random() > 0.75) {
    profPicture = "/images/scooby.png";
  }
  return profPicture;
};

const onSubmit = async (data: IBio) => {
  const res = await fetch("/api/bio", {
    body: JSON.stringify(data),
    method: "POST",
  });
  if (res.ok) {
    toast.success("Sucessfully saved Biography");
  } else {
    toast.error("Error saving Biography");
  }
};

/**
 * TODO: Make this look nicer, animations are okay but the UI is bad.
 */
export const EditableBio = ({ payload, className = "" }: BioProps) => {
  const profPicture = chooseProfilePicture();
  const { control, handleSubmit } = useForm<IBio>({
    defaultValues: {
      companyURL: payload.companyURL,
      job: payload.job + ", " + payload.company,
      location: payload.currentLocation,
    },
    resolver: zodResolver(BioSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={className}>
        <ImageTooltip
          src={profPicture}
          size={150}
          animationProps={{
            transition: { ease: "backIn", duration: 0.3 },
            initial: { height: 0, opacity: 1 },
            animate: { height: 150, opacity: 1 },
            exit: { height: 0, opacity: 0 },
          }}
        >
          <p className="hover:cursor-pointer underline decoration-sky-500 inline-flex font-semibold whitespace-nowrap">
            {"Conal O'Leary"}
          </p>
        </ImageTooltip>
        <motion.div
          initial={{ y: -5, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -5, opacity: 0 }}
          className="flex flex-col"
        >
          <div className="flex flex-row gap-2 items-center">
            <Status />
            <Input
              control={control}
              name="location"
              placeholder={payload.currentLocation}
              className="text-sm border-0 outline-0 "
            />
          </div>
          <Input
            control={control}
            name="job"
            placeholder={payload.job + ", " + payload.company}
            className="  text-sm border-0 outline-0 italic "
          />
          <Input
            control={control}
            name="companyURL"
            placeholder={payload.companyURL}
            className="  text-sm border-0 outline-0 underline"
          />
          <div
            onClick={handleSubmit(onSubmit)}
            className="mt-4 text-sm underline font-bold cursor-pointer w-min"
          >
            SAVE
          </div>
        </motion.div>
      </div>
    </form>
  );
};

export const SkeletonBio = ({ className = "" }: Props) => {
  const profPicture = chooseProfilePicture();
  return (
    <div className={className}>
      <ImageTooltip
        src={profPicture}
        size={150}
        animationProps={{
          transition: { ease: "backIn", duration: 0.3 },
          initial: { height: 0, opacity: 1 },
          animate: { height: 150, opacity: 1 },
          exit: { height: 0, opacity: 0 },
        }}
      >
        <p className="hover:cursor-pointer underline decoration-sky-500 inline-flex font-semibold whitespace-nowrap">
          {"Conal O'Leary"}
        </p>
      </ImageTooltip>
      <motion.div
        initial={{ y: -10 }}
        animate={{ y: 0 }}
        exit={{ y: -10, opacity: 0 }}
      >
        <div className="flex flex-row mt-1 gap-2 items-center">
          <Status />
          <div className="bg-slate-300 animate-pulse w-24 h-4 rounded-full " />
        </div>
        <div className="animate-pulse bg-slate-300 w-60 h-4 rounded-full mt-1" />
      </motion.div>
    </div>
  );
};

export const Bio = ({ className = "" }: Props) => {
  const { data: payload } = useSWR<Biography>("/api/get-bio");
  const { editing } = useEditingStore();

  return (
    <AnimatePresence mode="wait">
      {!payload ? (
        <SkeletonBio key={"Skeleton BIO"} className={className} />
      ) : editing ? (
        <EditableBio
          key={"Editable BIO"}
          payload={payload}
          className={className}
        />
      ) : (
        <UneditableBio
          key={"Uneditable BIO"}
          className={className}
          payload={payload}
        />
      )}
      ;
    </AnimatePresence>
  );
};

export const UneditableBio = ({ payload, className = "" }: BioProps) => {
  const profPicture = chooseProfilePicture();

  return (
    <div className={className}>
      <ImageTooltip
        src={profPicture}
        size={150}
        animationProps={{
          transition: { ease: "backIn", duration: 0.3 },
          initial: { height: 0, opacity: 1 },
          animate: { height: 150, opacity: 1 },
          exit: { height: 0, opacity: 0 },
        }}
      >
        <p className="hover:cursor-pointer underline decoration-sky-500 inline-flex font-semibold whitespace-nowrap">
          {"Conal O'Leary"}
        </p>
      </ImageTooltip>
      <motion.div
        initial={{ y: 5, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 10, opacity: 0 }}
      >
        <div className="flex flex-row gap-2 items-center">
          <Status />
          <p className="whitespace-nowrap text-sm">{payload.currentLocation}</p>
        </div>
        <p className="opacity-70 italic text-sm">
          {payload.job},{" "}
          <a
            target="_blank"
            href={payload.companyURL}
            className="not-italic underline decoration-indigo-500 hover:font-semibold"
            rel="noreferrer"
          >
            {payload.company}
          </a>
        </p>
      </motion.div>
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
