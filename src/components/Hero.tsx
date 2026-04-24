import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-scroll';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section id="home" className="relative h-[100svh] min-h-[100svh] md:h-screen md:min-h-screen flex items-center justify-center overflow-hidden bg-brand-charcoal">
      <div
        className="
            absolute inset-0 
            bg-cover 
            bg-no-repeat
            bg-[position:center_calc(50%-160px)]
            scale-[1.24] 
            max-[1500px]:bg-[position:center_calc(50%-110px)]
            max-[1500px]:scale-[1.40]"
        style={{
          backgroundImage: `url("${import.meta.env.BASE_URL}hero-bg.jpg")`
        }}
      >
        <div className="absolute inset-0 bg-brand-charcoal/40" /> {/* Dark Overlay */}
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-16">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-4xl md:text-6xl lg:text-7xl font-serif text-white mb-6 leading-tight drop-shadow-lg"
        >
          {t('hero.title')}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="text-lg md:text-2xl text-white/90 mb-10 font-light max-w-2xl mx-auto drop-shadow"
        >
          {t('hero.subtitle')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <Link
            to="about"
            smooth={true}
            duration={200}
            className="cursor-pointer inline-block bg-brand-gold text-white px-8 py-4 rounded-full text-sm uppercase tracking-widest font-semibold hover:bg-brand-gold/90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
          >
            {t('hero.cta')}
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center p-1">
          <div className="w-1 h-2 bg-white rounded-full"></div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
