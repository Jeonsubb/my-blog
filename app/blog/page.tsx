// src/app/blog/page.tsx
import Link from "next/link";

export default function Blog() {
  return (
    <div className="p-24">
      <h1 className="text-3xl font-bold mb-8">블로그 글 목록</h1>
      
    <div className="space-y-4">
        {/* 첫 번째 글: id를 '1'로 보냄 */}
        <div className="border p-4 rounded hover:bg-gray-50 transition">
          <Link href="/blog/1"> {/* 2. href 수정 */}
            <h2 className="text-xl font-semibold">첫 번째 글: Next.js 시작하기</h2>
            <p className="text-gray-500">2025-11-21</p>
          </Link>
        </div>

        {/* 두 번째 글: id를 '2'로 보냄 */}
        <div className="border p-4 rounded hover:bg-gray-50 transition">
          <Link href="/blog/2"> {/* 2. href 수정 */}
            <h2 className="text-xl font-semibold">두 번째 글: 라우팅이 뭐지?</h2>
            <p className="text-gray-500">2025-11-22</p>
          </Link>
        </div>
      </div>
    </div>
  );
}