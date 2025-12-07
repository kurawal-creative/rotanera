"use client";

import { motion } from "framer-motion";

const HowRotaneraWorks = () => {
    const messages = [
        { sender: "user", text: "Bagaimana cara kerja Rotanera?" },
        {
            sender: "bot",
            text: "Rotanera bekerja dengan memanfaatkan teknologi kecerdasan buatan (AI) untuk Cukup gambar tangan dan memasukan foto, AI langsung kenali pola anyaman tradisional & buat pola teknis yang siap dipotong. Dengan fitur Buat Sketsa, kamu bisa mendapatkan sketsa desain kerajinan rotan hanya dengan deskripsi singkat. Sedangkan Blueprint Anyaman Rotan membantu kamu membuat pola anyaman yang presisi dan mudah diikuti. Semua ini dirancang untuk memudahkan pengrajin rotan dalam mengembangkan bisnis mereka dengan cara yang lebih efisien dan kreatif 🚀",
        },
    ];

    return (
        <div className="p-4 h-full overflow-y-auto bg-Background text-sm text-gray-700">
            {messages.map((msg, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.2 }}
                    className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"
                        } mb-3`}
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
        </div>
    );
};

export default HowRotaneraWorks;