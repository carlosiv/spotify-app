import { useEffect, useState } from "react";
import {
  HiOutlineHome,
  HiOutlineLibrary,
  HiOutlineSearch,
  HiOutlinePlusCircle,
  HiOutlineHeart,
  HiOutlineRss,
} from "react-icons/hi";
import { useSession } from "next-auth/react";
import useSpotify from "@hooks/useSpotify";
import { useRecoilState } from "recoil";
import { playlistIdState } from "@atoms/playlistAtoms";

export default function Sidebar() {
  const { data: session, status } = useSession();
  const [playlists, setPlaylists] = useState<
    SpotifyApi.PlaylistObjectSimplified[] | null
  >([]);
  const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);
  const spotifyApi = useSpotify();

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then((data) => {
        setPlaylists(data.body.items);
      });
    }
  }, [session, spotifyApi]);

  function renderPlaylist() {
    return playlists?.map((playlist) => {
      return (
        <p
          onClick={() => setPlaylistId(playlist.id)}
          className="cursor-pointer hover:text-white"
          key={playlist.id}
        >
          {playlist.name}
        </p>
      );
    });
  }
  return (
    <div className="text-gray-500 p-5 pb-36 border-r text-xs lg:text-sm border-gray-900 overflow-y-scroll scrollbar-hide h-screen sm:max-w-[12remz] lg:max-w-[15rem] hidden md:inline-flex">
      <div className="space-y-4">
        <button className="flex items-center space-x-2 hover:text-white">
          <HiOutlineHome className="w-5 h-5" />
          <p>Home</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <HiOutlineSearch className="w-5 h-5" />
          <p>Search</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <HiOutlineLibrary className="w-5 h-5" />
          <p>Library</p>
        </button>
        <hr className="border-t-[0.1px] border-gray-900" />
        <button className="flex items-center space-x-2 hover:text-white">
          <HiOutlinePlusCircle className="w-5 h-5" />
          <p>Create Playlist</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <HiOutlineHeart className="w-5 h-5" />
          <p>Liked Songs</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <HiOutlineRss className="w-5 h-5" />
          <p>Your Episodes</p>
        </button>
        <hr className="border-t-[0.1px] border-gray-900" />

        {renderPlaylist()}
      </div>
    </div>
  );
}
