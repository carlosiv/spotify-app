import React from "react";
import { getProviders, signIn } from "next-auth/react";
import Image from "next/image";

function Login({ providers }: any) {
  return (
    <div className="flex flex-col items-center bg-black min-h-screen w-full justify-center">
      <Image
        className="w-52 mb-5 h-52"
        src="https://i.imgur.com/fPuEa9V.png"
        alt="spotify logo"
        width={208}
        height={208}
      />
      {Object.values(providers).map((provider: any) => (
        <div key={provider.name}>
          <button
            onClick={() => signIn(provider.id, { callbackUrl: "/home" })}
            className="bg-[#18D860] text-white p-5 mt-5 rounded-lg"
          >
            Login with {provider.name}
          </button>
        </div>
      ))}
    </div>
  );
}

export default Login;

export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
}
