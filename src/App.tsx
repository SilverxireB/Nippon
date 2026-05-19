import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { itineraryData } from './data';
import { Header } from './components/Header';
import { HomeView } from './components/HomeView';
import { CityView } from './components/CityView';
import { BudgetView } from './components/BudgetView';
import { CurrencyConverter } from './components/CurrencyConverter';

export default function App() {
  const [currentCityId, setCurrentCityId] = useState<'home' | 'budget' | string>('home');

  const activeCity = itineraryData.cities.find(c => c.id === currentCityId);
  const cityNames = itineraryData.cities.map(c => ({ id: c.id, name: c.name }));

  // Scroll to top on navigation
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentCityId]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans selection:bg-red-100 selection:text-red-900">
      <Header 
        currentCityId={currentCityId} 
        onCityChange={setCurrentCityId} 
        cityNames={cityNames} 
      />
      
      <div className="flex-1">
        <AnimatePresence mode="wait">
          {currentCityId === 'home' ? (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <HomeView itinerary={itineraryData} onCityChange={setCurrentCityId} />
            </motion.div>
          ) : currentCityId === 'budget' ? (
            <motion.div
              key="budget"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <BudgetView />
            </motion.div>
          ) : activeCity ? (
            <motion.div
              key={activeCity.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <CityView city={activeCity} />
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>

      <CurrencyConverter />

      <footer className="bg-white border-t border-gray-100 py-12 px-4">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start">
            <span className="font-black text-2xl tracking-tighter text-gray-900 mb-2">JAPONYA 2026</span>
            <p className="text-gray-400 text-sm">Hayat boyu sürecek maceralar için tasarlandı.</p>
          </div>
          <div className="flex gap-8">
            <div className="text-center md:text-right">
              <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-1">Hazırlayan</p>
              <p className="font-bold text-gray-900">AI Studio Build</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
