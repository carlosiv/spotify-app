import { useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { HiChevronDoubleDown } from "react-icons/hi";
import { shuffle } from "lodash";
import { useRecoilState, useRecoilValue } from "recoil";
import { playlistIdState, playlistState } from "@atoms/playlistAtoms";
import useSpotify from "@hooks/useSpotify";
import Songs from "./Songs";
import Image from "next/image";
import noImage from "../public/no-image.jpg";

type Props = {};

const colors = [
  "from-indigo-500",
  "from-blue-500",
  "from-green-500",
  "from-red-500",
  "from-yellow-500",
  "from-pink-500",
  "from-purple-500",
];

export default function Center({}: Props) {
  const { data: session } = useSession();
  const [color, setColor] = useState<string>("from-purple-500");
  const playlistId = useRecoilValue(playlistIdState);
  const [playlist, setPlaylist] = useRecoilState(playlistState);
  const spotifyApi = useSpotify();

  const avatar = session ? session?.user?.image : noImage;
  const playlistImage = playlist ? playlist?.images[0].url : noImage;

  useEffect(() => {
    const color = shuffle(colors).pop() as string;
    setColor(color);
  }, [playlistId]);

  useEffect(() => {
    spotifyApi
      .getPlaylist(playlistId)
      .then((data) => setPlaylist(data.body))
      .catch((error) => console.log("Something went wrong", error));
  }, [spotifyApi, playlistId]);

  function signOutAccount() {
    signOut();
  }

  function renderAvatar() {
    return (
      <Image
        className="rounded-full border-2 border-red-500"
        src={avatar!}
        width={40}
        height={40}
        alt="user-image"
      />
    );
  }

  function renderPlaylistImage() {
    return (
      playlist && (
        <Image
          className="shadow-2xl"
          src={playlistImage}
          width={176}
          height={176}
          alt="user-image"
        />
      )
    );
  }

  return (
    <div className="text-white flex-grow h-screen overflow-y-scroll scrollbar-hide">
      <header className="absolute top-5 right-8">
        <div
          className="flex items-center bg-black space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2"
          onClick={signOutAccount}
        >
          {renderAvatar()}
          <h2>{session?.user?.name}</h2>
          <HiChevronDoubleDown className="h-5 w-5" />
        </div>
      </header>
      <section
        className={`flex items-center space-x-7 bg-gradient-to-b to-black ${color} h-80 text-white p-8`}
      >
        {renderPlaylistImage()}
        <div>
          <p>PLAYLIST</p>
          <h1 className="text-2xl md:text-3xl xl:text-5xl">{playlist?.name}</h1>
        </div>
      </section>
      <section>
        <div>
          <Songs />
        </div>
      </section>
    </div>
  );
}
