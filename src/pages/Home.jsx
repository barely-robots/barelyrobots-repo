import { HeroOpening } from '../sections/home/HeroOpening'
import { ManifestoScroll } from '../sections/home/ManifestoScroll'
import { EmberReveal } from '../sections/home/EmberReveal'
import { Principles } from '../sections/home/Principles'
import { WaitlistCTA } from '../sections/home/WaitlistCTA'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <>
      <HeroOpening />
      <ManifestoScroll />
      <EmberReveal />
      <Principles />
      <WaitlistCTA />
      <Footer />
    </>
  )
}
