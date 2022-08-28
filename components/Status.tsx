import React from "react";
import { useLanyard } from "use-lanyard";
import { DISCORD_ID } from "../data/const";

export const Status = () => {
  const { data: lanyard } = useLanyard(DISCORD_ID, {
    refreshInterval: 3 * 60 * 1000,
  });

  if (!lanyard) {
    return <div className={"h-1 w-1 rounded-full bg-gray-600"} />;
  }

  const online = lanyard.discord_status === "online";

  if (online) {
    return (
      <div title="Online" className="flex opacity-100 bg-opacity-100">
        <div
          className={
            "absolute inline-flex h-1 w-1 rounded-full animate-ping bg-green-500"
          }
        />
        <div className="relative inline-flex rounded-full h-1 w-1 bg-green-600" />
      </div>
    );
  } else {
    return (
      <div title="Offline" className={"h-1 w-1 rounded-full bg-red-600"} />
    );
  }
};
