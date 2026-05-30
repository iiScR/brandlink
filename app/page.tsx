'use client';

import { useEffect, useRef, Suspense } from 'react';
import dynamic from 'next/dynamic';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { Navigation } from './sections/Navigation';
import { ServicesGrid } from './sections/ServicesGrid';
import { ProcessTimeline } from './sections/ProcessTimeline';
import { Testimonials } from './sections/Testimonials';
import { Footer } from './sections/Footer';
import { AnimatedCounter } from './components/AnimatedCounter';
import { GlassCard } from './components/GlassCard';

gsap.registerPlugin(ScrollTrigger);

const HeroCanvas = dynamic(() => import('../components/scenes/HeroScene').then(m => ({ default: m.HeroCanvas })), { ssr: false });
const CityCanvas = dynamic(() => import('../components/scenes/CityScene').then(m => ({ default: m.CityCanvas })), { ssr: false });
const GrowthCanvas = dynamic(() => import('../components/scenes/GrowthScene').then(m => ({ default: m.GrowthCanvas })), { ssr: false });
const PortfolioCanvas = dynamic(() => import('../components/scenes/PortfolioScene').then(m => ({ default: m.PortfolioCanvas })), { ssr: false });
const CTACanvas = dynamic(() => import('../components/scenes/CTAScene').then(m => ({ default: m.CTACanvas })), { ssr: false });

interface ProgressRef {
  value: number;
}

