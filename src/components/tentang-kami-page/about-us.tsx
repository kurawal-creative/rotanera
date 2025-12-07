const AboutUsSection = () => {
    return (
        <section className="relative mx-auto flex w-full max-w-7xl items-center px-4 py-16 md:py-24 xl:min-h-screen">
            <div className="flex w-full flex-col items-center gap-16 text-center md:flex-row md:items-start md:text-left">
                {/* Kiri */}
                <div className="max-w-2xl flex-1 space-y-6">
                    <div className="text-purp border-purp mx-auto w-fit rounded-full border-2 px-3 py-1 text-xs font-semibold md:mx-0 md:text-sm">Weaving Technologies</div>

                    <h1 className="text-3xl leading-tight font-bold text-neutral-800 md:text-4xl xl:text-5xl dark:text-neutral-100">Apa yang kita kerjakan</h1>

                    <div className="space-y-4 text-sm font-normal text-neutral-600 md:text-base lg:text-lg dark:text-neutral-300">
                        <p>
                            Kami membangun AI yang menjaga kesederhanaan, intuisi, dan ketepatan di setiap anyaman.
                            <span className="text-purp"> Dari sketsa tangan hingga blueprint digital semua diproses dalam hitungan menit, bukan jam.</span>
                        </p>
                        <p>Rotanera menyediakan perangkat lunak yang dapat dengan mudah diintegrasikan ke dalam proses produksi pengrajin, sehingga mereka dapat fokus pada kreativitas, bukan pada kesalahan ukuran atau perhitungan bahan.</p>
                    </div>
                </div>

                {/* Kanan */}
                <div className="max-w-2xl flex-1 space-y-6">
                    <div className="text-purp border-purp mx-auto w-fit rounded-full border-2 px-3 py-1 text-xs font-semibold md:mx-0 md:text-sm">Pioneering for Artisans</div>

                    <h1 className="text-3xl leading-tight font-bold text-neutral-800 md:text-4xl xl:text-5xl dark:text-neutral-100">Apa perbedaan kami</h1>

                    <div className="space-y-4 text-sm font-normal text-neutral-600 md:text-base lg:text-lg dark:text-neutral-300">
                        <p>Komitmen kami pada inovasi bukan hanya tentang apa yang kami buat, tetapi tentang bagaimana kami berpikir: setiap masalah kompleks harus diselesaikan dengan cara yang sederhana.</p>
                        <p>
                            <span className="text-purp">“Bagaimana kami membuat ini mudah bagi pengrajin?”</span> bukan hanya pertanyaan — itu misi kami. Anda tidak hanya menggunakan software; Anda merasakan filosofi di mana setiap kesulitan dipecahkan dengan kejelasan yang tak kompromi.
                        </p>
                        <p>
                            Rotanera didesain khusus untuk industri rotan, bukan CAD generik. Hasilnya:
                            <span className="text-purp"> antarmuka yang intuitif, presisi anyaman terjaga, dan biaya yang terjangkau.</span>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutUsSection;
