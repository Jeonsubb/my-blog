import "server-only";

import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { ADMIN_SESSION_COOKIE_NAME, verifyAdminSessionToken } from "@/lib/admin-session";

export async function hasAdminSessionFromRequest(request: NextRequest) {
  return verifyAdminSessionToken(request.cookies.get(ADMIN_SESSION_COOKIE_NAME)?.value);
}

export async function hasAdminSessionFromCookies() {
  const cookieStore = await cookies();
  return verifyAdminSessionToken(cookieStore.get(ADMIN_SESSION_COOKIE_NAME)?.value);
}

export function unauthorizedAdminResponse() {
  return NextResponse.json(
    { error: "관리자 인증이 필요합니다." },
    {
      status: 401,
    },
  );
}
