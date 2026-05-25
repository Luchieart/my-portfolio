import { useState, useEffect } from 'react'

const links = ['About', 'Skills', 'Experience', 'Projects', 'Contact']

export default function Navbar() {
  const [active, setActive] = useState('About')
  const [scrolled, setScrolled] = useState(false)
  const [darkMode, setDarkMode] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)

  // ── Scroll spy ───────────────────────────────────────────────────
  useEffect(() => {
    const observers = []

    links.forEach(link => {
      const el = document.getElementById(link.toLowerCase())
      if (!el) return

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActive(link)
          }
        },
        {
          rootMargin: '-40% 0px -55% 0px', // triggers when section is in the middle of the viewport
          threshold: 0,
        }
      )
      obs.observe(el)
      observers.push(obs)
    })

    return () => observers.forEach(obs => obs.disconnect())
  }, [])

  // ── Scroll shadow ────────────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // ── Theme toggle ─────────────────────────────────────────────────
  const toggleTheme = () => {
    const html = document.documentElement
    const isNowDark = !darkMode
    setDarkMode(isNowDark)
    if (isNowDark) {
      html.classList.remove('light')
      html.classList.add('dark')
      html.style.backgroundColor = '#0a0a0f'
      html.style.color = '#f0f4ff'
    } else {
      html.classList.remove('dark')
      html.classList.add('light')
      html.style.backgroundColor = '#f5f0e8'
      html.style.color = '#1a1208'
    }
  }

  useEffect(() => {
    document.documentElement.classList.add('dark')
    document.documentElement.style.backgroundColor = '#0a0a0f'
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${scrolled ? 'bg-[#0a0a0f]/95 backdrop-blur-md shadow-lg shadow-black/20' : 'bg-[#0a0a0f]'}
        border-b border-white/[0.05]`}
      >
        <div className="max-w-6xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">

          <a href="#" className="font-display text-2xl font-extrabold tracking-tight logo-gradient">
            CO.
          </a>

          <ul className="hidden md:flex items-center gap-8 list-none">
            {links.map(link => (
              <li key={link}>
                <a
                  href={`#${link.toLowerCase()}`}
                  onClick={() => setActive(link)}
                  className={`relative text-sm font-medium tracking-wide transition-colors duration-200 pb-1
                    ${active === link ? 'text-[#c9a84c]' : 'text-[#8b8b9a] hover:text-[#e8d5a3]'}`}
                >
                  {link}
                  {active === link && (
                    <span className="absolute -bottom-0.5 left-0 right-0 h-[2px] bg-[#c9a84c] rounded-full" />
                  )}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className={`relative w-14 h-7 rounded-full border transition-all duration-300 flex items-center px-1 cursor-pointer
                ${darkMode ? 'bg-[#1a1a2e] border-[#c9a84c]/30' : 'bg-[#f0e6cc] border-[#c9a84c]/50'}`}
              aria-label="Toggle theme"
            >
              <span className={`absolute w-5 h-5 rounded-full flex items-center justify-center text-xs transition-all duration-300 shadow-md
                ${darkMode ? 'translate-x-0 bg-[#1e1e3a] text-[#c9a84c]' : 'translate-x-7 bg-white text-yellow-500'}`}>
                {darkMode ? '🌙' : '☀️'}
              </span>
            </button>

            <a
              href="#contact"
              className="text-sm font-semibold text-[#c9a84c] border border-[#c9a84c]/50 px-5 py-1.5 rounded-full hover:bg-[#c9a84c]/10 hover:border-[#c9a84c] transition-all duration-200 tracking-wide"
            >
              Hire Me
            </a>
          </div>

          <button
            className="md:hidden flex flex-col gap-[5px] bg-transparent border-none cursor-pointer p-1"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {[0, 1, 2].map(i => (
              <span key={i} className={`block h-[2px] bg-[#c9a84c] rounded-sm transition-all duration-300 ${i === 1 ? 'w-4' : 'w-6'}`} />
            ))}
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-[#0e0e1a] border-t border-white/[0.05] px-6 py-6">
            <ul className="flex flex-col gap-5 list-none mb-6">
              {links.map(link => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    onClick={() => { setActive(link); setMenuOpen(false) }}
                    className={`text-base font-medium transition-colors ${active === link ? 'text-[#c9a84c]' : 'text-[#8b8b9a]'}`}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
            <a href="#contact" className="inline-block text-sm font-semibold text-[#c9a84c] border border-[#c9a84c]/50 px-5 py-2 rounded-full" onClick={() => setMenuOpen(false)}>
              Hire Me
            </a>
          </div>
        )}
      </nav>
  )
}