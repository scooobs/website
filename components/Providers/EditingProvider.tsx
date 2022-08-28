import React from "react";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useEditingStore } from "../../stores/useEditingStore";

interface EditingProviderProps {
  children: React.ReactNode;
}

const notAuthorisedToast = () =>
  toast.warning("You're not allowed to do that!");

export const EditingProvider = ({ children }: EditingProviderProps) => {
  const { data } = useSession();
  const { editing, toggleEditing } = useEditingStore();
  const user = data?.user;

  /**
   * Allow users to enter EDIT MODE by pressing CMD + K
   */
  useEffect(() => {
    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (
        (event.metaKey && event.key == "k") ||
        (event.ctrlKey && event.key == "k")
      ) {
        if (!user) {
          notAuthorisedToast();

          return;
        }
        if (user.isAdmin) {
          if (!editing) {
            toast.success("Entered Edit Mode");
          } else {
            toast.success("Exited Edit Mode");
          }

          toggleEditing(editing);
          return;
        }
        notAuthorisedToast();

        return;
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [editing, toggleEditing, user]);

  return <>{children}</>;
};
