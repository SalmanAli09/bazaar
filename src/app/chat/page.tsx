"use client";

import ChatProductDetails from '@/components/chat/ChatProductDetails';
import ChatSidebar from '@/components/chat/ChatSidebar';
import ChatWindow from '@/components/chat/ChatWindow';
import React, { useState } from 'react'; 

export default function ChatPage() {
  // State to handle mobile view switching
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-white">
      <main className="flex flex-1 overflow-hidden relative">
        
        {/* Chat List Sidebar - Hidden on mobile when a chat is open */}
        <div className={`${isChatOpen ? 'hidden' : 'flex'} w-full lg:w-80 lg:flex shrink-0`}>
          <ChatSidebar onSelectChat={() => setIsChatOpen(true)} />
        </div>

        {/* Main Chat Window - Hidden on mobile when list is open */}
        <section className={`${isChatOpen ? 'flex' : 'hidden'} flex-1 lg:flex flex-col bg-white relative`}>
          <ChatWindow onBack={() => setIsChatOpen(false)} />
        </section>

        {/* Right Info Sidebar - Only visible on XL screens */}
        <aside className="w-80 border-l border-slate-200 bg-white hidden xl:flex flex-col overflow-y-auto custom-scrollbar">
          <ChatProductDetails />
        </aside>
        
      </main>
    </div>
  );
}