/**
 * สร้าง deep link ที่เปิด LINE app แทนหน้า login เว็บ
 *
 * เวลาเปิดลิงก์ liff.line.me จากเบราว์เซอร์นอก LINE ตัว LINE จะยัด query เดิม
 * ไว้ใน `liff.state` (encode ซ้อน 2 ชั้น) แล้วโยนมาที่ endpoint นี้
 * เช่น `?liff.state=%3FsalesOwner%3Dfoo%2540bar.com%26orgId%3D123`
 *
 * URLSearchParams.get() decode ให้แล้ว 1 ชั้น เหลือ `?salesOwner=foo%40bar.com&orgId=123`
 * ซึ่งคือ query string ที่ถูกต้องอยู่แล้ว — ห้าม decode ซ้ำ ไม่งั้นค่าที่มี & หรือ = ข้างในจะพัง
 */
export const toLineAppDeepLink = (liffId: string, search: string): string => {
  const state = new URLSearchParams(search).get("liff.state");
  const qs = (state ?? search).replace(/^\?/, "");
  return `https://line.me/R/app/${liffId}${qs ? `?${qs}` : ""}`;
};

/**
 * iOS/iPadOS + Safari จริงๆ (ไม่ใช่ Chrome iOS / Edge iOS / Firefox iOS / in-app browser ของ LINE)
 * ทุกเบราว์เซอร์บน iOS มีคำว่า Safari ใน UA เลยต้องตัด CriOS/EdgiOS/FxiOS/Line ออก
 *
 * iPad ตั้งแต่ iPadOS 13 เปิด "ขอเว็บไซต์เวอร์ชันเดสก์ท็อป" เป็นค่า default
 * UA เลยเป็น Macintosh เป๊ะๆ ไม่มีคำว่า iPad → แยกจาก Mac จริงด้วย maxTouchPoints
 * (Mac = 0, iPad = 5)
 *
 * ponytail: ตัด window.MSStream ทิ้ง — Windows Phone ตายแล้ว
 */
export const isIosSafari = (
  ua: string = typeof navigator === "undefined" ? "" : navigator.userAgent,
  maxTouchPoints: number = typeof navigator === "undefined"
    ? 0
    : navigator.maxTouchPoints,
): boolean =>
  /Safari/i.test(ua) &&
  !/CriOS|EdgiOS|FxiOS|Line/i.test(ua) &&
  (/iPad|iPhone|iPod/.test(ua) ||
    (/Macintosh/.test(ua) && maxTouchPoints > 1));
