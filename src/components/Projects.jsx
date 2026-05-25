import { useEffect, useRef } from 'react'

const projects = [
  {
    letter: 'A',
    name: 'Acire23 Dashboard',
    category: 'Real Estate Platform',
    desc: 'Responsive property listing platform with advanced search & filtering, interactive data visualizations, and Stripe payment integration for subscriptions and wallet funding.',
    features: ['Property Search', 'Stripe Payments', 'Data Viz'],
    tech: ['React', 'Tailwind CSS', 'Recharts', 'Stripe API'],
    color: '#4f8ef7',
  },
  {
    letter: 'B',
    name: 'Blutech E-commerce',
    category: 'E-commerce Platform',
    desc: 'Built responsive product pages with supplier API integration and achieved a 40% reduction in initial load time through lazy loading and code splitting.',
    features: ['Supplier Integration', 'Performance', 'Filtering'],
    tech: ['React', 'Vite', 'JavaScript', 'Bootstrap'],
    color: '#c9a84c',
  },
  {
    letter: 'Y',
    name: 'Yashe Web App',
    category: 'Consumer Web App',
    desc: 'Delivered pixel-perfect interfaces from Figma designs with Lottie animations, refactored legacy code to ES6+, and managed complex state with Redux Toolkit.',
    features: ['Figma-to-Code', 'Animations', 'Redux'],
    tech: ['React', 'Redux Toolkit', 'Lottie', 'REST APIs'],
    color: '#a78bfa',
  },
/*   {
    letter: 'L',
    name: 'Landing Page Rebuild',
    category: 'Marketing Site',
    desc: 'Independently redesigned and migrated the company landing page from WordPress to a custom React UI — improving performance, consistency, and maintainability.',
    features: ['Migration', 'Performance', 'Custom UI'],
    tech: ['React', 'Vite', 'Tailwind CSS'],
    color: '#34d399',
  },
  {
    letter: 'P',
    name: 'School Portal',
    category: 'EdTech Platform',
    desc: 'Collaborated with two developers to build a full-featured polytechnic school portal with dynamic data flow across all modules via RESTful API integrations.',
    features: ['Multi-module', 'API Integration', 'Accessible'],
    tech: ['React', 'Bootstrap', 'REST APIs'],
    color: '#fb923c',
  }, */
]

function ProjectCard({ p, index }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('sk-visible'); obs.disconnect() } },
      { threshold: 0.12 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className="sk-card group bg-[#0e0e1a] border border-white/[0.07] rounded-2xl p-6 flex flex-col gap-4 hover:border-white/[0.14] transition-all duration-300"
      style={{ transitionDelay: `${index * 80}ms`, borderTop: `2px solid ${p.color}` }}
    >
      {/* Letter avatar */}
      <div className="w-11 h-11 rounded-xl flex items-center justify-center font-display font-black text-lg"
        style={{ background: `${p.color}18`, color: p.color }}>
        {p.letter}
      </div>

      {/* Name + category */}
      <div>
        <h3 className="font-display font-bold text-white text-lg leading-tight mb-1">{p.name}</h3>
        <p className="text-xs font-mono" style={{ color: p.color }}>{p.category}</p>
      </div>

      {/* Description */}
      <p className="text-[#8b8b9a] text-sm leading-relaxed font-light flex-1">{p.desc}</p>

      {/* Feature tags */}
      <div className="flex flex-wrap gap-2">
        {p.features.map(f => (
          <span key={f}
            className="text-xs font-mono px-2.5 py-1 rounded-md border transition-colors duration-200"
            style={{ color: p.color, borderColor: `${p.color}30`, background: `${p.color}08` }}>
            {f}
          </span>
        ))}
      </div>

      {/* Built with */}
      <div className="pt-3 border-t border-white/[0.05]">
        <p className="text-[10px] tracking-[0.15em] uppercase text-[#4a4a5a] mb-2.5 font-mono">Built with</p>
        <div className="flex flex-wrap gap-1.5">
          {p.tech.map(t => (
            <span key={t}
              className="text-xs font-mono text-[#8b8b9a] bg-[#13131f] border border-white/[0.05] px-2.5 py-1 rounded-lg">
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Projects() {
  const headerRef = useRef(null)
  const moreRef = useRef(null)

  useEffect(() => {
    [headerRef, moreRef].forEach(ref => {
      const el = ref.current
      if (!el) return
      const obs = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) { el.classList.add('revealed'); obs.disconnect() } },
        { threshold: 0.2 }
      )
      obs.observe(el)
      return () => obs.disconnect()
    })
  }, [])

  return (
    <section id="projects" className="py-28 bg-[#0a0a0f] relative overflow-hidden">
      {/* Glow */}
      <div className="absolute right-0 top-1/3 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(201,168,76,0.04) 0%, transparent 70%)' }} />

      <div className="max-w-6xl mx-auto px-6 md:px-12">

        {/* Header */}
        <div ref={headerRef} className="reveal-box flex flex-col md:flex-row md:items-end justify-between gap-4 mb-14">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#c9a84c] mb-4">
              What I've Built
            </p>
            <h2 className="font-display font-black leading-tight" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
              <span className="text-white">Featured </span>
              <span className="logo-gradient" style={{ WebkitTextFillColor: 'transparent' }}>Projects</span>
            </h2>
          </div>
          <p className="text-[#8b8b9a] text-sm font-light max-w-xs md:text-right leading-relaxed">
            A selection of products I've led or contributed to that reached real users.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((p, i) => (
            <ProjectCard key={p.name} p={p} index={i} />
          ))}
        </div>

        {/* More projects line */}
        <div ref={moreRef} className="reveal-box mt-12 flex items-center justify-center">
          <p className="text-[#4a4a5a] text-sm font-mono hover:text-[#c9a84c] transition-colors duration-200 cursor-default">
            + More projects available on request
          </p>
        </div>

      </div>
    </section>
  )
}