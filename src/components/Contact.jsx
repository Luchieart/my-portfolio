import { useEffect, useRef } from 'react'

const contacts = [
  {
    icon: (
      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
      </svg>
    ),
    label: 'Email',
    value: 'oluchimercy0328@gmail.com',
    href: 'mailto:oluchimercy0328@gmail.com',
  },
  {
    icon: (
      <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
    label: 'LinkedIn',
    value: 'YOUR-LINKEDIN',
    href: 'https://linkedin.com/in/YOUR-LINKEDIN',
  },
  {
    icon: (
      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
      </svg>
    ),
    label: 'Phone',
    value: '+234 912 422 4818',
    href: 'tel:+2349124224818',
  },
]

export default function Contact() {
  const ref = useRef(null)
  const btnRef = useRef(null)

  useEffect(() => {
    [ref, btnRef].forEach(r => {
      const el = r.current
      if (!el) return
      const obs = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) { el.classList.add('revealed'); obs.disconnect() } },
        { threshold: 0.15 }
      )
      obs.observe(el)
      return () => obs.disconnect()
    })
  }, [])

  return (
    <section id="contact" className="relative overflow-hidden bg-[#0a0a0f]">

      {/* Warm radial glow from bottom */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at bottom, rgba(201,168,76,0.08) 0%, rgba(180,100,20,0.04) 40%, transparent 70%)' }} />
      {/* Particle dots — static decorative */}
      <div className="absolute top-16 left-16 w-1.5 h-1.5 rounded-full bg-[#c9a84c]/40 pointer-events-none" />
      <div className="absolute top-32 right-24 w-1 h-1 rounded-full bg-[#c9a84c]/20 pointer-events-none" />
      <div className="absolute top-24 left-1/3 w-1 h-1 rounded-full bg-[#c9a84c]/20 pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 py-20 text-center">

        {/* Header */}
        <div ref={ref} className="reveal-box mb-12">
          <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#c9a84c] mb-6">
            Let's Connect
          </p>
          <h2 className="font-display font-black leading-tight mb-6"
            style={{ fontSize: 'clamp(2.8rem, 7vw, 5rem)' }}>
            <span className="text-white">Got a project in </span>
            <span className="logo-gradient" style={{ WebkitTextFillColor: 'transparent' }}>mind?</span>
          </h2>
          <p className="text-[#8b8b9a] text-base font-light max-w-md mx-auto leading-relaxed">
            I'm open to freelance work, full-time roles, and exciting collaborations.
            Let's build something exceptional together.
          </p>
        </div>

        {/* Contact cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-10">
          {contacts.map((c, i) => (
            <a
              key={i}
              href={c.href}
              target={c.label === 'LinkedIn' ? '_blank' : undefined}
              rel={c.label === 'LinkedIn' ? 'noreferrer' : undefined}
              className="flex items-center gap-4 bg-[#0e0e1a] border border-white/[0.07] rounded-2xl px-5 py-4 hover:border-[#c9a84c]/30 hover:bg-[#131318] transition-all duration-200 group text-left"
            >
              <div className="w-10 h-10 rounded-xl bg-[#13131f] border border-white/[0.05] flex items-center justify-center text-[#c9a84c] flex-shrink-0 group-hover:border-[#c9a84c]/30 transition-colors duration-200">
                {c.icon}
              </div>
              <div className="min-w-0">
                <p className="text-[10px] tracking-[0.15em] uppercase text-[#4a4a5a] font-mono mb-0.5">{c.label}</p>
                <p className="text-white text-sm font-medium truncate">{c.value}</p>
              </div>
            </a>
          ))}
        </div>

        {/* CTA button */}
        <div ref={btnRef} className="reveal-box">
          <a
            href="mailto:oluchimercy0328@gmail.com"
            className="inline-flex items-center gap-3 bg-[#c9a84c] hover:bg-[#e8d5a3] text-[#0a0a0f] font-semibold text-base px-10 py-4 rounded-full transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
            style={{ boxShadow: '0 0 0 0 rgba(201,168,76,0)' }}
            onMouseEnter={e => e.currentTarget.style.boxShadow = '0 8px 30px rgba(201,168,76,0.25)'}
            onMouseLeave={e => e.currentTarget.style.boxShadow = '0 0 0 0 rgba(201,168,76,0)'}
          >
            Start a Conversation
            <span className="text-lg">→</span>
          </a>
        </div>

      </div>

      {/* Footer */}
      <div className="relative z-10 border-t border-white/[0.05]">
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <a href="#" className="font-display text-xl font-extrabold logo-gradient" style={{ WebkitTextFillColor: 'transparent' }}>
            CO.
          </a>
          <p className="text-[#4a4a5a] text-xs font-mono tracking-wide">
            © 2026 Chukwuemeka Oluchi · Built with React & Tailwind CSS
          </p>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c9a84c] animate-pulse" />
            <span className="text-[#4a4a5a] text-xs font-mono tracking-wide">Lagos, NG</span>
          </div>
        </div>
      </div>

    </section>
  )
}