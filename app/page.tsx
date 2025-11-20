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
      console.log("liff");
      try {
        await liff.init({
          liffId: liffId,
        });
      } catch (error) {
        console.log("liff init error", error);
      }
      if (!liff.isLoggedIn()) {
        const destinationUrl = window.location?.href;
        console.log('>>>> destinationUrl',destinationUrl)
        console.log("should login");
        // liff.login({redirectUri: destinationUrl});
        liff.login();
      }
    })();
  }, [profile.userId]);
  // return <></>;
  return <p>landing page...</p>;
}
