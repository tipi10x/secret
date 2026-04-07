import { NextResponse } from "next/server";
import { connectDB } from "@/lib/server";
import User from "@/models/User";
import { cookies } from "next/headers";

export async function POST() {
  await connectDB();

  const cookieStore = await cookies();
  const userId = cookieStore.get("auth_session")?.value;

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await User.findByIdAndUpdate(userId, { lastActive: new Date() });

  return NextResponse.json({ success: true });
}
