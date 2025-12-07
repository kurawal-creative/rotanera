import { cn } from "@/lib/utils";
import { Marquee } from "@/components/ui/marquee";
import Image from "next/image";

const images = ["https://picsum.photos/500/500?random=1", "https://picsum.photos/500/500?random=2", "https://picsum.photos/500/500?random=3", "https://picsum.photos/500/500?random=4", "https://picsum.photos/500/500?random=5", "https://picsum.photos/500/500?random=6"];

const ImageCard = ({ img }: { img: string }) => {
    return (
        <div className={cn("relative h-55 w-40 shrink-0 cursor-pointer overflow-hidden rounded-xl border", "border-gray-950/10 bg-gray-950/1 hover:bg-gray-950/5", "dark:border-gray-50/10 dark:bg-gray-50/10 dark:hover:bg-gray-50/15")}>
            <Image className="object-cover" fill alt="dummy" src={img} />
        </div>
    );
};

export function TemplateFeatures() {
    return (
        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden py-5">
            <Marquee pauseOnHover className="[--duration:20s]">
                {images.map((img, i) => (
                    <ImageCard key={i} img={img} />
                ))}
            </Marquee>

            {/* efek fade kiri kanan */}
            <div className="from-background pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-linear-to-r" />
            <div className="from-background pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-linear-to-l" />
        </div>
    );
}
