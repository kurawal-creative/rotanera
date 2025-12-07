import { motion, cubicBezier } from "framer-motion";
import { AnimatedBeamFeatures } from "../animated-beam-features";
import { TemplateFeatures } from "../template-features";
import { GaleriFeatures } from "../galeri-features";

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.22,
        },
    },
};

const item = {
    hidden: { opacity: 0, y: 40 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: cubicBezier(0.25, 0.46, 0.45, 0.94) },
    },
};

const FeaturesSection = () => {
    return (
        <section className="mx-auto w-full max-w-7xl items-center px-4 pb-14 xl:pb-10">
            {/* Title */}
            <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.45 }} className="mx-auto flex max-w-2xl flex-col items-center justify-center space-y-3 text-center">
                <motion.div variants={item} className="text-purp dark:text-purp-light border-purp dark:border-purp-light bg-purp/10 dark:bg-purp/20 mx-auto flex w-fit justify-center rounded-full border-2 px-2 py-1 text-sm transition-colors">
                    Our Features
                </motion.div>

                <motion.h1 variants={item} className="mt-2 text-3xl leading-tight font-semibold text-neutral-800 transition-colors md:text-4xl xl:text-5xl dark:text-white">
                    Fitur Premium yang Membuat Desain Rotan Anda Hidup
                </motion.h1>

                <motion.p variants={item} className="mt-4 font-mono text-base text-neutral-700 transition-colors dark:text-neutral-300">
                    Ubah sketsa jadi blueprint rotan presisi tinggi & model 3D siap produksi dalam hitungan menit. Didukung AI khusus rotan, akurasi anyaman terjamin, visual photorealistic, dan ekspor file produksi langsung. Satu platform elegan untuk pengrajin modern.
                </motion.p>
            </motion.div>

            <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.45 }} className="mx-auto mt-12 grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {/* Kotak 1 */}
                <motion.div variants={item} className="group relative h-72 overflow-hidden rounded-md border border-neutral-200 bg-white/80 backdrop-blur transition-colors dark:border-neutral-700 dark:bg-white/6">
                    <AnimatedBeamFeatures />
                    <div className="absolute inset-x-0 bottom-0 flex h-full translate-y-10 flex-col justify-end bg-linear-to-t from-black/80 via-black/40 to-transparent p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                        <h3 className="text-base font-semibold text-white">Blueprint Instan</h3>
                        <p className="mt-1 text-sm text-neutral-200">Ubah sketsa sederhana menjadi blueprint rotan siap produksi hanya dalam hitungan menit.</p>
                    </div>
                </motion.div>

                {/* Kotak 2 */}
                <motion.div variants={item} className="group relative h-72 overflow-hidden rounded-md border border-neutral-200 bg-white/80 backdrop-blur transition-colors dark:border-neutral-700 dark:bg-white/6">
                    <TemplateFeatures />
                    <div className="absolute inset-x-0 bottom-0 flex h-full translate-y-10 flex-col justify-end bg-linear-to-t from-black/80 via-black/40 to-transparent p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                        <h3 className="text-base font-semibold text-white">Template Siap Pakai</h3>
                        <p className="mt-1 text-sm text-neutral-200">Koleksi template furnitur rotan modern yang dapat langsung disesuaikan tanpa desain dari nol.</p>
                    </div>
                </motion.div>

                {/* Kotak 3 */}
                <motion.div variants={item} className="group relative h-72 overflow-hidden rounded-md border border-neutral-200 bg-white/80 backdrop-blur transition-colors dark:border-neutral-700 dark:bg-white/6">
                    <GaleriFeatures />
                    <div className="absolute inset-x-0 bottom-0 flex h-full translate-y-10 flex-col justify-end bg-linear-to-t from-black/80 via-black/40 to-transparent p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                        <h3 className="text-base font-semibold text-white">Galeri Inspirasi</h3>
                        <p className="mt-1 text-sm text-neutral-200">Ratusan referensi desain rotan berkualitas tinggi untuk mempercepat kreativitas dan produksi.</p>
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default FeaturesSection;
