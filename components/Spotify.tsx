import Image from "next/image";
import { useLanyard } from "use-lanyard";
import { DISCORD_ID } from "../data/const";
import Hover from "./Hover";

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
        <Hover
          hoverType="img"
          src={album_art_url}
          underlineColour="light-blue"
          direction="up"
        >
          <span className="opacity-70 not-italic">{artist}</span>
        </Hover>
      </p>
    );
  }

  return null;
};
