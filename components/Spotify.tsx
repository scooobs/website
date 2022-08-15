import React from "react";
import { useLanyard } from "use-lanyard";
import { DISCORD_ID } from "../data/const";
import { ImageTooltip } from "./ImageTooltip";

export const Spotify = () => {
  const { data: lanyard } = useLanyard(DISCORD_ID, {
    refreshInterval: 3 * 60 * 1000,
  });

  if (!lanyard) {
    return null;
  }

  const listening = lanyard.listening_to_spotify;

  if (!listening) {
    return (
      <p className="opacity-70 text-sm">
        Conal is not currently listening to anything.
      </p>
    );
  } else {
    const { song, artist, track_id, album_art_url } = lanyard.spotify;

    return (
      <p className=" italic text-sm ">
        <a
          target={"_blank"}
          href={`https://open.spotify.com/track/${track_id}`}
          className="opacity-70 underline decoration-pink-700 hover:font-medium"
          rel="noreferrer"
        >{`${song}`}</a>

        <span className="opacity-70">{" by "}</span>
        <ImageTooltip src={album_art_url} direction="top" size={150}>
          <span className="hover:cursor-pointer underline decoration-pink-500 opacity-70 not-italic">
            {artist}
          </span>
        </ImageTooltip>
      </p>
    );
  }

  return null;
};
