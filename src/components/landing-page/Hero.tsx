import {
  Cursor,
  CursorFollow,
  CursorProvider,
} from "../animate-ui/components/animate/cursor";

const HeroSection = () => {
  return (
    <section className="relative mx-auto flex min-h-[85vh] w-full max-w-7xl flex-col justify-center space-y-12 px-4 pt-24">
      <div className="flex items-start gap-10 md:flex-row md:items-center">
        {/* Left Text */}
        <div className="flex-1/4">
          <h1 className="w-full font-mono text-7xl text-neutral-900">
            Buat Blueprint Desain Rotan secara Instan dengan AI
          </h1>
        </div>

        {/* Right Text */}
        <div className="flex-1/12">
          <p className="relative text-xl leading-relaxed text-neutral-600 lg:top-12 lg:right-18">
            Bangun desain produk rotan hanya dari ide atau konsep. AI membantu
            menghasilkan blueprint presisi untuk kursi, meja, keranjang,
            dekorasi, dan beragam model rotan siap produksi lebih cepat dan
            efisien.
          </p>
        </div>
      </div>
      <div className="px-6">
        <div className="h-90 rounded-xl border-2 border-neutral-400">
          <CursorProvider>
            <Cursor />
            <CursorFollow>Designer</CursorFollow>
          </CursorProvider>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
