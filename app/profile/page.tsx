"use client";
import { useEffect, useState } from "react";

import Head from "next/head";
import Image from "next/image";
import liff from "@line/liff";
import { extractLiffIdFromLink } from "../lib/liff";

export default function Profile() {

  const [error, setError] = useState<string | null>('');
  const [profile, setProfile] = useState<any>({});
  const [otherData, setOtherData] = useState<any>({});

  useEffect(() => {
    (async () => {
      try {
        // init liff
        const params = new URLSearchParams(window.location.search);
        const linkFromQuery = params.get("link");
        const liffId = extractLiffIdFromLink(linkFromQuery);
        if (!liffId) {
          console.log("no valid liffId found in link param");
          return;
        }
        await liff.init({ liffId });
        await liff.ready;

        // get Url params  (orgId)
        // reuse params from above to retrieve orgId after init
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
  }, []);

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
