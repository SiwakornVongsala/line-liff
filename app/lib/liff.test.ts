// รัน: node --test --experimental-strip-types app/lib/liff.test.ts
import assert from "node:assert/strict";
import test from "node:test";

import { isIosSafari, toLineAppDeepLink } from "./liff.ts";

const LIFF_ID = "1562959472-5QmzJ8oQ";

test("แกะ liff.state ของจริงแล้ว params ต้องครบ", () => {
  // URL ที่ Safari ตกมาจริงจาก https://liff.line.me/1562959472-5QmzJ8oQ?...
  const search =
    "?liff.state=%3FsalesOwner%3Dunilever_api%2540connect-x.tech%26saleCodeId%3D%26salesType%3DAffiliate%26orgPer%3DAffiliate%26event%3DqbeG7aTXVqqrbewxktW1%26type%3Devent%26replaceSalesOwner%3D0%26greet%3D0%26ticket%3D1%26orgId%3D61iGjRkt9bb9CiUO3zsf%26channelId%3D1562959472";

  const url = new URL(toLineAppDeepLink(LIFF_ID, search));

  assert.equal(url.origin + url.pathname, `https://line.me/R/app/${LIFF_ID}`);
  assert.deepEqual(Object.fromEntries(url.searchParams), {
    salesOwner: "unilever_api@connect-x.tech",
    saleCodeId: "",
    salesType: "Affiliate",
    orgPer: "Affiliate",
    event: "qbeG7aTXVqqrbewxktW1",
    type: "event",
    replaceSalesOwner: "0",
    greet: "0",
    ticket: "1",
    orgId: "61iGjRkt9bb9CiUO3zsf",
    channelId: "1562959472",
  });
});

test("ถ้า SDK แกะ liff.state ไปแล้ว ใช้ query ตรงๆ", () => {
  assert.equal(
    toLineAppDeepLink(LIFF_ID, "?orgId=abc&greet=0"),
    `https://line.me/R/app/${LIFF_ID}?orgId=abc&greet=0`,
  );
});

test("ไม่มี query เลยก็ยังเป็นลิงก์ที่ใช้ได้", () => {
  assert.equal(
    toLineAppDeepLink(LIFF_ID, ""),
    `https://line.me/R/app/${LIFF_ID}`,
  );
});

test("isIosSafari แยก Safari iOS ออกจากเบราว์เซอร์อื่น", () => {
  const base =
    "Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko)";

  assert.equal(isIosSafari(`${base} Version/17.5 Mobile/15E148 Safari/604.1`), true);
  assert.equal(isIosSafari(`${base} CriOS/126.0 Mobile/15E148 Safari/604.1`), false);
  assert.equal(isIosSafari(`${base} EdgiOS/126.0 Mobile/15E148 Safari/604.1`), false);
  assert.equal(isIosSafari(`${base} Mobile/15E148 Safari/604.1 Line/14.10.0`), false);
  // Android Chrome / desktop Safari ต้องไม่ติด
  assert.equal(
    isIosSafari(
      "Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Mobile Safari/537.36",
    ),
    false,
  );
  assert.equal(
    isIosSafari(
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Safari/605.1.15",
    ),
    false,
  );
});
