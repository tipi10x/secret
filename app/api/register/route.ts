// app/api/register/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/server";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  await connectDB();
  const { username, password, confirmPassword } = await req.json();

  if (password !== confirmPassword) {
    return NextResponse.json({ error: "Mật khẩu không khớp" }, { status: 400 });
  }

  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return NextResponse.json({ error: "Tên đăng nhập đã tồn tại" }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ username, password: hashedPassword });

  return NextResponse.json({ user: { _id: user._id, username: user.username, isAdmin: user.isAdmin } });
}
