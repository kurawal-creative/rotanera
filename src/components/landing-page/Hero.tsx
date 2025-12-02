import { AuroraBackground } from "../ui/aurora-background";

const HeroSection = () => {
  return (
    <>
      <AuroraBackground className="-mt-14">
        <section className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col justify-center space-y-12 px-6">
          <div className="flex items-start gap-10 md:flex-row md:items-center">
            <div className="mx-auto text-center">
              <h1 className="w-full text-4xl font-semibold text-neutral-900">
                Buat Blueprint Desain Rotan secara Instan dengan AI
              </h1>
            </div>
          </div>
        </section>
      </AuroraBackground>
    </>
  );
};

export default HeroSection;
