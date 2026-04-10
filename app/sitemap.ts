import { MetadataRoute } from "next";
import { getSortedPostsData, getUniqueSeries, getUniqueTags } from "@/lib/posts";
import { siteConfig } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const allPosts = await getSortedPostsData();
  const tags = getUniqueTags(allPosts).map((tag) => ({
    url: `${siteConfig.url}/tags/${encodeURIComponent(tag)}`,
    lastModified: new Date(),
  }));
  const series = getUniqueSeries(allPosts).map((seriesItem) => ({
    url: `${siteConfig.url}/series/${encodeURIComponent(seriesItem)}`,
    lastModified: new Date(),
  }));

  const posts = allPosts.map((post) => ({
    url: `${siteConfig.url}/blog/${post.slug}`,
    lastModified: new Date(post.created_at),
  }));

  return [
    {
      url: siteConfig.url,
      lastModified: new Date(),
    },
    {
      url: `${siteConfig.url}/blog`,
      lastModified: new Date(),
    },
    {
      url: `${siteConfig.url}/about`,
      lastModified: new Date(),
    },
    ...tags,
    ...series,
    ...posts,
  ];
}
