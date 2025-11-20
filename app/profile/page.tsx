"use client";
import { useEffect, useState } from "react";

import Head from "next/head";
import Image from "next/image";
import liff from "@line/liff";

const liffId = "2008377237-wKREJbek";
export default function Profile() {
  const [profile, setProfile] = useState<any>({});

  useEffect(() => {
    (async () => {
      try {
        await liff.init({ liffId });
        console.log(">>>> init success", {});

        await liff.ready;

        const profile = await liff.getProfile();

        setProfile(profile);
        console.log(">>>> profile", { profile });
      } catch (error) {
        console.log(">>>> error", { error });
      }
    })();
  }, []);

  const getProfile = async (): Promise<any> => {
    console.log('>>>> getProfile',{});
    try {
      // const liff = (await import("@line/liff")).default;

      // เผื่อยังไม่ init
      // if (!liff.isInitialized()) {
      //   await liff.init({ liffId });
      // }
      //
      await liff.init({ liffId });
      console.log(">>>> init success", {});

      const profile = await liff.getProfile();
      console.log(">>>> profile", { profile });

    } catch (error) {
      console.log(">>>> error", { error });
    }
  };

  return (
    <section>
      <Head>
        <title>My Profile</title>
      </Head>
      <h1>Profile</h1>
      <button
        type="button"
        onClick={async (): Promise<any> => {
          await getProfile();
        }}
      >
        get profile
      </button>
      <div>
        {profile.pictureUrl && (
          <Image
            src={profile.pictureUrl}
            alt={profile.displayName}
            width={500}
            height={500}
          />
        )}
        <div>Name: {profile.displayName}</div>
      </div>
    </section>
  );
}
