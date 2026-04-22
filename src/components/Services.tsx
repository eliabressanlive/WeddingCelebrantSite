import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Heart, Compass, Mic, Sparkles } from 'lucide-react';

const Services: React.FC = () => {
  const { t } = useTranslation();

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section id="services" className="py-24 bg-brand-blush/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl mb-6"
          >
            {t('services.title')}
          </motion.h2>
          <div className="w-24 h-1 bg-brand-gold mx-auto"></div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >

          {/* Main Wedding Service */}
          <motion.div variants={itemVariants} className="bg-white p-10 rounded-2xl shadow-sm border border-brand-border/50 md:col-span-2 flex flex-col md:flex-row items-center gap-8">
            <div className="flex-shrink-0 w-24 h-24 bg-brand-pink/30 rounded-full flex items-center justify-center text-brand-gold">
              <Heart size={40} />
            </div>
            <div>
              <h3 className="text-3xl font-serif mb-4 text-brand-charcoal">{t('services.wedding.title')}</h3>
              <p className="text-brand-grey text-lg leading-relaxed">
                {t('services.wedding.desc')}
              </p>
            </div>
          </motion.div>

          {/* Tour Leader */}
          <motion.div variants={itemVariants} className="bg-white p-10 rounded-2xl shadow-sm border border-brand-border/50 hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-brand-pink/30 rounded-full flex items-center justify-center text-brand-gold mb-6">
              <Compass size={32} />
            </div>
            <h3 className="text-2xl font-serif mb-3 text-brand-charcoal">{t('services.other.t1')}</h3>
            <p className="text-brand-grey leading-relaxed">
              {t('services.other.d1')}
            </p>
          </motion.div>

          {/* Event Presenter */}
          <motion.div variants={itemVariants} className="bg-white p-10 rounded-2xl shadow-sm border border-brand-border/50 hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-brand-pink/30 rounded-full flex items-center justify-center text-brand-gold mb-6">
              <Mic size={32} />
            </div>
            <h3 className="text-2xl font-serif mb-3 text-brand-charcoal">{t('services.other.t2')}</h3>
            <p className="text-brand-grey leading-relaxed">
              {t('services.other.d2')}
            </p>
          </motion.div>

          {/* Add-ons */}
          <motion.div variants={itemVariants} className="bg-brand-charcoal p-10 rounded-2xl shadow-md text-white md:col-span-2 relative overflow-hidden">
            <div className="absolute right-0 top-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl"></div>
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
              <div className="flex-shrink-0 w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-brand-gold border border-white/20">
                <Sparkles size={32} />
              </div>
              <div>
                <h3 className="text-2xl font-serif mb-3 text-white">{t('services.addons.title')}</h3>
                <p className="text-white/80 leading-relaxed max-w-3xl">
                  {t('services.addons.desc')}
                </p>
              </div>
            </div>
          </motion.div>

        </motion.div>

      </div>
    </section>
  );
};

export default Services;
