import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import TrustBar from "@/components/home/TrustBar";
import FeaturedRooms from "@/components/home/FeaturedRooms";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Testimonials from "@/components/home/Testimonials";
import SpecialOffers from "@/components/home/SpecialOffers";
import Newsletter from "@/components/home/Newsletter";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <TrustBar />
        <FeaturedRooms />
        <WhyChooseUs />
        <Testimonials />
        <SpecialOffers />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
