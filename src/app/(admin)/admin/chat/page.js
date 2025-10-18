"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import io from "socket.io-client";
import { useAuth } from "@/context/AuthContext";
import { apiBase } from "@/services/apiBase";
import { configEnv } from "@/services/config";

export default function ChatRoom() {
  const { user } = useAuth();
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  const messagesEndRef = useRef(null);

  // ==========================
  // ✅ Fetch semua user (kecuali diri sendiri)
  // ==========================
  const fetchUsers = useCallback(async () => {
    if (!user?.id) return;
    setIsLoading(true);
    try {
      const { data } = await apiBase().get("/v1/users/alluser");
      const list = data.data
        .filter((u) => u.id !== user.id)
        .map((u) => ({ id: u.id, name: u.name, email: u.email }));
      setUsers(list);
    } catch (err) {
      console.error("Error fetching users:", err);
    } finally {
      setIsLoading(false);
    }
  }, [user?.id]);

  // ==========================
  // ✅ Scroll otomatis ke bawah
  // ==========================
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  // ==========================
  // ✅ Setup Socket.IO
  // ==========================
  useEffect(() => {
    if (!user?.id) return;

    const s = io(configEnv.baseUrl, {
      query: { userId: user.id.toString() },
      transports: ["websocket"],
    });

    s.on("connect", () => {
      console.log("✅ Socket connected:", s.id);
      setIsConnected(true);
    });

    s.on("disconnect", () => {
      console.log("❌ Socket disconnected");
      setIsConnected(false);
    });

    s.on("connect_error", (err) => {
      console.error("⚠️ Socket connect error:", err.message);
      setIsConnected(false);
    });

    // Pesan pribadi diterima
    s.on("private_message", (data) => {
      console.log("📩 Received:", data);

      const cleanData = {
        from: Number(data.from),
        to: Number(data.to),
        message: data.message,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, cleanData]);
    });

    setSocket(s);
    fetchUsers();

    return () => {
      s.disconnect();
      setIsConnected(false);
    };
  }, [user?.id, fetchUsers]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // ==========================
  // ✅ Kirim pesan
  // ==========================
  const sendMessage = (e) => {
    e.preventDefault();
    if (!message.trim() || !selectedUser || !socket || !isConnected) return;

    const msg = {
      to: selectedUser.id.toString(),
      message: message.trim(),
      from: user.id,
      timestamp: new Date(),
    };

    socket.emit("private_message", msg);
    setMessages((prev) => [...prev, msg]);
    setMessage("");
  };

  const handleUserSelect = (u) => {
    setSelectedUser(u);
    setMessages([]); // reset pesan setiap user baru
  };

  // ==========================
  // ✅ UI
  // ==========================
  return (
    <div className="flex h-screen max-w-6xl mx-auto border rounded-lg shadow bg-gray-50">
      {/* Sidebar */}
      <aside className="w-1/3 bg-white border-r">
        <div className="p-3 border-b">
          <h2 className="font-semibold text-gray-700">Pilih User</h2>
          <div className="flex items-center mt-2">
            <span
              className={`mr-2 h-2 w-2 rounded-full ${
                isConnected ? "bg-green-500" : "bg-red-500"
              }`}
            ></span>
            <span className="text-xs text-gray-500">
              {isConnected ? "Terhubung" : "Tidak terhubung"}
            </span>
          </div>
        </div>

        {isLoading ? (
          <div className="p-4 text-center text-gray-500">Memuat...</div>
        ) : (
          <ul className="overflow-y-auto">
            {users.map((u) => (
              <li
                key={u.id}
                onClick={() => handleUserSelect(u)}
                className={`cursor-pointer border-b p-3 transition-colors ${
                  selectedUser?.id === u.id
                    ? "bg-blue-500 text-white"
                    : "text-gray-800 hover:bg-blue-50"
                }`}
              >
                <div className="font-medium">{u.name || u.email}</div>
                <div className="text-xs opacity-75">{u.email}</div>
              </li>
            ))}
          </ul>
        )}
      </aside>

      {/* Area Chat */}
      <main className="flex flex-col flex-1">
        {selectedUser ? (
          <>
            <header className="flex items-center justify-between p-4 font-semibold bg-white border-b">
              <div>
                <h3 className="text-lg">
                  Chat dengan {selectedUser.name || selectedUser.email}
                </h3>
                <p className="text-sm text-gray-500">{selectedUser.email}</p>
              </div>
            </header>

            <div className="flex-1 p-4 space-y-3 overflow-y-auto bg-gray-50">
              {messages
                .filter(
                  (m) =>
                    (m.from === user.id && m.to === selectedUser.id) ||
                    (m.from === selectedUser.id && m.to === user.id)
                )
                .map((m, i) => (
                  <div
                    key={i}
                    className={`flex ${
                      m.from === user.id ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[75%] rounded-lg p-3 shadow-sm ${
                        m.from === user.id
                          ? "bg-blue-500 text-white"
                          : "border bg-white text-gray-800"
                      }`}
                    >
                      <p className="text-sm">{m.message}</p>
                      <span
                        className={`mt-1 block text-xs ${
                          m.from === user.id ? "text-blue-100" : "text-gray-400"
                        }`}
                      >
                        {new Date(m.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                ))}
              <div ref={messagesEndRef} />
            </div>

            <form
              onSubmit={sendMessage}
              className="flex items-center p-4 bg-white border-t"
            >
              <input
                type="text"
                className="flex-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-300 focus:outline-none"
                placeholder="Ketik pesan..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                disabled={!isConnected}
              />
              <button
                type="submit"
                disabled={!isConnected || !message.trim()}
                className="px-6 py-3 ml-3 text-white transition-colors bg-blue-500 rounded-lg hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-gray-400"
              >
                Kirim
              </button>
            </form>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center flex-1 text-gray-400">
            <div className="mb-4 text-6xl">💬</div>
            <h3 className="mb-2 text-xl font-medium">
              Pilih user untuk mulai chat
            </h3>
            <p className="text-sm">
              Klik pada user di sidebar untuk memulai percakapan
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
