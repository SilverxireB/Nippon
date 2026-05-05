import React from 'react';
import { Itinerary } from '../types';
import { motion } from 'motion/react';
import { Map, ArrowRight, PlaneLanding, PlaneTakeoff } from 'lucide-react';

interface HomeViewProps {
  itinerary: Itinerary;
  onCityChange: (id: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ itinerary, onCityChange }) => {
  const [timeLeft, setTimeLeft] = React.useState({ days: 0, hours: 0 });

  React.useEffect(() => {
    const target = new Date('2026-05-20T00:00:00').getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const diff = target - now;
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2000"
            className="w-full h-full object-cover grayscale opacity-30 scale-110"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-white/80 to-[#F8F9FA]"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-4 mb-12"
          >
            <div className="flex flex-col items-center">
              <span className="text-4xl sm:text-6xl font-black text-red-600">{timeLeft.days}</span>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Gün</span>
            </div>
            <div className="h-10 w-px bg-gray-200"></div>
            <div className="flex flex-col items-center">
              <span className="text-4xl sm:text-6xl font-black text-gray-900">{timeLeft.hours}</span>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Saat</span>
            </div>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-7xl sm:text-[11rem] font-display font-black text-gray-900 tracking-tighter leading-[0.8] mb-12"
          >
            NİPPON <br/> <span className="text-red-600 italic">2026</span>
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex items-center justify-center gap-6"
          >
            <div className="flex flex-col items-center gap-1">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Başlangıç</span>
              <span className="font-bold text-gray-900">20 MAYIS</span>
            </div>
            <div className="w-12 h-px bg-gray-200"></div>
            <div className="flex flex-col items-center gap-1">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Bitiş</span>
              <span className="font-bold text-gray-900">1 HAZİRAN</span>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 -mt-24 pb-20 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {itinerary.cities.map((city, idx) => (
            <motion.div
              key={city.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + idx * 0.1 }}
              whileHover={{ y: -5 }}
              onClick={() => onCityChange(city.id)}
              className="cursor-pointer group relative h-96 rounded-3xl overflow-hidden shadow-xl"
            >
              <img 
                src={city.imageUrl} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8 w-full">
                <span className="text-white/60 text-[10px] font-black tracking-[0.2em] uppercase mb-2 block">{city.dates}</span>
                <h2 className="text-5xl font-display font-black text-white leading-none tracking-tight mb-3">{city.name}</h2>
                <div className="flex items-center gap-2 text-white/80 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-sm font-medium">Planı Gör</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 flex flex-col items-center text-center max-w-2xl mx-auto">
          <div className="w-16 h-1 bg-red-600 mb-10"></div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Unutulmaz Bir Macera Başlıyor</h3>
          <p className="text-gray-500 leading-relaxed mb-12">
            Osaka'nın bitmek bilmeyen enerjisinden Kyoto'nun huzurlu tapınaklarına ve Tokyo'nun büyüleyici kentsel geleceğine uzanan 13 günlük destansı bir yolculuk.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full">
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm text-left">
              <PlaneLanding className="w-8 h-8 text-red-600 mb-4" />
              <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Gidiş</div>
              <div className="text-lg font-bold text-gray-900 leading-tight">20 Mayıs, 12:40<br/>KIX Havalimanı</div>
            </div>
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm text-left">
              <PlaneTakeoff className="w-8 h-8 text-blue-600 mb-4" />
              <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Dönüş</div>
              <div className="text-lg font-bold text-gray-900 leading-tight">01 Haziran, 19:20<br/>HND Havalimanı</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
