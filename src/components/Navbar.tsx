import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-scroll';
import { Menu, X, Globe } from 'lucide-react';

const Navbar: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  const languages = [
    { code: 'it', label: 'IT' },
    { code: 'en', label: 'EN' },
    { code: 'de', label: 'DE' },
    { code: 'es', label: 'ES' }
  ];

  const sections = ['home', 'about', 'services', 'process', 'faq', 'contact'];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setLangMenuOpen(false);
    setIsOpen(false);
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-brand-ivory/95 shadow-md backdrop-blur-sm py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex-shrink-0 cursor-pointer">
            <Link to="home" smooth={true} duration={400} className={`font-serif text-2xl font-bold ${scrolled ? 'text-brand-charcoal' : 'text-white'}`}>
              Noemi Bressan
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {sections.map(section => (
              <Link
                key={section}
                to={section}
                spy={true}
                smooth={true}
                offset={-80}
                duration={400}
                className={`cursor-pointer text-sm font-medium tracking-wide uppercase hover:text-brand-gold transition-colors ${scrolled ? 'text-brand-charcoal' : 'text-white'}`}
                activeClass="text-brand-gold"
              >
                {t(`nav.${section}`)}
              </Link>
            ))}
            
            {/* Language Selector */}
            <div className="relative">
              <button 
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className={`flex items-center space-x-1 hover:text-brand-gold transition-colors ${scrolled ? 'text-brand-charcoal' : 'text-white'}`}
              >
                <Globe size={18} />
                <span className="text-sm font-medium uppercase">{i18n.language}</span>
              </button>
              
              {langMenuOpen && (
                <div className="absolute right-0 mt-2 w-24 bg-white shadow-lg rounded-md overflow-hidden">
                  {languages.map(lang => (
                    <button
                      key={lang.code}
                      onClick={() => changeLanguage(lang.code)}
                      className={`block w-full text-left px-4 py-2 text-sm hover:bg-brand-blush ${i18n.language === lang.code ? 'font-bold text-brand-gold' : 'text-brand-charcoal'}`}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className={scrolled ? 'text-brand-charcoal' : 'text-white'}>
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Content */}
      {isOpen && (
        <div className="md:hidden bg-brand-ivory border-t border-brand-pink/30 absolute w-full left-0 shadow-lg pb-4 px-4">
          <div className="flex flex-col space-y-4 pt-4">
            {sections.map(section => (
              <Link
                key={section}
                to={section}
                spy={true}
                smooth={true}
                offset={-80}
                duration={400}
                onClick={() => setIsOpen(false)}
                className="cursor-pointer text-lg font-medium text-center"
              >
                {t(`nav.${section}`)}
              </Link>
            ))}
            
            <div className="flex justify-center space-x-4 pt-4 border-t border-brand-pink/30">
              {languages.map(lang => (
                <button
                  key={lang.code}
                  onClick={() => changeLanguage(lang.code)}
                  className={`text-lg font-medium ${i18n.language === lang.code ? 'text-brand-gold font-bold' : 'text-brand-charcoal'}`}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
