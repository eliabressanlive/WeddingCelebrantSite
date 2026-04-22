import React, { useMemo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// Import Swiper styles
// @ts-ignore
import 'swiper/css';
// @ts-ignore
import 'swiper/css/navigation';
// @ts-ignore
import 'swiper/css/pagination';

const imageFiles = [
  '14 Damiano 85mm -16 settembre 2023.jpg',
  '290 Damiano 28 75mm-16 settembre 2023.jpg',
  '76 Damiano 85mm -16 settembre 2023.jpg',
  'IMG-20250202-WA0025.jpg',
  'IMG-20250202-WA0028.jpg',
  'WhatsApp Image 2026-03-09 at 20.00.10 (1).jpeg',
  'WhatsApp Image 2026-03-09 at 20.00.10 (4).jpeg',
  'WhatsApp Image 2026-03-09 at 20.00.10.jpeg',
];

const Slideshow: React.FC = () => {
  const randomizedImages = useMemo(() => {
    return [...imageFiles].sort(() => Math.random() - 0.5);
  }, []);

  return (
    <section className="py-12 bg-emerald-50/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Swiper
          style={{
            '--swiper-theme-color': '#059669',
            '--swiper-navigation-color': '#059669',
            '--swiper-pagination-color': '#059669',
          } as React.CSSProperties}
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="w-full h-[400px] md:h-[500px]"
        >
          {randomizedImages.map((filename, idx) => (
            <SwiperSlide key={idx} className="flex justify-center items-center overflow-hidden rounded-2xl shadow-lg border-2 border-emerald-200/60">
              <img 
                src={`${import.meta.env.BASE_URL}images/${filename}`} 
                alt={`Photo ${idx}`} 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" 
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Slideshow;
