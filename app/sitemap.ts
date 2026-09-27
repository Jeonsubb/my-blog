import { MetadataRoute } from "next";
import { getSortedPostsData, getUniqueSeries, getUniqueTags, type PostData } from "@/lib/posts";
import { siteConfig } from "@/lib/site";

function latestCreatedAt(posts: PostData[], fallback: Date) {
  return posts[0] ? new Date(posts[0].created_at) : fallback;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const allPosts = await getSortedPostsData();
  const newestPostDate = latestCreatedAt(allPosts, new Date());

  const tags = getUniqueTags(allPosts).map((tag) => ({
    url: `${siteConfig.url}/tags/${encodeURIComponent(tag)}`,
    lastModified: latestCreatedAt(
      allPosts.filter((post) => post.tags.includes(tag)),
      newestPostDate,
    ),
  }));
  const series = getUniqueSeries(allPosts).map((seriesItem) => ({
    url: `${siteConfig.url}/series/${encodeURIComponent(seriesItem)}`,
    lastModified: latestCreatedAt(
      allPosts.filter((post) => post.series === seriesItem),
      newestPostDate,
    ),
  }));

  const posts = allPosts.map((post) => ({
    url: `${siteConfig.url}/blog/${post.slug}`,
    lastModified: new Date(post.created_at),
  }));

  return [
    {
      url: siteConfig.url,
      lastModified: newestPostDate,
    },
    {
      url: `${siteConfig.url}/blog`,
      lastModified: newestPostDate,
    },
    {
      url: `${siteConfig.url}/projects`,
      lastModified: newestPostDate,
    },
    ...tags,
    ...series,
    ...posts,
  ];
}
