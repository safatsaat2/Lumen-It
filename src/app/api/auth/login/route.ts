import { NextResponse } from "next/server";

import {
  createSessionToken,
  sessionCookieOptions,
  verifyCredentials,
} from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      username?: string;
      password?: string;
    };

    if (!body.username || !body.password) {
      return NextResponse.json(
        { ok: false, error: "Username and password are required." },
        { status: 400 },
      );
    }

    if (!verifyCredentials(body.username, body.password)) {
      return NextResponse.json(
        { ok: false, error: "Invalid username or password." },
        { status: 401 },
      );
    }

    const token = await createSessionToken(body.username.trim());
    const response = NextResponse.json({ ok: true });
    response.cookies.set(sessionCookieOptions(token));
    return response;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Login failed." },
      { status: 500 },
    );
  }
}
