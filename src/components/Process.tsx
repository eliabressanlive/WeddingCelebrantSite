import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const Process: React.FC = () => {
  const { t } = useTranslation();

  const steps = [
    { num: '01', titleKey: 'step1.title', descKey: 'step1.desc' },
    { num: '02', titleKey: 'step2.title', descKey: 'step2.desc' },
    { num: '03', titleKey: 'step3.title', descKey: 'step3.desc' },
    { num: '04', titleKey: 'step5.title', descKey: 'step5.desc' },
  ];

  return (
    <section id="process" className="py-24 bg-brand-ivory text-brand-charcoal overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[27px] md:left-1/2 top-0 bottom-0 w-px bg-brand-pink/50 md:-translate-x-1/2"></div>

          <div className="space-y-16">
            {steps.map((step, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6 }}
                  className="relative flex flex-col md:flex-row items-start md:items-center"
                >

                  {/* Left Content (Desktop) */}
                  <div className={`hidden md:block w-1/2 pr-12 text-right ${!isEven ? 'md:order-1 ml-auto text-left pl-12 pr-0' : ''}`}>
                    {isEven && (
                      <>
                        <h3 className="text-2xl font-serif text-brand-charcoal mb-3">{t(`process.${step.titleKey}`)}</h3>
                        <p className="text-brand-grey leading-relaxed">{t(`process.${step.descKey}`)}</p>
                      </>
                    )}
                    {!isEven && (
                      <>
                        <h3 className="text-2xl font-serif text-brand-charcoal mb-3">{t(`process.${step.titleKey}`)}</h3>
                        <p className="text-brand-grey leading-relaxed">{t(`process.${step.descKey}`)}</p>
                      </>
                    )}
                  </div>

                  {/* Center Circle */}
                  <div className={`absolute left-0 md:left-1/2 w-14 h-14 bg-brand-ivory border-2 border-brand-gold rounded-full flex items-center justify-center font-serif text-xl text-brand-gold md:-translate-x-1/2 z-10 shrink-0`}>
                    {step.num}
                  </div>

                  {/* Mobile Content & Right Content (Desktop) */}
                  <div className={`w-full pl-20 md:w-1/2 md:pl-12 ${!isEven ? 'md:hidden' : 'md:hidden'}`}>
                    <h3 className="text-2xl font-serif text-brand-charcoal mb-3 pt-2 md:pt-0">{t(`process.${step.titleKey}`)}</h3>
                    <p className="text-brand-grey leading-relaxed">{t(`process.${step.descKey}`)}</p>
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
