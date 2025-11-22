// src/components/Navbar.tsx
import Link from "next/link"; // 페이지 이동을 위한 전용 태그

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center p-4 bg-gray-900 text-white">
      {/* 로고 (누르면 홈으로) */}
      <Link href="/" className="text-xl font-bold">
        동훈's Blog
      </Link>

      {/* 메뉴 링크들 */}
      <div className="space-x-4">
        <Link href="/about" className="hover:text-gray-300 transition">
          소개
        </Link>
        <Link href="/blog" className="hover:text-gray-300 transition">
          글 목록
        </Link>
      </div>
    </nav>
  );
}