"use client";

import { useEffect, useState } from "react";
import liff from "@line/liff";
import { useSearchParams } from "next/navigation";

import { getLiffIdFromLiffState } from "@/app/lib/liff";

export default function HomeClient() {
  const [error, setError] = useState<string | null>("");
  const [liffId, setLiffId] = useState<string | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    (async (): Promise<void> => {
      const id = getLiffIdFromLiffState(searchParams);
      if (id) {
        setLiffId(id);
      }
    })();
  }, [searchParams]);

  useEffect(() => {
    (async (): Promise<void> => {
      if (!liffId) {
        console.log("no valid liffId found in link param");
        return;
      }
      try {
        console.log("liff init using", liffId);
        await liff.init({ liffId });
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
    return <p>{error}</p>;
  }

  return <p>landing page...</p>;
}
