"use client";

import { useEffect } from "react";
import liff from "@line/liff";
import FancySpinner from "../Loading/loading";
import { isIosSafari, toLineAppDeepLink } from "@/app/lib/liff";

export default function HomeClient() {
  useEffect(() => {
    (async (): Promise<void> => {
      try {
        const liffId = process.env.NEXT_PUBLIC_LINE_LIFF_ID || "";
        await liff.init({ liffId: liffId });

        // ponytail: มือถือนอกแอป LINE → เด้งเข้าแอปด้วย deep link
        // แทนที่จะปล่อยให้ liff.login() พาไปค้างที่หน้า login เว็บ (iOS Safari ค้างชัวร์เพราะ ITP)
        // desktop = getOS() "web", ในแอป LINE = isInClient() true → ทั้งคู่ข้าม flow นี้
        // isIosSafari() เผื่อเคสที่ getOS() ไม่ยอมตอบ "ios" (เช่น iPad ที่ UA เป็น desktop)
        if (!liff.isInClient() && (isIosSafari() || liff.getOS() !== "web")) {
          window.location.replace(
            toLineAppDeepLink(liffId, window.location.search),
          );
          return;
        }

        const url = new URL(window.location.href);

        // 🔑 เปลี่ยนเฉพาะ path
        url.pathname = "/profile";

        const redirectUri = url.toString();

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
