import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Languages } from 'lucide-react';

const About: React.FC = () => {
  const { t, i18n } = useTranslation();

  return (
    <section id="about" className="py-24 bg-brand-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Image Column */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-[4/5] overflow-hidden rounded-t-full rounded-bl-full shadow-2xl">
              {/* Note: Using an Unsplash placeholder for demonstration, replace with actual image later */}
              <img 
                src="https://images.unsplash.com/photo-1541250848049-b4f714612024?q=80&w=1287&auto=format&fit=crop" 
                alt="Noemi Bressan" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-brand-pink rounded-full -z-10"></div>
          </motion.div>

          {/* Text Column */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl text-brand-charcoal mb-8">{t('about.title')}</h2>
            
            <div className="prose prose-lg text-brand-grey space-y-6">
              <p>{t('about.bio1')}</p>
              <p>{t('about.bio2')}</p>
            </div>

            <div className="mt-12 bg-white rounded-2xl shadow-sm border border-brand-pink p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5 text-brand-charcoal">
                <Languages size={100} />
              </div>
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 bg-brand-blush rounded-full text-brand-gold">
                  <Languages size={24} />
                </div>
                <h3 className="text-2xl font-serif text-brand-charcoal">{t('about.languages')}</h3>
              </div>
              <p className="text-brand-grey leading-relaxed">
                {t('about.languagesDesc')}
              </p>
              
              <div className="mt-6 flex flex-wrap gap-3">
                {[
                  { code: 'it', label: 'Italiano 🇮🇹' },
                  { code: 'en', label: 'English 🇬🇧' },
                  { code: 'de', label: 'Deutsch 🇩🇪' },
                  { code: 'es', label: 'Español 🇪🇸' }
                ].map((lang) => (
                  <button 
                    key={lang.code}
                    onClick={() => i18n.changeLanguage(lang.code)}
                    className={`px-4 py-2 border border-brand-pink rounded-full text-sm font-medium transition-colors ${i18n.language === lang.code ? 'bg-brand-gold text-white' : 'bg-brand-ivory text-brand-charcoal hover:bg-brand-blush'}`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default About;
