import { useState, useEffect, useRef } from 'react'

const jobs = [
    {
    company: 'MPG Club & Events',
    location: 'Texas · Remote',
    period: 'Oct 2025 – May 2026',
    current: false,
    role: 'Frontend Developer',
    bullets: [
      'Developed and maintained React/Next.js features across web and mobile platforms as part of a cross-functional engineering team.',
      'Built responsive UI components from Figma designs, ensuring pixel-accurate, cross-device consistency.',
      'Participated in CI/CD workflows on AWS and GitHub Actions, including deployment and environment configuration.',
      'Collaborated with product and design stakeholders to translate requirements into sprint-ready development tasks.',
      'Contributed to Vite build optimisations including tree-shaking and code splitting to reduce bundle size and improve load performance.',
    ],
  },
  {
    company: 'Acire23Network',
    location: 'Houston, TX · Remote',
    period: 'Feb 2024 – Apr 2026',
    current: true,
    role: 'Frontend Developer',
    bullets: [
      'Built scalable, reusable React components with Tailwind CSS, improving code maintainability across the application.',
      'Implemented Stripe API integration for subscription management and wallet funding functionality.',
      'Independently redesigned the company landing page, migrating from WordPress to a custom React UI.',
      'Developed dynamic dashboards and interactive data visualizations using Recharts and Chart.js.',
      'Built a robust search and filtering system for property listings, ensuring accurate and fast results.',
      'Integrated third-party APIs and optimized performance for both mobile and desktop experiences.',
    ],
  },


  {
    company: 'Blutech Solution',
    location: 'Remote',
    period: 'Dec 2023 – Jun 2024',
    current: false,
    role: 'Frontend Developer',
    bullets: [
      'Developed responsive web pages and interactive features using React, Vite, and JavaScript.',
      'Reduced initial load times by 40% through strategic lazy loading and code splitting.',
      'Integrated APIs to power core e-commerce features, including supplier integration and filtering.',
      'Performed cross-browser testing and resolved critical layout and compatibility issues.',
      'Contributed to a consistent design system using Bootstrap across the application.',
    ],
  },
  {
    company: 'Yashe',
    location: 'Lagos',
    period: 'Nov 2022 – Nov 2023',
    current: false,
    role: 'Frontend Developer',
    bullets: [
      'Delivered pixel-perfect interfaces from Figma designs, integrating animations using Lottie.',
      'Refactored legacy code to modern JavaScript/ES6+ and modular component architecture.',
      'Integrated RESTful APIs and managed complex application state using Redux Toolkit.',
      'Maintained strong version control practices using Git and GitHub, including PR reviews.',
      'Participated in usability testing and frontend bug tracking via Jira and Trello.',
    ],
  },
  {
    company: 'Digporom International',
    location: 'Ilorin',
    period: 'May 2022 – Nov 2022',
    current: false,
    role: 'Junior Frontend Developer',
    bullets: [
      'Contributed to UI features for internal tools using React and Bootstrap.',
      'Collaborated with two developers to build a full-featured polytechnic school portal.',
      'Integrated APIs across all system modules to ensure dynamic data flow and functionality.',
      'Built responsive and accessible interfaces adhering to modern web standards.',
      'Participated in daily standups and code reviews to enhance team collaboration.',
    ],
  },
]

