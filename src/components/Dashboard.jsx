import { useEffect, useState } from 'react'
import { Plus, ExternalLink, CheckCircle2, Calendar, Link2 } from 'lucide-react'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function BookmarkForm({ onAdd }) {
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [color, setColor] = useState('#22d3ee')

  const submit = async (e) => {
    e.preventDefault()
    if (!title || !url) return
    await onAdd({ title, url, color })
    setTitle(''); setUrl('')
  }

  return (
    <form onSubmit={submit} className="flex gap-2">
      <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Titel" className="flex-1 bg-white/10 border border-white/10 rounded-md px-3 py-2 text-white placeholder-white/50" />
      <input value={url} onChange={e=>setUrl(e.target.value)} placeholder="https://..." className="flex-[1.5] bg-white/10 border border-white/10 rounded-md px-3 py-2 text-white placeholder-white/50" />
      <input type="color" value={color} onChange={e=>setColor(e.target.value)} className="w-10 h-10 rounded" />
      <button className="px-3 py-2 bg-white/10 border border-white/10 rounded-md text-white hover:bg-white/20 transition"><Plus className="inline w-4 h-4"/> Toevoegen</button>
    </form>
  )
}

function TaskForm({ onAdd }) {
  const [title, setTitle] = useState('')
  const submit = async (e) => {
    e.preventDefault()
    if (!title) return
    await onAdd({ title })
    setTitle('')
  }
  return (
    <form onSubmit={submit} className="flex gap-2">
      <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Nieuwe taak" className="flex-1 bg-white/10 border border-white/10 rounded-md px-3 py-2 text-white placeholder-white/50" />
      <button className="px-3 py-2 bg-white/10 border border-white/10 rounded-md text-white hover:bg-white/20 transition"><Plus className="inline w-4 h-4"/> Voeg taak toe</button>
    </form>
  )
}

export default function Dashboard() {
  const [bookmarks, setBookmarks] = useState([])
  const [tasks, setTasks] = useState([])
  const [events, setEvents] = useState([])

  const loadAll = async () => {
    const [b,t,e] = await Promise.all([
      fetch(`${API}/api/bookmarks`).then(r=>r.json()),
      fetch(`${API}/api/tasks`).then(r=>r.json()),
      fetch(`${API}/api/events`).then(r=>r.json())
    ])
    setBookmarks(b); setTasks(t); setEvents(e)
  }

  useEffect(() => { loadAll() }, [])

  const addBookmark = async (data) => {
    await fetch(`${API}/api/bookmarks`, { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(data) })
    loadAll()
  }

  const addTask = async (data) => {
    await fetch(`${API}/api/tasks`, { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(data) })
    loadAll()
  }

  const toggleTask = async (id) => {
    await fetch(`${API}/api/tasks/${id}/toggle`, { method: 'PATCH' })
    loadAll()
  }

  return (
    <section className="relative py-12 md:py-16">
      <div className="container mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-white">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold flex items-center gap-2"><Link2 className="w-4 h-4 text-cyan-300"/> Snelkoppelingen</h3>
              </div>
              <BookmarkForm onAdd={addBookmark} />
              <div className="mt-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {bookmarks.map(b => (
                  <a key={b.id} href={b.url} target="_blank" className="group relative rounded-xl overflow-hidden" style={{ background: `linear-gradient(135deg, ${b.color}33, ${b.color}66)` }}>
                    <div className="p-4">
                      <div className="text-white/90 font-medium">{b.title}</div>
                      <div className="text-white/70 text-xs break-all">{new URL(b.url).host}</div>
                    </div>
                    <div className="absolute right-3 top-3 opacity-0 group-hover:opacity-100 transition"><ExternalLink className="w-4 h-4 text-white"/></div>
                  </a>
                ))}
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-white">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold flex items-center gap-2"><Calendar className="w-4 h-4 text-cyan-300"/> Agenda (events)</h3>
                <span className="text-xs text-white/60">Binnenkort</span>
              </div>
              {events.length === 0 ? (
                <p className="text-white/60 text-sm">Voeg eerste events toe via de API. UI voor toevoegen volgt.</p>
              ) : (
                <ul className="space-y-2">
                  {events.map(e => (
                    <li key={e.id} className="flex items-center justify-between bg-white/5 rounded-lg p-3">
                      <div>
                        <div className="font-medium">{e.title}</div>
                        <div className="text-xs text-white/60">{new Date(e.start).toLocaleString()}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-white">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-cyan-300"/> Planner</h3>
              </div>
              <TaskForm onAdd={addTask} />
              <ul className="mt-4 space-y-2">
                {tasks.map(t => (
                  <li key={t.id} className="flex items-center gap-3 bg-white/5 rounded-lg p-3">
                    <button onClick={()=>toggleTask(t.id)} className={`w-5 h-5 rounded-full border ${t.is_done? 'bg-cyan-400 border-cyan-400':'border-white/40'}`}></button>
                    <span className={`flex-1 ${t.is_done? 'line-through text-white/50':'text-white'}`}>{t.title}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
