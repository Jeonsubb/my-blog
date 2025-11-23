// src/components/FilterablePostList.tsx
"use client"; // 👈 중요! "이건 움직이는(Client) 부품이야"라고 선언

import { useState } from "react";
import Link from "next/link";
import { PostData } from "@/lib/posts"; // 타입 가져오기

type Props = {
  posts: PostData[]; // 부모에게서 글 목록을 통째로 받습니다.
};

export default function FilterablePostList({ posts }: Props) {
  // 1. 상태 관리: 현재 선택된 카테고리 (기본값: 'All')
  const [selectedCategory, setSelectedCategory] = useState("All");

  // 2. 모든 글에서 카테고리만 뽑아내기 (중복 제거)
  const categories = ["All", ...new Set(posts.map((post) => post.category || "Uncategorized"))];

  // 3. 선택된 카테고리에 맞는 글만 걸러내기
  const filteredPosts =
    selectedCategory === "All"
      ? posts
      : posts.filter((post) => post.category === selectedCategory);

  return (
    <section>
      {/* 카테고리 버튼 목록 */}
      <div className="flex gap-2 mb-8 flex-wrap">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === category
                ? "bg-blue-600 text-white" // 선택됨: 파란색
                : "bg-gray-100 text-gray-600 hover:bg-gray-200" // 안 선택됨: 회색
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* 필터링된 글 목록 보여주기 (아까 page.tsx에 있던 디자인 재사용) */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {filteredPosts.map((post) => (
          <Link href={`/blog/${post.id}`} key={post.id} className="block group">
            <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition bg-white h-full flex flex-col">
              {post.thumbnail ? (
                <div className="w-full h-48 relative overflow-hidden">
                  <img
                    src={post.thumbnail}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                </div>
              ) : (
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-400">
                  No Image
                </div>
              )}
              <div className="p-4 flex flex-col flex-grow">
                {/* 카테고리 태그 표시 */}
                <span className="text-xs font-bold text-blue-500 mb-1">{post.category}</span>
                <h2 className="text-xl font-bold mb-2 text-gray-900 group-hover:text-blue-600 transition">
                  {post.title}
                </h2>
                <p className="text-gray-600 mb-4 line-clamp-2 text-sm flex-grow">
                  {post.description}
                </p>
                <p className="text-gray-400 text-xs mt-auto">{post.date}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}