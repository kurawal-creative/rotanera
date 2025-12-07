"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Github, Instagram } from "lucide-react";

import fauzan from "@/assets/image/fauzan.jpg";
import gilang from "@/assets/image/gilang.jpg";
import firman from "@/assets/image/firman.jpg";
import iyan from "@/assets/image/iyan.jpg";
import dhodo from "@/assets/image/dhodo.jpg";
import Link from "next/link";

const teams = [
    {
        name: "Agus Priyanto",
        role: "Frontend Developer",
        image: iyan,
        github: "https://github.com/Astha4Study",
        instagram: "https://www.instagram.com/rheiyn._/",
    },
    {
        name: "Akhmad Fauzan",
        role: "Ai Researcher & Fullstack Developer",
        image: fauzan,
        github: "https://github.com/ozan-fn",
        instagram: "https://www.instagram.com/ozan.fn/",
    },
    {
        name: "Afridho Zaki",
        role: "Fullstack Developer",
        image: dhodo,
        github: "https://github.com/dhodo999",
        instagram: "https://www.instagram.com/dhoodo.69/",
    },
    {
        name: "Firman Aziz",
        role: "Frontend Developer",
        image: firman,
        github: "https://github.com/GwFirman",
        instagram: "https://www.instagram.com/gw_firman/",
    },
    {
        name: "Gilang Dely",
        role: "Backend Developer",
        image: gilang,
        github: "https://github.com/gilangdely",
        instagram: "https://www.instagram.com/gilang.dm/",
    },
];

const OurTeamsCarousel = () => {
    const [api, setApi] = React.useState<CarouselApi>();
    const [current, setCurrent] = React.useState(0);

    React.useEffect(() => {
        if (!api) return;

        setCurrent(api.selectedScrollSnap() + 1);

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap() + 1);
        });
    }, [api]);

    return (
        <div className="mx-auto w-full max-w-6xl">
            <Carousel setApi={setApi} className="w-full max-w-6xl" opts={{ loop: true }}>
                <CarouselContent className="py-3">
                    {teams.map((team, index) => {
                        const isActive = index === current - 1;
                        return (
                            <CarouselItem key={index} className="basis-[33%]">
                                <Card className={cn("relative overflow-hidden rounded-2xl transition-transform duration-500", isActive ? "scale-100" : "scale-[0.7] grayscale")}>
                                    <CardContent className="aspect-square p-0">
                                        <Image src={team.image} alt={team.name} fill className="object-cover" />

                                        {isActive && (
                                            <div className="absolute inset-0 hidden flex-col items-center justify-end bg-linear-to-t from-black/90 via-black/50 to-transparent px-6 pb-8 text-white lg:flex">
                                                <h3 className="text-2xl font-bold">{team.name}</h3>
                                                <p className="mt-1 mb-3 text-base font-medium whitespace-pre-line text-gray-200">{team.role.replace(/ & /g, "\n")}</p>

                                                <div className="flex gap-6">
                                                    <Link href={team.github} target="_blank">
                                                        <Github className="h-6 w-6 transition hover:scale-110" />
                                                    </Link>
                                                    <Link href={team.instagram} target="_blank">
                                                        <Instagram className="h-6 w-6 transition hover:scale-110" />
                                                    </Link>
                                                </div>
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                                {/* Nama + sosmed di luar untuk layar < lg */}
                                {isActive && (
                                    <div className="mt-4 flex flex-col items-center text-center lg:hidden">
                                        <h3 className="text-lg font-semibold text-neutral-900">{team.name}</h3>
                                        <p className="mb-2 text-sm text-neutral-600">{team.role}</p>
                                        <div className="flex gap-5">
                                            <Link href={team.github} target="_blank">
                                                <Github className="h-5 w-5 text-neutral-700 hover:text-black" />
                                            </Link>
                                            <Link href={team.instagram} target="_blank">
                                                <Instagram className="h-5 w-5 text-neutral-700 hover:text-black" />
                                            </Link>
                                        </div>
                                    </div>
                                )}
                            </CarouselItem>
                        );
                    })}
                </CarouselContent>

                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    );
};

export default OurTeamsCarousel;
