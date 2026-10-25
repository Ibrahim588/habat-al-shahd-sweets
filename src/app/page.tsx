import HeroSection from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import CategoriesSection from "@/components/home/CategoriesSection";
import FeaturedProductsSection from "@/components/home/FeaturedProductsSection";
import MenuShowcaseSection from "@/components/home/MenuShowcaseSection";
import WhyUsSection from "@/components/home/WhyUsSection";
import OccasionsSection from "@/components/home/OccasionsSection";
import GalleryPreviewSection from "@/components/home/GalleryPreviewSection";
import StorySection from "@/components/home/StorySection";
import CtaBanner from "@/components/home/CtaBanner";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <CategoriesSection />
      <FeaturedProductsSection />
      <MenuShowcaseSection />
      <OccasionsSection />
      <WhyUsSection />
      <GalleryPreviewSection />
      <StorySection />
      <CtaBanner />
    </>
  );
}
