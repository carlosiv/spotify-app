import { currentTrackIdState, isPlayingState } from "@atoms/songAtom";
import useSpotify from "@hooks/useSpotify";
import { formatTime } from "@utils/time.util";
import Image from "next/image";
import React from "react";
import { useRecoilState } from "recoil";
import noImage from "../public/no-image.jpg";

type SongProps = {
  track: SpotifyApi.TrackObjectFull;
  order: number;
};

function Song({ track, order }: SongProps) {
  const { name, album, artists, duration_ms, id, uri } = track;
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const spotifyApi = useSpotify();
  const songImage = album ? album.images[0].url : noImage;

  function playSong() {
    setCurrentTrackId(id);
    setIsPlaying(true);
    spotifyApi.play({ uris: [uri] });
  }

  function renderAlbumImage() {
    return (
      album && (
        <Image src={songImage} alt="album-image" width={40} height={40} />
      )
    );
  }

  return (
    <div
      className="grid grid-cols-2 py-4 px-5 hover:bg-gray-900 rounded-lg"
      onClick={playSong}
    >
      <div className="flex items-center space-x-4">
        <p className="pr-2">{order + 1}</p>
        {renderAlbumImage()}
        <div>
          <p className="w-36 lg:w-64 truncate">{name}</p>
          <p className="w-40">
            {artists.map((artist, index) => {
              let space: string;

              artists.length === index + 1 ? (space = " ") : (space = ", ");
              return artist.name + space;
            })}
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between ml-auto md:ml-0">
        <p className="w-40 hidden md:inline">{album.name}</p>
        <p>{formatTime(duration_ms)}</p>
      </div>
    </div>
  );
}

export default Song;
