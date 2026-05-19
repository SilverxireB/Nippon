import React from 'react';
import { motion } from 'motion/react';
import { Plane, Calendar, Map } from 'lucide-react';

interface HeaderProps {
  currentCityId: string;
  onCityChange: (id: string) => void;
  cityNames: { id: string; name: string }[];
}

export const Header: React.FC<HeaderProps> = ({ currentCityId, onCityChange, cityNames }) => {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        <div 
          onClick={() => onCityChange('home')}
          className="flex items-center gap-2 cursor-pointer shrink-0"
        >
          <div className="w-9 h-9 bg-red-600 rounded-xl flex items-center justify-center shadow-lg shadow-red-100">
            <Plane className="w-5 h-5 text-white" />
          </div>
          <div className="hidden sm:block">
            <span className="font-black text-sm tracking-tight block">NİPPON TRIP</span>
            <span className="text-[8px] font-bold text-gray-400 uppercase tracking-widest">Gizem & Doğan</span>
          </div>
        </div>
        
        <nav className="flex items-center gap-1 overflow-x-auto no-scrollbar py-1">
          <button
            onClick={() => onCityChange('home')}
            className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all shrink-0 ${currentCityId === 'home' ? 'bg-black text-white' : 'text-gray-400 hover:text-black'}`}
          >
            Özet
          </button>
          <button
            onClick={() => onCityChange('budget')}
            className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all shrink-0 ${currentCityId === 'budget' ? 'bg-black text-white' : 'text-gray-400 hover:text-black'}`}
          >
            Bütçe
          </button>
          {cityNames.map((city) => (
            <button
              key={city.id}
              onClick={() => onCityChange(city.id)}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all shrink-0 ${currentCityId === city.id ? 'bg-black text-white' : 'text-gray-400 hover:text-black'}`}
            >
              {city.name}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
};
