import React from 'react';
import { Plane, Utensils, Camera, MapPin, Hotel, ShoppingBag, Smile, ExternalLink, Clock } from 'lucide-react';
import { Activity } from '../types';
import { motion } from 'motion/react';

const categoryStyles = {
  travel: { icon: Plane, bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-100', accent: 'group-hover:border-blue-400' },
  food: { icon: Utensils, bg: 'bg-amber-50', text: 'text-amber-600', border: 'border-amber-100', accent: 'group-hover:border-amber-400' },
  sightseeing: { icon: Camera, bg: 'bg-rose-50', text: 'text-rose-600', border: 'border-rose-100', accent: 'group-hover:border-rose-400' },
  checkin: { icon: Hotel, bg: 'bg-slate-50', text: 'text-slate-600', border: 'border-slate-100', accent: 'group-hover:border-slate-400' },
  shopping: { icon: ShoppingBag, bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-100', accent: 'group-hover:border-emerald-400' },
  leisure: { icon: Smile, bg: 'bg-violet-50', text: 'text-violet-600', border: 'border-violet-100', accent: 'group-hover:border-violet-400' },
};

export const ActivityItem: React.FC<{ activity: Activity; index: number }> = ({ activity, index }) => {
  const style = activity.category ? categoryStyles[activity.category as keyof typeof categoryStyles] || categoryStyles.sightseeing : categoryStyles.sightseeing;
  const Icon = style.icon;
  
  const handleMapClick = () => {
    if (activity.mapQuery) {
      window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(activity.mapQuery)}`, '_blank');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className={`flex gap-4 group relative p-5 rounded-[28px] transition-all duration-300 border border-transparent ${style.accent} hover:bg-white hover:shadow-xl hover:shadow-gray-200/50`}
    >
      {/* Icon & Connector Line */}
      <div className="flex flex-col items-center">
        <div className={`w-12 h-12 rounded-2xl ${style.bg} ${style.text} ${style.border} border flex items-center justify-center z-10 transition-transform group-hover:scale-110 shrink-0 shadow-sm`}>
          <Icon className="w-6 h-6" />
        </div>
        <div className={`w-0.5 flex-1 ${style.bg} opacity-20 group-last:hidden mt-2 mb-[-20px]`}></div>
      </div>
      
      {/* Content */}
      <div className="flex-1">
        {/* Header: Category & Time */}
        <div className="flex flex-wrap items-center gap-2 mb-2.5">
           <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-lg ${style.bg} ${style.text} border ${style.border}`}>
             {activity.category}
           </span>
           <div className="flex items-center gap-1 text-[10px] font-black font-mono bg-gray-100 text-gray-500 px-2 py-0.5 rounded-lg">
             <Clock className="w-3 h-3" />
             {activity.time}
           </div>
        </div>

        <p className="text-gray-900 font-display font-black text-lg sm:text-xl leading-[1.2] tracking-tight mb-3">
          {activity.description}
        </p>

        {activity.mapQuery && (
          <button
            onClick={handleMapClick}
            className="inline-flex items-center gap-1.5 text-[9px] font-black text-blue-600 hover:text-blue-800 uppercase tracking-widest transition-colors bg-blue-50 px-3 py-1.5 rounded-xl border border-blue-100"
          >
            <MapPin className="w-3.5 h-3.5" />
            YOL TARİFİ
          </button>
        )}
      </div>
    </motion.div>
  );
};
