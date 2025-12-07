"use client";

import "swiper/css";
import "swiper/css/effect-fade";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import { motion } from "motion/react";
import { useCarouselStore } from "@/store/carouselStore";
import Image from "next/image";

import login1 from "@/assets/image/login-image1.jpg";
import login2 from "@/assets/image/login-image2.jpg";
import login3 from "@/assets/image/login-image3.jpg";

const carouselImage = [login1, login2, login3];

const testimonials = [
    {
        quote: "Platform ini punya semua fitur yang saya butuhkan untuk bikin blueprint rotan cepat dan presisi.",
        name: "Budi Santoso",
        role: "Pemilik Usaha Furnitur Rotan, Yogyakarta",
    },
    {
        quote: "AI-nya bantu banget kasih ide desain baru, sekarang pesanan ekspor saya naik 3 kali lipat!",
        name: "Siti Nurhayati",
        role: "Pengrajin Rotan & Eksportir, Cirebon",
    },
    {
        quote: "Dari sketsa tangan jadi blueprint 3D cuma hitungan menit. Hemat waktu dan tenaga banget!",
        name: "Agus Wijaya",
        role: "Desainer Furnitur Rotan, Bali",
    },
];

export default function AuthCarousel() {
    const { activeIndex, setActiveIndex } = useCarouselStore();

    return (
        <motion.div className="hidden w-full max-w-md items-center justify-center lg:flex" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2, duration: 0.7, ease: "easeOut" }}>
            <Swiper
                modules={[Autoplay, EffectFade]}
                effect="fade"
                loop={true}
                autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                }}
                onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                initialSlide={activeIndex}
                className="h-full w-full"
            >
                {carouselImage.map((img, idx) => (
                    <SwiperSlide key={idx}>
                        <div className="relative h-full w-full">
                            <Image src={img.src} alt={img.src} fill priority sizes="100vw" className="scale-105 object-cover transition-transform duration-4000 ease-in-out" style={{ filter: "brightness(0.85)" }} />

                            <div className="pointer-events-none absolute right-0 bottom-0 left-0 h-1/2 bg-linear-to-t from-black/70 to-transparent" />
                            <div className="absolute right-8 bottom-10 left-8 text-white">
                                <p className="text-2xl leading-snug font-semibold">“{testimonials[idx].quote}”</p>

                                <div className="mt-4">
                                    <p className="font-semibold">{testimonials[idx].name}</p>
                                    <p className="mt-0.5 text-sm font-medium text-white/90">{testimonials[idx].role}</p>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </motion.div>
    );
}
