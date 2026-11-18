import AboutHero from "./AboutHero";
import Image from "next/image";
import { House } from "lucide-react";
import OurMission from "./OurMission";
import OurCeo from "./OurCeo";
import OurTeam from "./OurTeam";
import Reviews from "@/Components/Reviews";
import Footer from "@/Components/Footer";
import OurStory from "./OurStory";
import Metrics from "./Metrics";
import OurVision from "./OurVision";


export default function AboutPage() {
    return (
        <main>
            <div>
                <AboutHero />

                {/* <OurCeo />
                <OurMission />
                <OurTeam />
                <Reviews /> */}
                <OurStory />
                <Metrics />
                <OurMission />
                {/* <OurVision /> */}
                <OurTeam />
                <Reviews />
                <Footer />
                
            </div>
        </main>
    )
}