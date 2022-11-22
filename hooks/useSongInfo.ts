import { currentTrackIdState, isPlayingState } from "@atoms/songAtom";
import { SongInfoType } from "../types/song-info.types";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import useSpotify from "./useSpotify";

function useSongInfo() {
  const spotifyApi = useSpotify();
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);
  const [songInfo, setSongInfo] = useState<SongInfoType | null>(null);

  useEffect(() => {
    async function fetchSongInfo() {
      if (currentTrackId) {
        const trackInfo: SongInfoType = await fetch(
          `https://api.spotify.com/v1/tracks/${currentTrackId}`,
          {
            headers: {
              Authorization: `Bearer ${spotifyApi.getAccessToken()}`,
            },
          }
        ).then((res) => res.json());

        setSongInfo(trackInfo);
      }
    }
    fetchSongInfo();
  }, [currentTrackId, spotifyApi]);

  return songInfo;
}

export default useSongInfo;
