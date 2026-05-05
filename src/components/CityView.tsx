import React from 'react';
import { City } from '../types';
import { DayCard } from './DayCard';
import { motion } from 'motion/react';
import { MapPin, Hotel, Clock } from 'lucide-react';
import { LiveWeatherCard } from './LiveWeatherCard';

interface CityViewProps {
  city: City;
}

export const CityView: React.FC<CityViewProps> = ({ city }) => {
  return (
    <div className="bg-[#F8F9FA] min-h-screen">
      <section className="relative h-[50vh] min-h-[400px] flex items-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={city.imageUrl} 
            alt={city.name}
            className="w-full h-full object-cover grayscale-[20%] contrast-[1.1]"
            referrerPolicy="no-referrer"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1600';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#F8F9FA] via-black/20 to-transparent"></div>
        </div>
        
        <div className="relative z-10 max-w-5xl mx-auto px-4 w-full pb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-2"
          >
            <div className="flex items-center gap-2 text-white/80">
              <MapPin className="w-4 h-4" />
              <span className="text-sm font-bold tracking-widest uppercase">{city.dates}</span>
            </div>
            <h1 className="text-7xl sm:text-9xl font-black text-white tracking-tighter mb-4 filter drop-shadow-2xl">
              {city.name}
            </h1>
            <div className="flex items-center gap-3 bg-black/40 backdrop-blur-xl w-fit px-4 py-2 rounded-2xl border border-white/10 shadow-2xl">
              <Hotel className="w-4 h-4 text-red-500" />
              <span className="text-white text-xs font-black uppercase tracking-widest whitespace-nowrap">Otel: {city.hotel}</span>
            </div>
          </motion.div>
        </div>
      </section>

      <main className="max-w-4xl mx-auto px-4 -mt-10 relative z-20 pb-20">
        <div className="grid grid-cols-2 gap-3 mb-10">
          <LiveWeatherCard cityName={city.name} />
          <JapanClockCard />
        </div>

        <div className="max-w-3xl mx-auto">
          {city.days.map((day, index) => (
            <DayCard key={day.date} day={day} index={index} />
          ))}
        </div>
      </main>
    </div>
  );
};

const JapanClockCard: React.FC = () => {
  const [time, setTime] = React.useState(new Date());

  React.useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const japanTime = new Date(time.toLocaleString('en-US', { timeZone: 'Asia/Tokyo' }));
  
  return (
    <div className="bg-white p-3 sm:p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between h-full relative overflow-hidden group transition-all hover:shadow-md">
      <div>
        <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-2 sm:mb-4">JAPONYA YEREL SAAT</p>
        
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 group-hover:text-red-600 transition-colors shadow-inner flex-shrink-0">
            <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-xl sm:text-3xl font-black text-gray-900 leading-none">
              {japanTime.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}
            </span>
            <span className="text-xs sm:text-lg font-black text-red-500/30 leading-none tabular-nums">
              {japanTime.toLocaleTimeString('tr-TR', { second: '2-digit' })}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-2 pt-2 border-t border-gray-50 flex items-center justify-between">
        <span className="text-[7px] font-black text-gray-500 uppercase tracking-widest">
          {japanTime.toLocaleDateString('tr-TR', { weekday: 'long' })}
        </span>
        <span className="text-[7px] font-black text-gray-400 uppercase tracking-widest">
          {japanTime.toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' })}
        </span>
      </div>
    </div>
  );
};
