
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Slideshow from './components/Slideshow';
import Services from './components/Services';
import ProseccoImages from './components/ProseccoImages';
import Process from './components/Process';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="bg-brand-ivory min-h-screen text-brand-charcoal overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
      <Slideshow />
      <Services />
      <ProseccoImages />
      <Process />
      <FAQ />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
