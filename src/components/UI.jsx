import { useEffect, useRef, useState } from 'react';

// ─── Animated Mesh Background ────────────────────────────────────────────────
export function MeshBackground() {
  return (
    <div className="mesh-bg" aria-hidden="true">
      <div className="mesh-orb"
        style={{ width: 600, height: 600, top: '-10%', right: '-5%',
          background: 'radial-gradient(circle, rgba(234,88,12,0.18) 0%, transparent 70%)',
          animationDelay: '0s', animationDuration: '10s' }} />
      <div className="mesh-orb"
        style={{ width: 500, height: 500, bottom: '5%', left: '-8%',
          background: 'radial-gradient(circle, rgba(153,27,27,0.14) 0%, transparent 70%)',
          animationDelay: '-4s', animationDuration: '12s' }} />
      <div className="mesh-orb"
        style={{ width: 350, height: 350, top: '45%', left: '35%',
          background: 'radial-gradient(circle, rgba(251,191,36,0.06) 0%, transparent 70%)',
          animationDelay: '-2s', animationDuration: '9s' }} />
    </div>
  );
}

// ─── Custom Cursor ────────────────────────────────────────────────────────────
export function MagneticCursor() {
  const ringRef  = useRef(null);
  const dotRef   = useRef(null);
  const [expanded, setExpanded] = useState(false);
  const posRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef(null);
  const currentPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX}px`;
        dotRef.current.style.top  = `${e.clientY}px`;
      }
    };

    const animate = () => {
      currentPos.current.x += (posRef.current.x - currentPos.current.x) * 0.12;
      currentPos.current.y += (posRef.current.y - currentPos.current.y) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.left = `${currentPos.current.x}px`;
        ringRef.current.style.top  = `${currentPos.current.y}px`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    const onEnter = () => setExpanded(true);
    const onLeave = () => setExpanded(false);

    document.addEventListener('mousemove', onMove);
    document.querySelectorAll('a,button,[role="button"]').forEach(el => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      document.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      <div ref={ringRef}  className={`cursor-ring hidden md:block ${expanded ? 'expanded' : ''}`} />
      <div ref={dotRef}   className="cursor-dot hidden md:block" />
    </>
  );
}

// ─── Section Label ─────────────────────────────────────────────────────────
export function SectionLabel({ children }) {
  return (
    <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase text-orange-400 mb-3">
      <span className="block w-5 h-px bg-orange-500" />
      {children}
      <span className="block w-5 h-px bg-orange-500" />
    </span>
  );
}

// ─── Gradient Heading ──────────────────────────────────────────────────────
export function GradientHeading({ children, className = '' }) {
  return (
    <h2 className={`font-black tracking-tight leading-[1.05] ${className}`}>
      {children}
    </h2>
  );
}

// ─── Glass Card ────────────────────────────────────────────────────────────
export function GlassCard({ children, className = '', ...props }) {
  return (
    <div
      className={`glass rounded-2xl border border-white/[0.07] ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
