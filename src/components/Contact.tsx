import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { MapContainer, TileLayer, CircleMarker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
// removed unused lucide-react icons

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const FacebookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

const Contact: React.FC = () => {
  const { t } = useTranslation();
  const formRef = useRef<HTMLFormElement>(null);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const [num1, setNum1] = useState(Math.floor(Math.random() * 10) + 1);
  const [num2, setNum2] = useState(Math.floor(Math.random() * 10) + 1);
  const [captchaAnswer, setCaptchaAnswer] = useState('');

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    if (parseInt(captchaAnswer) !== num1 + num2) {
      alert("Captcha incorretto / Captcha incorrect");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    // NOTE: User must replace these placeholders with their actual EmailJS IDs
    emailjs.sendForm(
      'YOUR_SERVICE_ID', 
      'YOUR_TEMPLATE_ID', 
      formRef.current, 
      'YOUR_PUBLIC_KEY'
    )
    .then(() => {
        setSubmitStatus('success');
        formRef.current?.reset();
        setCaptchaAnswer('');
        setNum1(Math.floor(Math.random() * 10) + 1);
        setNum2(Math.floor(Math.random() * 10) + 1);
    })
    .catch((error) => {
        console.error('FAILED...', error.text);
        setSubmitStatus('error');
    })
    .finally(() => {
        setIsSubmitting(false);
    });
  };

  const valdobbiadeneCoords: [number, number] = [45.9000, 11.9961];

  return (
    <section id="contact" className="py-24 bg-brand-ivory relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl mb-6 text-brand-charcoal"
          >
            {t('contact.title')}
          </motion.h2>
          <div className="w-24 h-1 bg-brand-gold mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white rounded-3xl shadow-xl overflow-hidden border border-brand-pink/30">
          
          {/* Form Side */}
          <div className="p-10 md:p-14">
            <form ref={formRef} onSubmit={sendEmail} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-brand-grey mb-2">{t('contact.name')}</label>
                <input 
                  type="text" 
                  name="user_name" 
                  required 
                  className="w-full px-4 py-3 border border-brand-border rounded-lg focus:ring-2 focus:ring-brand-gold focus:border-transparent outline-none transition-all bg-brand-ivory/50"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-brand-grey mb-2">{t('contact.email')}</label>
                <input 
                  type="email" 
                  name="user_email" 
                  required 
                  className="w-full px-4 py-3 border border-brand-border rounded-lg focus:ring-2 focus:ring-brand-gold focus:border-transparent outline-none transition-all bg-brand-ivory/50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-brand-grey mb-2">{t('contact.phone')}</label>
                <input 
                  type="tel" 
                  name="user_phone" 
                  className="w-full px-4 py-3 border border-brand-border rounded-lg focus:ring-2 focus:ring-brand-gold focus:border-transparent outline-none transition-all bg-brand-ivory/50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-brand-grey mb-2">{t('contact.message')}</label>
                <textarea 
                  name="message" 
                  rows={4} 
                  required 
                  className="w-full px-4 py-3 border border-brand-border rounded-lg focus:ring-2 focus:ring-brand-gold focus:border-transparent outline-none transition-all bg-brand-ivory/50 resize-none"
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-brand-grey mb-2">
                  Verifica / Verification: {num1} + {num2} = ?
                </label>
                <input 
                  type="number" 
                  required 
                  value={captchaAnswer}
                  onChange={(e) => setCaptchaAnswer(e.target.value)}
                  className="w-full px-4 py-3 border border-brand-border rounded-lg focus:ring-2 focus:ring-brand-gold focus:border-transparent outline-none transition-all bg-brand-ivory/50"
                  placeholder="Insert sum..."
                />
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-brand-charcoal text-white py-4 rounded-lg font-semibold hover:bg-brand-charcoal/90 transition-colors disabled:opacity-70"
              >
                {isSubmitting ? t('contact.sending') : t('contact.submit')}
              </button>

              {submitStatus === 'success' && (
                <div className="p-4 bg-green-50 text-green-700 rounded-lg text-sm text-center">
                  {t('contact.success')}
                </div>
              )}
              {submitStatus === 'error' && (
                <div className="p-4 bg-red-50 text-red-700 rounded-lg text-sm text-center">
                  {t('contact.error')}
                </div>
              )}
            </form>
          </div>

          {/* Info & Map Side */}
          <div className="bg-brand-charcoal text-white flex flex-col">
            <div className="p-10 md:p-14 flex-grow">
              <h3 className="text-2xl font-serif mb-8 text-brand-gold">Noemi Bressan</h3>
              
              <div className="space-y-6">
                <div className="pt-8">
                  <p className="text-sm text-white/50 mb-4 uppercase tracking-wider">Social</p>
                  <div className="flex space-x-4">
                    <a href="https://instagram.com/noemi_bres" target="_blank" rel="noreferrer" className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-brand-gold transition-colors">
                      <InstagramIcon />
                    </a>
                    <a href="https://facebook.com/NoemiBressan" target="_blank" rel="noreferrer" className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-brand-gold transition-colors">
                      <FacebookIcon />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="h-64 w-full relative z-0">
              <MapContainer 
                center={valdobbiadeneCoords} 
                zoom={10} 
                scrollWheelZoom={false} 
                zoomControl={false}
                dragging={false}
                className="h-full w-full opacity-80 mix-blend-luminosity"
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <CircleMarker 
                  center={valdobbiadeneCoords} 
                  radius={12} 
                  color="var(--color-brand-gold)" 
                  fillColor="var(--color-brand-gold)" 
                  fillOpacity={0.6} 
                />
              </MapContainer>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Contact;
