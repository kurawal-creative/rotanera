import { NumberTicker } from "../ui/number-ticker";
import { motion } from "framer-motion";

const stats = [
    { value: 96, suffix: "%", decimals: 0, label: "Akurasi desain realistis" },
    { value: 9.2, suffix: "x", decimals: 1, label: "Lebih cepat dari manual" },
    { value: 200, suffix: "+", decimals: 0, label: "Pengrajin menggunakan" },
    { value: 15, suffix: "K", decimals: 0, label: "Blueprint dihasilkan" },
];

export default function WhyUseUsSection() {
    return (
        <motion.section
            initial={{ y: 26, opacity: 0, scale: 0.97 }}
            whileInView={{ y: 0, opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
                duration: 0.7,
                delay: 0.2,
                ease: [0.22, 0.61, 0.36, 1],
            }}
            className="mx-auto w-full max-w-7xl items-center px-4 pt-14 md:pt-14 xl:pt-10"
        >
            <div className="flex flex-col items-center justify-center gap-8 md:flex-row">
                {/* Kiri */}
                <div className="flex-1 space-y-3">
                    <div className="flex flex-col items-center text-center md:items-start md:text-start">
                        <div className="text-purp dark:text-purp-light border-purp dark:border-purp-light bg-purp/10 dark:bg-purp/20 w-fit justify-center rounded-full border-2 px-2 py-1 text-sm transition-colors">Why Use Us</div>

                        <h1 className="mt-2 text-3xl leading-tight font-semibold text-neutral-800 md:text-4xl xl:text-5xl dark:text-white">
                            Desain Rotan Premium, <span className="text-purp dark:text-purp-light">Kini Lebih Cepat & Presisi Maksimal</span>
                        </h1>
                    </div>
                </div>

                {/* Kanan */}
                <div className="flex-1">
                    <div className="mt-4 grid grid-cols-2 gap-8 sm:grid-cols-2 md:mt-12 lg:mt-8">
                        {stats.map((s, i) => (
                            <div key={i} className="text-center">
                                <div className="flex items-baseline justify-center gap-1">
                                    <NumberTicker startValue={0} value={s.value} decimalPlaces={s.decimals} className="text-4xl font-bold text-neutral-900 md:text-5xl xl:text-6xl dark:text-white" />
                                    <span className="text-4xl font-bold text-neutral-900 md:text-5xl xl:text-6xl dark:text-white">{s.suffix}</span>
                                </div>
                                <div className="mt-1 text-lg text-neutral-600 lg:mt-2 dark:text-neutral-300">{s.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </motion.section>
    );
}
