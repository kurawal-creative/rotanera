import { Button } from "../ui/button";
import { Safari } from "../ui/safari";
import Link from "next/link";
import Image from "next/image";

import blobGradient from "@/assets/image/blob-gradient.jpg";
import safariImage from "@/assets/image/ss2.png";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
    return (
        <section className="relative mx-auto -mt-16 flex min-h-screen w-full max-w-7xl items-center px-4">
            <div className="flex w-full flex-col items-center gap-12 md:flex-row md:items-start">
                {/* Kiri */}
                <div className="max-w-xl flex-1 space-y-5 text-left md:text-left">
                    <h1 className="text-5xl leading-tight font-bold text-neutral-800">
                        Bangun <span className="text-purp">Desain Rotan</span> Impian Anda dalam Hitungan Detik
                    </h1>
                    <p className="max-w-md font-mono text-lg text-neutral-700">Unggah sketsa atau gambar ide, dan sistem akan langsung mengubahnya menjadi blueprint serta model 3D rotan secara otomatis tanpa perlu keahlian teknis.</p>

                    <div className="flex items-center gap-4">
                        <Button className="group bg-purp hover:bg-purp-darker rounded-full border px-4 py-2 font-semibold text-white backdrop-blur-md transition-all duration-300 ease-out active:scale-[0.97]">
                            <Link href="/login" className="flex items-center gap-2">
                                Coba Gratis <ArrowRight size={16} className="transition-transform duration-300 ease-out group-hover:translate-x-1" />
                            </Link>
                        </Button>
                    </div>
                </div>

                {/* Kanan */}
                <div className="relative flex-1">
                    <Image src={blobGradient} alt="blob-gradient" draggable="false" height={1200} width={1200} sizes="(max-width: 768px) 100vw, 1200px" className="pointer-events-none absolute top-1/2 left-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 scale-[1.4]" />

                    <div className="relative -right-20 z-50">
                        <Safari url="rotanera.netlify.app" />
                    </div>
                    <div className="bg-white shadow-sm"></div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
