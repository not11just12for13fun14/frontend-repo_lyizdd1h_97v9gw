import { useRef, useState } from 'react'
import Hero from './components/Hero'
import Dashboard from './components/Dashboard'
import NavBar from './components/NavBar'
import Personalizer from './components/Personalizer'

function App() {
  const [showSettings, setShowSettings] = useState(false)
  const [prefs, setPrefs] = useState({})

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <NavBar onOpenSettings={() => setShowSettings(true)} />
      <Hero />

      <main>
        <section className="py-6 md:py-10">
          <div className="container mx-auto px-6 md:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
              <div className="lg:col-span-2">
                <h2 className="text-2xl font-bold mb-2">Jouw hub</h2>
                <p className="text-white/70 mb-6">Maak je eigen startpagina met snelkoppelingen, taken en agenda. Alles voelt thuis: kleuren, fonts en ritme naar jouw hand.</p>
              </div>
              <div>
                <Personalizer onChange={setPrefs} />
              </div>
            </div>
          </div>
        </section>

        <Dashboard />
      </main>

      {/* Settings modal (simple) */}
      {showSettings && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-slate-900 border border-white/10 rounded-2xl p-6 w-[90vw] max-w-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Instellingen</h3>
              <button onClick={()=>setShowSettings(false)} className="text-white/70 hover:text-white">Sluiten</button>
            </div>
            <Personalizer onChange={setPrefs} />
          </div>
        </div>
      )}

      <footer className="py-10 text-center text-white/50">
        Gemaakt met liefde voor een digitaal thuisgevoel.
      </footer>
    </div>
  )
}

export default App
