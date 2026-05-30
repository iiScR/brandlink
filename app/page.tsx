'use client';

import { useLenis } from './hooks/useLenis';
import { Navigation } from './sections/Navigation';
import { HeroScene } from './sections/HeroScene';
import { CityScene } from './sections/CityScene';
import { GrowthEngine } from './sections/GrowthEngine';
import { ServicesGrid } from './sections/ServicesGrid';
import { PortfolioShowcase } from './sections/PortfolioShowcase';
import { ProcessTimeline } from './sections/ProcessTimeline';
import { Testimonials } from './sections/Testimonials';
import { CTAVault } from './sections/CTAVault';
import { Footer } from './sections/Footer';

export default function Home() {
  useLenis();

  return (
    <main className="relative bg-[#050505] min-h-screen">
      <Navigation />
      <HeroScene />
      <CityScene />
      <GrowthEngine />
      <ServicesGrid />
      <PortfolioShowcase />
      <ProcessTimeline />
      <Testimonials />
      <CTAVault />
      <Footer />
    </main>
  );
}
