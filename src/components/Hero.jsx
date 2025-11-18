import Spline from '@splinetool/react-spline'
import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="relative w-full min-h-[70vh] md:min-h-[80vh] overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/WCoEDSwacOpKBjaC/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="relative z-10 container mx-auto px-6 md:px-10 pt-24 md:pt-28 pb-16 flex items-center min-h-[70vh]">
        <div className="max-w-3xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-extrabold tracking-tight text-white drop-shadow-xl"
          >
            Digital Home
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-4 md:mt-6 text-lg md:text-2xl text-white/90 max-w-2xl"
          >
            Jouw persoonlijke hub voor planning, agenda en al je favoriete websites — helemaal naar smaak te personaliseren.
          </motion.p>
        </div>
      </div>

      {/* gradient overlay to improve text contrast */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/40 to-transparent" />
    </section>
  )
}
