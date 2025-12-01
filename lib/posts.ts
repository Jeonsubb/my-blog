// src/lib/posts.ts
import { remark } from 'remark';
import html from 'remark-html';
import { supabase } from '@/lib/supabase'; // DB 연결 도구

// 1. 타입 정의 (DB 컬럼에 맞게 수정)
export interface PostData {
  id: number;           // DB ID는 숫자입니다 (bigint)
  slug: string;         // URL용 ID (문자열)
  title: string;
  created_at: string;   // DB 컬럼명 (date -> created_at)
  description?: string;
  contentHtml?: string; // HTML로 변환된 본문
  thumbnail?: string;
  category?: string;
  content?: string;     // 원본 마크다운 (수정할 때 필요)
}

// ============================================================
// 함수 1: 상세 페이지용 (특정 글 하나 가져오기 + HTML 변환)
// ============================================================
export async function getPostData(slug: string): Promise<PostData | null> {
  // 1. DB에서 slug로 글 찾기
  const { data: post, error } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !post) {
    console.error("글 조회 실패:", error);
    return null;
  }

  // 2. 마크다운(post.content)을 HTML로 변환
  // (DB에는 원본 마크다운만 있으니까요!)
  const processedContent = await remark()
    .use(html)
    .process(post.content);
  
  const contentHtml = processedContent.toString();

  return {
    ...post,
    contentHtml, // 변환된 HTML 추가
  };
}

// ============================================================
// 함수 2: 목록 페이지용 (모든 글 가져오기)
// ============================================================
export async function getSortedPostsData(): Promise<PostData[]> {
  // 1. DB에서 모든 글 가져오기 (최신순 정렬)
  const { data: posts, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error("목록 조회 실패:", error);
    return [];
  }

  return posts as PostData[];
}