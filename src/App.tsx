
import Navbar from './components/Navbar';
import SEO from './components/SEO';
import Hero from './components/Hero';
import About from './components/About';
import Slideshow from './components/Slideshow';
import Services from './components/Services';
import Process from './components/Process';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CookieBanner from './components/CookieBanner';

function App() {
  return (
    <div className="bg-brand-ivory min-h-screen text-brand-charcoal overflow-x-hidden">
      <SEO />
      <Navbar />
      <Hero />
      <About />
      <Slideshow />
      <Services />
      <Process />
      <FAQ />
      <Contact />
      <Footer />
      <CookieBanner />
    </div>
  );
}

export default App;
