import { useState } from 'react'
import { EmberHero } from '../sections/ember/EmberHero'
import { EmberVoice } from '../sections/ember/EmberVoice'
import { ColorStory } from '../sections/ember/ColorStory'
import { FeatureReel } from '../sections/ember/FeatureReel'
import { SpecsBar } from '../sections/ember/SpecsBar'
import { EmberCTA } from '../sections/ember/EmberCTA'
import Footer from '../components/Footer'

export default function Ember() {
  const [active, setActive] = useState('orange')

  return (
    <>
      <EmberHero active={active} setActive={setActive} />
      <EmberVoice />
      <ColorStory />
      <FeatureReel />
      <SpecsBar />
      <EmberCTA />
      <Footer />
    </>
  )
}
