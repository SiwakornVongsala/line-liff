"use client";

import { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import liff from "@line/liff";

import { getLiffIdFromLiffState } from "@/app/lib/liff";
import { liffId } from "../home/HomeClient";

export default function ProfileClient() {
  const [error, setError] = useState<string | null>("");
  const [profile, setProfile] = useState<any>({});
  const [otherData, setOtherData] = useState<any>({});
  // const [liffId, setLiffId] = useState<string | null>(null);
  const searchParams = useSearchParams();

  // useEffect(() => {
  //   (async (): Promise<void> => {
  //     const id = getLiffIdFromLiffState(searchParams);
  //     if (id) {
  //       setLiffId(id);
  //     }
  //   })();
  // }, [searchParams]);

  useEffect(() => {
    (async () => {
      // if (!liffId) {
      //   console.log("no valid liffId found in link param");
      //   return;
      // }
      try {
        await liff.init({ liffId: liffId });
        await liff.ready;

        const params = new URLSearchParams(window.location.search);
        const orgId = params.get("orgId");
        console.log("orgid from URL =", orgId);

        const profile = await liff.getProfile();
        const idToken = liff.getDecodedIDToken();

        setOtherData({ ...idToken, orgId });
        setProfile(profile);
        console.log(">>>> profile", { profile });
      } catch (error) {
        console.log(">>>> error", { error });
        setError("Failed to fetch profile");
      }
    })();
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <section>
      <Head>
        <title>My Profile</title>
      </Head>
      <h1>Profile</h1>
      <div>
        {profile?.pictureUrl && (
          <Image
            src={profile?.pictureUrl}
            alt={profile?.displayName}
            width={500}
            height={500}
          />
        )}
        <div>Name: {profile?.displayName}</div>
        <div>Email: {otherData?.email}</div>
        <div>OrgId: {otherData?.orgId}</div>
      </div>
    </section>
  );
}
