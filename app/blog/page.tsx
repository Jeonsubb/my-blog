// src/app/blog/page.tsx
import Link from "next/link";
// 👇 방금 분리한 함수(도구)를 가져옵니다.
import { getSortedPostData } from "@/lib/posts"; 

export default function Blog() {
  // 1. 여기서 함수를 실행해서 진짜 데이터를 가져옵니다!
  const allPostsData = getSortedPostData();

  return (
    <div className="p-24">
      <h1 className="text-3xl font-bold mb-8">블로그 글 목록</h1>
      
      {/* 2. 가져온 데이터(allPostsData)를 반복문(map)으로 뿌려줍니다. */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {allPostsData.map(({ id, date, title, description, thumbnail }) => (
          
          <Link href={`/blog/${id}`} key={id} className="block group">
            <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition bg-white h-full flex flex-col">
              
              {/* 3. 썸네일 이미지가 있으면 보여주기 */}
              {thumbnail ? (
                <div className="w-full h-48 relative overflow-hidden">
                  <img 
                    src={thumbnail} 
                    alt={title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                </div>
              ) : (
                // 썸네일 없으면 회색 박스로 대체
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-400">
                  No Image
                </div>
              )}
              
              {/* 4. 글 정보 (제목, 설명, 날짜) */}
              <div className="p-4 flex flex-col flex-grow">
                <h2 className="text-xl font-bold mb-2 text-gray-900 group-hover:text-blue-600 transition">
                  {title}
                </h2>
                <p className="text-gray-600 mb-4 line-clamp-2 text-sm flex-grow">
                  {description}
                </p>
                <p className="text-gray-400 text-xs mt-auto">
                  {date}
                </p>
              </div>

            </div>
          </Link>

        ))}
      </div>
    </div>
  );
}