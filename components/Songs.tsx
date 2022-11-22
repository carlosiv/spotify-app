import React from "react";
import { useRecoilValue } from "recoil";
import { playlistState } from "@atoms/playlistAtoms";
import Song from "@components/Song";

function Songs() {
  const playlist = useRecoilValue(playlistState);
  return (
    <div className="p-8 flex flex-col space-y-1">
      {playlist &&
        playlist.tracks.items.map((track, index) => (
          <Song key={track.track!.id} track={track.track!} order={index} />
        ))}
    </div>
  );
}

export default Songs;
