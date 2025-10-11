import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  console.log(token);

  // jika ke /admin tapi belum login
  if (pathname.startsWith("/signin") && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // jika ke /login tapi sudah login
  if (pathname.startsWith("/signin") && token) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/signin"],
};
