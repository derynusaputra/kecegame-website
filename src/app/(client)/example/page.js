"use client";
import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:3000"); // ganti port sesuai backend kamu

export default function ChatRoom() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // terima pesan dari server
    socket.on("message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    // cleanup listener saat komponen unmount
    return () => {
      socket.off("message");
    };
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    socket.emit("message", message);
    setMessage("");
  };

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto border rounded-lg shadow bg-gray-50">
      <div className="flex-1 p-4 space-y-2 overflow-y-auto">
        {messages.map((msg, i) => (
          <div
            key={i}
            className="w-fit max-w-[80%] rounded-lg bg-blue-500 p-2 text-white"
          >
            {msg}
          </div>
        ))}
      </div>

      <form
        onSubmit={sendMessage}
        className="flex items-center p-3 bg-white border-t"
      >
        <input
          type="text"
          className="flex-1 p-2 border rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
          placeholder="Ketik pesan..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          type="submit"
          className="px-4 py-2 ml-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
        >
          Kirim
        </button>
      </form>
    </div>
  );
}
