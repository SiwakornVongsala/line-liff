"use client";

import { useEffect } from "react";
import liff from "@line/liff";
import FancySpinner from "../Loading/loading";

export const liffId = "2008377237-wKREJbek";

export default function HomeClient() {
  useEffect(() => {
    (async (): Promise<void> => {
      try {
        console.log("liff init using", liffId);
        await liff.init({ liffId: liffId });
      } catch (error) {
        console.log("liff init error", error);
      }
      if (!liff.isLoggedIn()) {
        const destinationUrl = window.location?.href;
        console.log("should login");
        console.log(">>>>>>> destinationUrl", { destinationUrl });
        // liff.login({ redirectUri: destinationUrl });
        liff.login({ redirectUri: destinationUrl });

      }
    })();
  }, []);

  return <p>login</p>
  // return (
  //   <div className="fixed inset-0 z-9999 m-auto h-full w-full bg-white/50 overflow-visible">
  //     <FancySpinner />
  //   </div>
  // );
}
