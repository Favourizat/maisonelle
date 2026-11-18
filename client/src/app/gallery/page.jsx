import Image from "next/image";
import Link from "next/link";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

const spaces = [
    {
        number: "01",
        name: "Living Room",
        description: "Spaces for gathering and unwinding.",
        image: "/gallery-living.jpg",
        alt: "Elegant neutral living room with contemporary furniture",
    },
    {
        number: "02",
        name: "Bedroom",
        description: "A softer expression of everyday living.",
        image: "/gallery-bedroom.jpg",
        alt: "Sophisticated bedroom with warm neutral furnishings",
    },
    {
        number: "03",
        name: "Dining Room",
        description: "Where meaningful moments come together.",
        image: "/gallery-dining.jpg",
        alt: "Refined dining room with natural wood furniture",
    },
    {
        number: "04",
        name: "Home Office",
        description: "Thoughtful spaces for inspired work.",
        image: "/gallery-office.jpg",
        alt: "Minimalist home office with elegant wooden furniture",
    },
];

export default function Gallery() {
    return (
        <main className="bg-[#FAF8F5] text-[#30221B]">

            <section className="px-6 md:px-12 lg:px-20 pt-16 pb-20">
                <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-12 lg:gap-16 items-center max-w-[1600px] mx-auto">

                    <div className="flex flex-col items-start">
                        <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-[#8B725F] mb-8">
                            Maisonelle / The Art of Living
                        </span>

                        <h1 className="font-[family-name:var(--font-cormorant)] text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[0.95] font-medium tracking-tight max-w-xl">
                            Interiors Worth Coming <span className="italic text-[#8B725F]">Home To.</span>
                        </h1>

                        <p className="text-sm md:text-base text-[#766B62] leading-8 max-w-md mt-8">
                            An exploration of considered spaces, timeless furnishings, and the little details that make a house feel like home.
                        </p>

                        <Link
                            href="#spaces"
                            className="group flex items-center gap-4 mt-10 text-[10px] md:text-xs uppercase tracking-[0.2em] font-semibold"
                        >
                            Explore the Gallery
                            <span className="w-10 h-10 rounded-full border border-[#C9B8A7] flex items-center justify-center transition-all duration-300 group-hover:bg-[#6F4E37] group-hover:text-white group-hover:border-[#6F4E37]">
                                <ArrowDownRight size={16} />
                            </span>
                        </Link>

                        <div className="hidden lg:flex items-center gap-4 mt-20">
                            <span className="w-12 h-px bg-[#B89B7B]" />
                            <span className="text-[10px] tracking-[0.2em] uppercase text-[#8B725F]">
                                Curated spaces, timeless living
                            </span>
                        </div>
                    </div>

                    <div className="relative w-full h-[430px] md:h-[550px] lg:h-[680px] overflow-hidden">
                        <Image
                            src="/gallery-hero.jpg"
                            alt="Elegant Maisonelle-inspired living room"
                            fill
                            priority
                            sizes="(max-width: 1024px) 100vw, 60vw"
                            className="object-cover object-center"
                        />

                        <div className="absolute inset-0 border border-white/20 pointer-events-none" />

                        <div className="absolute bottom-6 left-6 text-white">
                            <span className="text-[9px] tracking-[0.25em] uppercase">
                                The Maisonelle Edit
                            </span>
                        </div>
                    </div>

                </div>
            </section>

            <section id="spaces" className="px-6 md:px-12 lg:px-20 py-20 md:py-28">

                <div className="max-w-[1600px] mx-auto">

                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">

                        <div>
                            <span className="text-[10px] uppercase tracking-[0.3em] text-[#8B725F]">
                                A World of Interiors
                            </span>

                            <h2 className="font-[family-name:var(--font-cormorant)] text-4xl md:text-5xl lg:text-6xl mt-4">
                                Explore by <span className="italic text-[#8B725F]">Space.</span>
                            </h2>
                        </div>

                        <p className="text-sm text-[#766B62] leading-7 max-w-sm lg:text-right">
                            Every room tells a story. Discover inspiration for the spaces that make your house a home.
                        </p>

                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

                        {spaces.map((space) => (
                            <Link
                                href="#inspiration"
                                key={space.number}
                                className="group block"
                            >

                                <div className="relative aspect-[4/5] overflow-hidden bg-[#E9E0D5]">

                                    <Image
                                        src={space.image}
                                        alt={space.alt}
                                        fill
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                    />

                                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent opacity-80" />

                                    <span className="absolute top-5 left-5 text-[10px] tracking-[0.2em] text-white">
                                        {space.number}
                                    </span>

                                    <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 text-white">

                                        <div className="flex items-end justify-between gap-3">

                                            <div>
                                                <h3 className="font-[family-name:var(--font-cormorant)] text-3xl md:text-4xl">
                                                    {space.name}
                                                </h3>

                                                <p className="text-[11px] text-white/80 mt-2 leading-5">
                                                    {space.description}
                                                </p>
                                            </div>

                                            <span className="w-9 h-9 shrink-0 rounded-full border border-white/60 flex items-center justify-center transition-all duration-300 group-hover:bg-white group-hover:text-[#30221B]">
                                                <ArrowUpRight size={16} />
                                            </span>

                                        </div>

                                    </div>

                                </div>

                            </Link>
                        ))}

                    </div>

                </div>

            </section>

        </main>
    );
}