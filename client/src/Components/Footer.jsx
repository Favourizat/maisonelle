
import Link from "next/link";
import {
    ArrowRight,
    Mail,
    Phone,
    MapPin,
} from "lucide-react";

import {
    FaInstagram,
    FaFacebookF,
    FaYoutube,
    FaPinterestP,
} from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="bg-[#2B1811] text-[#F5EBDD]">

            <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-16">

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-10">

                    <div>
                        <Link href="/" className="inline-block">
                            <h2 className="font-[var(--font-cormorant)] text-4xl md:text-5xl font-semibold tracking-wide">
                                Maisonelle<span className="text-[#C6A16B]">.</span>
                            </h2>
                        </Link>

                        <p className="text-[#D8C8B8] text-sm leading-7 mt-5 max-w-xs">
                            Thoughtfully curated furniture and home essentials
                            designed to bring timeless elegance, comfort, and
                            character into your living spaces.
                        </p>

                        <div className="flex items-center gap-4 mt-7">
                            <a href="#" aria-label="Instagram"
                                className="border border-[#80664F] p-2.5 rounded-full hover:bg-[#C6A16B] hover:text-[#2B1811] transition">
                                <FaInstagram size={17} />
                            </a>
                            <a href="#" aria-label="Facebook"
                                className="border border-[#80664F] p-2.5 rounded-full hover:bg-[#C6A16B] hover:text-[#2B1811] transition">
                                <FaFacebookF size={17} />
                            </a>
                            <a href="#" aria-label="Pinterest"
                                className="border border-[#80664F] p-2.5 rounded-full hover:bg-[#C6A16B] hover:text-[#2B1811] transition">
                                <FaPinterestP size={17} />
                            </a>
                            <a href="#" aria-label="YouTube"
                                className="border border-[#80664F] p-2.5 rounded-full hover:bg-[#C6A16B] hover:text-[#2B1811] transition">
                                <FaYoutube size={17} />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-[var(--font-cormorant)] text-2xl font-semibold mb-6">
                            Explore
                        </h3>

                        <ul className="space-y-4 text-sm text-[#D8C8B8]">
                            <li><Link href="/" className="hover:text-[#C6A16B] transition">Home</Link></li>
                            <li><Link href="/shop" className="hover:text-[#C6A16B] transition">Shop All</Link></li>
                            <li><Link href="/about" className="hover:text-[#C6A16B] transition">About Maisonelle</Link></li>
                            <li><Link href="/new-arrivals" className="hover:text-[#C6A16B] transition">New Arrivals</Link></li>
                            <li><Link href="/contact" className="hover:text-[#C6A16B] transition">Contact Us</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-[var(--font-cormorant)] text-2xl font-semibold mb-6">
                            Customer Care
                        </h3>

                        <ul className="space-y-4 text-sm text-[#D8C8B8]">
                            <li><Link href="/faq" className="hover:text-[#C6A16B] transition">Frequently Asked Questions</Link></li>
                            <li><Link href="/shipping" className="hover:text-[#C6A16B] transition">Shipping & Delivery</Link></li>
                            <li><Link href="/returns" className="hover:text-[#C6A16B] transition">Returns & Refunds</Link></li>
                            <li><Link href="/privacy" className="hover:text-[#C6A16B] transition">Privacy Policy</Link></li>
                            <li><Link href="/terms" className="hover:text-[#C6A16B] transition">Terms & Conditions</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-[var(--font-cormorant)] text-2xl font-semibold mb-5">
                            A Touch of Elegance
                        </h3>

                        <p className="text-sm text-[#D8C8B8] leading-7 mb-6">
                            Subscribe to receive updates on new collections,
                            interior inspiration, and exclusive offers.
                        </p>

                        <form className="flex items-center border-b border-[#80664F] pb-3">
                            <input
                                type="email"
                                placeholder="Your email address"
                                aria-label="Your email address"
                                className="bg-transparent outline-none w-full text-sm text-white placeholder:text-[#B8A493]"
                            />

                            <button
                                type="button"
                                aria-label="Subscribe"
                                className="text-[#C6A16B] hover:text-white transition"
                            >
                                <ArrowRight size={22} />
                            </button>
                        </form>

                        <p className="text-xs text-[#B8A493] mt-4">
                            By subscribing, you agree to receive Maisonelle updates.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-16 pt-8 border-t border-[#634A39] text-sm text-[#D8C8B8]">
                    <div className="flex items-center gap-3">
                        <Mail size={17} className="text-[#C6A16B]" />
                        <span>hello@maisonelle.com</span>
                    </div>

                    <div className="flex items-center gap-3">
                        <Phone size={17} className="text-[#C6A16B]" />
                        <span>Customer Support</span>
                    </div>

                    <div className="flex items-center gap-3">
                        <MapPin size={17} className="text-[#C6A16B]" />
                        <span>Designed for beautiful living</span>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-between gap-5 mt-10 pt-7 border-t border-[#634A39]">

                    <p className="text-xs text-[#B8A493] text-center">
                        © 2026 Maisonelle. All rights reserved.
                    </p>

                    <p className="font-[var(--font-cormorant)] text-lg tracking-[3px] text-[#C6A16B]">
                        LIVE BEAUTIFULLY.
                    </p>

                    <p className="text-xs text-[#B8A493]">
                        Crafted with elegance.
                    </p>
                </div>

            </div>
        </footer>
    );
}
