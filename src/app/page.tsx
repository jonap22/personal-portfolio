import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Experience from '@/components/Experience'
import Skills from '@/components/Skills'
import Projects from '@/components/Projects'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import GrainOverlay from '@/components/GrainOverlay'
import ReadingProgress from '@/components/ReadingProgress'

export default function Home() {
  return (
    <main>
      <GrainOverlay />
      <ReadingProgress />
      <Navigation />
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </main>
  )
}
