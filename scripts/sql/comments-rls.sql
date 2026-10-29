-- comments 테이블의 anon 권한을 "비밀번호를 제외한 컬럼 조회"로만 제한합니다.
-- 작성·수정·삭제는 서버의 service_role 키(app/api/comments/route.ts)만 수행합니다.
-- 코드 배포 후 Supabase 대시보드 > SQL Editor에서 한 번 실행하면 됩니다.
alter table public.comments enable row level security;

-- 테이블 권한을 회수하면, 기존 RLS 정책이 쓰기를 허용하더라도 anon 키로는 쓸 수 없습니다.
revoke all on public.comments from anon, authenticated;

-- password 컬럼을 제외한 컬럼만 조회할 수 있게 합니다.
grant select (id, post_id, content, username, created_at) on public.comments to anon, authenticated;

drop policy if exists "comments_public_read" on public.comments;
create policy "comments_public_read" on public.comments
  for select to anon, authenticated
  using (true);