export default function Experience() {
  const [active, setActive] = useState(0)
  const headerRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    const el = headerRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add('revealed'); obs.disconnect() } },
      { threshold: 0.2 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const goTo = (i) => {
    if (contentRef.current) {
      contentRef.current.classList.remove('exp-in')
      contentRef.current.classList.add('exp-out')
      setTimeout(() => {
        setActive(i)
        contentRef.current.classList.remove('exp-out')
        contentRef.current.classList.add('exp-in')
      }, 180)
    } else {
      setActive(i)
    }
  }

  const job = jobs[active]

  return (
    <>
      <style>{`
        @keyframes exp-fade-in {
          from { opacity: 0; transform: translateX(16px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .exp-in  { animation: exp-fade-in 0.3s ease forwards; }
        .exp-out { opacity: 0; transform: translateX(-12px); transition: all 0.18s ease; }
      `}</style>

      <section id="experience" className="py-20 bg-[#0a0a0f] relative overflow-hidden">
        {/* Glow */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-80 h-80 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(201,168,76,0.04) 0%, transparent 70%)' }} />

        <div className="max-w-6xl mx-auto px-6 md:px-12">

          {/* Header */}
          <div ref={headerRef} className="reveal-box mb-14">
            <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#c9a84c] mb-4">
              Where I've Been
            </p>
            <h2 className="font-display font-black leading-tight" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
              <span className="text-white">Work </span>
              <span className="logo-gradient" style={{ WebkitTextFillColor: 'transparent' }}>Experience</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-6 items-start">

            {/* ── Left sidebar ── */}
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-0 top-0 bottom-0 w-px bg-white/[0.06] hidden lg:block" />

              <div className="flex flex-col gap-2">
                {jobs.map((j, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    className={`relative text-left w-full px-5 py-4 rounded-xl border transition-all duration-200 cursor-pointer
                      ${active === i
                        ? 'bg-[#13131f] border-[#c9a84c]/30'
                        : 'bg-transparent border-white/[0.05] hover:bg-[#0e0e1a] hover:border-white/[0.10]'
                      }`}
                  >
                    {/* Active left accent */}
                    {active === i && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-8 bg-[#c9a84c] rounded-full" />
                    )}

                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className={`font-display font-bold text-sm ${active === i ? 'text-[#c9a84c]' : 'text-white'}`}>
                          {j.company}
                        </p>
                        <p className="text-[#8b8b9a] text-xs font-mono mt-0.5">{j.period}</p>
                        {active === i && (
                          <p className="text-[#c9a84c]/70 text-xs font-mono mt-1">{j.role}</p>
                        )}
                      </div>
                      {j.current && (
                        <span className="flex-shrink-0 text-[10px] font-semibold text-[#c9a84c] border border-[#c9a84c]/40 px-2.5 py-1 rounded-full">
                          Now
                        </span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* ── Right detail panel ── */}
            <div
              ref={contentRef}
              className="exp-in bg-[#0e0e1a] border border-white/[0.07] rounded-2xl p-8"
            >
              {/* Role header */}
              <div className="flex items-start justify-between gap-4 mb-2">
                <h3 className="font-display font-black text-white" style={{ fontSize: 'clamp(1.4rem, 3vw, 1.9rem)' }}>
                  {job.role}
                </h3>
                <span className="flex-shrink-0 text-xs text-[#8b8b9a] border border-white/[0.08] px-3 py-1.5 rounded-full font-mono mt-1">
                  {job.location}
                </span>
              </div>

              <div className="flex items-center gap-2 mb-8">
                <span className="text-[#c9a84c] font-semibold text-sm">{job.company}</span>
                <span className="text-[#4a4a5a]">·</span>
                <span className="text-[#8b8b9a] text-sm font-mono">{job.period}</span>
              </div>

              <div className="w-full h-px bg-white/[0.06] mb-8" />

              {/* Bullets */}
              <ul className="space-y-5">
                {job.bullets.map((b, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full border border-[#c9a84c]/40 flex items-center justify-center mt-0.5">
                      <svg width="10" height="10" fill="none" stroke="#c9a84c" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                      </svg>
                    </div>
                    <p className="text-[#8b8b9a] text-sm leading-relaxed font-light">{b}</p>
                  </li>
                ))}
              </ul>

              {/* Prev / Next */}
              <div className="flex items-center justify-between mt-10 pt-6 border-t border-white/[0.06]">
                <button
                  onClick={() => goTo(Math.max(0, active - 1))}
                  disabled={active === 0}
                  className="text-sm font-mono text-[#8b8b9a] hover:text-[#c9a84c] disabled:opacity-20 disabled:cursor-not-allowed transition-colors cursor-pointer bg-transparent border-none"
                >
                  ← Prev
                </button>

                {/* Dots */}
                <div className="flex items-center gap-2">
                  {jobs.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => goTo(i)}
                      className={`rounded-full transition-all duration-200 cursor-pointer border-none
                        ${active === i ? 'w-5 h-2 bg-[#c9a84c]' : 'w-2 h-2 bg-white/20 hover:bg-white/40'}`}
                    />
                  ))}
                </div>

                <button
                  onClick={() => goTo(Math.min(jobs.length - 1, active + 1))}
                  disabled={active === jobs.length - 1}
                  className="text-sm font-mono text-[#8b8b9a] hover:text-[#c9a84c] disabled:opacity-20 disabled:cursor-not-allowed transition-colors cursor-pointer bg-transparent border-none"
                >
                  Next →
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  )
}