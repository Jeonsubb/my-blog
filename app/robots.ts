// src/app/robots.ts
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*', // 모든 로봇(구글, 네이버, 빙...) 허용
      allow: '/',     // 모든 페이지 접근 허용
    },
    sitemap: 'https://my-blog-xi-flame.vercel.app/sitemap.xml', // 사이트맵 위치 알려주기
  }
}