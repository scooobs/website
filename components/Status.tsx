import { useLanyard } from "use-lanyard";
import { DISCORD_ID } from "../data/const";

export const Status = () => {
  const { data: lanyard } = useLanyard(DISCORD_ID);

  if (!lanyard) {
    return null;
  }

  const online = lanyard.discord_status === "online";

  if (online) {
    return (
      <div className="flex opacity-100 bg-opacity-100">
        <div
          className={`absolute inline-flex h-1 w-1 rounded-full animate-ping bg-green-500`}
        />
        <div className="relative inline-flex rounded-full h-1 w-1 bg-green-600" />
      </div>
    );
  } else {
    return <div className={`h-1 w-1 rounded-full bg-red-600`}></div>;
  }
};
