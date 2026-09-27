import { NextRequest, NextResponse } from "next/server";
import { isAdminAuthConfigured, verifyAdminPassword } from "@/lib/admin-password";
import {
  ADMIN_SESSION_COOKIE_NAME,
  createAdminSessionToken,
  getAdminSessionClearingOptions,
  getAdminSessionCookieOptions,
} from "@/lib/admin-session";
import { recordTrafficLog } from "@/lib/traffic-log";

export const runtime = "nodejs";

function normalizeText(value: unknown, maxLength: number) {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim().slice(0, maxLength);
}

export async function POST(request: NextRequest) {
  if (!isAdminAuthConfigured) {
    return NextResponse.json(
      { error: "관리자 인증 환경변수가 설정되지 않았습니다." },
      { status: 503 },
    );
  }

  const body = await request.json();
  const password = normalizeText(body.password, 200);

  if (!password) {
    return NextResponse.json({ error: "비밀번호를 입력해 주세요." }, { status: 400 });
  }

  const isValid = await verifyAdminPassword(password);
  const userAgent = request.headers.get("user-agent");
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || null;

  if (!isValid) {
    await recordTrafficLog({
      kind: "admin_login_failure",
      path: "/api/admin/session",
      userAgent,
      ip,
    });

    return NextResponse.json({ error: "인증에 실패했습니다." }, { status: 401 });
  }

  await recordTrafficLog({
    kind: "admin_login_success",
    path: "/api/admin/session",
    userAgent,
    ip,
  });

  const token = await createAdminSessionToken();

  if (!token) {
    return NextResponse.json({ error: "세션을 생성하지 못했습니다." }, { status: 500 });
  }

  const response = NextResponse.json({ success: true });
  const options = getAdminSessionCookieOptions();

  response.cookies.set({
    name: ADMIN_SESSION_COOKIE_NAME,
    value: token,
    httpOnly: options.httpOnly,
    maxAge: options.maxAge,
    path: options.path,
    sameSite: options.sameSite,
    secure: options.secure,
  });

  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });
  const options = getAdminSessionClearingOptions();

  response.cookies.set({
    name: ADMIN_SESSION_COOKIE_NAME,
    value: "",
    httpOnly: options.httpOnly,
    maxAge: options.maxAge,
    path: options.path,
    sameSite: options.sameSite,
    secure: options.secure,
  });

  return response;
}
