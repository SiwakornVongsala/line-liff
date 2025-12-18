

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

