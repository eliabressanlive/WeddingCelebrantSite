import React from 'react';
import { motion } from 'framer-motion';

const ProseccoImages: React.FC = () => {
  return (
    <section className="py-8 bg-brand-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="overflow-hidden rounded-2xl shadow-xl aspect-video"
          >
            <img 
              src={`${import.meta.env.BASE_URL}images/prosecco_1.png`}  
              alt="Valdobbiadene Prosecco Hills 1" 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="overflow-hidden rounded-2xl shadow-xl aspect-video"
          >
            <img 
              src={`${import.meta.env.BASE_URL}images/prosecco_2.png`}  
              alt="Valdobbiadene Prosecco Hills 2" 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProseccoImages;
