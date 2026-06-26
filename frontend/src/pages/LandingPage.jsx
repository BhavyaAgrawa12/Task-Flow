import { useDocumentTitle } from '../hooks/useDocumentTitle'
import Navbar from '../components/landing/Navbar'
import Hero from '../components/landing/Hero'

function LandingPage() {
  useDocumentTitle()

  return (
    <div className="min-h-screen bg-bg-primary">
      <Navbar />
      <main>
        <Hero />
      </main>
    </div>
  )
}

export default LandingPage
