'use client';

import { useRef } from 'react';
import { useInView } from 'framer-motion';
import { GlassCard } from '../components/GlassCard';

const testimonials = [
  {
    quote: "BrandLink transformed our online presence. We went from 5 bookings a week to 40+. The design is absolutely stunning.",
    author: 'Maria Santos',
    role: 'Owner, Bella Bistro',
    color: 'purple' as const,
    depth: 0,
  },
  {
    quote: "I've worked with 3 agencies before. BrandLink is the only one that actually cared about my ROI. Best investment I've made.",
    author: 'James Chen',
    role: 'Founder, Iron Forge Gym',
    color: 'blue' as const,
    depth: 1,
  },
  {
    quote: "The site they built us pays for itself every single week. Customers constantly compliment how professional it looks.",
    author: 'Sarah Williams',
    role: 'Director, Luxe Salon',
    color: 'cyan' as const,
    depth: 2,
  },
];

export function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-200px' });

  return (
    <section ref={sectionRef} id="testimonials" className="relative py-32 w-full overflow-hidden bg-[#050505]">
      <div className="max-w-7xl mx-auto px-6">
        <div
          className={`text-center mb-20 transition-all duration-1000 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <span className="text-sm font-medium tracking-widest uppercase text-[#7C3AED] mb-4 block">
            Client Love
          </span>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 font-heading">
            Real Results,{' '}
            <span className="text-gradient">Real Words</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 perspective-1000">
          {testimonials.map((t, i) => (
            <div
              key={t.author}
              className={`transition-all duration-700 ${
                isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${0.2 + i * 0.15}s` }}
            >
              <div
                className="animate-float"
                style={{
                  animation: `float 4s ease-in-out ${i * 0.5}s infinite`,
                }}
              >
                <GlassCard glowColor={t.color} className="p-8 h-full">
                  <div className="mb-6">
                    {[...Array(5)].map((_, j) => (
                      <span key={j} className="text-[#7C3AED]">★</span>
                    ))}
                  </div>
                  <blockquote className="text-lg text-white/70 leading-relaxed mb-6">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <div>
                    <div className="font-semibold font-heading">{t.author}</div>
                    <div className="text-sm text-white/40">{t.role}</div>
                  </div>
                </GlassCard>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
      `}</style>
    </section>
  );
}
