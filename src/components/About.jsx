import { useEffect, useRef } from 'react'
import profileImg from '../assets/profile.jpeg'
import { Icon } from '@iconify/react'

const stats = [
  { icon: 'heroicons:bolt-solid',        num: '4+',  label: 'Years Experience' },
  { icon: 'heroicons:globe-alt-solid',   num: '4',   label: 'Companies Reached' },
  { icon: 'tabler:code', num: '10+', label: 'Projects Delivered' },
  { icon: 'heroicons:arrow-trending-up-solid', num: '+40%', label: 'Team Impact' },
]

const highlights = [
  { title: 'Performance-first', sub: '40% faster loads' },
  { title: 'Pixel-perfect UI', sub: 'Figma-to-code' },
  { title: 'Team leadership', sub: '60% productivity boost' },
  { title: 'Web 3 ready', sub: 'Blockchain integrated' },
]

function useScrollReveal(ref, cls = 'revealed') {
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add(cls); obs.disconnect() } },
      { threshold: 0.15 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [ref, cls])
}

function RevealBox({ children, delay = 0, className = '' }) {
  const ref = useRef(null)
  useScrollReveal(ref)
  return (
    <div
      ref={ref}
      className={`reveal-box ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

export default function About() {
  return (
    <>
      <style>{`
        .reveal-box {
          opacity: 0;
          transform: translateY(32px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .reveal-box.revealed {
          opacity: 1;
          transform: translateY(0);
        }
        .reveal-left {
          opacity: 0;
          transform: translateX(-40px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }
        .reveal-left.revealed {
          opacity: 1;
          transform: translateX(0);
        }
        .reveal-right {
          opacity: 0;
          transform: translateX(40px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }
        .reveal-right.revealed {
          opacity: 1;
          transform: translateX(0);
        }
      `}</style>

      <section id="about" className="py-28  relative overflow-hidden"style={{ backgroundColor: 'var(--bg)' }}
>
        {/* Subtle bg glow */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(201,168,76,0.04) 0%, transparent 70%)' }} />

        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

            {/* ── Left card ── */}
            <LeftCard />

            {/* ── Right content ── */}
            <RightContent />

          </div>
        </div>
      </section>
    </>
  )
}

function LeftCard() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('revealed'); obs.disconnect() } },
      { threshold: 0.15 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div ref={ref} className="reveal-left">
      <div className=" border border-white/[0.07] rounded-2xl p-6 space-y-4" style={{ backgroundColor: 'var(--bg-card)' }}>

        {/* Profile row */}
        <div className="flex items-center gap-4 pb-4 border-b border-white/[0.06]">
          <div className="w-16 h-16 rounded-xl overflow-hidden border border-[#c9a84c]/20 flex-shrink-0"
            style={{ background: 'linear-gradient(145deg, #1a1610, #0e0c08)' }}>
            {/* swap with <img src="/photo.jpg" className="w-full h-full object-cover" /> */}
         <img
  src={profileImg}
  alt="Chukwuemeka Oluchi"
  className="w-full h-full object-cover object-cover"
/>
          </div>
          <div>
            <p className="font-display font-bold text-white text-base">Chukwuemeka Oluchi</p>
            <p className="text-[#c9a84c] text-sm font-mono mt-0.5">Frontend Developer</p>
            <div className="flex items-center gap-1.5 mt-1">
              <svg width="12" height="12" fill="currentColor" viewBox="0 0 24 24" style={{ color: 'var(--text-secondary)' }}
>
                <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
              </svg>
              <span className="text-xs" style={{ color: 'var(--text-secondary)' }}
>Lagos, Nigeria</span>
            </div>
          </div>
        </div>

        {/* Stat boxes */}
        <div className="grid grid-cols-2 gap-3">
          {stats.map((s, i) => (
            <div key={i} className="bg-[#13131f] border border-white/[0.05] rounded-xl p-4 hover:border-[#c9a84c]/20 transition-colors duration-200">
          <Icon icon={s.icon} width={20} color="#c9a84c" className="mb-2" />
              <span className="font-display font-bold text-[#c9a84c] text-xl leading-none">{s.num}</span>
              <p className="text-[#8b8b9a] text-xs mt-1 font-mono">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Contact links */}
        <div className="pt-4 border-t border-white/[0.06] space-y-2.5">
          <a href="mailto:oluchimercy0328@gmail.com"
            className="flex items-center gap-3 text-[#8b8b9a] hover:text-[#c9a84c] text-sm transition-colors duration-200 font-mono">
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
            </svg>
            oluchimercy0328@gmail.com
          </a>
          <a href="https://linkedin.com/in/YOUR-LINKEDIN" target="_blank" rel="noreferrer"
            className="flex items-center gap-3 text-[#8b8b9a] hover:text-[#c9a84c] text-sm transition-colors duration-200 font-mono">
            <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
           
            linkedin.com/in/olucho-c-mercy
          </a>
        </div>
      </div>
    </div>
  )
}

function RightContent() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('revealed'); obs.disconnect() } },
      { threshold: 0.15 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div ref={ref} className="reveal-right space-y-6">
      <div>
        <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#c9a84c] mb-4">About Me</p>
        <h2 className="font-display font-black leading-tight mb-6" style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)' }}>
          <span className="text-white">Building things that </span>
          <span className="logo-gradient" style={{ WebkitTextFillColor: 'transparent' }}>matter</span>
        </h2>
      </div>

      <div className="space-y-4 text-[#8b8b9a] text-base leading-relaxed font-light">
        <p>
          I'm a Frontend Developer based in Lagos, Nigeria with over 4 years of
          experience turning complex ideas into elegant, high-performance digital
          products used by people across{' '}
          <span className="text-[#c9a84c] font-semibold">4+ companies</span>.
        </p>
        <p>
          My expertise spans the full modern frontend stack — React, Next.js,
          TypeScript — with a deep appreciation for clean architecture, pixel-perfect
          UI, and silky-smooth user experiences that keep people coming back.
        </p>
        <p>
          I thrive in fast-paced, collaborative environments and have contributed to
          frontend teams, maintained code quality standards, and shipped features that
          meaningfully moved product metrics.
        </p>
      </div>

      {/* Highlight boxes */}
      <div className="grid grid-cols-2 gap-3 pt-2">
        {highlights.map((h, i) => (
          <RevealBox key={i} delay={i * 100}
            className=" border border-white/[0.07] rounded-xl p-4 hover:border-[#c9a84c]/30 transition-colors duration-200" style={{ backgroundColor: 'var(--bg-card)' }}>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[#c9a84c] text-sm">◆</span>
              <span className="text-white font-semibold text-sm font-display">{h.title}</span>
            </div>
            <p className="text-[#8b8b9a] text-xs font-mono">{h.sub}</p>
          </RevealBox>
        ))}
      </div>
    </div>
  )
}