import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-scroll';

const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
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
          <p className="mt-2 md:mt-0">Developed by <a href="https://github.com/eliabressanlive" target="_blank" rel="noopener noreferrer">Elia Bressan</a></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
