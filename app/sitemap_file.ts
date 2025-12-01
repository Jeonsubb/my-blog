// src/app/sitemap.ts
import { MetadataRoute } from 'next'
import { getSortedPostData } from '@/lib/posts_file'

export default function sitemap(): MetadataRoute.Sitemap {
  // 1. 내 블로그의 기본 주소 (이걸 꼭 동훈님 주소로 바꾸세요!)
  const baseUrl = 'https://my-blog-xi-flame.vercel.app'

  // 2. 모든 글 데이터를 가져옴
  const allPosts = getSortedPostData()

  // 3. 글 목록을 사이트맵 형식으로 변환
  const posts = allPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.id}`,
    lastModified: new Date(post.date),
  }))

  // 4. 기본 페이지(홈, 블로그 목록)와 합쳐서 반환
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