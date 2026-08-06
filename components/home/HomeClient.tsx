"use client";

import { useEffect, useState } from "react";
import liff from "@line/liff";
import FancySpinner from "../Loading/loading";
import { isIosSafari, toLineAppDeepLink } from "@/app/lib/liff";

// ponytail: สวิตช์เดียว — เทสบน vercel เสร็จแล้วเปลี่ยนเป็น false ก่อนขึ้น prod
const DEBUG = true;

type Debug = {
  branch: "safari-ios" | "mobile-other" | "in-client" | "web";
  ua: string;
  href: string;
  liffId: string;
  isIosSafari: boolean;
  isInClient: boolean | string;
  os: string;
  isLoggedIn: boolean | string;
  deepLink: string;
  redirectUri: string;
  initStatus: string;
};

export default function HomeClient() {
  const [debug, setDebug] = useState<Debug | null>(null);

  useEffect(() => {
    (async (): Promise<void> => {
      const liffId = process.env.NEXT_PUBLIC_LINE_LIFF_ID || "";
      const url = new URL(window.location.href);
      const deepLink = toLineAppDeepLink(liffId, window.location.search);
      const href = window.location.href;

      // 🔑 เปลี่ยนเฉพาะ path
      url.pathname = "/profile";
      const redirectUri = url.toString();

      const safari = isIosSafari();

      // ponytail: โชว์ค่าที่รู้อยู่แล้วก่อน init — ถ้าอาการค้างคือ liff.init() ไม่ยอม resolve
      // (เคสที่ ticket แจ้ง) หน้าจอจะยังขึ้นและค้างที่ initStatus = "กำลัง init..."
      if (DEBUG) {
        setDebug({
          branch: safari ? "safari-ios" : "web",
          ua: navigator.userAgent,
          href,
          liffId,
          isIosSafari: safari,
          isInClient: "-",
          os: "-",
          isLoggedIn: "-",
          deepLink,
          redirectUri,
          initStatus: "กำลัง init...",
        });
      }

      const startedAt = Date.now();
      let initStatus = "";
      try {
        await liff.init({ liffId: liffId });
        initStatus = `ok (${Date.now() - startedAt} ms)`;
      } catch (error) {
        initStatus = `error: ${String(error)}`;
        console.log("liff init error", error);
      }

      const initFailed = initStatus.startsWith("error");
      // ค่าพวกนี้อ่านไม่ได้ถ้า init พัง
      const inClient = initFailed ? "-" : liff.isInClient();
      const os = initFailed ? "-" : liff.getOS() || "-";
      const loggedIn = initFailed ? "-" : liff.isLoggedIn();

      // ponytail: มือถือนอกแอป LINE → เด้งเข้าแอปด้วย deep link
      // แทนที่จะปล่อยให้ liff.login() พาไปค้างที่หน้า login เว็บ (iOS Safari ค้างชัวร์เพราะ ITP)
      // desktop = getOS() "web", ในแอป LINE = isInClient() true → ทั้งคู่ข้าม flow นี้
      // isIosSafari() เผื่อเคสที่ getOS() ไม่ยอมตอบ "ios" (เช่น iPad ที่ UA เป็น desktop)
      const shouldDeepLink = inClient !== true && (safari || os !== "web");

      if (DEBUG) {
        setDebug({
          branch:
            inClient === true
              ? "in-client"
              : safari
                ? "safari-ios"
                : shouldDeepLink
                  ? "mobile-other"
                  : "web",
          ua: navigator.userAgent,
          href,
          liffId,
          isIosSafari: safari,
          isInClient: inClient,
          os,
          isLoggedIn: loggedIn,
          deepLink,
          redirectUri,
          initStatus,
        });
        return; // ยังไม่ redirect — ดูค่าก่อน
      }

      if (initFailed) return;

      if (shouldDeepLink) {
        window.location.replace(deepLink);
        return;
      }

      console.log("LIFF redirectUri:", redirectUri);
      if (!liff.isLoggedIn()) {
        liff.login({ redirectUri: redirectUri });
      } else {
        window.location.replace(redirectUri);
      }
    })();
  }, []);

  if (DEBUG) {
    if (!debug) {
      return (
        <div className="fixed inset-0 z-9999 m-auto h-full w-full bg-white/50 overflow-visible">
          <FancySpinner />
        </div>
      );
    }

    const safariCase = debug.branch === "safari-ios";
    const { branch, deepLink, redirectUri, ...rows } = debug;

    return (
      <div className="min-h-screen bg-white p-4 text-sm text-black">
        <div
          className={`rounded-lg p-4 text-white ${safariCase ? "bg-orange-500" : "bg-emerald-600"}`}
        >
          <p className="text-lg font-bold">
            {safariCase
              ? "🍎 เคส Safari บน iOS"
              : branch === "in-client"
                ? "💬 เปิดในแอป LINE"
                : branch === "mobile-other"
                  ? "📱 มือถือนอกแอป LINE"
                  : "🖥️ เบราว์เซอร์ปกติ (desktop)"}
          </p>
          <p className="mt-1">
            {branch === "web" || branch === "in-client"
              ? `flow ปกติ → จะไป ${redirectUri}`
              : `ปกติจะเด้งเข้าแอป LINE (ตอนนี้ปิดไว้เพื่อ debug)`}
          </p>
        </div>

        <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-3 gap-y-2 break-all">
          {Object.entries(rows).map(([k, v]) => (
            <div key={k} className="contents">
              <dt className="font-semibold text-gray-500">{k}</dt>
              <dd className="font-mono">{String(v) || "-"}</dd>
            </div>
          ))}
        </dl>

        <p className="mt-4 font-semibold text-gray-500">deepLink (กดเองได้)</p>
        <a className="font-mono break-all text-blue-600 underline" href={deepLink}>
          {deepLink}
        </a>

        <p className="mt-4 font-semibold text-gray-500">redirectUri</p>
        <p className="font-mono break-all">{redirectUri}</p>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-9999 m-auto h-full w-full bg-white/50 overflow-visible">
      <FancySpinner />
    </div>
  );
}
