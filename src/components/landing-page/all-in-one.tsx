"use client";

import { motion, cubicBezier } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../animate-ui/components/radix/accordion";

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.22 },
    },
};

const itemVariant = {
    hidden: { opacity: 0, y: 34 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.65, ease: cubicBezier(0.25, 0.46, 0.45, 0.94) },
    },
};

type RadixAccordionDemoProps = {
    multiple?: boolean;
    collapsible?: boolean;
    keepRendered?: boolean;
    showArrow?: boolean;
};

const AllInOneSection = ({ multiple = false, collapsible = true, keepRendered = false, showArrow = true }: RadixAccordionDemoProps) => {
    const item = [
        { title: "Buat Sketsa dan Dapatkan Blueprint", content: "Cukup gambar tangan dan memasukan foto, AI langsung kenali pola anyaman tradisional & buat pola teknis yang siap dipotong." },
        { title: "Model photorealistic otomatis", content: "Lihat hasil akhir dengan tekstur rotan asli, bayangan, dan pencahayaan realistis sebelum satu batang rotan pun dipotong." },
        { title: "Semua proyek tersimpan rapi di cloud", content: "Revisi kapan saja, bagikan link ke klien atau tim, akses dari mana saja tanpa instal software." },
    ];

    return (
        <section className="mx-auto w-full max-w-7xl items-center px-4 py-10">
            <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.45 }} className="flex flex-col gap-8 lg:flex-row lg:gap-12">
                {/* Kiri */}
                <motion.div variants={itemVariant} className="flex flex-1 flex-col items-center text-center xl:items-start xl:text-left">
                    <div className="text-purp border-purp flex w-fit justify-center rounded-full border-2 px-2 py-1 text-sm">Any Question About Us?</div>

                    <h1 className="mt-2 text-3xl leading-tight font-semibold text-neutral-800 md:text-4xl xl:text-5xl">
                        Satu Platform untuk Semua <span className="text-purp">Kebutuhan Desain Rotan</span>
                    </h1>

                    <p className="mt-4 max-w-xl font-mono text-base text-neutral-700">Dari sketsa tangan sampai file produksi semuanya selesai di Rotanera tanpa pindah-pindah aplikasi.</p>

                    <Accordion type={multiple ? "multiple" : "single"} collapsible={collapsible} className="mt-6 w-full">
                        {item.map((v, i) => (
                            <AccordionItem key={i} value={`item-${i + 1}`}>
                                <AccordionTrigger showArrow={showArrow} className="text-base md:text-lg">
                                    {v.title}
                                </AccordionTrigger>
                                <AccordionContent keepRendered={keepRendered}>{v.content}</AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </motion.div>

                {/* Kanan */}
                <motion.div variants={itemVariant} className="hidden xl:flex xl:flex-1">
                    {/* Nanti isi di sini tetap akan ikut animasi */}
                </motion.div>
            </motion.div>
        </section>
    );
};

export default AllInOneSection;
