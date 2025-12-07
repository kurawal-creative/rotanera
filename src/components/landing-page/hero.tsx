import { Button } from "../ui/button";
import { motion } from "framer-motion";
import { Safari } from "../ui/safari";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

import imageGaleri from "@/assets/image/galeri-rotan.png";

const HeroSection = () => {
    return (
        <motion.section
            initial={{ y: 22, opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{
                duration: 0.65,
                delay: 0.15,
                ease: [0.22, 0.61, 0.36, 1],
            }}
            className="relative mx-auto mt-14 flex w-full max-w-7xl items-center px-4 lg:mt-24 xl:-mt-16 xl:min-h-screen"
        >
            <div className="flex w-full flex-col items-center gap-12 text-center lg:flex-row lg:items-start lg:text-left">
                {/* Kiri */}
                <div className="max-w-xl flex-1 space-y-5 md:max-w-4xl lg:max-w-xl">
                    <h1 className="text-3xl leading-tight font-bold text-neutral-800 md:text-4xl xl:text-5xl dark:text-white">
                        Bangun <span className="text-purp dark:text-purp-light">Desain Rotan</span> Impian Anda dalam Hitungan Detik
                    </h1>
                    <p className="mx-auto max-w-2xl font-mono text-sm text-neutral-700 md:text-lg lg:mx-0 lg:max-w-lg dark:text-neutral-300">Unggah sketsa atau gambar ide, dan sistem akan langsung mengubahnya menjadi blueprint serta model 3D rotan secara otomatis tanpa perlu keahlian teknis.</p>

                    <div className="flex items-center justify-center gap-4 lg:justify-start">
                        <Button className="group bg-purp hover:bg-purp-darker w-full rounded-lg border px-4 py-2 font-semibold text-white backdrop-blur-md transition-all duration-300 ease-out active:scale-[0.97] md:w-fit lg:rounded-full">
                            <Link href="/login" className="flex items-center gap-2">
                                Coba Gratis
                                <ArrowRight size={16} className="transition-transform duration-300 ease-out group-hover:translate-x-1" />
                            </Link>
                        </Button>
                    </div>
                </div>

                {/* Kanan */}
                <motion.div
                    className="relative flex w-full lg:w-auto lg:flex-1"
                    animate={{ y: [0, -16, 0], rotate: [2, -2, 2] }}
                    transition={{
                        duration: 6,
                        repeat: Infinity,
                        repeatType: "mirror",
                        ease: "easeInOut",
                    }}
                >
                    {/* Glow background */}
                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                        <div className="h-[450px] w-[600px] bg-[radial-gradient(circle_at_30%_40%,#8A2EFF,transparent_60%),radial-gradient(circle_at_70%_60%,#00C8FF,transparent_60%)] opacity-90 blur-[90px]"></div>
                    </div>

                    <motion.div
                        className="absolute -top-3 left-0 z-20 rounded-xl bg-white/80 px-4 py-2 text-xs font-semibold text-neutral-700 shadow-lg backdrop-blur dark:bg-white/10 dark:text-neutral-200"
                        animate={{ y: [0, -10, 0] }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            repeatType: "mirror",
                            ease: "easeInOut",
                        }}
                    >
                        Bingung cari desain rotan? 🤔
                    </motion.div>

                    <motion.div
                        className="absolute right-0 -bottom-4 z-20 rounded-sm bg-white/80 px-4 py-2 text-xs font-semibold text-neutral-700 shadow-lg backdrop-blur dark:bg-white/10 dark:text-neutral-200"
                        animate={{ y: [0, 12, 0] }}
                        transition={{
                            duration: 4.8,
                            repeat: Infinity,
                            repeatType: "mirror",
                            ease: "easeInOut",
                        }}
                    >
                        ⚡ Upload gambar → jadi blueprint 3D!
                    </motion.div>

                    {/* Safari */}
                    <div className="relative z-10 mx-auto w-full max-w-lg lg:-right-20">
                        <Safari imageSrc={imageGaleri.src} url="rotanera.netlify.app" />
                    </div>
                </motion.div>
            </div>
        </motion.section>
    );
};

export default HeroSection;
