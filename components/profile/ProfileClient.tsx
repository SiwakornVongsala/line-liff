"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import liff from "@line/liff";

// import { liffId } from "../home/HomeClient";
import FancySpinner from "../Loading/loading";
import Loading from "../Loading/loading";
import { getLiffIdFromLiffState } from "@/app/lib/liff";
import { lineDropform } from "@/app/services/services";

export default function ProfileClient() {
  const search = typeof window !== "undefined" ? window.location.search : "";
  const params = useMemo(() => new URLSearchParams(search), [search]);
  const type = params.get("type"); // person | null
  const orgId = params.get("orgId");
  const saleCodeId = params.get("saleCodeId");
  const salesOwner = params.get("salesOwner");
  const orgPer = params.get("orgPer");
  const event = params.get("event");
  const salesType = params.get("salesType");
  const greet = params.get("greet"); // 0 | 1
  const ticket = params.get("ticket"); // 0 | 1
  const replaceSalesOwner = params.get("replaceSalesOwner"); // 0 | 1
  const channelId = params.get("channelId"); // 0 | 1
  const [lineData, setLineData] = useState<any>();

  const handleFlow = async (lineData: any): Promise<void> => {
    try {
      const payload = {
        params: {
          type,
          orgId,
          saleCodeId,
          salesOwner,
          orgPer,
          salesType,
          greet,
          ticket,
          replaceSalesOwner,
          event,
        },
        body: {
          ...lineData,
          channelId: channelId,
        },
      };
      await lineDropform(payload);
    } catch (error) {
      console.log(">>>> error", { error });
    }
  };

  const openChatOA = () => {
    const lineOA = process.env.NEXT_PUBLIC_LINE_OA || "";
    liff.openWindow({
      url: `https://line.me/R/ti/p/${lineOA}`,
      external: false, // เปิดใน LINE
    });
  };

  useEffect(() => {
    (async () => {
      try {
        const liffId = process.env.NEXT_PUBLIC_LINE_LIFF_ID || "";
        await liff.init({ liffId: liffId });
        await liff.ready;

        const profile = await liff.getProfile();
        const idToken = liff.getDecodedIDToken();
        console.log(">>>> profile", { profile, idToken });
        const lineData = {
          lineId: profile?.userId,
          displayName: profile?.displayName,
          pictureUrl: profile?.pictureUrl,
        };
        await handleFlow(lineData);
        setLineData(lineData)
        // openChatOA();
      } catch (error) {
        console.log(">>>> error", { error });
      }
    })();
  }, []);

  return (
    <div>
      <button type="button" onClick={openChatOA}>
        go to chat (vercel swk)
       <p>lineId:{lineData?.lineId}</p> 
       <p>displayName:{lineData?.displayName}</p> 
       <p>pictureUrl:{lineData?.pictureUrl}</p> 
      </button>
    </div>
  );

  // return (
  //   <div className="fixed inset-0 z-9999 m-auto h-full w-full bg-white/50 overflow-visible">
  //     <Loading />
  //   </div>
  // );
}
