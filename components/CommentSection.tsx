// src/components/CommentSection.tsx
"use client"; // 👈 중요! 버튼 누르고 입력하는 건 무조건 Client Component

import { useState, useEffect } from "react";

type Comment = {
  id: number;
  content: string;
  username: string;
  created_at: string;
};

export default function CommentSection({ postId }: { postId: string }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [form, setForm] = useState({ content: "", username: "", password: "" });

  // 1. 댓글 불러오기 함수
  const fetchComments = async () => {
    const res = await fetch(`/api/comments?postId=${postId}`);
    const data = await res.json();
    setComments(data);
  };

  // 2. 처음 실행될 때 댓글 가져오기
  useEffect(() => {
    fetchComments();
  }, [postId]);

  // 3. 댓글 등록 함수
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // 새로고침 방지
    if (!form.content || !form.username || !form.password) {
      alert("모든 항목을 입력해주세요!");
      return;
    }

    // API에 데이터 전송 (POST)
    const res = await fetch("/api/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, postId }),
    });

    const result = await res.json();
    
    if (result.success) {
      alert("댓글이 등록되었습니다!");
      setForm({ content: "", username: "", password: "" }); // 입력창 초기화
      fetchComments(); // 목록 다시 불러오기
    } else {
      alert("등록 실패: " + result.error);
    }
  };

  return (
    <div className="mt-16 border-t pt-8">
      <h3 className="text-2xl font-bold mb-6">댓글 ({comments.length})</h3>

      {/* 댓글 작성 폼 */}
      <form onSubmit={handleSubmit} className="mb-10 bg-gray-50 p-6 rounded-lg">
        <div className="flex gap-4 mb-4">
          <input
            type="text"
            placeholder="이름"
            className="border p-2 rounded w-1/3"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />
          <input
            type="password"
            placeholder="비밀번호 (삭제용)"
            className="border p-2 rounded w-1/3"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </div>
        <textarea
          placeholder="댓글을 남겨보세요..."
          className="border p-2 rounded w-full h-24 mb-4"
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          댓글 등록
        </button>
      </form>

      {/* 댓글 목록 표시 */}
      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="border-b pb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="font-bold">{comment.username}</span>
              <span className="text-gray-400 text-sm">
                {new Date(comment.created_at).toLocaleString()}
              </span>
            </div>
            <p className="text-gray-700 whitespace-pre-wrap">{comment.content}</p>
          </div>
        ))}
        {comments.length === 0 && (
          <p className="text-gray-400 text-center">아직 댓글이 없습니다. 첫 번째 주인공이 되어보세요!</p>
        )}
      </div>
    </div>
  );
}