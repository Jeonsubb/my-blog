// src/app/blog/page.tsx
import Link from "next/link";
// 👇 방금 분리한 함수(도구)를 가져옵니다.
import { getSortedPostsData } from "@/lib/posts"; 

import FilterablePostList from "@/components/FilterablePostList"; // 방금 만든 부품

export default async function Blog() {
  // 1. 서버에서 데이터를 가져옵니다.
  const allPostsData = await getSortedPostsData();

  return (
    <div className="p-24">
      <h1 className="text-3xl font-bold mb-8">블로그 글 목록</h1>
      
      {/* 2. 데이터를 클라이언트 컴포넌트에게 넘겨줍니다 (Props) */}
      <FilterablePostList posts={allPostsData} />
    </div>
  );
}