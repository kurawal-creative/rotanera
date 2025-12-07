import { Button } from "../ui/button";
import { motion } from "framer-motion";
import { Safari } from "../ui/safari";
import Link from "next/link";
import Image from "next/image";

import blobGradient from "@/assets/image/blob-gradient.jpg";
import safariImage from "@/assets/image/ss2.png";
import { ArrowRight } from "lucide-react";

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
                    <h1 className="text-3xl leading-tight font-bold text-neutral-800 md:text-4xl xl:text-5xl">
                        Bangun <span className="text-purp">Desain Rotan</span> Impian Anda dalam Hitungan Detik
                    </h1>
                    <p className="mx-auto max-w-2xl font-mono text-sm text-neutral-700 md:text-lg lg:mx-0 lg:max-w-lg">Unggah sketsa atau gambar ide, dan sistem akan langsung mengubahnya menjadi blueprint serta model 3D rotan secara otomatis tanpa perlu keahlian teknis.</p>

                    <div className="flex items-center justify-center gap-4 lg:justify-start">
                        <Button className="group bg-purp hover:bg-purp-darker w-full rounded-lg border px-4 py-2 font-semibold text-white backdrop-blur-md transition-all duration-300 ease-out active:scale-[0.97] md:w-fit lg:rounded-full">
                            <Link href="/login" className="flex items-center gap-2">
                                Coba Gratis <ArrowRight size={16} className="transition-transform duration-300 ease-out group-hover:translate-x-1" />
                            </Link>
                        </Button>
                    </div>
                </div>

                {/* Kanan */}
                <div className="relative flex w-full lg:w-auto lg:flex-1">
                    <Image src={blobGradient} alt="blob-gradient" draggable="false" height={1200} width={1200} sizes="(max-width: 1768px) 100vw, 1200px" className="pointer-events-none absolute top-1/2 left-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 scale-90 md:scale-110 lg:scale-[1.4]" />
                    <div className="relative z-10 mx-auto w-full max-w-lg lg:-right-20">
                        <Safari url="rotanera.netlify.app" />
                    </div>
                </div>
            </div>
        </motion.section>
    );
};

export default HeroSection;
