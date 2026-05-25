import { useEffect, useRef } from 'react'

const categories = [
  {
    icon: '⚛️',
    title: 'Frontend',
    color: '#4f8ef7',
    skills: ['React.js', 'Next.js', 'Vite.js', 'JavaScript ES6+', 'TypeScript', 'HTML5', 'CSS3'],
  },
  {
    icon: '🎨',
    title: 'UI& Styling',
    color: '#e879a0',
    skills: ['Tailwind CSS', 'Bootstrap', 'Responsive Design', 'Figma-to-Code', 'Shadcn/UI'],
  },
  {
    icon: '🔧',
    title: 'Tools',
    color: '#a78bfa',
    skills: ['Git / GitHub', 'Postman', 'ClickUp', 'Jira', 'VS Code', 'Figma'],
  },
  {
    icon: '🗄️',
    title: 'APIs & Integration',
    color: '#34d399',
    skills: ['RESTful APIs', 'Stripe API', 'Supplier APIs', 'Social Platform APIs'],
  },
  {
    icon: '⚡',
    title: 'Other',
    color: '#fb923c',
    skills: ['Recharts', 'Chart.js', 'Lottie', 'Redux Toolkit', 'React Query', 'Lazy Loading'],
  },
  {
    icon: '🤝',
    title: 'Soft Skills',
    color: '#fbbf24',
    skills: ['Team Leadership', 'Cross-functional Collaboration', 'Problem Solving', 'Critical Thinking'],
  },
]

const marqueeItems = [
  'React.js', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Redux Toolkit',
  'Figma-to-Code', 'Shadcn/UI', 'Git / GitHub', 'Stripe API', 'REST APIs',
  'Recharts', 'Vite.js', 'Bootstrap', 'Responsive Design', 'Lottie',
]

function SkillCard({ cat, index }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('sk-visible'); obs.disconnect() } },
      { threshold: 0.15 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className="sk-card bg-[#0e0e1a] border border-white/[0.07] rounded-2xl p-6 hover:border-white/[0.14] transition-all duration-300"
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      {/* Icon + title */}
      <div className="flex items-center gap-3 mb-3">
        <div className="w-9 h-9 rounded-lg flex items-center justify-center text-lg"
          style={{ background: `${cat.color}18` }}>
          {cat.icon}
        </div>
        <div>
          <h3 className="font-display font-bold text-white text-base">{cat.title}</h3>
          <div className="h-0.5 w-8 rounded-full mt-1" style={{ background: cat.color }} />
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mt-4">
        {cat.skills.map(skill => (
          <span key={skill}
            className="text-xs text-[#8b8b9a] bg-[#13131f] border border-white/[0.05] px-3 py-1.5 rounded-lg font-mono hover:text-white hover:border-white/10 transition-all duration-200">
            {skill}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function Skills() {
  const headerRef = useRef(null)
  useEffect(() => {
    const el = headerRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('revealed'); obs.disconnect() } },
      { threshold: 0.2 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <>
      <style>{`
        .sk-card {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.6s ease, transform 0.6s ease, border-color 0.3s;
        }
        .sk-card.sk-visible {
          opacity: 1;
          transform: translateY(0);
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-track {
          display: flex;
          width: max-content;
          animation: marquee 28s linear infinite;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      <section id="skills" className="py-20 bg-[#0a0a0f] relative overflow-hidden">
        {/* Subtle glow */}
        <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[600px] h-48 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, rgba(201,168,76,0.05) 0%, transparent 70%)' }} />

        <div className="max-w-6xl mx-auto px-6 md:px-12">

          {/* Header */}
          <div ref={headerRef} className="reveal-box text-center mb-16">
            <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#c9a84c] mb-4">
              What I Work With
            </p>
            <h2 className="font-display font-black leading-tight mb-4" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
              <span className="text-white">Technical </span>
              <span className="logo-gradient" style={{ WebkitTextFillColor: 'transparent' }}>Skills</span>
            </h2>
            <p className="text-[#8b8b9a] text-base max-w-lg mx-auto font-light">
              A curated stack built over 4+ years of shipping production-grade applications.
            </p>
          </div>

          {/* Cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((cat, i) => (
              <SkillCard key={cat.title} cat={cat} index={i} />
            ))}
          </div>
        </div>

        {/* Marquee ticker */}
        <div className="mt-20 border-t border-white/[0.05] pt-8 overflow-hidden">
          <div className="flex items-center gap-4 mb-4 max-w-6xl mx-auto px-6 md:px-12">
            <span className="text-[#8b8b9a] text-xs font-mono whitespace-nowrap">— tech stack at a glance</span>
          </div>
          <div className="overflow-hidden">
            <div className="marquee-track">
              {[...marqueeItems, ...marqueeItems].map((item, i) => (
                <span key={i}
                  className="inline-block mx-3 text-xs font-mono text-[#8b8b9a] bg-[#0e0e1a] border border-white/[0.06] px-4 py-2 rounded-full whitespace-nowrap hover:text-[#c9a84c] hover:border-[#c9a84c]/20 transition-colors duration-200">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}