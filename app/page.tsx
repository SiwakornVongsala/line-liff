"use client";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import liff from "@line/liff";

const liffId = "2008377237-wKREJbek";

export default function Home() {
  const [profile, setProfile] = useState<any>({});

  useEffect(() => {
    (async () => {
      await liff.init({ liffId: liffId });
      if (!liff.isLoggedIn()) {
        // temp Url params
        const destinationUrl = window.location?.href;

        liff.login({ redirectUri: destinationUrl });
      }
    })();
  }, [profile.userId]);
  return <></>;
}
