import { currentTrackIdState, isPlayingState } from "@atoms/songAtom";
import useSongInfo from "@hooks/useSongInfo";
import useSpotify from "@hooks/useSpotify";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { MdOutlineQueueMusic } from "react-icons/md";
import { SlVolumeOff, SlVolume2 } from "react-icons/sl";
import { HiPause, HiOutlineHeart, HiPlay } from "react-icons/hi";
import { BiSkipNext, BiSkipPrevious, BiRepeat } from "react-icons/bi";
import { TbArrowsShuffle, TbMicrophone2 } from "react-icons/tb";
import { useRecoilState } from "recoil";
import noImage from "../public/no-image.jpg";
import useDebounce from "@hooks/useDebounce";
import Image from "next/image";

export default function Player(): JSX.Element {
  const spotifyApi = useSpotify();
  const { data: session } = useSession();
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);
  const [isPlaying, setIslaying] = useRecoilState(isPlayingState);
  const [volume, setVolume] = useState(50);
  const [volumeBeforeMuted, setVolumeBeforeMuted] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const songInfo = useSongInfo();

  const songImage = songInfo ? songInfo?.album?.images?.[0].url : noImage;
  const deBouncedVolume = useDebounce(volume, 500);

  function fetchCurrentSong(): void {
    if (!songInfo) {
      spotifyApi
        .getMyCurrentPlayingTrack()
        .then((data) => {
          if (data.body) {
            setCurrentTrackId(data.body.item?.id!);
            spotifyApi
              .getMyCurrentPlaybackState()
              .then((data) => {
                setIslaying(data.body.is_playing);
                setVolume(50);
              })
              .then((error) =>
                console.log("Error fetching current playback state", error)
              );
          } else {
            console.log("Error fetching current playing track");
          }
        })
        .then((error) => console.log("Error:", error));
    }
  }

  useEffect(() => {
    if (spotifyApi.getAccessToken() && !currentTrackId) {
      fetchCurrentSong();
    }
  }, [currentTrackId, session, spotifyApi]);

  function handlePlayPause() {
    spotifyApi
      .getMyCurrentPlaybackState()
      .then((data) => {
        if (data.body && data.body.is_playing) {
          spotifyApi.pause();
          setIslaying(false);
        } else {
          spotifyApi.play();
          setIslaying(true);
        }
      })
      .catch((error) => console.error("handle play error"));
  }

  function handleMutePlayer() {
    if (isMuted) {
      setVolume(volumeBeforeMuted);
      setIsMuted(false);
      setVolumeBeforeMuted(0);
    } else {
      setVolumeBeforeMuted(volume);
      setVolume(0);
      setIsMuted(true);
    }
    spotifyApi.setVolume(volume).catch((error) => console.error(error));
  }

  function handleVolumeChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setVolume(Number(e.target.value));
  }

  useEffect(() => {
    spotifyApi
      .setVolume(deBouncedVolume)
      .catch((error) => console.error(error));
  }, [deBouncedVolume]);

  return (
    <div className="h-24 bg-gradient-to-b from-black to-gray-900 text-white grid grid-cols-3 text-xs md:text-base md:px-8">
      <div className="flex items-center space-x-4">
        <Image
          className="hidden md:inline"
          src={songImage}
          alt="song-image"
          width={40}
          height={40}
        />
        <div>
          <h3>{songInfo?.name}</h3>
          <p>{songInfo?.artists?.[0]?.name}</p>
        </div>
        <HiOutlineHeart className="button w-6 h-6" />
      </div>
      <div className="flex items-center justify-evenly">
        <TbArrowsShuffle className="button w-6 h-6" />
        <BiSkipPrevious className="button" />
        {isPlaying ? (
          <HiPause className="button w-12 h-12" onClick={handlePlayPause} />
        ) : (
          <HiPlay className="button w-12 h-12" onClick={handlePlayPause} />
        )}
        <BiSkipNext className="button" />
        <BiRepeat className="button w-6 h-6 rotate-180" />
      </div>
      <div className="flex items-center justify-end space-x-3 md:space-x-4 pr-5">
        <TbMicrophone2 />
        <MdOutlineQueueMusic />
        {isMuted ? (
          <SlVolumeOff onClick={handleMutePlayer} />
        ) : (
          <SlVolume2 onClick={handleMutePlayer} />
        )}

        <input
          type="range"
          value={volume}
          min={0}
          max={100}
          onChange={handleVolumeChange}
        />
      </div>
    </div>
  );
}
