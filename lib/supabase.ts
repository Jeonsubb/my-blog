// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

// 환경 변수에서 주소와 키를 가져옵니다.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Supabase 클라이언트(DB 연결 객체) 생성
export const supabase = createClient(supabaseUrl, supabaseKey);