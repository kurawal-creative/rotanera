const AboutUsSection = () => {
  return (
    <>
      <section className="mx-auto -mt-16 flex min-h-screen w-full max-w-7xl items-center px-4">
        <div className="flex flex-col gap-12 md:flex-row">
          {/* Kolom Kiri : Apa yang kita kerjakan */}
          <div className="flex-1 space-y-4">
            <div className="text-purp border-purp w-fit rounded-full border-2 px-2 py-1 text-sm">
              Weaving Technologies
            </div>
            <h1 className="text-5xl font-semibold text-neutral-800">
              Apa yang kita kerjakan
            </h1>
            <div className="space-y-3 text-base text-neutral-600">
              <p className="text-lg">
                Kami membangun AI yang menjaga kesederhanaan, intuisi, dan
                ketepatan di setiap anyaman.{" "}
                <span className="text-purp">
                  Dari sketsa tangan hingga blueprint digital semua diproses
                  dalam hitungan menit, bukan jam.
                </span>
              </p>
              <p className="text-lg">
                Rotanera menyediakan perangkat lunak yang dapat dengan mudah
                diintegrasikan ke dalam proses produksi pengrajin, sehingga
                mereka dapat fokus pada kreativitas, bukan pada kesalahan ukuran
                atau perhitungan bahan.
              </p>
            </div>
          </div>
          <div className="flex-1 space-y-4">
            <div className="text-purp border-purp w-fit rounded-full border-2 px-2 py-1 text-sm">
              Pioneering for Artisans
            </div>
            <h1 className="text-5xl font-semibold text-neutral-800">
              Apa perbedaan kami
            </h1>
            <div className="space-y-3 text-base text-neutral-600">
              <p className="text-lg">
                Komitmen kami pada inovasi bukan hanya tentang apa yang kami
                buat, tetapi tentang bagaimana kami berpikir: setiap masalah
                kompleks harus diselesaikan dengan cara yang sederhana.
              </p>
              <p className="text-lg">
                <span className="text-purp">
                  “Bagaimana kami membuat ini mudah bagi pengrajin?”
                </span>{" "}
                bukan hanya pertanyaan itu misi kami. Anda tidak hanya
                menggunakan software; Anda merasakan filosofi di mana setiap
                kesulitan dipecahkan dengan kejelasan yang tak kompromi.
              </p>
              <p className="text-lg">
                Rotanera didesain khusus untuk industri rotan, bukan CAD
                generik. Hasilnya:{" "}
                <span className="text-purp">
                  antarmuka yang intuitif, presisi anyaman terjaga, dan biaya
                  yang terjangkau.
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutUsSection;
