import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-scroll';

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const [cookieAccepted, setCookieAccepted] = useState(
    localStorage.getItem('cookieConsent') === 'true'
  );

  const handleCookieConsent = (accepted: boolean) => {
    setCookieAccepted(true);
    localStorage.setItem('cookieConsent', accepted ? 'true' : 'false');
  };

  return (
    <>
      <footer className="bg-brand-charcoal text-white pt-16 pb-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            
            <div className="mb-8 md:mb-0 text-center md:text-left">
              <Link to="home" smooth={true} duration={400} className="cursor-pointer font-serif text-3xl font-bold text-brand-gold">
                Noemi Bressan
              </Link>
              <p className="mt-2 text-white/50 text-sm">
                Valdobbiadene, Italy — Wedding Celebrant
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-6 text-sm text-white/70">
              {['home', 'about', 'services', 'process', 'faq', 'contact'].map(item => (
                <Link key={item} to={item} smooth={true} duration={400} className="hover:text-brand-gold cursor-pointer uppercase tracking-wider">
                  {t(`nav.${item}`)}
                </Link>
              ))}
            </div>

          </div>

          <div className="mt-16 pt-8 border-t border-white/10 text-center text-white/40 text-sm flex flex-col md:flex-row justify-between items-center">
            <p>&copy; {new Date().getFullYear()} Noemi Bressan. {t('footer.rights')}</p>
            <p className="mt-2 md:mt-0">Designed elegantly</p>
          </div>
        </div>
      </footer>

      {/* Simple Cookie Banner */}
      {!cookieAccepted && (
        <div className="fixed bottom-0 left-0 w-full bg-brand-charcoal border-t border-brand-gold p-4 z-50 shadow-2xl">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center px-4 sm:px-6 lg:px-8">
            <p className="text-white text-sm mb-4 md:mb-0 text-center md:text-left">
              {t('footer.cookiesConsent')}
            </p>
            <div className="flex gap-4">
              <button 
                onClick={() => handleCookieConsent(false)} 
                className="px-6 py-2 border border-white/20 rounded-md text-white text-sm hover:bg-white/10 transition-colors"
              >
                {t('footer.decline')}
              </button>
              <button 
                onClick={() => handleCookieConsent(true)} 
                className="px-6 py-2 bg-brand-gold rounded-md text-white font-medium text-sm hover:bg-brand-gold/90 transition-colors"
              >
                {t('footer.accept')}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Footer;
