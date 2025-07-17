import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json({ message: "✅ Logged out successfully" });

  // Remove the cookie by setting it to empty and expiring it immediately
  res.cookies.set("loggedIn", "", {
    httpOnly: true,
    path: "/",
    maxAge: 0, // Expire immediately
  });

  return res;
}
