import { NumberTicker } from "../ui/number-ticker";

const stats = [
  { value: 96, suffix: "%", decimals: 0, label: "Akurasi desain realistis" },
  { value: 9.2, suffix: "x", decimals: 1, label: "Lebih cepat dari manual" },
  { value: 200, suffix: "+", decimals: 0, label: "Pengrajin menggunakan" },
  { value: 15, suffix: "K", decimals: 0, label: "Blueprint dihasilkan" },
];

export default function WhyUseUsSection() {
  return (
    <section className="mx-auto w-full max-w-7xl items-center px-4 pt-10">
      <div className="flex flex-col items-center gap-8 md:flex-row">
        <div className="flex-1 space-y-3">
          <div className="text-purp border-purp flex w-fit justify-center rounded-full border-2 px-2 py-1 text-sm">
            Why Use Us
          </div>
          <h1 className="text-5xl leading-tight font-semibold text-neutral-800">
            Desain Rotan Premium,{" "}
            <span className="text-purp">
              Kini Lebih Cepat & Presisi Maksimal
            </span>
          </h1>
        </div>
        <div className="flex-1">
          <div className="mt-8 grid grid-cols-2 gap-12 sm:grid-cols-2">
            {stats.map((s, i) => (
              <div key={i} className="text-center">
                <div className="flex items-baseline justify-center gap-1">
                  <NumberTicker
                    startValue={0}
                    value={s.value}
                    decimalPlaces={s.decimals}
                    className="text-4xl font-bold md:text-6xl"
                  />
                  <span className="text-4xl font-bold md:text-6xl">
                    {s.suffix}
                  </span>
                </div>
                <div className="mt-2 text-lg text-neutral-600">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
