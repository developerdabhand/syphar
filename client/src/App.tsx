import Nav from './components/navigation/Nav'
import Hero from './components/hero/Hero'
import Positioning from './components/positioning/Positioning'
import Services from './components/services/Services'
import Process from './components/process/Process'
import Work from './components/work/Work'
import Technology from './components/technology/Technology'
import WhyUs from './components/about/WhyUs'
import EuropeFit from './components/about/EuropeFit'
import Insights from './components/insights/Insights'
import CTA from './components/contact/CTA'
import Footer from './components/footer/Footer'

function App() {
  return (
    <div className="bg-bg">
      <Nav />
      <main>
        <Hero />
        <Positioning />
        <Services />
        <Process />
        <Work />
        <Technology />
        <WhyUs />
        <EuropeFit />
        <Insights />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}

export default App
