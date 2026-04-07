"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { getPusherClient } from "@/lib/client";
import { MessageCircle } from "lucide-react";

export function ConversationList({
  userId,
  onSelectRoom,
  selectedRoomId,
}: {
  userId: string;
  onSelectRoom: (roomId: string, otherUser: any) => void;
  selectedRoomId?: string;
}) {
  const [rooms, setRooms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const isMounted = useRef(true);

  const fetchRooms = useCallback(async () => {
    try {
      const res = await fetch("/api/rooms");
      if (!res.ok) throw new Error();
      const data = await res.json();
      if (isMounted.current) {
        setRooms(data);
        setLoading(false);
      }
    } catch (err) {
      console.error("Failed to fetch rooms", err);
      if (isMounted.current) setLoading(false);
    }
  }, []);

  // Fetch lần đầu và khi userId thay đổi
  useEffect(() => {
    isMounted.current = true;
    fetchRooms();

    const pusher = getPusherClient();
    const channel = pusher.subscribe(`user-${userId}`);

    const handleRoomsUpdate = () => {
      fetchRooms(); // refresh khi có tin nhắn mới
    };
    channel.bind("rooms-updated", handleRoomsUpdate);

    return () => {
      isMounted.current = false;
      channel.unbind("rooms-updated", handleRoomsUpdate);
      channel.unbind_all();
      pusher.unsubscribe(`user-${userId}`);
    };
  }, [userId, fetchRooms]);

  // Tự động chọn room đầu tiên (chỉ chạy 1 lần khi rooms vừa load xong và chưa có selected)
  useEffect(() => {
    if (!loading && rooms.length > 0 && !selectedRoomId) {
      const firstRoom = rooms[0];
      onSelectRoom(firstRoom.roomId, firstRoom.otherUser);
    }
  }, [loading, rooms, selectedRoomId, onSelectRoom]);

  if (loading) return <div className="p-2 text-sm">Đang tải...</div>;

  return (
    <div className="flex flex-col h-full">
      <div className="p-2 font-bold border-b">Tin nhắn</div>
      <div className="flex-1 overflow-auto">
        {rooms.length === 0 && <div className="p-2 text-gray-400 text-sm">Chưa có cuộc trò chuyện</div>}
        {rooms.map((room: any) => (
          <div
            key={room.roomId}
            onClick={() => onSelectRoom(room.roomId, room.otherUser)}
            className={`p-2 hover:bg-gray-100 cursor-pointer border-b flex items-center gap-2 ${
              selectedRoomId === room.roomId ? "bg-blue-50" : ""
            }`}>
            <MessageCircle className="w-4 h-4" />
            <span className="text-sm">{room.otherUser?.username || "Unknown"}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
