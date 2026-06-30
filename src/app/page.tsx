import { Hero } from "@/components/home/Hero";
import { MeterBrandCards } from "@/components/home/MeterBrandCards";
import { SnapSealBand } from "@/components/home/SnapSealBand";
import { WhyCarolina } from "@/components/home/WhyCarolina";
import { CustomCTABand } from "@/components/home/CustomCTABand";

export default function HomePage() {
  return (
    <>
      <Hero />
      <MeterBrandCards />
      <SnapSealBand />
      <WhyCarolina />
      <CustomCTABand />
    </>
  );
}
