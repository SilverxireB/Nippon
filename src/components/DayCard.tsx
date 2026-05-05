import React from 'react';
import { motion } from 'motion/react';
import { Day } from '../types';
import { ActivityItem } from './ActivityItem';
import { Calendar } from 'lucide-react';
import { DayMap } from './DayMap';

interface DayCardProps {
  day: Day;
  index: number;
}

export const DayCard: React.FC<DayCardProps> = ({ day, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white rounded-[40px] p-6 sm:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-50 mb-12 overflow-hidden hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-all duration-500"
    >
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 rounded-[24px] bg-red-600 flex items-center justify-center text-white font-display font-black text-3xl shadow-xl shadow-red-200">
            {index + 1}
          </div>
          <div>
            <div className="flex items-center gap-2 text-red-600 mb-1">
              <Calendar className="w-4 h-4" />
              <span className="text-[11px] font-black uppercase tracking-[0.3em]">{day.date} • {day.dayName}</span>
            </div>
            <h3 className="text-3xl sm:text-4xl font-display font-black text-gray-900 tracking-tight">{day.title}</h3>
          </div>
        </div>
      </div>

      <DayMap activities={day.activities} />

      <div className="relative">
        {day.activities.map((activity, idx) => (
          <ActivityItem key={idx} activity={activity} index={idx} />
        ))}
      </div>
    </motion.div>
  );
};
