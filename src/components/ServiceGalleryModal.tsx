import React, { useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import { X } from 'lucide-react';

// @ts-ignore
import 'swiper/css';
// @ts-ignore
import 'swiper/css/navigation';
// @ts-ignore
import 'swiper/css/pagination';
// @ts-ignore
import 'swiper/css/effect-fade';

interface ServiceGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  images: string[];
  folder: string;
}

const ServiceGalleryModal: React.FC<ServiceGalleryModalProps> = ({
  isOpen,
  onClose,
  title,
  images,
  folder,
}) => {
  const randomizedImages = useMemo(() => {
    return [...images].sort(() => Math.random() - 0.5);
  }, [images]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8"
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 30 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="relative w-full max-w-5xl max-h-[90vh] bg-brand-charcoal rounded-3xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 md:px-8 md:py-5 border-b border-white/10">
              <h3 className="text-xl md:text-2xl font-serif text-white">{title}</h3>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 hover:text-white transition-colors"
              >
                <X size={20} />
              </motion.button>
            </div>

            {/* Slider */}
            <div className="p-4 md:p-8">
              <Swiper
                style={{
                  '--swiper-theme-color': '#cca53f',
                  '--swiper-navigation-color': '#cca53f',
                  '--swiper-pagination-color': '#cca53f',
                } as React.CSSProperties}
                modules={[Navigation, Pagination, Autoplay, EffectFade]}
                spaceBetween={20}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 4500, disableOnInteraction: true }}
                loop={randomizedImages.length > 1}
                className="w-full rounded-2xl overflow-hidden"
              >
                {randomizedImages.map((filename, idx) => (
                  <SwiperSlide key={filename}>
                    <div className="relative w-full aspect-[16/10] bg-black/40 rounded-2xl overflow-hidden flex items-center justify-center">
                      <img
                        src={`${import.meta.env.BASE_URL}images/${folder}/${filename}`}
                        alt={`${title} - Photo ${idx + 1}`}
                        className="w-full h-full object-contain object-center"
                        loading="lazy"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Image counter */}
              <p className="text-center text-white/50 text-sm mt-4">
                {randomizedImages.length} {randomizedImages.length === 1 ? 'photo' : 'photos'}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ServiceGalleryModal;
