"use client";

import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

const QuotaList = [
    {
        tier: "Pemula",
        price: "49.000",
        quota: "20 Desain",
        tagline: "Mulai eksplorasi fitur AI Rotanera dengan harga paling ringan.",
        features: ["Generate 20 desain rotan per bulan", "Resolusi standar (untuk prototype & presentasi)", "3 variasi per desain", "Ekspor gambar PNG"],
        buttonText: "Mulai 20 Desain",
        featured: false,
    },
    {
        tier: "Pengrajin Pro",
        price: "149.000",
        quota: "100 Desain",
        tagline: "Pilihan terfavorit pengrajin & UKM rotan di seluruh Indonesia.",
        features: ["Generate hingga 100 desain rotan per bulan", "Resolusi tinggi + detail anyaman presisi", "Unlimited variasi per desain", "Ekspor PNG, JPG & PDF teknis", "Simpan & kelola library desain pribadi", "Fitur ukuran aktual + estimasi material otomatis", "Prioritas generate (lebih cepat)"],
        buttonText: "Paling Laris – 100 Desain",
        featured: true,
    },
    {
        tier: "Studio & Eksportir",
        price: "349.000",
        quota: "300 Desain",
        tagline: "Untuk studio besar, brand furniture, dan eksportir rotan kelas dunia.",
        features: ["Generate hingga 300 desain per bulan", "Semua fitur Pengrajin Pro", "Multiple user (hingga 5 akun tim)", "Custom training model dengan katalog Anda sendiri", "Ekspor 3D sederhana & technical drawing", "Fitur kolaborasi tim + komentar", "Dukungan WhatsApp prioritas 24 jam", "Early access fitur baru"],
        buttonText: "Paket Studio – 300 Desain",
        featured: false,
    },
];

export default function HargaPage() {
    return (
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: "easeOut" }} className="container mx-auto max-w-7xl px-4 py-16">
            {/* Header Section */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.4 }} className="mb-8 text-center">
                <div className="border-purp mx-auto w-fit rounded-full border-2 px-2 py-1 lg:px-3 lg:py-1.5">
                    <p className="text-purp lg:font-medium">Paket Kuota</p>
                </div>
                <div className="mx-auto mt-4 max-w-3xl flex-col text-center">
                    <h2 className="text-TextPrimary text-2xl font-semibold md:text-4xl lg:text-3xl">Bayar Sekali, Gunakan Sesuai Kebutuhan</h2>
                    <p className="text-TextSecondary mt-2 text-base lg:text-lg">Tanpa langganan bulanan. Kuota tidak hangus di akhir bulan. Gunakan kapan saja untuk generate desain rotan berkualitas tinggi dari kursi santai, lampu gantung, hingga set furniture ekspor.</p>
                </div>
            </motion.div>

            {/* Quota Cards */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {QuotaList.map((plan, i) => (
                    <motion.div
                        key={plan.tier}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.15, duration: 0.6, ease: "easeOut" }}
                        whileHover={{ y: -6, transition: { duration: 0.3 } }}
                        className={`relative flex h-full flex-col rounded-2xl border px-6 py-8 shadow-md transition-all duration-300 ${plan.featured ? "border-purp bg-purp text-white" : "border-slate-200 bg-white text-gray-800"}`}
                    >
                        {plan.featured && (
                            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-purp-darker absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-1.5 text-xs font-semibold shadow">
                                Paling Populer
                            </motion.div>
                        )}
                        <div className="mb-4">
                            <h3 className="mb-1 text-xl font-bold">{plan.tier}</h3>
                            <p className="text-sm opacity-90">{plan.tagline}</p>
                        </div>

                        <div className="mb-6">
                            <div className="flex items-baseline gap-2">
                                <span className="text-3xl font-extrabold">{plan.price}</span>
                                <span className="text-sm opacity-80">• {plan.quota}</span>
                            </div>
                        </div>

                        <ul className="mb-8 flex flex-1 flex-col gap-2 text-sm">
                            {plan.features.map((f) => (
                                <li key={f} className="flex items-center gap-2">
                                    <CheckCircle className={plan.featured ? "text-white" : "text-purp"} size={15} />
                                    <span className={plan.featured ? "text-white" : "text-gray-700"}>{f}</span>
                                </li>
                            ))}
                        </ul>

                        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className={`w-full rounded-lg py-3 text-base font-medium transition-all duration-200 ${plan.featured ? "text-purp bg-white hover:bg-purple-50" : "bg-purp hover:bg-purp-darker text-white"}`}>
                            {plan.buttonText}
                        </motion.button>
                    </motion.div>
                ))}
            </div>
        </motion.section>
    );
}
