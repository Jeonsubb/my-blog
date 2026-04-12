export const siteConfig = {
  name: "전섭의 블로그",
  description: "꾸준히 성장하는 개발자를 지향하며 구현과 설계를 기록하는 기술 블로그입니다.",
  url: "https://my-blog-xi-flame.vercel.app",
  author: "전섭",
};

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString();
}

export function formatLongDate(date: string) {
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}

export function formatShortDate(date: string) {
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(date));
}

export function getPlainTextExcerpt(content: string, maxLength = 140) {
  const stripped = content
    .replace(/<[^>]+>/g, " ")
    .replace(/!\[.*?\]\(.*?\)/g, " ")
    .replace(/\[(.*?)\]\(.*?\)/g, "$1")
    .replace(/[`*_>#~-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (stripped.length <= maxLength) {
    return stripped;
  }

  return `${stripped.slice(0, maxLength).trim()}...`;
}

export function getReadingTimeMinutes(content: string) {
  const plainText = getPlainTextExcerpt(content, 10000);
  const words = plainText.split(/\s+/).filter(Boolean).length;

  return Math.max(1, Math.ceil(words / 220));
}
