// src/app/sitemap.ts
import { MetadataRoute } from 'next'
import { getSortedPostsData } from '@/lib/posts'

// 👇 1. async를 붙여야 합니다! (DB 조회는 비동기니까요)
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://my-blog-xi-flame.vercel.app'

  // 👇 2. await를 붙여서 데이터를 가져옵니다.
  const allPosts = await getSortedPostsData()

  const posts = allPosts.map((post) => ({
    // 👇 3. id 대신 slug를 써야 합니다.
    url: `${baseUrl}/blog/${post.slug}`,
    
    // 👇 4. date 대신 created_at을 써야 합니다.
    lastModified: new Date(post.created_at),
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
    },
    ...posts,
  ]
}