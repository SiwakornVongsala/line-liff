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
        const a =await liff.init({ liffId });
        console.log('>>>> a',{a});

      } catch (error) {
        console.log("liff init error", error);
      }
      if (!liff.isLoggedIn()) {
        console.log("should login");
        liff.login();
      }
    })();
  }, [profile.userId]);

  return <p>landing page...</p>;
}
