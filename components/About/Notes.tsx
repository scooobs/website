import { Note, User } from "@prisma/client";
import { FaPenNib } from "react-icons/fa";
import React, { useState } from "react";
import useSWR, { useSWRConfig } from "swr";
import { AnimatePresence, motion } from "framer-motion";
import { signIn, useSession } from "next-auth/react";

interface Props {
  className?: string;
}

type GetNote = (Note & {
  user: User;
})[];

export const Notes = ({ className = "" }: Props) => {
  const { mutate } = useSWRConfig();
  const [error, setError] = useState<string | null>(null);
  const [warning, setWarning] = useState<string | null>(null);
  const { status } = useSession();
  const { data: notes } = useSWR<GetNote>("/api/get-notes");

  const handleSign = async () => {
    if (status === "loading") {
      setError(null);
      setWarning("Session is loading");
      return;
    }
    if (status == "unauthenticated") {
      setError("Login");
      setWarning(null);
      return;
    }

    await fetch("/api/mark")
      .then((d) => d.json())
      .then((j) => {
        if (j.error) {
          setError(j.error);
        }
        if (j.warning) {
          setWarning(j.warning);
          setTimeout(() => {
            setWarning(null);
          }, 1000);
        }
      });

    await mutate("/api/get-notes");
  };

  return (
    <div className={className}>
      <div className="mb-4">
        <div
          onClick={handleSign}
          className="flex flex-row gap-x-2 items-center  max-w-min hover:cursor-pointer"
        >
          <p className="whitespace-nowrap font-semibold ">Leave Your Mark</p>
          <FaPenNib />
        </div>
        <AnimatePresence mode="wait">
          {error && (
            <motion.div
              key="Notes Error"
              initial={{ y: -5, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="hover:cursor-pointer text-xs text-red-500 underline"
              onClick={(e) => {
                e.preventDefault();
                signIn();
              }}
            >
              {error}
            </motion.div>
          )}
          {warning && (
            <motion.div
              key="Notes Warning"
              initial={{ y: -5, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -5, opacity: 0 }}
              className="text-xs text-amber-500"
            >
              {warning}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: ".30", x: 0 }}
          className="flex flex-row flex-wrap gap-x-2 text-sm italic opacity-30"
        >
          {notes &&
            notes.map((note) => {
              let className = "";
              if (note.user.isAdmin) {
                className = "font-semibold";
              }
              return (
                <div key={note.id} className={className}>
                  {note.user.name}
                </div>
              );
            })}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
