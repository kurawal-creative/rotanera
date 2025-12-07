"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const HowUseRotanera = () => {
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    const messages = [
        { sender: "user", text: "Cara pakai Rotanera?" },
        {
            sender: "bot",
            text: "Berikut langkah-langkah mudah untuk menggunakan Rotanera dengan efektif:",
        },
        {
            sender: "bot",
            text: "Masuk ke akun kamu, lalu buat sketsa dan dapatkan hasil blueprint dalam hitungan menit.",
        },
    ];

    // Scroll otomatis ke bawah setiap kali pesan dirender
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        // ❗ jangan pakai h-full agar tidak menutupi header global
        <div className="p-4 bg-Background text-sm text-gray-700 max-h-[calc(100%-64px)] overflow-y-auto">
            {messages.map((msg, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.2 }}
                    className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"} mb-3`}
                >
                    <div
                        className={`max-w-[80%] rounded-xl px-3 py-2 text-sm ${msg.sender === "user"
                            ? "rounded-br-none bg-blue-600 text-white"
                            : "rounded-bl-none bg-gray-200 text-gray-800"
                            }`}
                    >
                        {msg.text}
                    </div>
                </motion.div>
            ))}
            <div ref={messagesEndRef} />
        </div>
    );
};

export default HowUseRotanera;