"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../animate-ui/components/radix/accordion";

type RadixAccordionDemoProps = {
  multiple?: boolean;
  collapsible?: boolean;
  keepRendered?: boolean;
  showArrow?: boolean;
};

const AllInOneSection = ({
  multiple = false,
  collapsible = true,
  keepRendered = false,
  showArrow = true,
}: RadixAccordionDemoProps) => {
  const item = [
    {
      title: "Buat Sketsa dan Dapatkan Blueprint",
      content:
        "Cukup gambar tangan dan memasukan foto, AI langsung kenali pola anyaman tradisional & buat pola teknis yang siap dipotong.",
    },
    {
      title: "Model photorealistic otomatis",
      content:
        "Lihat hasil akhir dengan tekstur rotan asli, bayangan, dan pencahayaan realistis sebelum satu batang rotan pun dipotong.",
    },
    {
      title: "Semua proyek tersimpan rapi di cloud",
      content:
        "Revisi kapan saja, bagikan link ke klien atau tim, akses dari mana saja tanpa instal software.",
    },
  ];
  return (
    <>
      <section className="mx-auto w-full max-w-7xl items-center px-4 py-10">
        <div className="flex items-center gap-8">
          <div className="flex-1/6">
            <div className="flex max-w-xl flex-col justify-start space-y-3">
              <div className="text-purp border-purp flex w-fit justify-center rounded-full border-2 px-2 py-1 text-sm">
                Any Question About Us?
              </div>
              <h1 className="text-5xl leading-tight font-semibold text-neutral-800">
                Satu Platform untuk Semua{" "}
                <span className="text-purp">Kebutuhan Desain Rotan</span>
              </h1>
              <p className="font-mono text-base text-neutral-700">
                Dari sketsa tangan sampai file produksi semuanya selesai di
                Rotanera tanpa pindah-pindah aplikasi.
              </p>

              <Accordion
                type={multiple ? "multiple" : "single"}
                collapsible={collapsible}
                className="w-full"
              >
                {item.map((v, i) => (
                  <AccordionItem key={i} value={`item-${i + 1}`}>
                    <AccordionTrigger showArrow={showArrow}>
                      {v.title}
                    </AccordionTrigger>
                    <AccordionContent keepRendered={keepRendered}>
                      {v.content}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>

          <div className="flex-1"></div>
        </div>
      </section>
    </>
  );
};

export default AllInOneSection;
