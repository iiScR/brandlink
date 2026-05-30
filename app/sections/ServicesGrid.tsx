'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GlassCard } from '../components/GlassCard';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: 'Landing Page Design',
    description: 'Custom-designed, conversion-focused landing pages that make your business impossible to ignore.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <line x1="3" y1="9" x2="21" y2="9" />
        <line x1="9" y1="21" x2="9" y2="9" />
      </svg>
    ),
    color: 'purple' as const,
  },
  {
    title: 'Mobile Optimization',
    description: 'Every page is built mobile-first, ensuring flawless performance on every device and screen size.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
        <line x1="12" y1="18" x2="12.01" y2="18" />
      </svg>
    ),
    color: 'blue' as const,
  },
  {
    title: 'SEO Setup',
    description: 'Technical SEO foundation built-in. Rank higher on Google and get found by customers searching for you.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
        <line x1="11" y1="8" x2="11" y2="14" />
        <line x1="8" y1="11" x2="14" y2="11" />
      </svg>
    ),
    color: 'cyan' as const,
  },
  {
    title: 'Conversion Optimization',
    description: 'Strategic layouts, compelling copy frameworks, and A/B-tested designs that turn visitors into buyers.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
        <polyline points="17 6 23 6 23 12" />
      </svg>
    ),
    color: 'purple' as const,
  },
];

export function ServicesGrid() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo('.services-label', { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, ease: 'power2.out',
        scrollTrigger: { trigger: '.services-label', start: 'top 85%', toggleActions: 'play none none reverse' },
      });
      gsap.fromTo('.services-headline', { y: 50, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, delay: 0.1, ease: 'power2.out',
        scrollTrigger: { trigger: '.services-headline', start: 'top 85%', toggleActions: 'play none none reverse' },
      });
      gsap.fromTo('.services-body', { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, delay: 0.15, ease: 'power2.out',
        scrollTrigger: { trigger: '.services-body', start: 'top 85%', toggleActions: 'play none none reverse' },
      });
      gsap.fromTo('.service-card', { y: 60, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.7, stagger: 0.12, ease: 'power2.out',
        scrollTrigger: { trigger: '.service-card', start: 'top 85%', toggleActions: 'play none none reverse' },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="services" className="relative py-40 w-full bg-[#050505]">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-24">
          <span className="services-label text-sm font-medium tracking-widest uppercase text-[#7C3AED] mb-5 block">
            What We Do
          </span>
          <h2 className="services-headline text-4xl md:text-6xl lg:text-7xl font-bold mb-8 font-heading">
            Services Built for{' '}
            <span className="text-gradient">Results</span>
          </h2>
          <p className="services-body text-lg text-white/45 max-w-2xl mx-auto leading-relaxed">
            Every service is designed to move the needle — no fluff, no filler, just strategic design that drives real business outcomes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service) => (
            <div key={service.title} className="service-card">
              <GlassCard glowColor={service.color} className="p-10 h-full group">
                <div className={`mb-8 transition-transform duration-300 group-hover:scale-110 ${
                  service.color === 'purple' ? 'text-[#7C3AED]' : service.color === 'blue' ? 'text-[#2563EB]' : 'text-[#06B6D4]'
                }`}>
                  {service.icon}
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-4 font-heading">{service.title}</h3>
                <p className="text-white/45 leading-relaxed text-base">{service.description}</p>
              </GlassCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
