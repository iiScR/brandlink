'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  { number: '01', title: 'Discover', description: 'We dive deep into your business, competitors, and customers to uncover what makes you unique.', color: '#7C3AED' },
  { number: '02', title: 'Design', description: 'We craft a visually stunning, conversion-focused design that speaks directly to your ideal customer.', color: '#2563EB' },
  { number: '03', title: 'Develop', description: 'Clean, fast, mobile-optimized code. Every pixel perfected, every interaction intentional.', color: '#06B6D4' },
  { number: '04', title: 'Launch', description: 'We deploy, optimize, and hand over a site ready to convert visitors into loyal customers.', color: '#7C3AED' },
];

export function ProcessTimeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo('.process-label', { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, ease: 'power2.out',
        scrollTrigger: { trigger: '.process-label', start: 'top 85%', toggleActions: 'play none none reverse' },
      });
      gsap.fromTo('.process-headline', { y: 50, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, delay: 0.1, ease: 'power2.out',
        scrollTrigger: { trigger: '.process-headline', start: 'top 85%', toggleActions: 'play none none reverse' },
      });

      if (lineRef.current) {
        gsap.fromTo(lineRef.current, { scaleY: 0 }, {
          scaleY: 1, duration: 1.5, ease: 'power2.out',
          scrollTrigger: { trigger: lineRef.current, start: 'top 80%', toggleActions: 'play none none reverse' },
        });
      }

      gsap.fromTo('.process-step', { y: 50, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.7, stagger: 0.15, ease: 'power2.out',
        scrollTrigger: { trigger: '.process-step', start: 'top 85%', toggleActions: 'play none none reverse' },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="process" className="relative py-40 w-full overflow-hidden bg-[#050505]">
      <div className="max-w-5xl mx-auto px-8">
        <div className="text-center mb-28">
          <span className="process-label text-sm font-medium tracking-widest uppercase text-[#06B6D4] mb-5 block">
            How It Works
          </span>
          <h2 className="process-headline text-4xl md:text-6xl lg:text-7xl font-bold mb-6 font-heading">
            From Idea to{' '}
            <span className="text-gradient">Live</span>
          </h2>
        </div>

        <div className="relative">
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-white/[0.06] md:-translate-x-px" />
          <div ref={lineRef} className="absolute left-8 md:left-1/2 top-0 w-px h-full bg-gradient-to-b from-[#7C3AED] via-[#2563EB] to-[#06B6D4] md:-translate-x-px origin-top" />

          <div className="space-y-20 md:space-y-28">
            {steps.map((step, i) => (
              <div key={step.number} className={`process-step relative flex items-start gap-8 md:gap-16 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                <div className="absolute left-8 md:left-1/2 -translate-x-1/2 z-10">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center font-bold text-lg font-heading border-2 transition-shadow duration-500"
                    style={{
                      borderColor: step.color,
                      color: step.color,
                      background: '#050505',
                      boxShadow: `0 0 30px ${step.color}30`,
                    }}>
                    {step.number}
                  </div>
                </div>

                <div className={`ml-20 md:ml-0 md:w-[calc(50%-3rem)] ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                  <h3 className="text-2xl md:text-3xl font-bold mb-4 font-heading">{step.title}</h3>
                  <p className="text-white/45 leading-relaxed max-w-md">{step.description}</p>
                </div>

                <div className="hidden md:block md:w-[calc(50%-3rem)]" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
