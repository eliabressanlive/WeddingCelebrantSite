import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';

const CookieBanner: React.FC = () => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookieConsent', 'declined');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6"
        >
          <div className="max-w-5xl mx-auto bg-brand-charcoal text-white rounded-2xl shadow-2xl border border-brand-gold/20 p-6 flex flex-col sm:flex-row items-center justify-between gap-6 backdrop-blur-md bg-opacity-95">
            <div className="flex-1 text-center sm:text-left">
              <p className="text-sm md:text-base text-brand-ivory/90 font-medium">
                {t('footer.cookiesConsent')}
              </p>
            </div>
            <div className="flex items-center gap-4 shrink-0">
              <button
                onClick={handleDecline}
                className="px-6 py-2.5 rounded-lg border border-brand-ivory/20 text-brand-ivory hover:bg-white/10 transition-colors text-sm font-semibold tracking-wide"
              >
                {t('footer.decline')}
              </button>
              <button
                onClick={handleAccept}
                className="px-6 py-2.5 rounded-lg bg-brand-gold text-brand-charcoal hover:bg-yellow-600 transition-colors text-sm font-bold tracking-wide shadow-lg shadow-brand-gold/20"
              >
                {t('footer.accept')}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieBanner;
