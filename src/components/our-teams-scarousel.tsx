"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Github, Instagram } from "lucide-react";

import fauzan from "@/assets/image/fauzan.jpg";
import gilang from "@/assets/image/gilang.jpg";
import firman from "@/assets/image/firman.jpg";
import iyan from "@/assets/image/iyan.jpg";
import dhodo from "@/assets/image/dhodo.jpg";

const teams = [
  {
    name: "Agus Priyanto",
    role: "Frontend Developer",
    image: iyan,
    github: "https://github.com/johndoe",
    instagram: "https://instagram.com/johndoe",
  },
  {
    name: "Akhmad Fauzan",
    role: "Ai Researcher & Fullstack Developer",
    image: fauzan,
    github: "https://github.com/sarah",
    instagram: "https://instagram.com/sarah",
  },
  {
    name: "Afridho Zaki",
    role: "Fullstack Developer",
    image: dhodo,
    github: "https://github.com/michael",
    instagram: "https://instagram.com/michael",
  },
  {
    name: "Firman Aziz",
    role: "Frontend Developer",
    image: firman,
    github: "https://github.com/emma",
    instagram: "https://instagram.com/emma",
  },
  {
    name: "Gilang Dely",
    role: "Backend Developer",
    image: gilang,
    github: "https://github.com/daniel",
    instagram: "https://instagram.com/daniel",
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
      <Carousel
        setApi={setApi}
        className="w-full max-w-6xl"
        opts={{ loop: true }}
      >
        <CarouselContent className="py-3">
          {teams.map((team, index) => {
            const isActive = index === current - 1;
            return (
              <CarouselItem key={index} className="basis-[33%]">
                <Card
                  className={cn(
                    "relative overflow-hidden rounded-2xl transition-transform duration-500",
                    isActive ? "scale-100" : "scale-[0.7] grayscale",
                  )}
                >
                  <CardContent className="aspect-square p-0">
                    <Image
                      src={team.image}
                      alt={team.name}
                      fill
                      className="object-cover"
                    />

                    {/* Overlay muncul hanya jika aktif */}
                    {isActive && (
                      <div className="absolute inset-0 flex flex-col items-center justify-end bg-linear-to-t from-black/80 via-black/40 to-transparent p-5 text-white transition-opacity duration-500">
                        <h3 className="text-xl font-semibold">{team.name}</h3>
                        <p className="mb-2 text-sm text-gray-200">
                          {team.role}
                        </p>

                        <div className="flex gap-4 pb-2">
                          <a
                            href={team.github}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Github className="h-5 w-5 hover:opacity-80" />
                          </a>
                          <a
                            href={team.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Instagram className="h-5 w-5 hover:opacity-80" />
                          </a>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
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
