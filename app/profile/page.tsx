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
        const liff = (await import("@line/liff")).default;
       const a= await liff.ready;
        const profile = await liff.getProfile();
        setProfile(profile);
        console.log('>>>> profile',{profile});
        console.log('>>>> profile',{profile});
      } catch (error) {
        console.log(">>>> error", { error });
      }
    })();
  }, []);

  return (
    <section>
      <Head>
        <title>My Profile</title>
      </Head>
      <h1>Profile</h1>
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
