"use client";

import { useEffect } from "react";
import liff from "@line/liff";
import FancySpinner from "../Loading/loading";

// export const liffId = "2008377237-wKREJbek"; // liff
// export const liffId = "2008726614-UvZluZly"; // mini app

export default function HomeClient() {
  useEffect(() => {
    (async (): Promise<void> => {
      try {
        const liffId = process.env.NEXT_PUBLIC_LINE_LIFF_ID || "";
        console.log("liff init using liff id = ", liffId);
        await liff.init({ liffId: liffId });
      } catch (error) {
        console.log("liff init error", error);
      }
      if (!liff.isLoggedIn()) {
        // const destinationUrl = window.location?.href;
        const url = new URL(window.location.href);
        url.pathname = "/profile";
        const destinationUrl = url.toString();
        console.log("should login");
        console.log(">>>>>>> destinationUrl", { destinationUrl });
        liff.login({ redirectUri: destinationUrl });
      }
    })();
  }, []);

  return (
    <div className="fixed inset-0 z-9999 m-auto h-full w-full bg-white/50 overflow-visible">
      <FancySpinner />
    </div>
  );
}
