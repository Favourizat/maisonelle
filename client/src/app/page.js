import Image from "next/image";
import Hero from "../Components/Hero";
import Shopbycategory from "../Components/Shopbycategory";
import FlashSale from "../Components/FlashSale";
import FlashSal2 from "../Components/FlashSale";
import TopRatedProducts from "../Components/TopratedProducts";
import ProductCard from "../Components/ProductCard";
import VideoAd from "../Components/VideoAd";
import Trending from "../Components/Trending";
import FlashSales from "../Components/FlashSales";
import NewArrivals from "../Components/NewArrivals";
import TvCabinet from "../Components/TvCabinet";
import DesignStories from "../Components/Design Stories";
import Reviews from "../Components/Reviews";
import Footer from "../Components/Footer";
import { products } from "@/data/products";


export default function Home() {
  return (
    <>

      <main>
        <Hero />
        <Shopbycategory />
        <FlashSale />
        <TopRatedProducts />
        <VideoAd />
        <Trending />
        <FlashSales />
        <NewArrivals />
        <TvCabinet />
        <DesignStories />
        <Reviews />
        <Footer />
      </main>
    </>
  )
}
