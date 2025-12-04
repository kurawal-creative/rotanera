import Image from "next/image";
import { NumberTicker } from "../ui/number-ticker";

import image from "@/assets/image/why-use-us.jpg";
import blobGradient from "@/assets/image/blob-gradient.jpg";

const WhyUseUsSection = () => {
  return (
    <>
      <section className="mx-auto w-full max-w-7xl items-center px-4 py-12">
        <div className="flex items-center gap-8">
          <div className="relative flex-1">
            {/* Blob background */}
            <div className="absolute -top-28 right-12 -z-10 h-[600px] w-[600px]">
              <Image
                src={blobGradient}
                alt="blob"
                className="h-full w-full scale-x-[-1] scale-y-[-1] object-contain"
              />
            </div>

            {/* Image utama */}
            <div className="relative left-20 h-64 w-64">
              <Image
                src={image}
                alt="gambar orang ngerotan"
                fill
                sizes="(max-width: 768px) 100vw, 256px"
                className="z-50 rounded-sm object-cover shadow-sm"
              />
            </div>
          </div>

          <div className="flex-1/12">
            <div className="flex max-w-xl flex-col justify-start space-y-3">
              <h1 className="text-5xl leading-tight font-semibold text-neutral-800">
                Hasil Desain Rotan Lebih{" "}
                <span className="text-purp">Cepat & Presisi</span>
              </h1>
              <p className="font-mono text-base text-neutral-700">
                AI Rotanera mengubah sketsa kasar menjadi blueprint anyaman
                akurat & model 3D siap produksi. Pengrajin bisa fokus berkarya,
                bukan menggambar ulang berjam-jam.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-12">
              <div>
                <div>
                  <NumberTicker
                    startValue={50}
                    value={96}
                    className="text-4xl font-bold md:text-6xl"
                  />{" "}
                  <span className="text-4xl font-bold md:text-6xl">%</span>
                </div>
                <div className="mt-2 text-lg text-neutral-600">
                  Akurasi desain realistis
                </div>
              </div>
              <div className="hidden h-12 w-0.5 bg-neutral-300 md:block" />
              <div>
                <div>
                  <NumberTicker
                    value={9.2}
                    decimalPlaces={1}
                    className="text-4xl font-bold md:text-6xl"
                  />
                  <span className="text-4xl font-bold md:text-6xl">x</span>
                </div>
                <div className="mt-2 text-lg text-neutral-600">
                  Lebih cepat dari desain manual
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default WhyUseUsSection;
