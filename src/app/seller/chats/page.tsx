"use client";

import React, { useState } from "react";
import {
  MessageCircle,
  Search,
  Send,
  Paperclip,
  Smile,
  MoreVertical,
  Phone,
  Video,
  Circle,
  Check,
  CheckCheck,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";

interface Message {
  id: string;
  text: string;
  sender: "me" | "other";
  timestamp: string;
  status?: "sent" | "delivered" | "read";
}

interface Chat {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  isOnline: boolean;
  product?: string;
}

export default function ChatsPage() {
  const [selectedChat, setSelectedChat] = useState<string | null>("chat1");
  const [message, setMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const chats: Chat[] = [
    {
      id: "chat1",
      name: "Alex Johnson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
      lastMessage: "Is the jacket still available?",
      timestamp: "2m ago",
      unread: 2,
      isOnline: true,
      product: "Vintage Leather Jacket"
    },
    {
      id: "chat2",
      name: "Sarah Miller",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      lastMessage: "Can you do $120 for the sneakers?",
      timestamp: "15m ago",
      unread: 1,
      isOnline: true,
      product: "Retro Sneakers"
    },
    {
      id: "chat3",
      name: "Mike Chen",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
      lastMessage: "Thanks for the quick shipping!",
      timestamp: "1h ago",
      unread: 0,
      isOnline: false,
      product: "90s Band T-Shirt"
    },
    {
      id: "chat4",
      name: "Emma Davis",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
      lastMessage: "What's the condition of the watch?",
      timestamp: "2h ago",
      unread: 0,
      isOnline: false,
      product: "Antique Watch"
    },
    {
      id: "chat5",
      name: "James Wilson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=James",
      lastMessage: "I'll take it! Payment sent.",
      timestamp: "3h ago",
      unread: 0,
      isOnline: true,
      product: "Vintage Denim"
    },
  ];

  const messages: Message[] = [
    {
      id: "1",
      text: "Hi! Is the vintage leather jacket still available?",
      sender: "other",
      timestamp: "10:30 AM"
    },
    {
      id: "2",
      text: "Yes, it's still available! It's in excellent condition.",
      sender: "me",
      timestamp: "10:32 AM",
      status: "read"
    },
    {
      id: "3",
      text: "Great! Can you tell me more about the sizing?",
      sender: "other",
      timestamp: "10:33 AM"
    },
    {
      id: "4",
      text: "It's a size Large, fits true to size. I can provide measurements if needed.",
      sender: "me",
      timestamp: "10:35 AM",
      status: "read"
    },
    {
      id: "5",
      text: "Is the jacket still available?",
      sender: "other",
      timestamp: "10:36 AM"
    },
  ];

  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    chat.product?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentChat = chats.find(chat => chat.id === selectedChat);
  const currentMessages = selectedChat === "chat1" ? messages : [];

  const handleSendMessage = () => {
    if (message.trim()) {
      // Handle sending message
      setMessage("");
    }
  };

  return (
    <div className="h-[calc(100vh-8rem)] bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-black/[0.02] overflow-hidden">
      <div className="flex h-full">
        {/* Chat List Sidebar */}
        <div className="w-full md:w-96 border-r border-slate-100 flex flex-col">
          {/* Search Header */}
          <div className="p-6 border-b border-slate-50">
            <div className="flex items-center gap-3 mb-4">
              <MessageCircle size={24} className="text-[var(--primary-dark)]" />
              <h2 className="text-xl font-black text-[var(--primary-dark)]">Messages</h2>
              <span className="ml-auto bg-[var(--primary-dark)] text-white text-[10px] px-2 py-1 rounded-full font-bold">
                {chats.reduce((sum, chat) => sum + chat.unread, 0)}
              </span>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Search chats..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 rounded-xl text-[var(--primary-dark)] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>

          {/* Chat List */}
          <div className="flex-1 overflow-y-auto">
            {filteredChats.map((chat) => (
              <div
                key={chat.id}
                onClick={() => setSelectedChat(chat.id)}
                className={`p-4 border-b border-slate-50 cursor-pointer transition-all hover:bg-slate-50 ${
                  selectedChat === chat.id ? "bg-[var(--primary-dark)]/5 border-l-4 border-l-primary" : ""
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="relative">
                    <div className="size-12 rounded-xl overflow-hidden border-2 border-slate-100">
                      <img src={chat.avatar} alt={chat.name} className="w-full h-full object-cover" />
                    </div>
                    {chat.isOnline && (
                      <div className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-black text-[var(--primary-dark)] text-sm">{chat.name}</h3>
                      <span className="text-[10px] font-bold text-slate-400">{chat.timestamp}</span>
                    </div>
                    <p className="text-xs font-medium text-slate-500 truncate">{chat.lastMessage}</p>
                    {chat.product && (
                      <p className="text-[10px] font-black text-slate-300 mt-1 uppercase tracking-widest">{chat.product}</p>
                    )}
                  </div>
                  {chat.unread > 0 && (
                    <div className="bg-[var(--primary-dark)] text-white text-[10px] px-2 py-1 rounded-full font-bold">
                      {chat.unread}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="hidden md:flex flex-1 flex-col">
          {selectedChat && currentChat ? (
            <>
              {/* Chat Header */}
              <div className="p-6 border-b border-slate-50 bg-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="size-10 rounded-xl overflow-hidden border-2 border-slate-100">
                        <img src={currentChat.avatar} alt={currentChat.name} className="w-full h-full object-cover" />
                      </div>
                      {currentChat.isOnline && (
                        <div className="absolute bottom-0 right-0 size-2.5 bg-green-500 rounded-full border-2 border-white"></div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-black text-[var(--primary-dark)]">{currentChat.name}</h3>
                      <p className="text-xs font-medium text-slate-500">
                        {currentChat.isOnline ? "Active now" : "Offline"}
                      </p>
                    </div>
                    {currentChat.product && (
                      <div className="ml-4 px-3 py-1 bg-slate-100 rounded-lg">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{currentChat.product}</p>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2.5 hover:bg-slate-50 rounded-xl text-slate-400 hover:text-[var(--primary-dark)] transition-all">
                      <Phone size={18} />
                    </button>
                    <button className="p-2.5 hover:bg-slate-50 rounded-xl text-slate-400 hover:text-[var(--primary-dark)] transition-all">
                      <Video size={18} />
                    </button>
                    <button className="p-2.5 hover:bg-slate-50 rounded-xl text-slate-400 hover:text-[var(--primary-dark)] transition-all">
                      <MoreVertical size={18} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-[#f8f9fa]">
                {currentMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                        msg.sender === "me"
                          ? "bg-[var(--primary-dark)] text-white"
                          : "bg-white text-[var(--primary-dark)] border border-slate-100"
                      }`}
                    >
                      <p className="text-sm font-medium">{msg.text}</p>
                      <div className={`flex items-center gap-1 mt-2 text-xs ${
                        msg.sender === "me" ? "text-white" : "text-slate-400"
                      }`}>
                        <span>{msg.timestamp}</span>
                        {msg.sender === "me" && msg.status && (
                          <>
                            {msg.status === "sent" && <Check size={12} />}
                            {msg.status === "delivered" && <CheckCheck size={12} />}
                            {msg.status === "read" && <CheckCheck size={12} className="text-blue-300" />}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="p-6 border-t border-slate-50 bg-white">
                <div className="flex items-center gap-3">
                  <button className="p-2.5 hover:bg-slate-50 rounded-xl text-slate-400 hover:text-[var(--primary-dark)] transition-all">
                    <Paperclip size={20} />
                  </button>
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      placeholder="Type a message..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                      className="w-full px-4 py-3 bg-slate-50 rounded-xl text-[var(--primary-dark)] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <button className="p-2.5 hover:bg-slate-50 rounded-xl text-slate-400 hover:text-[var(--primary-dark)] transition-all">
                    <Smile size={20} />
                  </button>
                  <button
                    onClick={handleSendMessage}
                    className="p-2.5 bg-[var(--primary-dark)] text-white rounded-xl hover:bg-[var(--primary-dark)]/90 transition-all"
                  >
                    <Send size={20} />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-slate-400">
              <div className="text-center">
                <MessageCircle size={48} className="mx-auto mb-4 opacity-50" />
                <p className="font-black text-[var(--primary-dark)]">Select a chat to start messaging</p>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Back Button */}
        <div className="md:hidden fixed bottom-6 left-6 z-10">
          <Link
            href="/seller/dashboard"
            className="bg-[var(--primary-dark)] text-white p-3 rounded-full shadow-lg shadow-primary/20 hover:scale-105 transition-all"
          >
            <ArrowLeft size={20} />
          </Link>
        </div>
      </div>
    </div>
  );
}
