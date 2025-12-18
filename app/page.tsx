"use client";
import { useEffect, useState } from "react";
import liff from "@line/liff";
import { extractLiffIdFromLink } from "./lib/liff";

// const defaultLiffId = "2008377237-wKREJbek";

export default function Home() {
  const [error, setError] = useState<string | null>('');

  useEffect((): void => {
    (async (): Promise<void> => {
      const params = new URLSearchParams(window.location.search);
      const linkFromQuery = params.get("link");
      const liffId = extractLiffIdFromLink(linkFromQuery);
      if (!liffId) {
        setError("no valid liffId found in link param");
        // console.log("no valid liffId found in link param");
        return;
      }
      try {
        console.log("liff init using", liffId);
        await liff.init({
          liffId,
        });
      } catch (error) {
        console.log("liff init error", error);
      }
      if (!liff.isLoggedIn()) {
        const destinationUrl = window.location?.href;
        console.log("should login");
        liff.login({ redirectUri: destinationUrl });
        // liff.login();
      }
    })();
  }, []);

  if (error) {
    <p>{error}</p>;
  }

  return <p>landing page...</p>;
}
