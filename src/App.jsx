import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { CursorProvider } from './cursor/useCursorStore'
import { Cursor } from './cursor/Cursor'
import { ParticleField } from './canvas/ParticleField'
import Nav from './components/Nav'
import Home from './pages/Home'
import Ember from './pages/Ember'
import { useLenis, getLenis } from './hooks/useLenis'
import './styles/globals.css'

const pageTransition = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
}

const pageTransitionConfig = {
  duration: 0.6,
  ease: [0.16, 1, 0.3, 1],
}

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    const lenis = getLenis()
    if (lenis) {
      lenis.scrollTo(0, { immediate: true })
    }
    window.scrollTo(0, 0)
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
  }, [pathname])
  return null
}

function AppInner() {
  useLenis()
  const location = useLocation()

  return (
    <>
      <ParticleField count={250} color="#E8843C" mouseInfluence={true} />
      <Cursor />
      <div className="grain" />
      <Nav />
      <ScrollToTop />
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={pageTransition.initial}
          animate={pageTransition.animate}
          exit={pageTransition.exit}
          transition={pageTransitionConfig}
          style={{ position: 'relative', zIndex: 1 }}
        >
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/ember" element={<Ember />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <CursorProvider>
        <AppInner />
      </CursorProvider>
    </BrowserRouter>
  )
}
