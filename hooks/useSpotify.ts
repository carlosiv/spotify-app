import { signOut, useSession } from "next-auth/react";
import { useEffect } from "react";
import spotifyApi from "@lib/spotify";
import { useRouter } from "next/router";

export default function useSpotify() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      if (session.error === "RefreshAccessTokenError") {
        signOut({ callbackUrl: "/login", redirect: true });
      }

      if (session === null) {
        if (router.route !== "/login") {
          router.replace("/login");
        }
      } else if (session !== undefined) {
        if (router.route === "/login") {
          router.replace("/");
        }
      }

      spotifyApi.setAccessToken(session?.user?.accessToken);
    }
  }, [session]);

  return spotifyApi;
}
