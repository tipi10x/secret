// app/api/login/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/server";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  await connectDB();
  const { username, password } = await req.json();

  const user = await User.findOne({ username });
  if (!user) {
    return NextResponse.json({ error: "Sai tên đăng nhập hoặc mật khẩu" }, { status: 401 });
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return NextResponse.json({ error: "Sai tên đăng nhập hoặc mật khẩu" }, { status: 401 });
  }

  const cookieStore = await cookies();
  cookieStore.set("auth_session", user._id.toString(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 ngày
  });

  return NextResponse.json({ user: { _id: user._id, username: user.username, isAdmin: user.isAdmin } });
}
