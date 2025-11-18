import { useState, useEffect } from 'react'
import { Menu, Home, Settings } from 'lucide-react'

export default function NavBar({ onOpenSettings }) {
  const [scrolled, setScrolled] = useState(false)
  useEffect(()=>{
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition backdrop-blur ${scrolled? 'bg-slate-900/70 border-b border-white/10':'bg-gradient-to-b from-slate-950/60 to-transparent'}`}>
      <div className="container mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
        <a href="/" className="inline-flex items-center gap-2 text-white">
          <Home className="w-5 h-5 text-cyan-300" />
          <span className="font-semibold">Digital Home</span>
        </a>
        <div className="flex items-center gap-2">
          <button onClick={onOpenSettings} className="hidden sm:inline-flex items-center gap-2 px-3 py-2 rounded-md bg-white/10 border border-white/10 text-white hover:bg-white/20 transition">
            <Settings className="w-4 h-4"/> Instellingen
          </button>
          <button className="sm:hidden p-2 rounded-md bg-white/10 border border-white/10 text-white">
            <Menu className="w-5 h-5"/>
          </button>
        </div>
      </div>
    </nav>
  )
}
