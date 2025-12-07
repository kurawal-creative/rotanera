import { motion, cubicBezier } from "framer-motion";

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
            <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.45 }} className="mx-auto flex max-w-2xl flex-col items-center justify-center space-y-3 text-center">
                <motion.div variants={item} className="text-purp border-purp mx-auto flex w-fit justify-center rounded-full border-2 px-2 py-1 text-sm">
                    Our Features
                </motion.div>

                <motion.h1 variants={item} className="mt-2 text-3xl leading-tight font-semibold text-neutral-800 md:text-4xl xl:text-5xl">
                    Fitur Premium yang Membuat Desain Rotan Anda Hidup
                </motion.h1>

                <motion.p variants={item} className="mt-4 font-mono text-base text-neutral-700">
                    Ubah sketsa jadi blueprint rotan presisi tinggi & model 3D siap produksi dalam hitungan menit. Didukung AI khusus rotan, akurasi anyaman terjamin, visual photorealistic, dan ekspor file produksi langsung. Satu platform elegan untuk pengrajin modern.
                </motion.p>
            </motion.div>

            <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.45 }} className="mx-auto mt-12 flex items-center justify-center gap-4">
                <div className="grid w-120 grid-cols-1 gap-4">
                    <motion.div variants={item} className="col-span-1 h-60 rounded-sm border bg-white/80 backdrop-blur">
                        grid 1
                    </motion.div>
                    <motion.div variants={item} className="col-span-1 h-40 rounded-sm border bg-white/80 backdrop-blur">
                        grid 2
                    </motion.div>
                </div>

                <div className="grid w-120 grid-cols-1 gap-4">
                    <motion.div variants={item} className="col-span-1 h-40 rounded-sm border bg-white/80 backdrop-blur">
                        grid 3
                    </motion.div>
                    <motion.div variants={item} className="col-span-1 h-60 rounded-sm border bg-white/80 backdrop-blur">
                        grid 4
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
};

export default FeaturesSection;
