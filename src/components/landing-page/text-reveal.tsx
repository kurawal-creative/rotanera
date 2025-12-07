import { motion } from "framer-motion";
import { TextReveal } from "@/components/ui/text-reveal";

export default function TextRevealSection() {
    return (
        <motion.section initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }} viewport={{ once: true, amount: 0.4 }} className="mx-auto w-full px-4 text-center">
            <TextReveal>Rotanera mengubah sketsa tangan menjadi blueprint anyaman rotan siap produksi dalam hitungan menit. Dengan AI presisi tinggi, ribuan pengrajin kini berkarya lebih cepat, lebih terorganisir, dan lebih menguntungkan. Bergabunglah dengan mereka yang telah mengubah keterbatasan waktu menjadi peluang bisnis yang lebih besar.</TextReveal>
        </motion.section>
    );
}
