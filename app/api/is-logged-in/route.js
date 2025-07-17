// /app/api/is-logged-in/route.js
import { NextResponse } from 'next/server';

export async function GET(req) {
  const authCookie = req.cookies.get('auth');
  return NextResponse.json({ loggedIn: !!authCookie });
}
