import OurTeamsCarousel from "../our-teams-scarousel";

const OurTeamsSection = () => {
    return (
        <section className="mx-auto w-full max-w-7xl px-4 py-12">
            <div className="pb-12">
                <div className="space-y-2 text-center">
                    {/* Badge */}
                    <div className="text-purp border-purp mx-auto flex w-fit justify-center rounded-full border-2 px-2 py-1 text-sm font-semibold">Our Team</div>

                    {/* Heading */}
                    <h1 className="text-4xl font-semibold text-neutral-800 md:text-5xl dark:text-neutral-100">Temui Tim di Balik Revolusi Rotan</h1>

                    {/* Description */}
                    <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-neutral-600 dark:text-neutral-300">Kami tidak menggantikan keahlian kalian — kami memperkuatnya dengan teknologi AI untuk mempercepat pekerjaan kalian.</p>
                </div>
            </div>

            {/* Carousel */}
            <div>
                <OurTeamsCarousel />
            </div>
        </section>
    );
};

export default OurTeamsSection;
