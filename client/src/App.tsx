import { Analytics } from '@vercel/analytics/react'
import Nav from './components/navigation/Nav'
import Hero from './components/hero/Hero'
import Services from './components/services/Services'
import Positioning from './components/positioning/Positioning'
import Process from './components/process/Process'
import Work from './components/work/Work'
import Technology from './components/technology/Technology'
import WhyUs from './components/about/WhyUs'
import EuropeFit from './components/about/EuropeFit'
import Insights from './components/insights/Insights'
import InlineCTA from './components/contact/InlineCTA'
import StickyCTA from './components/contact/StickyCTA'
import CTA from './components/contact/CTA'
import Footer from './components/footer/Footer'

function App() {
  return (
    <div className="bg-bg">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-ink focus:px-4 focus:py-2 focus:text-bg"
      >
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <Positioning />
        <Services />
        <Process />
        <Work />
        <InlineCTA />
        <Technology />
        <WhyUs />
        <EuropeFit />
        <Insights />
        <CTA />
      </main>
      <Footer />
      <StickyCTA />
      <Analytics />
    </div>
  )
}

export default App
