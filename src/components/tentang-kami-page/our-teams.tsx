import OurTeamsCarousel from "../our-teams-scarousel";

const OurTeamsSection = () => {
  return (
    <>
      <section className="mx-auto w-full max-w-7xl px-4 py-12">
        <div className="pb-12">
          <div className="space-y-2 text-center">
            <div className="text-purp border-purp mx-auto flex w-fit justify-center rounded-full border-2 px-2 py-1 text-sm">
              Our Team
            </div>
            <h1 className="text-4xl font-semibold text-neutral-800 md:text-5xl">
              Temui Tim di Balik Revolusi Rotan
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-neutral-600">
              Kami tidak menggantikan keahlian kalian kami memperkuatnya dengan
              teknologi Ai untuk mempercepat pekerjaan kalian.
            </p>
          </div>
        </div>
        <div>
          <OurTeamsCarousel />
        </div>
      </section>
    </>
  );
};

export default OurTeamsSection;