const metrics = [
  { label: 'Leads Generated', value: 1247, suffix: '+', color: 'purple' as const },
  { label: 'Bookings Scheduled', value: 856, suffix: '+', color: 'blue' as const },
  { label: 'Calls Received', value: 2341, suffix: '+', color: 'cyan' as const },
  { label: 'Revenue Boost', value: 340, prefix: '$', suffix: 'K+', color: 'purple' as const },
];

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const cityRef = useRef<HTMLElement>(null);
  const growthRef = useRef<HTMLElement>(null);
  const portfolioRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLElement>(null);

  const heroProgress = useRef<ProgressRef>({ value: 0 });
  const cityProgress = useRef<ProgressRef>({ value: 0 });
  const growthProgress = useRef<ProgressRef>({ value: 0 });
  const portfolioProgress = useRef<ProgressRef>({ value: 0 });

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {
      if (heroRef.current) {
        gsap.timeline({
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: '+=140%',
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
            onUpdate: (self) => { heroProgress.current.value = self.progress; },
          },
        })
        .fromTo('.hero-headline', { y: 0, opacity: 1 }, { y: -80, opacity: 0, ease: 'power2.in' }, 0.55)
        .fromTo('.hero-sub', { y: 0, opacity: 1 }, { y: -60, opacity: 0, ease: 'power2.in' }, 0.6)
        .fromTo('.hero-cta', { y: 0, opacity: 1 }, { y: -40, opacity: 0, ease: 'power2.in' }, 0.65)
        .fromTo('.hero-scroll', { opacity: 1 }, { opacity: 0, ease: 'power2.in' }, 0.45);
      }

      if (cityRef.current) {
        gsap.timeline({
          scrollTrigger: {
            trigger: cityRef.current,
            start: 'top top',
            end: '+=130%',
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
            onUpdate: (self) => { cityProgress.current.value = self.progress; },
          },
        })
        .fromTo('.city-label', { y: 40, opacity: 0 }, { y: 0, opacity: 1, ease: 'power2.out' }, 0)
        .fromTo('.city-headline', { y: 60, opacity: 0 }, { y: 0, opacity: 1, ease: 'power2.out' }, 0.05)
        .fromTo('.city-body', { y: 40, opacity: 0 }, { y: 0, opacity: 1, ease: 'power2.out' }, 0.1)
        .to('.city-label', { y: -30, opacity: 0, ease: 'power2.in' }, 0.7)
        .to('.city-headline', { y: -40, opacity: 0, ease: 'power2.in' }, 0.73)
        .to('.city-body', { y: -30, opacity: 0, ease: 'power2.in' }, 0.76);
      }

      if (growthRef.current) {
        gsap.timeline({
          scrollTrigger: {
            trigger: growthRef.current,
            start: 'top top',
            end: '+=130%',
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
            onUpdate: (self) => { growthProgress.current.value = self.progress; },
          },
        })
        .fromTo('.growth-label', { y: 40, opacity: 0 }, { y: 0, opacity: 1, ease: 'power2.out' }, 0)
        .fromTo('.growth-headline', { y: 60, opacity: 0 }, { y: 0, opacity: 1, ease: 'power2.out' }, 0.05)
        .fromTo('.growth-body', { y: 40, opacity: 0 }, { y: 0, opacity: 1, ease: 'power2.out' }, 0.1)
        .fromTo('.growth-card', { y: 50, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.04, ease: 'power2.out' }, 0.15)
        .to('.growth-label', { y: -30, opacity: 0, ease: 'power2.in' }, 0.68)
        .to('.growth-headline', { y: -40, opacity: 0, ease: 'power2.in' }, 0.7)
        .to('.growth-body', { y: -30, opacity: 0, ease: 'power2.in' }, 0.72)
        .to('.growth-card', { y: -20, opacity: 0, stagger: 0.02, ease: 'power2.in' }, 0.74);
      }

      if (portfolioRef.current) {
        gsap.timeline({
          scrollTrigger: {
            trigger: portfolioRef.current,
            start: 'top top',
            end: '+=130%',
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
            onUpdate: (self) => { portfolioProgress.current.value = self.progress; },
          },
        })
        .fromTo('.portfolio-label', { y: 40, opacity: 0 }, { y: 0, opacity: 1, ease: 'power2.out' }, 0)
        .fromTo('.portfolio-headline', { y: 60, opacity: 0 }, { y: 0, opacity: 1, ease: 'power2.out' }, 0.05)
        .fromTo('.portfolio-body', { y: 40, opacity: 0 }, { y: 0, opacity: 1, ease: 'power2.out' }, 0.1)
        .to('.portfolio-label', { y: -30, opacity: 0, ease: 'power2.in' }, 0.68)
        .to('.portfolio-headline', { y: -40, opacity: 0, ease: 'power2.in' }, 0.7)
        .to('.portfolio-body', { y: -30, opacity: 0, ease: 'power2.in' }, 0.72);
      }

      if (ctaRef.current) {
        gsap.timeline({
          scrollTrigger: {
            trigger: ctaRef.current,
            start: 'top top',
            end: '+=120%',
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
          },
        })
        .fromTo('.cta-headline', { y: 60, opacity: 0 }, { y: 0, opacity: 1, ease: 'power2.out' }, 0)
        .fromTo('.cta-body', { y: 40, opacity: 0 }, { y: 0, opacity: 1, ease: 'power2.out' }, 0.08)
        .fromTo('.cta-btn', { y: 30, opacity: 0, scale: 0.95 }, { y: 0, opacity: 1, scale: 1, ease: 'power2.out' }, 0.12);
      }
    });

    return () => {
      ctx.revert();
      lenis.destroy();
    };
  }, []);

  return (
    <main className="relative bg-[#050505] min-h-screen">
      <Navigation />

      {/* SCENE 1: HERO */}
      <section ref={heroRef} className="relative h-screen w-full overflow-hidden bg-[#050505]">
        <div className="absolute inset-0 z-0">
          <Suspense fallback={<div className="w-full h-full bg-[#050505]" />}>
            <HeroCanvas progressRef={heroProgress} />
          </Suspense>
        </div>
        <div className="absolute inset-0 z-[5] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at center, rgba(5,5,5,0.2) 0%, rgba(5,5,5,0.6) 60%, rgba(5,5,5,0.92) 100%)' }}
        />
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-8 pointer-events-none">
          <div className="max-w-5xl">
            <h1 className="hero-headline text-5xl md:text-7xl lg:text-[6rem] font-bold leading-[1.05] tracking-tight mb-8 font-heading">
              Websites That Make{' '}
              <span className="text-gradient">Small Businesses</span>{' '}
              Look Unstoppable
            </h1>
            <p className="hero-sub text-lg md:text-xl text-white/50 max-w-2xl mx-auto mb-12">
              We design high-converting landing pages that turn visitors into real customers.
            </p>
            <div className="hero-cta flex flex-wrap justify-center gap-4 pointer-events-auto">
              <a href="#portfolio" className="px-8 py-4 rounded-full bg-white text-[#050505] font-semibold hover:bg-white/90 transition-all duration-300 hover:scale-105">
                View Work
              </a>
              <a href="#cta" className="px-8 py-4 rounded-full border border-white/20 text-white font-semibold hover:bg-white/5 transition-all duration-300 hover:scale-105">
                Get Free Preview
              </a>
            </div>
          </div>
        </div>
        <div className="hero-scroll absolute bottom-10 left-1/2 -translate-x-1/2 z-10">
          <div className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center pt-2">
            <div className="w-1 h-2 bg-white/40 rounded-full animate-bounce" />
          </div>
        </div>
      </section>

      {/* SCENE 2: DIGITAL CITY */}
      <section ref={cityRef} className="relative h-screen w-full overflow-hidden bg-[#050505]">
        <div className="absolute inset-0 z-0">
          <Suspense fallback={<div className="w-full h-full bg-[#050505]" />}>
            <CityCanvas progressRef={cityProgress} />
          </Suspense>
        </div>
        <div className="absolute inset-0 z-[5] pointer-events-none"
          style={{ background: 'linear-gradient(90deg, rgba(5,5,5,0.88) 0%, rgba(5,5,5,0.4) 50%, rgba(5,5,5,0.15) 100%)' }}
        />
        <div className="absolute inset-0 z-10 flex items-center px-8 md:px-20">
          <div className="max-w-xl">
            <span className="city-label text-sm font-medium tracking-widest uppercase text-[#7C3AED] mb-5 block">
              Digital Presence
            </span>
            <h2 className="city-headline text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.08] mb-8 font-heading">
              Every Business Deserves{' '}
              <span className="text-gradient">To Be Seen</span>
            </h2>
            <p className="city-body text-lg text-white/45 leading-relaxed max-w-md">
              In a city of competitors, most businesses stay in the dark. BrandLink turns the spotlight on you — lighting up your digital presence so customers find you first.
            </p>
          </div>
        </div>
      </section>

      {/* SCENE 3: GROWTH ENGINE */}
      <section ref={growthRef} className="relative min-h-screen w-full overflow-hidden bg-[#050505]">
        <div className="absolute inset-0 z-0">
          <Suspense fallback={<div className="w-full h-full bg-[#050505]" />}>
            <GrowthCanvas progressRef={growthProgress} />
          </Suspense>
        </div>
        <div className="absolute inset-0 z-[5] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at center, rgba(5,5,5,0.3) 0%, rgba(5,5,5,0.7) 70%, rgba(5,5,5,0.92) 100%)' }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-8 py-32">
          <div className="text-center mb-24">
            <span className="growth-label text-sm font-medium tracking-widest uppercase text-[#06B6D4] mb-5 block">
              The Engine
            </span>
            <h2 className="growth-headline text-4xl md:text-6xl lg:text-7xl font-bold mb-8 font-heading">
              Your <span className="text-gradient">Growth Engine</span>
            </h2>
            <p className="growth-body text-lg text-white/45 max-w-2xl mx-auto leading-relaxed">
              We don&apos;t just build pretty pages. We architect conversion machines that turn traffic into measurable business growth.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {metrics.map((m, i) => (
              <div key={m.label} className="growth-card">
                <GlassCard glowColor={m.color} className="p-8 text-center">
                  <div className="text-4xl md:text-5xl font-bold mb-2 font-heading text-gradient">
                    <AnimatedCounter end={m.value} prefix={m.prefix} suffix={m.suffix} duration={2.5} />
                  </div>
                  <div className="text-sm text-white/50">{m.label}</div>
                </GlassCard>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SCENE 4: PORTFOLIO SHOWROOM */}
      <section ref={portfolioRef} className="relative h-screen w-full overflow-hidden bg-[#050505]">
        <div className="absolute inset-0 z-0">
          <Suspense fallback={<div className="w-full h-full bg-[#050505]" />}>
            <PortfolioCanvas progressRef={portfolioProgress} />
          </Suspense>
        </div>
        <div className="absolute inset-0 z-[5] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at center, rgba(5,5,5,0.5) 0%, rgba(5,5,5,0.8) 60%, rgba(5,5,5,0.95) 100%)' }}
        />
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-8 pointer-events-none">
          <div className="max-w-3xl">
            <span className="portfolio-label text-sm font-medium tracking-widest uppercase text-[#2563EB] mb-5 block">
              Selected Work
            </span>
            <h2 className="portfolio-headline text-4xl md:text-6xl lg:text-7xl font-bold mb-8 font-heading">
              Projects That <span className="text-gradient">Perform</span>
            </h2>
            <p className="portfolio-body text-lg text-white/45 max-w-xl mx-auto leading-relaxed">
              Every site we build is a conversion machine disguised as a work of art.
            </p>
          </div>
        </div>
      </section>

      {/* SCENE 5: SERVICES */}
      <ServicesGrid />

      {/* SCENE 6: PROCESS */}
      <ProcessTimeline />

      {/* SCENE 7: TESTIMONIALS */}
      <Testimonials />

      {/* SCENE 8: CTA VAULT */}
      <section ref={ctaRef} className="relative h-screen w-full overflow-hidden bg-[#050505]">
        <div className="absolute inset-0 z-0">
          <Suspense fallback={<div className="w-full h-full bg-[#050505]" />}>
            <CTACanvas />
          </Suspense>
        </div>
        <div className="absolute inset-0 z-[5] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at center, rgba(5,5,5,0.35) 0%, rgba(5,5,5,0.75) 60%, rgba(5,5,5,0.95) 100%)' }}
        />
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-8">
          <div className="max-w-3xl">
            <h2 className="cta-headline text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.08] mb-10 font-heading">
              Your Competitors Already Have{' '}
              <span className="text-gradient">Attention</span>.{' '}
              Let&apos;s Build Something Better.
            </h2>
            <p className="cta-body text-lg md:text-xl text-white/45 mb-14 max-w-lg mx-auto leading-relaxed">
              Don&apos;t let another month go by with a website that underperforms. Let&apos;s create something that works as hard as you do.
            </p>
            <a href="#" className="cta-btn inline-flex items-center gap-3 px-10 py-5 rounded-full bg-white text-[#050505] font-bold text-lg hover:bg-white/90 transition-all duration-300 hover:scale-105">
              Start My Project
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
            <p className="mt-8 text-sm text-white/25">
              Free 15-minute consultation. No commitment required.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
