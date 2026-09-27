-- 크롤러 방문과 관리자 로그인 이벤트를 기록하는 테이블.
-- Supabase 대시보드 > SQL Editor에서 한 번 실행하면 됩니다.
create table if not exists public.traffic_logs (
  id bigint generated always as identity primary key,
  occurred_at timestamptz not null default now(),
  kind text not null check (kind in ('crawler', 'admin_login_failure', 'admin_login_success')),
  path text,
  user_agent text,
  ip text,
  detail text
);

-- RLS를 켜고 정책을 만들지 않으면 anon 키로는 읽기/쓰기가 전부 차단됩니다.
-- 서버의 service_role 키만 이 테이블에 접근할 수 있습니다.
alter table public.traffic_logs enable row level security;

create index if not exists traffic_logs_occurred_at_idx on public.traffic_logs (occurred_at desc);
create index if not exists traffic_logs_kind_idx on public.traffic_logs (kind);
