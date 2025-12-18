"use client";
import { useEffect, useState } from "react";
import liff from "@line/liff";
import { extractLiffIdFromLink, getLiffIdFromLiffState } from "./lib/liff";
import { usePathname, useSearchParams } from "next/navigation";

// const defaultLiffId = "2008377237-wKREJbek";

export default function Home() {
  const [error, setError] = useState<string | null>("");
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

  useEffect((): void => {
    (async (): Promise<void> => {
      if (!liffId) {
        // setError("no valid liffId found in link param");
        console.log("no valid liffId found in link param");
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
      }
    })();
  }, [liffId]);

  if (error) {
    <p>{error}</p>;
  }

  return <p>landing page...</p>;
}
