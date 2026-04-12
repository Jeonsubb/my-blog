import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {
  ADMIN_SESSION_COOKIE_NAME,
  sanitizeAdminRedirect,
  verifyAdminSessionToken,
} from "@/lib/admin-session";

export async function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const isLoginPage = pathname === "/admin/login";
  const token = request.cookies.get(ADMIN_SESSION_COOKIE_NAME)?.value;
  const isAuthenticated = await verifyAdminSessionToken(token);

  if (isLoginPage && isAuthenticated) {
    return NextResponse.redirect(new URL("/admin/write", request.url));
  }

  if (pathname.startsWith("/admin") && !isLoginPage && !isAuthenticated) {
    const redirectTarget = sanitizeAdminRedirect(`${pathname}${search}`);
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("redirectTo", redirectTarget);

    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
