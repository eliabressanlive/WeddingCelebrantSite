import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Heart, Compass, Mic, Sparkles, Camera } from 'lucide-react';
import ServiceGalleryModal from './ServiceGalleryModal';

/* ── Image file lists per service ── */
const weddingImages = [
  '14 Damiano 85mm -16 settembre 2023.jpg',
  'WhatsApp Image 2026-03-09 at 20.00.10 (1).jpeg',
  'IMG-20250202-WA0025.jpg',
  '76 Damiano 85mm -16 settembre 2023.jpg',
  'IMG-20250202-WA0028.jpg',
  'WhatsApp Image 2026-03-09 at 20.00.10 (4).jpeg',
  '290 Damiano 28 75mm-16 settembre 2023.jpg',
  'WhatsApp Image 2026-03-09 at 20.00.10.jpeg',
];

const tourLeaderImages = [
  'prosecco_1.png',
  'prosecco_2.png',
];

const eventImages = [
  "Primavera P.co'25-1.jpg",
  "Primavera P.co'25-4.jpg",
  "Primavera P.co'25-5.jpg",
  "Primavera P.co'25-57.jpg",
  "Primavera P.co'25-6.jpg",
  "Primavera P.co'25-7.jpg",
];

type ServiceId = 'wedding' | 'tour' | 'events' | null;

