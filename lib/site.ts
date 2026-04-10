export const siteConfig = {
  name: "전섭의 빌드 로그",
  description:
    "Next.js와 Supabase를 기반으로 글, 댓글, SEO, CMS 확장성을 함께 실험하는 에디토리얼 블로그 플랫폼입니다.",
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
