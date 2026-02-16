"use client";

import { useState, useEffect, useRef } from "react";
import { Send } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useChatStore } from "@/stores/useChatStore";
import { useUserStore } from "@/stores/useUserStore";
import { users } from "@/data/users";
import { cn } from "@/lib/utils";

export function ChatDrawer() {
  const [text, setText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const isChatOpen = useChatStore((s) => s.isChatOpen);
  const activeChatUserId = useChatStore((s) => s.activeChatUserId);
  const messages = useChatStore((s) => s.messages);
  const closeChat = useChatStore((s) => s.closeChat);
  const sendMessage = useChatStore((s) => s.sendMessage);
  const currentUser = useUserStore((s) => s.currentUser);

  const otherUser = users.find((u) => u.id === activeChatUserId);
  const conversation = activeChatUserId
    ? messages[activeChatUserId] ?? []
    : [];

  const initials = otherUser
    ? otherUser.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "?";

  // Auto-add a welcome message from the seller when opening a new chat
  useEffect(() => {
    if (
      isChatOpen &&
      activeChatUserId &&
      otherUser &&
      conversation.length === 0
    ) {
      // We add a mock welcome message from the seller directly to the store
      const welcomeMsg = {
        id: `msg-welcome-${activeChatUserId}`,
        senderId: activeChatUserId,
        receiverId: currentUser?.id ?? "",
        text: `Assalam o Alaikum! I'm ${otherUser.name}. How can I help you today?`,
        timestamp: new Date().toISOString(),
      };

      useChatStore.setState((state) => ({
        messages: {
          ...state.messages,
          [activeChatUserId]: [welcomeMsg],
        },
      }));
    }
  }, [isChatOpen, activeChatUserId, otherUser, currentUser?.id, conversation.length]);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation.length]);

  function handleSend() {
    const trimmed = text.trim();
    if (!trimmed) return;
    sendMessage(trimmed);
    setText("");
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <Sheet open={isChatOpen} onOpenChange={(open) => !open && closeChat()}>
      <SheetContent
        side="right"
        className="flex flex-col p-0 gap-0 w-full sm:max-w-sm"
      >
        {/* Header */}
        <SheetHeader className="border-b px-4 py-3">
          {otherUser ? (
            <div className="flex items-center gap-3">
              <Avatar size="default">
                <AvatarImage src={otherUser.avatar} alt={otherUser.name} />
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
              <div>
                <SheetTitle className="text-base">
                  {otherUser.name}
                </SheetTitle>
                <SheetDescription className="text-xs capitalize">
                  {otherUser.city}
                </SheetDescription>
              </div>
            </div>
          ) : (
            <SheetTitle>Chat</SheetTitle>
          )}
        </SheetHeader>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
          {conversation.map((msg) => {
            const isSent = msg.senderId === currentUser?.id;
            return (
              <div
                key={msg.id}
                className={cn("flex", isSent ? "justify-end" : "justify-start")}
              >
                <div
                  className={cn(
                    "max-w-[80%] rounded-2xl px-3.5 py-2 text-sm",
                    isSent
                      ? "bg-primary text-primary-foreground rounded-br-md"
                      : "bg-muted text-foreground rounded-bl-md"
                  )}
                >
                  {msg.text}
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="border-t p-3 flex items-center gap-2">
          <Input
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1"
          />
          <Button size="icon" onClick={handleSend} disabled={!text.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
