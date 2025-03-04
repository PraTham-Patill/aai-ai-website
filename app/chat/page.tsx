"use client";

import type React from "react";
import { useState, useRef, useEffect, ChangeEvent } from "react";
import { useChat } from "ai/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  PlusCircle,
  History,
  Settings,
  LogOut,
  Send,
  Menu,
  X,
  Paperclip,
  ChevronDown,
  Moon,
  Globe,
  Trash2,
} from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// Chat history type
type ChatHistory = {
  id: string;
  title: string;
};

// Child component to isolate useChat
function ChatContent() {
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const [chatHistory, setChatHistory] = useState<ChatHistory[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load chat history from localStorage on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem("chatHistory");
    if (savedHistory) {
      setChatHistory(JSON.parse(savedHistory));
    }
  }, []);

  // Save chat history to localStorage whenever it changes
  useEffect(() => {
    if (chatHistory.length > 0) {
      localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
    } else {
      localStorage.removeItem("chatHistory");
    }
  }, [chatHistory]);

  const { messages, input, handleInputChange, handleSubmit, isLoading, error, append, setMessages } = useChat({
    api: "/api/chat",
    initialMessages: [
      {
        id: "welcome",
        role: "assistant",
        content: "Hey! I'm Aai.ai—ask me anything!",
      },
    ],
  });

  // Handle file upload
  const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    event.target.value = ""; // Reset the file input

    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = async () => {
        const base64Image = reader.result as string;
        await append({
          role: "user",
          content: `I uploaded an image: ${base64Image}`,
        });
      };
      reader.readAsDataURL(file);
    } else if (file.type === "text/plain") {
      const reader = new FileReader();
      reader.onload = async () => {
        const textContent = reader.result as string;
        await append({
          role: "user",
          content: `I uploaded a text file with the following content:\n\n${textContent}`,
        });
      };
      reader.readAsText(file);
    } else {
      await append({
        role: "user",
        content: `I uploaded a file: ${file.name} (type: ${file.type}).`,
      });
    }
  };

  // Save the current chat and start a new one
  const handleNewChat = () => {
    if (messages.length > 1) {
      const id = Date.now().toString(); // Use timestamp as a unique ID
      const title = messages[1].content.slice(0, 30) + (messages[1].content.length > 30 ? "..." : "");
      const newChat = { id, title };
      setChatHistory((prev) => [...prev, newChat]);
      localStorage.setItem(id, JSON.stringify(messages)); // Save messages to localStorage
      return newChat;
    }

    // Start a new chat
    setMessages([
      {
        id: "welcome",
        role: "assistant",
        content: "Hey! I'm Aai.ai—ask me anything!",
      },
    ]);
    setCurrentChatId(null);
    return null;
  };

  // Load a specific chat from localStorage
  const loadChat = (chatId: string) => {
    const savedMessages = localStorage.getItem(chatId);
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
      setCurrentChatId(chatId);
    } else {
      // If the chat isn't found, remove it from history
      setChatHistory((prev) => {
        const updatedHistory = prev.filter((chat) => chat.id !== chatId);
        return updatedHistory;
      });
      // Reset to a new chat if the current chat was deleted
      if (currentChatId === chatId) {
        setMessages([
          {
            id: "welcome",
            role: "assistant",
            content: "Hey! I'm Aai.ai—ask me anything!",
          },
        ]);
        setCurrentChatId(null);
      }
    }
  };

  // Clear all chat history from localStorage
  const clearHistory = () => {
    chatHistory.forEach((chat) => {
      localStorage.removeItem(chat.id); // Remove individual chat messages
    });
    localStorage.removeItem("chatHistory"); // Remove the chat history list
    setChatHistory([]); // Clear the history state
    // Reset the current chat to a new one
    setMessages([
      {
        id: "welcome",
        role: "assistant",
        content: "Hey! I'm Aai.ai—ask me anything!",
      },
    ]);
    setCurrentChatId(null);
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    error,
    handleNewChat,
    fileInputRef,
    handleFileUpload,
    messagesEndRef,
    currentChatId,
    setCurrentChatId,
    setMessages,
    chatHistory,
    setChatHistory,
    loadChat,
    clearHistory,
  };
}

