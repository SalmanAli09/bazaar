"use client";

import { create } from "zustand";
import { ChatMessage } from "@/types";
import { useUserStore } from "@/stores/useUserStore";

interface ChatState {
  messages: Record<string, ChatMessage[]>;
  activeChatUserId: string | null;
  isChatOpen: boolean;
  openChat: (userId: string) => void;
  closeChat: () => void;
  sendMessage: (text: string) => void;
}

export const useChatStore = create<ChatState>()((set, get) => ({
  messages: {},
  activeChatUserId: null,
  isChatOpen: false,

  openChat: (userId) =>
    set({
      activeChatUserId: userId,
      isChatOpen: true,
    }),

  closeChat: () =>
    set({
      activeChatUserId: null,
      isChatOpen: false,
    }),

  sendMessage: (text) => {
    const { activeChatUserId, messages } = get();
    const currentUser = useUserStore.getState().currentUser;

    if (!activeChatUserId || !currentUser) return;

    const newMessage: ChatMessage = {
      id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      senderId: currentUser.id,
      receiverId: activeChatUserId,
      text,
      timestamp: new Date().toISOString(),
    };

    const conversation = messages[activeChatUserId] ?? [];

    set({
      messages: {
        ...messages,
        [activeChatUserId]: [...conversation, newMessage],
      },
    });
  },
}));
