import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calculator, X, RefreshCw, Info, TrendingUp } from 'lucide-react';

export const CurrencyConverter: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [jpy, setJpy] = useState<string>('');
  const [rate, setRate] = useState<number>(0.29); 
  const [isLoading, setIsLoading] = useState(false);
  const [isTaxFree, setIsTaxFree] = useState(true);

  // Gerçek zamanlı kur çekme
  const fetchRate = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('https://open.er-api.com/v6/latest/JPY');
      const data = await response.json();
      if (data && data.rates && data.rates.TRY) {
        setRate(data.rates.TRY);
      }
    } catch (error) {
      console.error('Kur çekilemedi:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) fetchRate();
  }, [isOpen]);

  const tryValue = jpy ? (parseFloat(jpy) * rate).toFixed(2) : '0.00';
  const taxFreeValue = jpy ? (parseFloat(jpy) * 0.9 * rate).toFixed(2) : '0.00';
  const savings = jpy ? (parseFloat(tryValue) - parseFloat(taxFreeValue)).toFixed(2) : '0.00';

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-red-600 text-white rounded-full shadow-2xl flex items-center justify-center z-[60] hover:scale-110 active:scale-95 transition-all"
      >
        <Calculator className="w-6 h-6" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center p-0 sm:p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
              onClick={() => setIsOpen(false)}
            />
            
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="bg-white w-full max-w-md rounded-t-[32px] sm:rounded-[32px] p-6 sm:p-8 pb-10 sm:pb-8 shadow-2xl overflow-hidden relative max-h-[96vh] flex flex-col"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="font-display font-black text-gray-900 leading-tight italic">Kur Hesaplayıcı</h3>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Anlık Veri (API)</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:text-black transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <div className="relative group">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1.5 ml-1">Tutarı Gir</label>
                    <div className="relative">
                      <input 
                        type="number"
                        inputMode="decimal"
                        value={jpy}
                        onChange={(e) => setJpy(e.target.value)}
                        placeholder="0"
                        className="w-full bg-gray-50 border-2 border-transparent group-hover:bg-white group-hover:border-red-100 rounded-2xl py-4 px-5 text-2xl font-display font-black text-gray-900 transition-all outline-none focus:bg-white focus:border-red-500 shadow-sm"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 font-black text-gray-300">¥</span>
                    </div>
                  </div>

                  <div className="relative overflow-hidden group">
                    <motion.div 
                      layout
                      className="bg-gray-900 rounded-[20px] p-4 text-white h-full flex flex-col justify-center border border-white/5"
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-[8px] font-bold text-white/40 uppercase tracking-widest">Net (₺)</span>
                        <div className="flex items-center gap-1 bg-white/10 px-1 py-0.5 rounded-full">
                          <span className="text-[7px] font-bold">1¥≈{rate.toFixed(3)}₺</span>
                        </div>
                      </div>
                      
                      <div className="flex items-baseline gap-0.5">
                        <span className="text-2xl font-black tracking-tight">
                          {isTaxFree ? taxFreeValue : tryValue}
                        </span>
                        <span className="text-sm font-bold text-white/60">₺</span>
                      </div>
                    </motion.div>
                  </div>
                </div>

                {isTaxFree && parseFloat(savings) > 0 && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-3 text-[10px] font-bold text-amber-600 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-3 h-3" />
                      <span>TAX-FREE KAZANCIN:</span>
                    </div>
                    <span className="font-black">₺{savings}</span>
                  </motion.div>
                )}

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
                  <div className="flex items-center gap-2">
                    <Info className="w-4 h-4 text-amber-600" />
                    <div>
                      <span className="text-xs font-bold text-gray-700 block leading-none mb-0.5">Tax-Free</span>
                      <span className="text-[9px] text-gray-400 font-medium uppercase tracking-tighter">%10 İndirim Uygula</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => setIsTaxFree(!isTaxFree)}
                    className={`w-12 h-6 rounded-full transition-colors relative ${isTaxFree ? 'bg-amber-500' : 'bg-gray-200'}`}
                  >
                    <motion.div 
                      animate={{ x: isTaxFree ? 26 : 2 }}
                      className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm"
                    />
                  </button>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-50 flex items-center justify-center gap-2 text-[10px] font-bold text-gray-300 uppercase tracking-widest">
                <RefreshCw className="w-3 h-3" />
                Her açılışta güncellenir
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