const Services: React.FC = () => {
  const { t } = useTranslation();
  const [activeGallery, setActiveGallery] = useState<ServiceId>(null);

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

  const galleryConfig = {
    wedding: { images: weddingImages, folder: 'weddings', titleKey: 'services.wedding.title' },
    tour: { images: tourLeaderImages, folder: 'tour_leader', titleKey: 'services.other.t1' },
    events: { images: eventImages, folder: 'events', titleKey: 'services.other.t2' },
  };

  const activeConfig = activeGallery ? galleryConfig[activeGallery] : null;

  return (
    <>
      <section id="services" className="relative py-24 overflow-hidden">
        {/* ── Background image ── */}
        <div className="absolute inset-0 z-0">
          <img
            src={`${import.meta.env.BASE_URL}images/backgrounds/castelbrando.jpeg`}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Dark overlay for readability */}
          <div className="absolute inset-0 bg-brand-charcoal/60 backdrop-blur-[2px]" />
          {/* Subtle warm accent */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              background:
                'linear-gradient(160deg, transparent 0%, #cca53f22 50%, transparent 100%)',
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl mb-6 text-white"
            >
              {t('services.title')}
            </motion.h2>
            <div className="w-24 h-1 bg-brand-gold mx-auto"></div>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-100px' }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >

            {/* Main Wedding Service – hero card */}
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -4 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              onClick={() => setActiveGallery('wedding')}
              className="group relative md:col-span-2 backdrop-blur-md bg-white/50 border border-white/70 rounded-2xl p-10 shadow-lg shadow-brand-pink/10 hover:shadow-xl hover:shadow-brand-gold/15 transition-shadow duration-500 overflow-hidden cursor-pointer"
            >
              {/* Gold accent line at top */}
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-brand-gold/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
                <motion.div
                  whileHover={{ rotate: [0, -8, 8, 0] }}
                  transition={{ duration: 0.6 }}
                  className="flex-shrink-0 w-24 h-24 bg-brand-pink/20 backdrop-blur-sm rounded-full flex items-center justify-center text-brand-gold border border-brand-pink/30"
                >
                  <Heart size={40} />
                </motion.div>
                <div className="flex-1">
                  <h3 className="text-3xl font-serif mb-4 text-brand-charcoal">{t('services.wedding.title')}</h3>
                  <p className="text-brand-grey text-lg leading-relaxed">
                    {t('services.wedding.desc')}
                  </p>
                </div>
              </div>

              {/* Gallery hint */}
              <div className="absolute bottom-8 right-8 flex items-center justify-end text-white group-hover:text-brand-gold transition-colors duration-300 z-20">
                <div className="max-w-0 overflow-hidden opacity-0 group-hover:max-w-[150px] group-hover:opacity-100 transition-all duration-500 ease-in-out flex items-center justify-end">
                  <span className="mr-2 text-sm font-medium whitespace-nowrap drop-shadow-md">
                    {t('services.viewGallery', 'Gallery')}
                  </span>
                </div>
                <Camera size={24} className="drop-shadow-md" />
              </div>
            </motion.div>

            {/* Tour Leader */}
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -4 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              onClick={() => setActiveGallery('tour')}
              className="group relative backdrop-blur-md bg-white/50 border border-white/70 rounded-2xl p-10 shadow-lg shadow-brand-pink/10 hover:shadow-xl hover:shadow-brand-gold/15 transition-shadow duration-500 overflow-hidden cursor-pointer"
            >
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-brand-gold/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="flex flex-col h-full relative z-10">
                <motion.div
                  whileHover={{ rotate: [0, -8, 8, 0] }}
                  transition={{ duration: 0.6 }}
                  className="w-16 h-16 bg-brand-pink/20 backdrop-blur-sm rounded-full flex items-center justify-center text-brand-gold border border-brand-pink/30 mb-6"
                >
                  <Compass size={32} />
                </motion.div>
                <h3 className="text-2xl font-serif mb-3 text-brand-charcoal">{t('services.other.t1')}</h3>
                <p className="text-brand-grey leading-relaxed">
                  {t('services.other.d1')}
                </p>
              </div>

              {/* Gallery hint */}
              <div className="absolute bottom-8 right-8 flex items-center justify-end text-white group-hover:text-brand-gold transition-colors duration-300 z-20">
                <div className="max-w-0 overflow-hidden opacity-0 group-hover:max-w-[150px] group-hover:opacity-100 transition-all duration-500 ease-in-out flex items-center justify-end">
                  <span className="mr-2 text-sm font-medium whitespace-nowrap drop-shadow-md">
                    {t('services.viewGallery', 'Gallery')}
                  </span>
                </div>
                <Camera size={24} className="drop-shadow-md" />
              </div>
            </motion.div>

            {/* Event Presenter */}
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -4 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              onClick={() => setActiveGallery('events')}
              className="group relative backdrop-blur-md bg-white/50 border border-white/70 rounded-2xl p-10 shadow-lg shadow-brand-pink/10 hover:shadow-xl hover:shadow-brand-gold/15 transition-shadow duration-500 overflow-hidden cursor-pointer"
            >
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-brand-gold/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="flex flex-col h-full relative z-10">
                <motion.div
                  whileHover={{ rotate: [0, -8, 8, 0] }}
                  transition={{ duration: 0.6 }}
                  className="w-16 h-16 bg-brand-pink/20 backdrop-blur-sm rounded-full flex items-center justify-center text-brand-gold border border-brand-pink/30 mb-6"
                >
                  <Mic size={32} />
                </motion.div>
                <h3 className="text-2xl font-serif mb-3 text-brand-charcoal">{t('services.other.t2')}</h3>
                <p className="text-brand-grey leading-relaxed">
                  {t('services.other.d2')}
                </p>
              </div>

              {/* Gallery hint */}
              <div className="absolute bottom-8 right-8 flex items-center justify-end text-white group-hover:text-brand-gold transition-colors duration-300 z-20">
                <div className="max-w-0 overflow-hidden opacity-0 group-hover:max-w-[150px] group-hover:opacity-100 transition-all duration-500 ease-in-out flex items-center justify-end">
                  <span className="mr-2 text-sm font-medium whitespace-nowrap drop-shadow-md">
                    {t('services.viewGallery', 'Gallery')}
                  </span>
                </div>
                <Camera size={24} className="drop-shadow-md" />
              </div>
            </motion.div>

            {/* Add-ons – dark accent card (no gallery) */}
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -4 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="group relative bg-brand-charcoal p-10 rounded-2xl shadow-lg text-white md:col-span-2 overflow-hidden"
            >
              {/* Decorative gradient blurs */}
              <div className="absolute right-0 top-0 w-72 h-72 bg-brand-gold opacity-[0.06] rounded-full blur-3xl" />
              <div className="absolute -left-10 -bottom-10 w-48 h-48 bg-brand-pink opacity-[0.05] rounded-full blur-2xl" />

              {/* Gold accent line */}
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-brand-gold/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                <motion.div
                  whileHover={{ rotate: [0, -8, 8, 0] }}
                  transition={{ duration: 0.6 }}
                  className="flex-shrink-0 w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-brand-gold border border-white/20"
                >
                  <Sparkles size={32} />
                </motion.div>
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

      {/* Gallery Modal */}
      {activeConfig && (
        <ServiceGalleryModal
          isOpen={activeGallery !== null}
          onClose={() => setActiveGallery(null)}
          title={t(activeConfig.titleKey)}
          images={activeConfig.images}
          folder={activeConfig.folder}
        />
      )}
    </>
  );
};

export default Services;
