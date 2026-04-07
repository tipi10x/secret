import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/server";
import Message from "@/models/Message";
import { cookies } from "next/headers";
import User from "../../../../../models/User";

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  await connectDB();

  const cookieStore = await cookies();
  const userId = cookieStore.get("auth_session")?.value;

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await User.findById(userId);
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const { id } = await params;
  const message = await Message.findById(id);

  if (!message) {
    return NextResponse.json({ error: "Message not found" }, { status: 404 });
  }

  const isSender = message.userId.toString() === userId;
  const isAdmin = user.isAdmin;

  // ✅ Người gửi hoặc admin: luôn trả về ảnh, không ghi nhận viewed
  if (isSender || isAdmin) {
    return NextResponse.json({ success: true, imageUrl: message.imageUrl });
  }

  // ❌ Người nhận đã xem trước đó
  if (message.onceViewedBy?.includes(userId)) {
    return NextResponse.json({ error: "Bạn đã xem ảnh này rồi" }, { status: 403 });
  }

  // ✅ Người nhận lần đầu: ghi nhận và trả ảnh
  await Message.updateOne({ _id: id }, { $addToSet: { onceViewedBy: userId } });
  return NextResponse.json({ success: true, imageUrl: message.imageUrl });
}
