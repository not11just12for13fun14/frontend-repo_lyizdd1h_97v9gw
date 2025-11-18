import { useState, useEffect } from 'react'
import { Palette, Type, Sun, Moon, Globe } from 'lucide-react'

export default function Personalizer({ onChange }) {
  const [theme, setTheme] = useState('slate')
  const [accent, setAccent] = useState('#22d3ee')
  const [font, setFont] = useState('Inter')
  const [mode, setMode] = useState('dark')
  const [locale, setLocale] = useState('nl-NL')

  useEffect(() => {
    onChange?.({ theme, accent, font, mode, locale })
    document.documentElement.style.setProperty('--accent', accent)
    document.documentElement.style.setProperty('--font-sans', `'${font}', system-ui, sans-serif`)
    document.documentElement.classList.toggle('dark', mode === 'dark')
  }, [theme, accent, font, mode, locale])

  const colors = ['#22d3ee','#60a5fa','#a78bfa','#f472b6','#fb7185','#34d399','#fbbf24']
  const fonts = ['Inter','Manrope','IBM Plex Sans','Mona Sans','Geist']

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-4 md:p-5 backdrop-blur-md text-white">
      <div className="flex items-center gap-2 mb-4">
        <Palette className="w-5 h-5 text-cyan-300" />
        <h3 className="font-semibold">Personaliseer</h3>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <label className="text-xs/5 text-white/70 flex items-center gap-2 mb-2"><Type className="w-4 h-4"/> Lettertype</label>
          <select value={font} onChange={e=>setFont(e.target.value)} className="w-full bg-white/10 border border-white/10 rounded-md px-3 py-2">
            {fonts.map(f=> <option key={f} value={f}>{f}</option>)}
          </select>
        </div>
        <div>
          <label className="text-xs/5 text-white/70 flex items-center gap-2 mb-2"><Sun className="w-4 h-4"/> Thema</label>
          <div className="flex items-center gap-2">
            <button onClick={()=>setMode('light')} className={`px-3 py-2 rounded-md border ${mode==='light'?'border-white/40 bg-white/10':'border-white/10 bg-white/5'}`}>Licht</button>
            <button onClick={()=>setMode('dark')} className={`px-3 py-2 rounded-md border ${mode==='dark'?'border-white/40 bg-white/10':'border-white/10 bg-white/5'}`}><Moon className="inline w-4 h-4 mr-1"/>Donker</button>
          </div>
        </div>
        <div>
          <label className="text-xs/5 text-white/70 flex items-center gap-2 mb-2"><Palette className="w-4 h-4"/> Accent</label>
          <div className="flex gap-2 flex-wrap">
            {colors.map(c => (
              <button key={c} onClick={()=>setAccent(c)} style={{ backgroundColor: c }} className={`w-7 h-7 rounded-full ring-2 ${accent===c? 'ring-white':'ring-white/20'}`}></button>
            ))}
          </div>
        </div>
        <div>
          <label className="text-xs/5 text-white/70 flex items-center gap-2 mb-2"><Globe className="w-4 h-4"/> Taal</label>
          <select value={locale} onChange={e=>setLocale(e.target.value)} className="w-full bg-white/10 border border-white/10 rounded-md px-3 py-2">
            <option>nl-NL</option>
            <option>en-US</option>
            <option>de-DE</option>
          </select>
        </div>
      </div>
    </div>
  )
}
