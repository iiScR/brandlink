'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GlassCard } from '../components/GlassCard';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote: "BrandLink transformed our online presence. We went from 5 bookings a week to 40+. The design is absolutely stunning.",
    author: 'Maria Santos',
    role: 'Owner, Bella Bistro',
    color: 'purple' as const,
  },
  {
    quote: "I've worked with 3 agencies before. BrandLink is the only one that actually cared about my ROI. Best investment I've made.",
    author: 'James Chen',
    role: 'Founder, Iron Forge Gym',
    color: 'blue' as const,
  },
  {
    quote: "The site they built us pays for itself every single week. Customers constantly compliment how professional it looks.",
    author: 'Sarah Williams',
    role: 'Director, Luxe Salon',
    color: 'cyan' as const,
  },
];

export function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo('.testimonials-label', { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, ease: 'power2.out',
        scrollTrigger: { trigger: '.testimonials-label', start: 'top 85%', toggleActions: 'play none none reverse' },
      });
      gsap.fromTo('.testimonials-headline', { y: 50, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, delay: 0.1, ease: 'power2.out',
        scrollTrigger: { trigger: '.testimonials-headline', start: 'top 85%', toggleActions: 'play none none reverse' },
      });
      gsap.fromTo('.testimonial-card', { y: 60, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.7, stagger: 0.12, ease: 'power2.out',
        scrollTrigger: { trigger: '.testimonial-card', start: 'top 85%', toggleActions: 'play none none reverse' },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="testimonials" className="relative py-40 w-full overflow-hidden bg-[#050505]">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-24">
          <span className="testimonials-label text-sm font-medium tracking-widest uppercase text-[#7C3AED] mb-5 block">
            Client Love
          </span>
          <h2 className="testimonials-headline text-4xl md:text-6xl lg:text-7xl font-bold mb-6 font-heading">
            Real Results,{' '}
            <span className="text-gradient">Real Words</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div key={t.author} className="testimonial-card">
              <GlassCard glowColor={t.color} className="p-10 h-full">
                <div className="mb-6 flex gap-1">
                  {[...Array(5)].map((_, j) => (
                    <span key={j} className="text-[#7C3AED] text-sm">★</span>
                  ))}
                </div>
                <blockquote className="text-lg text-white/60 leading-relaxed mb-8">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <div>
                  <div className="font-semibold font-heading text-base">{t.author}</div>
                  <div className="text-sm text-white/35">{t.role}</div>
                </div>
              </GlassCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
