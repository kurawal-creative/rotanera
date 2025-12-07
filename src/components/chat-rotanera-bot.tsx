"use client";

import { Send } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import ReactMarkdown from "react-markdown";
import { createClient } from "@/lib/supabase/client";
import { AuthChangeEvent, Session } from "@supabase/supabase-js"; // Tambahan: Import types buat fix TS error

const ChatRotaneraBot = () => {
  const supabase = createClient();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
  const [username, setUsername] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Update username dari Supabase session
  useEffect(() => {
    let isMounted = true;

    const getInitialSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (isMounted && session?.user?.user_metadata?.name) {
          setUsername(session.user.user_metadata.name);
        } else if (isMounted) {
          setUsername(null);
        }
      } catch (error) {
        console.error("Error getting session:", error);
        if (isMounted) setUsername(null);
      }
    };

    getInitialSession();

    // Listen to auth changes (dengan type explicit buat fix TS error)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event: AuthChangeEvent, session: Session | null) => {
        if (event === "SIGNED_IN" && session?.user?.user_metadata?.name) {
          setUsername(session.user.user_metadata.name);
        } else if (event === "SIGNED_OUT") {
          setUsername(null);
        }
      }
    );

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [supabase]);

  // Auto-scroll ke bawah setiap pesan baru muncul
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading || !username) return;

    const userMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input, username }),
      });

      const data = await res.json();
      if (res.ok) {
        const botMsg = { sender: "bot", text: data.reply };
        setMessages((prev) => [...prev, botMsg]);
      } else {
        const errorMsg = { sender: "bot", text: data.error || "Maaf, ada kesalahan. Coba lagi!" };
        setMessages((prev) => [...prev, errorMsg]);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMsg = { sender: "bot", text: "Ups, koneksi bermasalah. Coba refresh halaman ya!" };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  // Kalau username belum ada, tampilkan fallback UI
  if (!username) {
    return (
      <div className="flex h-100 flex-col justify-between bg-Background p-4 text-center">
        <p className="text-gray-500">Silakan login dulu untuk chat dengan RotaneraBot.</p>
      </div>
    );
  }

  return (
    <div className="flex h-100 flex-col justify-between bg-Background">
      {/* Pesan Chat */}
      <div className="flex-1 space-y-2 overflow-y-auto p-3">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] rounded-xl px-3 py-2 text-sm leading-relaxed ${
                msg.sender === "user"
                  ? "rounded-br-none bg-blue-600 text-white"
                  : "rounded-bl-none bg-gray-200 text-gray-800"
              }`}
            >
              {msg.sender === "bot" ? (
                <ReactMarkdown
                  components={{
                    strong: ({ children }) => (
                      <strong className="font-semibold">{children}</strong>
                    ),
                    ul: ({ children }) => (
                      <ul className="list-disc pl-5 mt-1 space-y-1">{children}</ul>
                    ),
                    ol: ({ children }) => (
                      <ol className="list-decimal pl-5 mt-1 space-y-1">{children}</ol>
                    ),
                    li: ({ children }) => <li className="pl-1">{children}</li>,
                    a: ({ href, children }) => (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline hover:text-blue-800"
                      >
                        {children}
                      </a>
                    ),
                    p: ({ children }) => <p className="mb-1">{children}</p>,
                  }}
                >
                  {msg.text}
                </ReactMarkdown>
              ) : (
                msg.text
              )}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="rounded-bl-none bg-gray-200 text-gray-800 rounded-xl px-3 py-2 text-sm max-w-[80%]">
              Rotanera sedang mengetik...
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Box */}
      <div className="sticky bottom-0 flex items-center gap-2 border-t bg-white px-3 pt-2 pb-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ketik pesan..."
          className="flex-1 rounded-full border px-3 py-2 text-sm focus:ring-1 focus:ring-blue-400 focus:outline-none"
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          disabled={isLoading}
        />
        <button
          onClick={sendMessage}
          disabled={isLoading}
          className="rounded-full bg-blue-600 p-2 text-white transition hover:bg-blue-700 disabled:opacity-50"
        >
          <Send size={16} />
        </button>
      </div>
    </div>
  );
};

export default ChatRotaneraBot;