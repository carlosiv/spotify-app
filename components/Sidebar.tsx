import React from "react";
import {
  HiOutlineHome,
  HiOutlineLibrary,
  HiOutlineSearch,
  HiOutlinePlusCircle,
  HiOutlineHeart,
  HiOutlineRss,
} from "react-icons/hi";
import { AiOutlinePoweroff } from "react-icons/ai";
import { signOut, useSession } from "next-auth/react";

export default function Sidebar() {
  const { data: session, status } = useSession();

  return (
    <div className="text-gray-500 p-5 border-r text-sm border-gray-900">
      <div className="space-y-4">
        <button
          className="flex items-center space-x-2 hover:text-white"
          onClick={() => signOut()}
        >
          <AiOutlinePoweroff className="w-5 h-5" />
          <p>Logout</p>
        </button>
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
        <p className="cursor-pointer hover:text-white">Playlist 1</p>
        <p className="cursor-pointer hover:text-white">Playlist 1</p>
        <p className="cursor-pointer hover:text-white">Playlist 1</p>
        <p className="cursor-pointer hover:text-white">Playlist 1</p>
        <p className="cursor-pointer hover:text-white">Playlist 1</p>
        <p className="cursor-pointer hover:text-white">Playlist 1</p>
        <p className="cursor-pointer hover:text-white">Playlist 1</p>
        <p className="cursor-pointer hover:text-white">Playlist 1</p>
        <p className="cursor-pointer hover:text-white">Playlist 1</p>
        <p className="cursor-pointer hover:text-white">Playlist 1</p>
      </div>
    </div>
  );
}
