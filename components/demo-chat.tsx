"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, Plus } from "lucide-react"
import Link from "next/link"

type Message = {
  role: "user" | "assistant"
  content: string
}

export function DemoChat() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "user", content: "Write a poem" },
    {
      role: "assistant",
      content:
        "Here's a poem:\n\nDigital whispers in the void,\nSilent currents, thoughts deployed,\nBinary dreams in endless flight,\nArtificial minds alight.\n\nHuman questions seek the stars,\nAI answers bridge the bars,\nTogether weaving future's lace,\nIn this vast digital space.",
    },
  ])
  const [input, setInput] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    // For demo purposes, we'll just show a message that full access requires sign in
    setInput("")
  }

  return (
    <div className="border border-[#4B5563] rounded-xl overflow-hidden shadow-[0_0_20px_rgba(0,229,255,0.15)] glow-border">
      <div className="bg-[#1A1A1A] p-4 border-b border-[#4B5563]">
        <h3 className="font-medium text-lg text-[#00E5FF]">Aai.ai</h3>
      </div>

      <div className="bg-[#0A0A0A] p-4 h-80 overflow-y-auto chat-grid-bg">
        {messages.map((message, index) => (
          <div key={index} className={`mb-4 ${message.role === "user" ? "text-right" : "text-left"}`}>
            <div
              className={`inline-block p-3 rounded-lg max-w-[85%] ${
                message.role === "user"
                  ? "bg-[#4B5563]/30 border border-[#4B5563]/50 text-left"
                  : "bg-[#1E3A8A]/30 border border-[#00E5FF]/30 shadow-[0_0_10px_rgba(0,229,255,0.2)]"
              }`}
            >
              <p className="text-xs font-semibold mb-1">{message.role === "user" ? "You" : "Aai.ai"}</p>
              <p className="text-sm whitespace-pre-line">{message.content}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-[#1A1A1A] p-4 border-t border-[#4B5563]">
        <form onSubmit={handleSubmit} className="flex items-center space-x-2">
          <div className="relative flex-1">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Aai.ai..."
              className="flex-1 bg-[#0A0A0A] border-[#4B5563] focus:border-[#00E5FF] text-white pr-10"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 text-[#4B5563] hover:text-[#00E5FF]"
              title="Upload a document"
            >
              <Plus className="h-5 w-5" />
              <span className="sr-only">Upload</span>
            </Button>
          </div>
          <Link href="/signin">
            <Button type="button" className="bg-[#00E5FF] hover:bg-[#00E5FF]/80 text-black border-0">
              <Send className="h-5 w-5" />
              <span className="sr-only">Send</span>
            </Button>
          </Link>
        </form>
      </div>
    </div>
  )
}

