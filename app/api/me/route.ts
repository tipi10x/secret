import { NextResponse } from "next/server";
import { connectDB } from "@/lib/server";
import User from "@/models/User";
import { cookies } from "next/headers";

export async function GET() {
  await connectDB();
  const cookieStore = await cookies();
  const userId = cookieStore.get("auth_session")?.value;

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await User.findById(userId).select("-password");
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json(user);
}
