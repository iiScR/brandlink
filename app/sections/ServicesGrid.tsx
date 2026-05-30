'use client';

import { useRef } from 'react';
import { useInView } from 'framer-motion';
import { GlassCard } from '../components/GlassCard';

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
  const isInView = useInView(sectionRef, { once: true, margin: '-200px' });

  return (
    <section ref={sectionRef} id="services" className="relative py-32 w-full bg-[#050505]">
      <div className="max-w-7xl mx-auto px-6">
        <div
          className={`text-center mb-20 transition-all duration-1000 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <span className="text-sm font-medium tracking-widest uppercase text-[#7C3AED] mb-4 block">
            What We Do
          </span>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 font-heading">
            Services Built for{' '}
            <span className="text-gradient">Results</span>
          </h2>
          <p className="text-lg text-white/50 max-w-2xl mx-auto">
            Every service is designed to move the needle — no fluff, no filler, 
            just strategic design that drives real business outcomes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, i) => (
            <div
              key={service.title}
              className={`transition-all duration-700 ${
                isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${0.2 + i * 0.1}s` }}
            >
              <GlassCard glowColor={service.color} className="p-8 h-full group">
                <div className={`mb-6 transition-transform duration-300 group-hover:scale-110 ${
                  service.color === 'purple' ? 'text-[#7C3AED]' : service.color === 'blue' ? 'text-[#2563EB]' : 'text-[#06B6D4]'
                }`}>
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold mb-3 font-heading">{service.title}</h3>
                <p className="text-white/50 leading-relaxed">{service.description}</p>
              </GlassCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
