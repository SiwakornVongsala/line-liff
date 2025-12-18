"use client";
import { useEffect, useState } from "react";

import Head from "next/head";
import Image from "next/image";
import liff from "@line/liff";
import { extractLiffIdFromLink, getLiffIdFromLiffState } from "../lib/liff";
import { useSearchParams } from "next/navigation";

export default function Profile() {

  const [error, setError] = useState<string | null>('');
  const [profile, setProfile] = useState<any>({});
  const [otherData, setOtherData] = useState<any>({});
  const [liffId, setLiffId] = useState<any>(null);

  const searchParams = useSearchParams();
  useEffect(() => {
    (async (): Promise<void> => {
      const liffId = getLiffIdFromLiffState(searchParams);
      if (liffId) {
        setLiffId(liffId);
      }
    })();
  }, [searchParams]);

  useEffect(() => {
    (async () => {
      if (!liffId) {
        // setError("no valid liffId found in link param");
        console.log("no valid liffId found in link param");
        return;
      }
      try {
        // init liff
        if (!liffId) {
          console.log("no valid liffId found in link param");
          return;
        }
        await liff.init({ liffId });
        await liff.ready;

        // get Url params  (orgId)
        // reuse params from above to retrieve orgId after init
        const params = new URLSearchParams(window.location.search);
        const orgId = params.get("orgId");
        console.log("orgid from URL =", orgId);

        // get profie
        const profile = await liff.getProfile();

        // get email
        const idToken = liff.getDecodedIDToken();
        console.log(">>>> idToken", { idToken });

        // set datas
        setOtherData({ ...idToken, orgId });
        setProfile(profile);
        console.log(">>>> profile", { profile });

      } catch (error) {
        console.log(">>>> error", { error });
      }
    })();
  }, [liffId]);

  if (error) {
    <p>{error}</p>;
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
