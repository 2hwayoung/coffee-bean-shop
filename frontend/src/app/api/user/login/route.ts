import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    const loginResponse = await fetch(
      "http://localhost:8080/api/v1/user/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      }
    );

    if (!loginResponse.ok) {
      return NextResponse.json({ error: "Failed to login" }, { status: 401 });
    }

    const setCookieHeader = loginResponse.headers.get("set-cookie");
    const { data } = await loginResponse.json();
    const accessToken = data["access"] || "";

    const response = NextResponse.json({ success: true });

    response.cookies.set({
      name: "accessToken",
      value: accessToken,
      httpOnly: true,
      path: "/",
    });

    if (setCookieHeader) {
      response.headers.append("Set-Cookie", setCookieHeader);
    }
    return response;
  } catch (err) {
    console.error("Login route error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
