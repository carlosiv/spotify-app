import Player from "@components/Player";
import type { NextPage } from "next";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Center from "../components/Center";
import Sidebar from "../components/Sidebar";

const Home: NextPage = () => {
  const router = useRouter();
  const { status, data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/login");
    },
  });
  useEffect(() => {
    if (!session?.user.accessToken) {
      router.push("/login");
    }
  }, [session?.user.accessToken]);

  return (
    <div className="bg-black overflow-hidden h-screen">
      <main className="flex">
        <Sidebar />
        <Center />
      </main>
      <div className="absolute bottom-0 w-full">
        <Player />
      </div>
    </div>
  );
};

export default Home;

export async function getServerSideProps(context: any) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}
