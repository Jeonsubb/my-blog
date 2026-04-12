"use client";

import { useCallback, useEffect, useState, useTransition } from "react";
import { commentEmojis } from "@/lib/emojis";

type Comment = {
  id: number;
  content: string;
  username: string;
  created_at: string;
};

export default function CommentSection({ postId }: { postId: string }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [form, setForm] = useState({ content: "", username: "", password: "" });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editContent, setEditContent] = useState("");
  const [editPassword, setEditPassword] = useState("");
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [deletePassword, setDeletePassword] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const fetchComments = useCallback(async () => {
    try {
      setErrorMessage(null);
      const res = await fetch(`/api/comments?postId=${postId}`, { cache: "no-store" });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "댓글을 불러오지 못했습니다.");
      }

      setComments(Array.isArray(data) ? data : []);
    } catch (error) {
      setComments([]);
      setErrorMessage(
        error instanceof Error ? error.message : "댓글을 불러오지 못했습니다.",
      );
    }
  }, [postId]);

  useEffect(() => {
    void fetchComments();
  }, [fetchComments]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);
    setErrorMessage(null);

    if (!form.content || !form.username || !form.password) {
      setErrorMessage("이름, 비밀번호, 댓글 내용을 모두 입력해 주세요.");
      return;
    }

    const res = await fetch("/api/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, postId }),
    });

    const result = await res.json();

    if (result.success) {
      setFeedback("댓글이 등록되었습니다.");
      setForm({ content: "", username: "", password: "" });
      startTransition(() => {
        void fetchComments();
      });
    } else {
      setErrorMessage(result.error || "댓글 등록에 실패했습니다.");
    }
  };

  const handleDelete = async (commentId: number) => {
    if (!deletePassword) {
      setErrorMessage("삭제를 위해 비밀번호를 입력해 주세요.");
      return;
    }

    setFeedback(null);
    setErrorMessage(null);

    const res = await fetch("/api/comments", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ commentId, password: deletePassword }),
    });

    const result = await res.json();

    if (result.success) {
      setFeedback("댓글을 삭제했습니다.");
      setDeletingId(null);
      setDeletePassword("");
      startTransition(() => {
        void fetchComments();
      });
    } else {
      setErrorMessage(result.error || "댓글 삭제에 실패했습니다.");
    }
  };

  const startEdit = (comment: Comment) => {
    setDeletingId(null);
    setDeletePassword("");
    setEditingId(comment.id);
    setEditContent(comment.content);
    setEditPassword("");
    setFeedback(null);
    setErrorMessage(null);
  };

  const handleUpdate = async (commentId: number) => {
    if (!editContent || !editPassword) {
      setErrorMessage("수정 내용과 비밀번호를 모두 입력해 주세요.");
      return;
    }

    setFeedback(null);
    setErrorMessage(null);

    const res = await fetch("/api/comments", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ commentId, password: editPassword, newContent: editContent }),
    });

    const result = await res.json();

    if (result.success) {
      setFeedback("댓글을 수정했습니다.");
      setEditingId(null);
      setEditPassword("");
      startTransition(() => {
        void fetchComments();
      });
    } else {
      setErrorMessage(result.error || "댓글 수정에 실패했습니다.");
    }
  };

  return (
    <section className="border-t border-[color:var(--border)] pt-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm text-[color:var(--muted)]">Comment</p>
          <h3 className="mt-2 text-3xl font-semibold tracking-[-0.04em]">
            댓글 {comments.length}개
          </h3>
        </div>
        <p className="max-w-md text-sm leading-6 text-[color:var(--muted)]">
          익명 로그인 없이 남길 수 있지만 수정과 삭제는 작성 당시 입력한 비밀번호로만 가능합니다.
        </p>
      </div>

      {(feedback || errorMessage) && (
        <div className="mt-6 rounded-xl border border-[color:var(--border)] bg-[color:var(--surface-strong)] px-4 py-3 text-sm text-[color:var(--foreground)]">
          {errorMessage || feedback}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="mt-8 border border-[color:var(--border)] bg-[color:var(--surface)] p-5"
      >
        <div className="grid gap-4 md:grid-cols-[1fr_1fr]">
          <input
            type="text"
            placeholder="이름"
            className="rounded-lg border border-[color:var(--border)] bg-[color:var(--surface-strong)] px-4 py-3 outline-none transition focus:border-[color:var(--foreground)]"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />
          <input
            type="password"
            placeholder="비밀번호"
            className="rounded-lg border border-[color:var(--border)] bg-[color:var(--surface-strong)] px-4 py-3 outline-none transition focus:border-[color:var(--foreground)]"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </div>
        <textarea
          placeholder="댓글을 남겨 보세요."
          className="mt-4 h-32 w-full rounded-lg border border-[color:var(--border)] bg-[color:var(--surface-strong)] px-4 py-3 outline-none transition focus:border-[color:var(--foreground)]"
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
        />
        <div className="mt-3 flex flex-wrap gap-2">
          {commentEmojis.map((emoji) => (
            <button
              key={emoji}
              type="button"
              onClick={() =>
                setForm((currentForm) => ({
                  ...currentForm,
                  content: `${currentForm.content}${emoji}`,
                }))
              }
              className="rounded-full border border-[color:var(--border)] px-3 py-1 text-sm text-[color:var(--muted)] transition hover:text-[color:var(--foreground)]"
            >
              {emoji}
            </button>
          ))}
        </div>
        <button
          type="submit"
          className="filled-control mt-4 rounded-full border px-5 py-2.5 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-70"
          disabled={isPending}
        >
          {isPending ? "처리 중..." : "댓글 등록"}
        </button>
      </form>

      <div className="mt-8 divide-y divide-[color:var(--border)]">
        {comments.map((comment) => (
          <article key={comment.id} className="py-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--border)] bg-[color:var(--surface-strong)] text-sm font-semibold text-[color:var(--foreground)]">
                  {comment.username.slice(0, 1).toUpperCase()}
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-semibold text-[color:var(--foreground)]">
                      {comment.username}
                    </span>
                    <span className="text-sm text-[color:var(--muted)]">
                      {new Date(comment.created_at).toLocaleString("ko-KR")}
                    </span>
                  </div>

                  {editingId === comment.id ? (
                    <div className="mt-4 space-y-3">
                      <textarea
                        className="h-28 w-full rounded-lg border border-[color:var(--border)] bg-[color:var(--surface-strong)] px-4 py-3 outline-none transition focus:border-[color:var(--foreground)]"
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                      />
                      <input
                        type="password"
                        placeholder="수정 비밀번호"
                        className="w-full rounded-lg border border-[color:var(--border)] bg-[color:var(--surface-strong)] px-4 py-3 outline-none transition focus:border-[color:var(--foreground)]"
                        value={editPassword}
                        onChange={(e) => setEditPassword(e.target.value)}
                      />
                      <div className="flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() => handleUpdate(comment.id)}
                          className="filled-control rounded-full border px-4 py-2 text-sm font-medium"
                        >
                          저장
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setEditingId(null);
                            setEditPassword("");
                          }}
                          className="rounded-full border border-[color:var(--border)] bg-white px-4 py-2 text-sm font-medium text-[color:var(--muted)]"
                        >
                          취소
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p className="mt-4 whitespace-pre-wrap text-sm leading-7 text-[color:var(--foreground)]">
                      {comment.content}
                    </p>
                  )}

                  {deletingId === comment.id && (
                    <div className="mt-4 border border-[color:var(--border)] bg-[color:var(--surface-strong)] p-4">
                      <p className="text-sm font-medium text-[color:var(--foreground)]">
                        삭제하려면 비밀번호를 입력해 주세요.
                      </p>
                      <div className="mt-3 flex flex-col gap-3 sm:flex-row">
                        <input
                          type="password"
                          placeholder="삭제 비밀번호"
                          className="w-full rounded-lg border border-[color:var(--border)] bg-[color:var(--surface)] px-4 py-3 outline-none transition focus:border-[color:var(--foreground)]"
                          value={deletePassword}
                          onChange={(e) => setDeletePassword(e.target.value)}
                        />
                        <button
                          type="button"
                          onClick={() => handleDelete(comment.id)}
                          className="filled-control rounded-full border px-4 py-3 text-sm font-medium"
                        >
                          삭제 확인
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setDeletingId(null);
                            setDeletePassword("");
                          }}
                          className="rounded-full border border-[color:var(--border)] bg-white px-4 py-3 text-sm font-medium text-[color:var(--muted)]"
                        >
                          취소
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {editingId !== comment.id && (
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => startEdit(comment)}
                    className="rounded-full border border-[color:var(--border)] bg-white px-4 py-2 text-sm font-medium text-[color:var(--muted)] transition hover:text-[color:var(--foreground)]"
                  >
                    수정
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setEditingId(null);
                      setDeletingId(comment.id);
                      setDeletePassword("");
                      setFeedback(null);
                      setErrorMessage(null);
                    }}
                    className="rounded-full border border-[color:var(--border)] bg-white px-4 py-2 text-sm font-medium text-[color:var(--muted)] transition hover:text-[color:var(--foreground)]"
                  >
                    삭제
                  </button>
                </div>
              )}
            </div>
          </article>
        ))}

        {comments.length === 0 && (
          <div className="py-10 text-center">
            <p className="text-xl font-semibold tracking-[-0.03em]">아직 댓글이 없습니다</p>
            <p className="mt-3 text-sm leading-7 text-[color:var(--muted)]">
              첫 번째 피드백을 남겨 보세요.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
