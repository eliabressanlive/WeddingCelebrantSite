import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const Process: React.FC = () => {
  const { t } = useTranslation();

  const steps = [
    { num: '01', titleKey: 'step1.title', descKey: 'step1.desc' },
    { num: '02', titleKey: 'step2.title', descKey: 'step2.desc' },
    { num: '03', titleKey: 'step3.title', descKey: 'step3.desc' }
  ];

  return (
    <section
      id="process"
      className="relative py-24 text-brand-charcoal overflow-hidden"
    >
      {/* ── Smooth gradient background ── */}
      <div className="absolute inset-0 -z-10">
        {/* Base gradient */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(135deg, #FAF9F6 0%, #F4E7E7 30%, #FAF9F6 50%, #E6C8C8 75%, #FAF9F6 100%)',
          }}
        />

        {/* Animated floating orbs */}
        <motion.div
          animate={{ x: [0, 40, -20, 0], y: [0, -30, 20, 0], scale: [1, 1.15, 0.95, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-20 -left-20 w-[420px] h-[420px] rounded-full opacity-40"
          style={{
            background:
              'radial-gradient(circle, #E6C8C8 0%, transparent 70%)',
          }}
        />
        <motion.div
          animate={{ x: [0, -50, 30, 0], y: [0, 40, -25, 0], scale: [1, 1.1, 0.9, 1] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/3 -right-32 w-[500px] h-[500px] rounded-full opacity-30"
          style={{
            background:
              'radial-gradient(circle, #cca53f 0%, transparent 70%)',
          }}
        />
        <motion.div
          animate={{ x: [0, 25, -35, 0], y: [0, -20, 35, 0], scale: [1, 1.08, 1.02, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -bottom-16 left-1/4 w-[380px] h-[380px] rounded-full opacity-35"
          style={{
            background:
              'radial-gradient(circle, #F4E7E7 0%, transparent 70%)',
          }}
        />

        {/* Subtle noise-like texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")',
            backgroundSize: '200px 200px',
          }}
        />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section heading */}
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl mb-6"
          >
            {t('process.title')}
          </motion.h2>
          <div className="w-24 h-1 bg-brand-gold mx-auto"></div>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical gradient line */}
          <div
            className="absolute left-[27px] md:left-1/2 top-0 bottom-0 w-px md:-translate-x-1/2"
            style={{
              background:
                'linear-gradient(to bottom, transparent, #cca53f 15%, #E6C8C8 85%, transparent)',
            }}
          />

          <div className="space-y-16">
            {steps.map((step, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="relative flex flex-col md:flex-row items-start md:items-center group"
                >
                  {/* Left Content (Desktop) */}
                  <div className="hidden md:block w-1/2 pr-12 text-right">
                    {isEven && (
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        className="backdrop-blur-md bg-white/40 border border-white/60 rounded-2xl p-6 shadow-lg shadow-brand-pink/10 hover:shadow-xl hover:shadow-brand-gold/15 transition-shadow duration-500"
                      >
                        <h3 className="text-2xl font-serif text-brand-charcoal mb-3">
                          {t(`process.${step.titleKey}`)}
                        </h3>
                        <p className="text-brand-grey leading-relaxed">
                          {t(`process.${step.descKey}`)}
                        </p>
                      </motion.div>
                    )}
                  </div>

                  {/* Center Circle with glow */}
                  <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 z-10 shrink-0">
                    <motion.div
                      whileInView={{ scale: [0.6, 1.1, 1] }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.15 + 0.2 }}
                      className="relative"
                    >
                      {/* Soft glow ring */}
                      <div className="absolute inset-0 w-14 h-14 rounded-full bg-brand-gold/20 blur-md group-hover:bg-brand-gold/35 transition-colors duration-500" />
                      <div className="relative w-14 h-14 bg-brand-ivory border-2 border-brand-gold rounded-full flex items-center justify-center font-serif text-xl text-brand-gold shadow-md">
                        {step.num}
                      </div>
                    </motion.div>
                  </div>

                  {/* Right Content (Desktop) */}
                  <div className="hidden md:block w-1/2 pl-12 text-left">
                    {!isEven && (
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        className="backdrop-blur-md bg-white/40 border border-white/60 rounded-2xl p-6 shadow-lg shadow-brand-pink/10 hover:shadow-xl hover:shadow-brand-gold/15 transition-shadow duration-500"
                      >
                        <h3 className="text-2xl font-serif text-brand-charcoal mb-3">
                          {t(`process.${step.titleKey}`)}
                        </h3>
                        <p className="text-brand-grey leading-relaxed">
                          {t(`process.${step.descKey}`)}
                        </p>
                      </motion.div>
                    )}
                  </div>

                  {/* Mobile Content */}
                  <div className="w-full pl-20 md:hidden pt-2">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      className="backdrop-blur-md bg-white/40 border border-white/60 rounded-2xl p-5 shadow-lg shadow-brand-pink/10"
                    >
                      <h3 className="text-2xl font-serif text-brand-charcoal mb-3">
                        {t(`process.${step.titleKey}`)}
                      </h3>
                      <p className="text-brand-grey leading-relaxed">
                        {t(`process.${step.descKey}`)}
                      </p>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
