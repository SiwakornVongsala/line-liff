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
        await liff.init({ liffId: liffId });
        const url = new URL(window.location.href);

        // 🔑 เปลี่ยนเฉพาะ path
        url.pathname = "/profile";

        const redirectUri = url.toString();

        console.log("LIFF redirectUri:", redirectUri);
        if (!liff.isLoggedIn()) {
          liff.login({ redirectUri: redirectUri });
        } else {
          window.location.replace(redirectUri);
        }
      } catch (error) {
        console.log("liff init error", error);
      }
    })();
  }, []);

  return (
    <div className="fixed inset-0 z-9999 m-auto h-full w-full bg-white/50 overflow-visible">
      <FancySpinner />
    </div>
  );
}
