import type { NextFetchEvent, NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {
  ADMIN_SESSION_COOKIE_NAME,
  sanitizeAdminRedirect,
  verifyAdminSessionToken,
} from "@/lib/admin-session";
import { isCrawlerUserAgent, recordTrafficLog } from "@/lib/traffic-log";

export async function middleware(request: NextRequest, event: NextFetchEvent) {
  const { pathname, search } = request.nextUrl;
  const userAgent = request.headers.get("user-agent") || "";

  if (
    !pathname.startsWith("/admin") &&
    !pathname.startsWith("/api") &&
    isCrawlerUserAgent(userAgent)
  ) {
    // waitUntil: 응답을 먼저 보내고 로그 기록은 백그라운드에서 마저 처리한다.
    event.waitUntil(
      recordTrafficLog({
        kind: "crawler",
        path: pathname,
        userAgent,
        ip: request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || null,
      }),
    );
  }

  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  const isLoginPage = pathname === "/admin/login";
  const token = request.cookies.get(ADMIN_SESSION_COOKIE_NAME)?.value;
  const isAuthenticated = await verifyAdminSessionToken(token);

  if (isLoginPage && isAuthenticated) {
    return NextResponse.redirect(new URL("/admin/write", request.url));
  }

  if (!isLoginPage && !isAuthenticated) {
    const redirectTarget = sanitizeAdminRedirect(`${pathname}${search}`);
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("redirectTo", redirectTarget);

    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|favicon1.ico).*)"],
};
