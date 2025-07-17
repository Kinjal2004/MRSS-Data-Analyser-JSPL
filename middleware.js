import { NextResponse } from "next/server";

export function middleware(req) {
  const loggedIn = req.cookies.get("loggedIn")?.value === "true";
  const url = req.nextUrl.pathname;

  if (!loggedIn && url !== "/login") {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|static|favicon.ico).*)"], // protect all except static/api
};
