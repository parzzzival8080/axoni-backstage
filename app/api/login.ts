// app/api/login/route.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import axios from "axios";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  try {
    const { data } = await axios.post("https://api.coinchi.co/api/v1/login", {
      email,
      password,
    });

    const token = data.token;
    const user = data.user;

    const res = NextResponse.json({ success: true, user });

    res.cookies.set("auth_token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
    });

    res.cookies.set("user_role", "admin", {
      httpOnly: false,
      secure: true,
      sameSite: "strict",
      path: "/",
    });

    return res;
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Invalid credentials" },
      { status: 401 }
    );
  }
}
