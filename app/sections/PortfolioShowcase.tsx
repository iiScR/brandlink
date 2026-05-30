'use client';

import { useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { GlassCard } from '../components/GlassCard';

const projects = [
  {
    title: 'Bella Bistro',
    category: 'Restaurant',
    description: 'A warm, appetizing landing page that increased reservations by 180%.',
    color: '#7C3AED',
    stats: { leads: '340%', bookings: '180%' },
  },
  {
    title: 'Luxe Salon',
    category: 'Beauty Salon',
    description: 'Elegant booking-focused design with a 65% conversion rate.',
    color: '#06B6D4',
    stats: { leads: '290%', bookings: '220%' },
  },
  {
    title: 'Iron Forge Gym',
    category: 'Fitness',
    description: 'High-energy page that drove 500+ membership inquiries in 30 days.',
    color: '#2563EB',
    stats: { leads: '500%', bookings: '150%' },
  },
  {
    title: 'Bean & Bloom',
    category: 'Café',
    description: 'Cozy aesthetic with location-based SEO that dominates local search.',
    color: '#7C3AED',
    stats: { leads: '210%', bookings: '175%' },
  },
];

export function PortfolioShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-200px' });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section ref={sectionRef} id="portfolio" className="relative py-32 w-full bg-[#050505]">
      <div className="max-w-7xl mx-auto px-6">
        <div
          className={`text-center mb-20 transition-all duration-1000 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <span className="text-sm font-medium tracking-widest uppercase text-[#2563EB] mb-4 block">
            Selected Work
          </span>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 font-heading">
            Projects That{' '}
            <span className="text-gradient">Perform</span>
          </h2>
          <p className="text-lg text-white/50 max-w-2xl mx-auto">
            Every site we build is a conversion machine disguised as a work of art.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, i) => (
            <div
              key={project.title}
              className={`relative transition-all duration-700 ${
                isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${0.2 + i * 0.15}s` }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <GlassCard
                glowColor={project.color === '#7C3AED' ? 'purple' : project.color === '#2563EB' ? 'blue' : 'cyan'}
                className="overflow-hidden"
                hoverScale={hoveredIndex === i ? 1.03 : 1}
              >
                <div className="relative h-64 md:h-80 overflow-hidden">
                  <div
                    className="absolute inset-0 transition-transform duration-700"
                    style={{
                      transform: hoveredIndex === i ? 'scale(1.1)' : 'scale(1)',
                      background: `linear-gradient(135deg, ${project.color}20, ${project.color}05)`,
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div
                      className="w-3/4 h-3/4 rounded-lg border border-white/10 bg-white/[0.02] backdrop-blur-sm flex flex-col items-center justify-center transition-all duration-500"
                      style={{
                        transform: hoveredIndex === i ? 'translateZ(50px) rotateX(-5deg)' : 'translateZ(0)',
                        boxShadow: hoveredIndex === i ? `0 25px 50px -12px ${project.color}40` : 'none',
                      }}
                    >
                      <span className="text-3xl font-bold font-heading" style={{ color: project.color }}>
                        {project.title}
                      </span>
                      <span className="text-sm text-white/40 mt-2">{project.category}</span>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-white/60 mb-4">{project.description}</p>
                  <div className="flex gap-6">
                    <div>
                      <div className="text-lg font-bold" style={{ color: project.color }}>
                        {project.stats.leads}
                      </div>
                      <div className="text-xs text-white/40">Lead Increase</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold" style={{ color: project.color }}>
                        {project.stats.bookings}
                      </div>
                      <div className="text-xs text-white/40">Booking Uplift</div>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
