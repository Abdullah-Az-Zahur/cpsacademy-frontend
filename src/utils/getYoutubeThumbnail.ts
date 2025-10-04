export function getYoutubeThumbnail(url: string) {
  try {
    let videoId = "";

    // For standard URL
    if (url.includes("youtube.com")) {
      videoId = new URL(url).searchParams.get("v") || "";
    }

    // For short URL like youtu.be
    if (url.includes("youtu.be")) {
      const parts = url.split("/");
      videoId = parts[parts.length - 1].split("?")[0]; // remove ?si=...
    }

    if (!videoId) return "";

    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  } catch {
    return "";
  }
}
