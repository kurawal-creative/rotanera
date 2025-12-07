import { motion, cubicBezier } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../animate-ui/components/radix/accordion";
import Image from "next/image";

import illustrationFaq from "@/assets/svg/illustration-faq.svg";

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
        {
            title: "Buat Sketsa dan Dapatkan Blueprint",
            content: "Cukup gambar tangan dan memasukan foto, AI langsung kenali pola anyaman tradisional & buat pola teknis yang siap dipotong.",
        },
        {
            title: "Model photorealistic otomatis",
            content: "Lihat hasil akhir dengan tekstur rotan asli, bayangan, dan pencahayaan realistis sebelum satu batang rotan pun dipotong.",
        },
        {
            title: "Semua proyek tersimpan rapi di cloud",
            content: "Revisi kapan saja, bagikan link ke klien atau tim, akses dari mana saja tanpa instal software.",
        },
    ];

    return (
        <section className="mx-auto w-full max-w-7xl items-center px-4 py-10">
            <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.45 }} className="flex flex-col gap-8 lg:flex-row lg:gap-12">
                {/* KIRI */}
                <motion.div variants={itemVariant} className="flex flex-1 flex-col items-center text-center xl:items-start xl:text-left">
                    {/* Badge */}
                    <div className="text-purp dark:text-purp-light border-purp dark:border-purp-light bg-purp/10 dark:bg-purp/20 flex w-fit justify-center rounded-full border-2 px-2 py-1 text-sm transition-colors">Any Question About Us?</div>

                    {/* Heading */}
                    <h1 className="mt-2 text-3xl leading-tight font-semibold text-neutral-800 transition-colors md:text-4xl xl:text-5xl dark:text-white">
                        Satu Platform untuk Semua <span className="text-purp dark:text-purp-light">Kebutuhan Desain Rotan</span>
                    </h1>

                    {/* Deskripsi */}
                    <p className="mt-4 max-w-xl font-mono text-base text-neutral-700 transition-colors dark:text-neutral-300">Dari sketsa tangan sampai file produksi semuanya selesai di Rotanera tanpa pindah-pindah aplikasi.</p>

                    {/* Accordion */}
                    <Accordion type={multiple ? "multiple" : "single"} collapsible={collapsible} className="mt-6 w-full space-y-2">
                        {item.map((v, i) => (
                            <AccordionItem key={i} value={`item-${i + 1}`} className="rounded-lg backdrop-blur transition-all">
                                <AccordionTrigger showArrow={showArrow} className="rounded-lg px-4 py-3 text-base md:text-lg">
                                    {v.title}
                                </AccordionTrigger>

                                <AccordionContent keepRendered={keepRendered} className="px-4 pb-4 text-neutral-700 transition-colors dark:text-neutral-300">
                                    {v.content}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </motion.div>

                {/* KANAN */}
                <motion.div variants={itemVariant} className="hidden items-center justify-center xl:flex xl:flex-1">
                    <Image
                        src={illustrationFaq}
                        alt="illustrasi faq"
                        width={520} // tambah ukuran
                        height={520}
                        className="pointer-events-none scale-110 select-none xl:scale-125"
                    />
                </motion.div>
            </motion.div>
        </section>
    );
};

export default AllInOneSection;
