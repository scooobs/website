import React from "react";
import { useLanyard } from "use-lanyard";
import { DISCORD_ID } from "../data/const";
import { ImageTooltip } from "./ImageTooltip";

const ErrorState = (
  <p className="opacity-70 text-sm">
    Conal is not currently listening to anything.
  </p>
);

export const Spotify = () => {
  const { data: lanyard } = useLanyard(DISCORD_ID, {
    refreshInterval: 3 * 60 * 1000,
  });

  if (!lanyard) {
    return ErrorState;
  }

  const listening = lanyard.listening_to_spotify;
  const data = lanyard.spotify;

  if (!listening || !data) {
    return ErrorState;
  }
  const { song, track_id, album_art_url, artist } = data;

  return (
    <p className=" italic text-sm ">
      <a
        target={"_blank"}
        href={`https://open.spotify.com/track/${track_id}`}
        className="opacity-70 underline decoration-pink-500 hover:font-medium"
        rel="noreferrer"
      >{`${song}`}</a>

      <span className="opacity-70">{" by "}</span>
      <ImageTooltip
        src={album_art_url}
        direction="top"
        size={150}
        animationProps={{
          transition: {
            ease: "easeOut",
            duration: 0.3,
          },
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 },
        }}
      >
        <span className="hover:cursor-pointer underline decoration-indigo-500 opacity-70 not-italic">
          {artist}
        </span>
      </ImageTooltip>
    </p>
  );
};
