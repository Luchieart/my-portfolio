import { useEffect, useRef, useState } from 'react';
import profileImg from '../assets/profile.jpeg'

const TITLES = ['Frontend Developer', 'React Developer', 'UI Engineer']

export default function Hero() {
  const canvasRef = useRef(null)
  const cursorRef = useRef(null)
  const cursorDotRef = useRef(null)
  const [titleIndex, setTitleIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [deleting, setDeleting] = useState(false)
  const [showCursor, setShowCursor] = useState(true)

  // ── Particle canvas ──────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animId
    let W, H, particles

    const resize = () => {
      W = canvas.width = canvas.offsetWidth
      H = canvas.height = canvas.offsetHeight
    }

    const mkParticle = () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.5 + 0.3,
      dx: (Math.random() - 0.5) * 0.25,
      dy: (Math.random() - 0.5) * 0.25,
      o: Math.random() * 0.5 + 0.1,
    })

    const init = () => {
      resize()
      particles = Array.from({ length: 120 }, mkParticle)
    }

    const draw = () => {
      ctx.clearRect(0, 0, W, H)
      particles.forEach(p => {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(201,168,76,${p.o})`
        ctx.fill()
        p.x += p.dx
        p.y += p.dy
        if (p.x < 0 || p.x > W) p.dx *= -1
        if (p.y < 0 || p.y > H) p.dy *= -1
      })
      animId = requestAnimationFrame(draw)
    }

    init()
    draw()
    window.addEventListener('resize', init)
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', init) }
  }, [])

  // ── Typewriter ───────────────────────────────────────────────────
  useEffect(() => {
    const full = TITLES[titleIndex]
    let timeout

    if (!deleting && displayed.length < full.length) {
      timeout = setTimeout(() => setDisplayed(full.slice(0, displayed.length + 1)), 80)
    } else if (!deleting && displayed.length === full.length) {
      timeout = setTimeout(() => setDeleting(true), 2000)
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 45)
    } else if (deleting && displayed.length === 0) {
      setDeleting(false)
      setTitleIndex(i => (i + 1) % TITLES.length)
    }
    return () => clearTimeout(timeout)
  }, [displayed, deleting, titleIndex])

  // Blinking cursor
  useEffect(() => {
    const id = setInterval(() => setShowCursor(v => !v), 530)
    return () => clearInterval(id)
  }, [])

  // ── Custom cursor ────────────────────────────────────────────────
  useEffect(() => {
    const cursor = cursorRef.current
    const dot = cursorDotRef.current
    let mx = 0, my = 0, cx = 0, cy = 0
    let animId

    const move = e => { mx = e.clientX; my = e.clientY }
    window.addEventListener('mousemove', move)

    const tick = () => {
      cx += (mx - cx) * 0.12
      cy += (my - cy) * 0.12
      cursor.style.transform = `translate(${cx - 20}px, ${cy - 20}px)`
      dot.style.transform = `translate(${mx - 4}px, ${my - 4}px)`
      animId = requestAnimationFrame(tick)
    }
    tick()

    const grow = () => cursor.classList.add('cursor-grow')
    const shrink = () => cursor.classList.remove('cursor-grow')
    document.querySelectorAll('a, button').forEach(el => {
      el.addEventListener('mouseenter', grow)
      el.addEventListener('mouseleave', shrink)
    })

    return () => {
      window.removeEventListener('mousemove', move)
      cancelAnimationFrame(animId)
    }
  }, [])

  return (
    <>
      <style>{`
        * { cursor: none !important; }

        .custom-cursor {
          position: fixed;
          top: 0; left: 0;
          width: 40px; height: 40px;
          border: 1.5px solid rgba(201,168,76,0.6);
          border-radius: 50%;
          pointer-events: none;
          z-index: 9999;
          transition: width 0.2s, height 0.2s, border-color 0.2s;
        }
        .custom-cursor.cursor-grow {
          width: 60px; height: 60px;
          border-color: rgba(201,168,76,1);
        }
        .cursor-dot {
          position: fixed;
          top: 0; left: 0;
          width: 8px; height: 8px;
          background: #c9a84c;
          border-radius: 50%;
          pointer-events: none;
          z-index: 9999;
        }

        @keyframes float-code {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .float-code { animation: float-code 4s ease-in-out infinite; }
        .float-code-slow { animation: float-code 6s ease-in-out infinite; }

        @keyframes glow-pulse {
          0%, 100% { box-shadow: 0 0 30px rgba(201,168,76,0.15); }
          50% { box-shadow: 0 0 60px rgba(201,168,76,0.35); }
        }
        .photo-glow { animation: glow-pulse 3s ease-in-out infinite; }

        @keyframes scroll-bounce {
          0%, 100% { transform: translateY(0); opacity: 1; }
          50% { transform: translateY(6px); opacity: 0.4; }
        }
        .scroll-bounce { animation: scroll-bounce 1.5s ease-in-out infinite; }
      `}</style>

      {/* Custom cursor */}
      <div ref={cursorRef} className="custom-cursor" />
      <div ref={cursorDotRef} className="cursor-dot" />

      <section className="relative min-h-screen flex items-center overflow-hidden pt-16" style={{ backgroundColor: 'var(--bg)' }}>

        {/* Particle canvas */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

        {/* Radial glow center-left */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 60% 70% at 30% 50%, rgba(201,168,76,0.05) 0%, transparent 70%)' }} />

        {/* Floating code labels */}
        <div className="absolute left-6 top-1/3 float-code hidden lg:block">
          <span className="text-[#c9a84c]/40 text-sm font-mono">{'{ 4+ years }'}</span>
        </div>
        <div className="absolute left-6 bottom-10 float-code-slow hidden lg:block">
          <span className="text-[#c9a84c]/40 text-sm font-mono">{'</> Lagos, NG'}</span>
        </div>

        <div className="max-w-6xl mx-auto px-6 md:px-12 w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* ── Left content ── */}
            <div>
              {/* Available badge */}
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-10 bg-[#c9a84c]/60" />
                <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#c9a84c]/80">
                  Available for Opportunities
                </span>
                <div className="w-2 h-2 rounded-full bg-[#c9a84c] animate-pulse" />
              </div>

              {/* Name */}
              <h1 className="font-display font-black leading-none mb-3" style={{ fontSize: 'clamp(2.5rem, 7vw, 4rem)' }}>
                <span className="text-white block">Chukwuemeka</span>
                <span className="block logo-gradient" style={{ WebkitTextFillColor: 'transparent' }}>Oluchi</span>
              </h1>

              {/* Typewriter */}
              <div className="flex items-center gap-2 mb-6">
                <span className="text-[#c9a84c] font-mono text-lg">$</span>
                <span className="text-white/80 font-mono text-lg tracking-wide">
                  {displayed}
                  <span className={`inline-block w-0.5 h-5 bg-white ml-0.5 align-middle transition-opacity ${showCursor ? 'opacity-100' : 'opacity-0'}`} />
                </span>
              </div>

              {/* Description */}
              <p className=" text-base leading-relaxed mb-8 max-w-md font-light" style={{ color: 'var(--text-secondary)' }}
>
                Crafting digital experiences that live beyond screens. Building
                products used across{' '}
                <span className="text-[#c9a84c] font-semibold">7+ companies</span>
                {' '}with React, Next.js & TypeScript.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4 mb-12">
                <a href="#projects"
                  className="flex items-center gap-2 bg-[#c9a84c] text-[#0a0a0f] font-semibold text-sm px-7 py-3.5 rounded-full hover:bg-[#e8d5a3] transition-all duration-200 hover:-translate-y-0.5">
                  View My Work
                  <span>→</span>
                </a>
                <a href="#contact"
                  className="flex items-center gap-2 text-white text-sm font-medium px-7 py-3.5 rounded-full border border-white/20 hover:border-[#c9a84c]/50 hover:text-[#c9a84c] transition-all duration-200 hover:-translate-y-0.5">
                  Let's Talk
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                  </svg>
                </a>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-8">
                {[
                  { num: '4+', label: 'Years Exp.' },
                  { num: '7+', label: 'Companies' },
                  { num: '10+', label: 'Projects' },
                ].map((s, i, arr) => (
                  <div key={s.label} className="flex items-center gap-8">
                    <div className="flex flex-col">
                      <span className="font-display font-bold text-2xl text-[#c9a84c] leading-none">{s.num}</span>
                      <span className="text-xs  mt-1 tracking-wide" style={{ color: 'var(--text-secondary)' }}
>{s.label}</span>
                    </div>
                    {i < arr.length - 1 && <div className="w-px h-8 bg-white/[0.08]" />}
                  </div>
                ))}
              </div>
            </div>

            {/* ── Right — photo card ── */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                {/* Tech tag top right */}
                <div className="absolute -top-3 -right-3 z-20  border border-[#c9a84c]/30 text-[#c9a84c] text-xs font-mono px-3 py-1.5 rounded-full" style={{ backgroundColor: 'var(--bg)' }}>
                  React · Next.js
                </div>

                {/* Card */}
          <div className="photo-glow relative w-64 h-80 md:w-72 md:h-96 rounded-2xl overflow-hidden border border-[#c9a84c]/20">
  <img
    src={profileImg}
    alt="Chukwuemeka Oluchi"
    className="w-full h-full object-cover object-cover opacity-80"
  />
</div>

                {/* Open to work badge */}
                <div className="absolute bg-white -bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2  border border-white/10 px-4 py-2 rounded-full whitespace-nowrap" 
>
                  <span className="w-2 h-2 rounded-full bg-[#c9a84c] animate-pulse" />
                  <span className="text-black text-xs font-medium">Open to work</span>
                </div>

                {/* Decorative glow behind card */}
                <div className="absolute inset-0 -z-10 blur-3xl rounded-full"
                  style={{ background: 'radial-gradient(circle, rgba(201,168,76,0.12) 0%, transparent 70%)', transform: 'scale(1.4)' }} />
              </div>
            </div>

          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
          <span className="text-[10px] tracking-[0.2em] uppercase" style={{ color: 'var(--text-secondary)' }}
>scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-[#c9a84c] to-transparent scroll-bounce" />
        </div>

      </section>
    </>
  )
}