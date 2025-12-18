export const extractLiffIdFromLink = (link: string | null): string | null => {
  if (!link) return null;
  try {
    const parsed = new URL(link);
    if (parsed.hostname !== "liff.line.me") return null;
    const id = parsed.pathname.replace(/^\/+/, "").split("/")[0];
    return id || null;
  } catch {
    return null;
  }
};

export function getLiffIdFromLiffState(searchParams: any): string | null {
  // const searchParams = useSearchParams();
  const liffState = searchParams.get("liff.state");
  const liffId = searchParams.get("liffId");
  if (liffId) return liffId;
  console.log(">>>> liffState", { liffState, liffId });
  if (!liffState) return null;

  // decode: %3FliffId%3Dxxxx → ?liffId=xxxx
  const decoded = decodeURIComponent(liffState);
  console.log(">>>> decoded", { decoded });

  // remove leading ?
  const query = decoded.startsWith("?") ? decoded.slice(1) : decoded;
  console.log(">>>> query", { query });

  const innerParams = new URLSearchParams(query);
  console.log(">>>> innerParams", { innerParams });
  const res = innerParams.get("liffId");
  console.log(">>>> res", { res });
  return res;
}
