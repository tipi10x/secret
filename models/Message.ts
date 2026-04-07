import mongoose, { Schema, model, models } from "mongoose";

const MessageSchema = new Schema(
  {
    roomId: { type: String, required: true, index: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    username: { type: String, required: true },
    text: { type: String, default: "" },
    imageUrl: { type: String, default: null },
    imageMode: { type: String, enum: ["normal", "once"], default: "normal" },
    onceViewedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    deleted: { type: Boolean, default: false },
    deletedAt: { type: Date, default: null },
    seenBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true },
);

// ✅ Thêm indexes để tăng tốc truy vấn thường dùng
MessageSchema.index({ roomId: 1, createdAt: -1 }); // Phân trang tin nhắn theo room
MessageSchema.index({ roomId: 1, seenBy: 1 }); // Tìm tin nhắn chưa đọc
MessageSchema.index({ userId: 1, createdAt: -1 }); // Lấy tin nhắn của user (nếu cần)

const Message = models.Message || model("Message", MessageSchema);
export default Message;
