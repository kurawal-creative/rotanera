const FeaturesSection = () => {
    return (
        <>
            <section className="mx-auto w-full max-w-7xl items-center px-4 pb-14 md:pb-10">
                <div className="mx-auto flex max-w-2xl flex-col items-center justify-center space-y-3 text-center">
                    <div className="flex flex-col items-center text-center lg:items-start lg:text-start">
                        <div className="text-purp border-purp mx-auto flex w-fit justify-center rounded-full border-2 px-2 py-1 text-sm">Our Features</div>
                        <h1 className="mt-2 text-3xl leading-tight font-semibold text-neutral-800 md:text-4xl lg:text-5xl">Fitur Premium yang Membuat Desain Rotan Anda Hidup</h1>
                        <p className="mt-4 font-mono text-base text-neutral-700">Ubah sketsa jadi blueprint rotan presisi tinggi & model 3D siap produksi dalam hitungan menit. Didukung AI khusus rotan, akurasi anyaman terjamin, visual photorealistic, dan ekspor file produksi langsung. Satu platform elegan untuk pengrajin modern.</p>
                    </div>
                </div>
                <div className="mx-auto mt-12 flex items-center justify-center gap-4">
                    <div className="grid w-120 grid-cols-1 gap-4">
                        <div className="col-span-1 h-60 rounded-sm border">grid 1</div>
                        <div className="col-span-1 h-40 rounded-sm border">grid 2</div>
                    </div>
                    <div className="grid w-120 grid-cols-1 gap-4">
                        <div className="col-span-1 h-40 rounded-sm border">grid 3</div>
                        <div className="col-span-1 h-60 rounded-sm border">grid 4</div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default FeaturesSection;
