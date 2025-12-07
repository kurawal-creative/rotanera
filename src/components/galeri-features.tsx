/* eslint-disable @next/next/no-img-element */
import { cn } from "@/lib/utils";
import { Marquee } from "@/components/ui/marquee";

const images = ["https://picsum.photos/500/500?random=1", "https://picsum.photos/500/500?random=2", "https://picsum.photos/500/500?random=3", "https://picsum.photos/500/500?random=4", "https://picsum.photos/500/500?random=5", "https://picsum.photos/500/500?random=6"];

const firstRow = images.slice(0, images.length / 2);
const secondRow = images.slice(images.length / 2);
const thirdRow = images.slice(0, images.length / 2);
const fourthRow = images.slice(images.length / 2);

const ImageCard = ({ img }: { img: string }) => {
    return (
        <div className={cn("relative h-40 w-32 shrink-0 cursor-pointer overflow-hidden rounded-xl border", "border-gray-950/10 bg-gray-950/1 hover:bg-gray-950/5", "dark:border-gray-50/10 dark:bg-gray-50/10 dark:hover:bg-gray-50/15")}>
            <img src={img} alt="dummy" className="h-full w-full object-cover" />
        </div>
    );
};

export function GaleriFeatures() {
    return (
        <div className="relative flex h-96 w-full flex-row items-center justify-center gap-4 overflow-hidden perspective-near">
            {/* container yang dimiringkan untuk efek 3D */}
            <div
                className="flex flex-row items-center gap-4"
                style={{
                    transform: "translateX(-100px) translateY(0px) translateZ(-100px) rotateX(20deg) rotateY(-10deg) rotateZ(20deg)",
                }}
            >
                {/* 4 column — atas & bawah scroll berbeda arah */}
                <Marquee pauseOnHover vertical className="[--duration:20s]">
                    {firstRow.map((img, i) => (
                        <ImageCard key={i} img={img} />
                    ))}
                </Marquee>

                <Marquee reverse pauseOnHover vertical className="[--duration:20s]">
                    {secondRow.map((img, i) => (
                        <ImageCard key={i} img={img} />
                    ))}
                </Marquee>

                <Marquee reverse pauseOnHover vertical className="[--duration:20s]">
                    {thirdRow.map((img, i) => (
                        <ImageCard key={i} img={img} />
                    ))}
                </Marquee>

                <Marquee pauseOnHover vertical className="[--duration:20s]">
                    {fourthRow.map((img, i) => (
                        <ImageCard key={i} img={img} />
                    ))}
                </Marquee>
            </div>

            {/* gradient fade overlay */}
            <div className="from-background pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-linear-to-b"></div>
            <div className="from-background pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-linear-to-t"></div>
            <div className="from-background pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-linear-to-r"></div>
            <div className="from-background pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-linear-to-l"></div>
        </div>
    );
}
