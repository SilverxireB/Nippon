import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calculator, X, ArrowRightLeft, RefreshCw, Check, Percent } from 'lucide-react';

export const CurrencyConverter: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [amount, setAmount] = useState<string>('');
  const [rate, setRate] = useState<number>(3.49); // Default based on user feedback
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isTaxFree, setIsTaxFree] = useState(false);

  const fetchRate = async () => {
    setIsRefreshing(true);
    try {
      const response = await fetch('https://open.er-api.com/v6/latest/TRY');
      const data = await response.json();
      if (data.rates && data.rates.JPY) {
        setRate(data.rates.JPY);
      }
    } catch (error) {
      console.error('Exchange rate fetch failed:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchRate();
  }, []);

  // Standard Calculation (JPY to TRY only)
  const getCalculation = () => {
    const val = parseFloat(amount) || 0;
    if (val === 0) return 0;

    let processedAmount = val;
    
    // Tax Free logic: If you enter 1100 JPY (Tax included), Tax-free is 1000 JPY.
    if (isTaxFree) {
      processedAmount = val / 1.10;
    }

    return processedAmount / rate;
  };

  const result = getCalculation();

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-red-600 text-white rounded-full shadow-2xl flex items-center justify-center z-40 border-4 border-white"
      >
        <Calculator className="w-6 h-6" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 sm:p-6">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="w-full max-w-md bg-white rounded-[40px] shadow-2xl relative flex flex-col max-h-[95vh]"
            >
              <div className="p-8 sm:p-10 overflow-y-auto">
                <button 
                  onClick={() => setIsOpen(false)}
                  className="absolute right-6 top-6 p-2 text-gray-300 hover:text-black transition-colors"
                >
                  <X className="w-8 h-8" />
                </button>

                <div className="flex items-center gap-4 mb-10">
                  <div className="bg-red-600 p-4 rounded-3xl shadow-lg shadow-red-200 text-white">
                    <ArrowRightLeft className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black tracking-tighter uppercase leading-none">KUR HESAPLA</h2>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] tabular-nums">
                        1 TRY = {rate.toFixed(2)} JPY
                      </span>
                      <button 
                        onClick={fetchRate}
                        className={`text-red-500 hover:rotate-180 transition-all duration-500 ${isRefreshing ? 'animate-spin' : ''}`}
                      >
                        <RefreshCw className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Grid Layout for Input and Result */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                    {/* Input Field */}
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">
                        JAPON YENİ (¥)
                      </label>
                      <div className="relative">
                        <input 
                          type="number"
                          inputMode="decimal"
                          autoFocus
                          value={amount}
                          onChange={e => setAmount(e.target.value)}
                          placeholder="0"
                          className="w-full bg-gray-50 border-none rounded-[24px] px-6 py-6 text-2xl font-black focus:ring-4 focus:ring-red-100 outline-none transition-all placeholder:text-gray-200 tabular-nums"
                        />
                        <div className="absolute right-6 top-1/2 -translate-y-1/2 font-black text-gray-300 text-xl">
                          ¥
                        </div>
                      </div>
                    </div>

                    {/* Result Card */}
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">
                        KARŞILIĞI (₺)
                      </label>
                      <AnimatePresence mode="wait">
                        {amount ? (
                          <motion.div 
                            key={`result-${isTaxFree}`}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-black text-white p-6 rounded-[24px] text-center shadow-xl shadow-black/10 flex flex-col justify-center min-h-[84px]"
                          >
                            <div className="text-[8px] font-black text-gray-500 uppercase tracking-[0.2em] mb-1 leading-none">
                              {isTaxFree ? 'VERGİ İADESİ DAHİL' : 'TAHMİNİ'}
                            </div>
                            <div className="text-3xl font-black tracking-tighter tabular-nums overflow-hidden text-ellipsis">
                              {result.toLocaleString('tr-TR', { maximumFractionDigits: 1 })}
                              <span className="text-sm ml-1.5 text-gray-500 font-bold uppercase">₺</span>
                            </div>
                          </motion.div>
                        ) : (
                          <div className="bg-gray-50 p-6 rounded-[24px] border-2 border-dashed border-gray-100 text-center flex items-center justify-center min-h-[84px]">
                            <p className="text-[10px] font-black text-gray-200 uppercase tracking-[0.2em]">Sonuç</p>
                          </div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Tax Free Toggle */}
                  <button 
                    onClick={() => setIsTaxFree(!isTaxFree)}
                    className={`w-full flex items-center justify-between p-4 rounded-[24px] border-2 transition-all ${isTaxFree ? 'bg-red-50 border-red-200' : 'bg-white border-gray-100 hover:border-red-100'}`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-2xl ${isTaxFree ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-400'}`}>
                        <Percent className="w-5 h-5" />
                      </div>
                      <div className="text-left">
                        <span className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.1em] leading-none mb-1.5">Tax Included Fiyattan</span>
                        <span className="block font-black text-sm uppercase tracking-tight">TAX FREE (%10 DÜŞ)</span>
                      </div>
                    </div>
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center border-2 transition-all ${isTaxFree ? 'bg-red-600 border-red-600' : 'border-gray-200'}`}>
                      {isTaxFree && <Check className="w-4 h-4 text-white stroke-[4]" />}
                    </div>
                  </button>

                  <p className="text-[9px] font-bold text-center text-gray-300 uppercase tracking-widest pt-4">
                    Kur Verisi: Market Ortalaması (Real-time)
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
