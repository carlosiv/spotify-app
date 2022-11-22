import { atom } from "recoil";

export const playlistIdState = atom({
  key: "playlistIdStatekey", // unique ID (with respect to other atoms/selectors)
  default: "0xRkjZOVFzPdzF22uCcN08", // default value (aka initial value)
});

export const playlistState = atom<SpotifyApi.SinglePlaylistResponse | null>({
  key: "playlistStatekey", // unique ID (with respect to other atoms/selectors)
  default: null, // default value (aka initial value)
});
