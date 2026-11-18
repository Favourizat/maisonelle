
import { Dot } from "lucide-react";

export default function VideoAd() {
    return (
        <section className="px-4 md:px-8 py-10">
            <div className="relative w-full h-[500px] md:h-[750px] overflow-hidden">

                <video
                    src="/furnitureVideo3.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover object-center"
                />

                <div className="absolute inset-0 bg-black/40 z-[1]" />

                <div className="absolute inset-0 z-10 flex flex-col justify-end px-6 md:px-10 pb-12">

                    <h3 className="flex items-center justify-center relative w-fit border border-gray-400 rounded-full shadow-2xl text-white text-2xl font-medium py-2 px-10">
                        <Dot
                            size={35}
                            strokeWidth={1.5}
                            className="absolute left-2 text-orange-600"
                        />
                        Furniture Set Ad
                    </h3>

                    <h2 className="mt-10 text-3xl md:text-6xl font-semibold text-white">
                        Premium Products Designed For
                        <br />
                        Modern Living
                    </h2>

                </div>
            </div>
        </section>
    );
}
