// src/app/api/comments/route.ts
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase'; // 어제 만든 Supabase 연결 도구

// 1. 댓글 조회 (GET 요청)
// 사용법: /api/comments?postId=nextjs-start
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const postId = searchParams.get('postId');

  // 에러 처리: postId가 없으면 "뭘 달라는 거야?" 하고 거절
  if (!postId) {
    return NextResponse.json({ error: 'Post ID is required' }, { status: 400 });
  }

  // Supabase에 쿼리 날리기 (SELECT * FROM comments WHERE post_id = ...)
  const { data, error } = await supabase
    .from('comments')
    .select('*')
    .eq('post_id', postId)
    .order('created_at', { ascending: false }); // 최신순 정렬

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

// 2. 댓글 작성 (POST 요청)
export async function POST(request: Request) {
  // 프론트에서 보낸 데이터(본문, 작성자, 비번 등)를 받음
  const body = await request.json();
  const { postId, content, username, password } = body;

  // 유효성 검사: 하나라도 빠지면 안 됨
  if (!postId || !content || !username || !password) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  // Supabase에 저장 (INSERT INTO comments ...)
  const { data, error } = await supabase
    .from('comments')
    .insert([
      {
        post_id: postId,
        content,
        username,
        password, // 실무에서는 암호화해야 하지만, 지금은 연습이니 그냥 넣습니다.
      },
    ])
    .select();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, data });
}