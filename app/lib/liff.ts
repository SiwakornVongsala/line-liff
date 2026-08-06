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
 * iOS + Safari จริงๆ (ไม่ใช่ Chrome iOS / Edge iOS / in-app browser ของ LINE)
 * ทุกเบราว์เซอร์บน iOS มีคำว่า Safari ใน UA เลยต้องตัด CriOS/EdgiOS/Line ออก
 *
 * ponytail: ตัด window.MSStream ทิ้ง — Windows Phone ตายแล้ว
 */
export const isIosSafari = (
  ua: string = typeof navigator === "undefined" ? "" : navigator.userAgent,
): boolean =>
  /iPad|iPhone|iPod/.test(ua) &&
  /Safari/i.test(ua) &&
  !/CriOS|EdgiOS|Line/i.test(ua);
