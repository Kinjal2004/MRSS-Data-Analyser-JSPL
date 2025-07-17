import { NextResponse } from "next/server";

export async function POST(req) {
  const { id, password } = await req.json();

  const validId = process.env.LOGIN_ID;
  const validPassword = process.env.LOGIN_PASSWORD;

  if (id === validId && password === validPassword) {
    const res = NextResponse.json({ message: "✅ Login successful" });
    res.cookies.set("loggedIn", "true", {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 6, // 6 hours
    });
    return res;
  }

  return NextResponse.json({ error: "❌ Invalid credentials" }, { status: 401 });
}
