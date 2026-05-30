'use client';

import { useRef } from 'react';
import { useInView } from 'framer-motion';

const steps = [
  {
    number: '01',
    title: 'Discover',
    description: 'We dive deep into your business, competitors, and customers to uncover what makes you unique.',
    color: '#7C3AED',
  },
  {
    number: '02',
    title: 'Design',
    description: 'We craft a visually stunning, conversion-focused design that speaks directly to your ideal customer.',
    color: '#2563EB',
  },
  {
    number: '03',
    title: 'Develop',
    description: 'Clean, fast, mobile-optimized code. Every pixel perfected, every interaction intentional.',
    color: '#06B6D4',
  },
  {
    number: '04',
    title: 'Launch',
    description: 'We deploy, optimize, and hand over a site ready to convert visitors into loyal customers.',
    color: '#7C3AED',
  },
];

export function ProcessTimeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-200px' });

  return (
    <section ref={sectionRef} id="process" className="relative py-32 w-full overflow-hidden bg-[#050505]">
      <div className="max-w-5xl mx-auto px-6">
        <div
          className={`text-center mb-24 transition-all duration-1000 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <span className="text-sm font-medium tracking-widest uppercase text-[#06B6D4] mb-4 block">
            How It Works
          </span>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 font-heading">
            From Idea to{' '}
            <span className="text-gradient">Live</span>
          </h2>
        </div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-white/10 md:-translate-x-px" />
          
          {/* Animated line */}
          <div
            className="absolute left-8 md:left-1/2 top-0 w-px bg-gradient-to-b from-[#7C3AED] via-[#2563EB] to-[#06B6D4] md:-translate-x-px transition-all duration-[2000ms] ease-out"
            style={{ height: isInView ? '100%' : '0%' }}
          />

          <div className="space-y-16 md:space-y-24">
            {steps.map((step, i) => (
              <div
                key={step.number}
                className={`relative flex items-start gap-8 md:gap-16 transition-all duration-700 ${
                  isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                } ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                style={{ transitionDelay: `${0.3 + i * 0.2}s` }}
              >
                {/* Number bubble */}
                <div className="absolute left-8 md:left-1/2 -translate-x-1/2 z-10">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center font-bold text-lg font-heading border-2"
                    style={{
                      borderColor: step.color,
                      color: step.color,
                      background: '#050505',
                      boxShadow: isInView ? `0 0 30px ${step.color}40` : 'none',
                      transition: 'box-shadow 0.5s ease',
                      transitionDelay: `${0.5 + i * 0.2}s`,
                    }}
                  >
                    {step.number}
                  </div>
                </div>

                {/* Content */}
                <div className={`ml-20 md:ml-0 md:w-[calc(50%-3rem)] ${
                  i % 2 === 0 ? 'md:text-right md:pr-0' : 'md:text-left md:pl-0'
                }`}>
                  <h3 className="text-2xl md:text-3xl font-bold mb-3 font-heading">
                    {step.title}
                  </h3>
                  <p className="text-white/50 leading-relaxed max-w-md ml-auto mr-auto">
                    {step.description}
                  </p>
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden md:block md:w-[calc(50%-3rem)]" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