export default function Chat() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    error,
    handleNewChat,
    fileInputRef,
    handleFileUpload,
    messagesEndRef,
    currentChatId,
    setCurrentChatId,
    setMessages,
    chatHistory,
    setChatHistory,
    loadChat,
    clearHistory,
  } = ChatContent();

  // Handle new chat button click
  const onNewChatClick = async () => {
    const newChat = await handleNewChat();
    if (newChat) {
      setChatHistory((prev) => [...prev, newChat]);
    }
  };

  // Handle history item click
  const onHistoryClick = async (chatId: string) => {
    loadChat(chatId);
  };

  // Handle clear history button click
  const onClearHistoryClick = () => {
    clearHistory();
  };

  return (
    <div className="flex h-screen bg-[#0A0A0A] text-white">
      {/* Mobile sidebar toggle */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-[#1A1A1A] rounded-md border border-[#4B5563]"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed md:relative w-64 h-full bg-[#1A1A1A] border-r border-[#4B5563] shadow-[0_0_15px_rgba(0,229,255,0.1)] transition-all duration-300 z-40 ${
          sidebarOpen ? "left-0" : "-left-64 md:left-0"
        }`}
      >
        <div className="p-4">
          <Link
            href="/"
            className="text-2xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] to-[#00E5FF] block mb-8"
          >
            Aai.ai Chat
          </Link>

          <nav className="space-y-2">
            <Button
              variant="ghost"
              className="w-full justify-start text-gray-300 hover:text-[#00E5FF] hover:bg-[#4B5563]/20"
              onClick={onNewChatClick}
            >
              <PlusCircle className="mr-2 h-5 w-5" />
              New Chat
            </Button>

            <div className="space-y-1 mt-4">
              <p className="text-xs text-[#4B5563] font-medium px-3 py-1">HISTORY</p>
              {chatHistory.length === 0 ? (
                <p className="text-xs text-gray-500 px-3 py-1">No chat history available.</p>
              ) : (
                chatHistory.map((chat) => (
                  <Button
                    key={chat.id}
                    variant="ghost"
                    className="w-full justify-start text-gray-300 hover:text-[#00E5FF] hover:bg-[#4B5563]/20 text-sm"
                    onClick={() => onHistoryClick(chat.id)}
                  >
                    <History className="mr-2 h-4 w-4" />
                    {chat.title}
                  </Button>
                ))
              )}
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="w-full justify-between text-gray-300 hover:text-[#00E5FF] hover:bg-[#4B5563]/20 mt-4"
                >
                  <div className="flex items-center">
                    <Settings className="mr-2 h-5 w-5" />
                    Settings
                  </div>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-[#1A1A1A] border-[#4B5563] text-white">
                <DropdownMenuItem className="hover:bg-[#4B5563]/20 hover:text-[#00E5FF] cursor-pointer">
                  <Moon className="mr-2 h-4 w-4" />
                  <span>Dark Mode</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-[#4B5563]/20 hover:text-[#00E5FF] cursor-pointer">
                  <Globe className="mr-2 h-4 w-4" />
                  <span>Language</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="hover:bg-[#4B5563]/20 hover:text-[#00E5FF] cursor-pointer"
                  onClick={onClearHistoryClick}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  <span>Clear History</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        </div>

        <div className="absolute bottom-4 left-0 right-0 px-4">
          <Link href="/">
            <Button
              variant="ghost"
              className="w-full justify-start text-gray-300 hover:text-red-400 hover:bg-[#4B5563]/20"
            >
              <LogOut className="mr-2 h-5 w-5" />
              Logout
            </Button>
          </Link>
        </div>
      </div>

      {/* Main chat area */}
      <div className="flex-1 flex flex-col h-full chat-grid-bg">
        {/* Chat messages */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="max-w-3xl mx-auto">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`mb-6 ${message.role === "user" ? "ml-auto" : "mr-auto"} max-w-[85%]`}
              >
                <div
                  className={`p-4 rounded-xl ${
                    message.role === "user"
                      ? "bg-[#4B5563]/30 border border-[#4B5563]/50 ml-auto"
                      : "bg-[#1E3A8A]/30 border border-[#00E5FF]/30 mr-auto shadow-[0_0_10px_rgba(0,229,255,0.2)]"
                  }`}
                >
                  <p className="text-sm font-semibold mb-1">{message.role === "user" ? "You" : "Aai.ai"}</p>
                  <div className="prose prose-invert text-gray-200">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {message.content}
                    </ReactMarkdown>
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="mb-6 mr-auto max-w-[85%]">
                <div className="p-4 rounded-xl bg-[#1E3A8A]/20 border border-[#00E5FF]/20 mr-auto animate-pulse">
                  <p className="text-sm font-semibold mb-1">Aai.ai</p>
                  <p className="text-gray-200">Connecting to Aai.ai...</p>
                </div>
              </div>
            )}
            {error && (
              <div className="mb-6 mr-auto max-w-[85%]">
                <div className="p-4 rounded-xl bg-red-600/30 border border-red-600/50 mr-auto">
                  <p className="text-sm font-semibold mb-1">Aai.ai</p>
                  <p className="text-gray-200">
                    I'm sorry, I'm having trouble connecting right now. Please try again later or rephrase your question.
                  </p>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input area */}
        <div className="border-t border-[#4B5563] p-4 bg-[#1A1A1A]">
          <div className="max-w-3xl mx-auto">
            <form onSubmit={handleSubmit} className="flex items-center space-x-2">
              <div className="relative flex-1">
                <Input
                  value={input}
                  onChange={handleInputChange}
                  placeholder="Message Aai.ai..."
                  className="flex-1 bg-[#0A0A0A] border-[#4B5563] focus:border-[#00E5FF] text-white pr-10"
                  disabled={isLoading}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 text-[#4B5563] hover:text-[#00E5FF]"
                  title="Upload a file or image"
                  disabled={isLoading}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Paperclip className="h-5 w-5" />
                  <span className="sr-only">Upload file or image</span>
                </Button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept="image/*,text/plain"
                  className="hidden"
                  disabled={isLoading}
                />
              </div>
              <Button
                type="submit"
                className="bg-[#00E5FF] hover:bg-[#00E5FF]/80 text-black border-0"
                disabled={isLoading}
              >
                <Send className="h-5 w-5" />
                <span className="sr-only">Send</span>
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}