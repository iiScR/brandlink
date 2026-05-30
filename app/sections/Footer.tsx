'use client';

export function Footer() {
  return (
    <footer className="relative py-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-xl font-bold tracking-tight font-heading">
          Brand<span className="text-gradient">Link</span>
        </div>
        
        <div className="flex gap-8 text-sm text-white/40">
          <a href="#portfolio" className="hover:text-white transition-colors">Work</a>
          <a href="#services" className="hover:text-white transition-colors">Services</a>
          <a href="#process" className="hover:text-white transition-colors">Process</a>
          <a href="#cta" className="hover:text-white transition-colors">Contact</a>
        </div>

        <div className="text-sm text-white/30">
          &copy; {new Date().getFullYear()} BrandLink. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
