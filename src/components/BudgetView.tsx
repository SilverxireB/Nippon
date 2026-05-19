import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Trash2, TrendingDown, Wallet, CreditCard, Sparkles, Loader2, TurkishLira } from 'lucide-react';
import { budgetData as initialBudgetData } from '../data';
import { BudgetItem } from '../types';

export const BudgetView: React.FC = () => {
  const [items, setItems] = useState<BudgetItem[]>(initialBudgetData.items);
  const [aiInput, setAiInput] = useState('');
  const [isParsing, setIsParsing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const stats = useMemo(() => {
    const totalSpent = items.reduce((acc, item) => acc + item.amount, 0);
    const remaining = initialBudgetData.targetBudget - totalSpent;
    const remainingJpy = remaining * initialBudgetData.exchangeRate;
    
    return {
      totalSpent,
      remaining,
      remainingJpy,
      percentage: (totalSpent / initialBudgetData.targetBudget) * 100
    };
  }, [items]);

  const groupedItems: Record<string, BudgetItem[]> = useMemo(() => {
    const groups: Record<string, BudgetItem[]> = {};
    const sorted = [...items].sort((a, b) => {
      const dateA = a.date || '';
      const dateB = b.date || '';
      return dateB.localeCompare(dateA);
    });
    
    sorted.forEach(item => {
      const dateKey = item.date ? new Date(item.date).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' }) : 'Genel';
      if (!groups[dateKey]) groups[dateKey] = [];
      groups[dateKey].push(item);
    });
    return groups;
  }, [items]);

  const handleAiAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiInput.trim() || isParsing) return;

    setIsParsing(true);
    setError(null);

    try {
      const response = await fetch('/api/budget/parse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: aiInput }),
      });

      if (!response.ok) throw new Error('API hatası');
      
      const parsed = await response.json();
      
      // Convert JPY to TL if necessary
      let finalAmount = parsed.amount;
      if (parsed.currency === 'JPY') {
        finalAmount = parsed.amount / initialBudgetData.exchangeRate;
      }

      const newItem: BudgetItem = {
        id: Math.random().toString(36).substr(2, 9),
        description: parsed.description,
        amount: finalAmount,
        category: parsed.category,
        isSpent: true,
        date: parsed.date || new Date().toISOString(),
        amountJpy: parsed.currency === 'JPY' ? parsed.amount : undefined
      };

      setItems(prev => [newItem, ...prev]);
      setAiInput('');
    } catch (err) {
      console.error(err);
      setError('AI harcamayı anlayamadı. Lütfen tekrar deneyin.');
    } finally {
      setIsParsing(false);
    }
  };

  const removeItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const categories = {
    fixed: { label: 'Sabit Giderler', color: 'bg-blue-500', icon: Wallet },
    activity: { label: 'Aktivite & Ulaşım', color: 'bg-orange-500', icon: CreditCard },
    spending: { label: 'Yeme-İçme & Harçlık', color: 'bg-emerald-500', icon: TrendingDown },
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="mb-12">
        <h1 className="text-4xl font-black tracking-tighter text-gray-900 mb-2 uppercase">BÜTÇE VE MASTER PLAN</h1>
        <p className="text-gray-500 font-medium tracking-tight">Tüm harcamalarını takip et ve bütçeni kontrol altında tut.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 sm:p-8 rounded-[32px] border border-gray-100 shadow-sm"
        >
          <div className="text-[10px] uppercase tracking-widest font-black text-gray-400 mb-3">HEDEF BÜTÇE</div>
          <div className="text-2xl sm:text-3xl font-black text-gray-900 tabular-nums">
            {initialBudgetData.targetBudget.toLocaleString('tr-TR')} ₺
          </div>
          <div className="mt-4 w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
            <div 
              className="bg-black h-full transition-all duration-1000" 
              style={{ width: `${Math.min(stats.percentage, 100)}%` }}
            />
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-6 sm:p-8 rounded-[32px] border border-gray-100 shadow-sm"
        >
          <div className="text-[10px] uppercase tracking-widest font-black text-red-600 mb-3">HARCANAN</div>
          <div className="text-2xl sm:text-3xl font-black text-gray-900 tabular-nums">
            {stats.totalSpent.toLocaleString('tr-TR', { maximumFractionDigits: 0 })} ₺
          </div>
          <div className="text-[10px] font-bold text-gray-400 mt-1 uppercase tracking-tighter">HARCANAN TOPLAM</div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-black p-6 sm:p-8 rounded-[32px] shadow-xl shadow-gray-200 sm:col-span-2 lg:col-span-1"
        >
          <div className="text-[10px] uppercase tracking-widest font-black text-gray-400 mb-3 text-white/40">KALAN LİMİT</div>
          <div className="text-2xl sm:text-3xl font-black text-white tabular-nums">
            {stats.remaining.toLocaleString('tr-TR', { maximumFractionDigits: 0 })} ₺
          </div>
          <div className="text-base sm:text-lg font-bold text-white/50 tabular-nums mt-1">
            ~ {stats.remainingJpy.toLocaleString('tr-TR', { maximumFractionDigits: 0 })} JPY
          </div>
        </motion.div>
      </div>

      {/* AI Add Section */}
      <div className="mb-10">
        <form onSubmit={handleAiAdd} className="relative z-10 shadow-2xl shadow-black/5 rounded-[32px]">
          <input 
            type="text"
            value={aiInput}
            onChange={(e) => setAiInput(e.target.value)}
            placeholder="Neye ne harcadın?"
            className="w-full bg-white border-2 border-gray-50/50 rounded-[32px] px-6 py-5 sm:px-8 sm:py-6 text-base sm:text-lg font-medium focus:border-black focus:outline-none transition-all pr-24 sm:pr-32"
          />
          <button 
            type="submit"
            disabled={!aiInput.trim() || isParsing}
            className="absolute right-2 top-2 bottom-2 px-4 sm:px-6 bg-black text-white rounded-[24px] font-black text-[10px] uppercase tracking-widest hover:bg-gray-800 disabled:bg-gray-200 disabled:cursor-not-allowed transition-all flex items-center gap-2"
          >
            {isParsing ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span className="hidden sm:inline">EKLE</span>
              </>
            )}
          </button>
        </form>
        <AnimatePresence>
          {isParsing && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-4 flex items-center justify-center gap-3 text-gray-400 font-bold text-[9px] tracking-widest uppercase"
            >
              <div className="flex gap-1">
                <span className="w-1 h-1 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                <span className="w-1 h-1 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                <span className="w-1 h-1 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
              </div>
              HARCAMA AYRIŞTIRILIYOR...
            </motion.div>
          )}
        </AnimatePresence>
        {error && (
          <p className="text-red-600 text-[10px] font-bold mt-3 ml-4 uppercase tracking-wider">{error}</p>
        )}
      </div>

      {/* List Section */}
      <div className="space-y-10">
        {Object.entries(groupedItems).map(([date, groupItems], groupIdx) => (
          <div key={date} className="space-y-3">
            <div className="flex items-center justify-between px-2">
              <h2 className="font-black text-[10px] tracking-[0.2em] text-gray-300 uppercase">{date}</h2>
            </div>

            <div className="grid gap-2">
              {groupItems.map((item, idx) => {
                const CategoryIcon = categories[item.category].icon;
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="group bg-white p-4 sm:p-6 rounded-[28px] border border-gray-50 flex items-center gap-3 sm:gap-5 hover:border-black/5 transition-all shadow-sm hover:shadow-lg hover:shadow-black/5"
                  >
                    <div className={`p-3 sm:p-4 rounded-2xl ${categories[item.category].color} text-white shadow-md shadow-black/5 shrink-0`}>
                      <CategoryIcon className="w-5 h-5 sm:w-6 h-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-sm sm:text-lg text-gray-900 truncate uppercase tracking-tight leading-tight">{item.description}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[9px] font-black text-gray-300 uppercase tracking-widest">{categories[item.category].label}</span>
                        {!item.isSpent && (
                          <span className="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full bg-orange-100 text-orange-600">
                            TAHMİNİ
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="font-black text-base sm:text-xl text-gray-900 tabular-nums">
                        {item.amount.toLocaleString('tr-TR', { maximumFractionDigits: 0 })} ₺
                      </p>
                      {item.amountJpy && (
                        <p className="text-[10px] font-bold text-gray-400 tabular-nums uppercase">
                          {item.amountJpy.toLocaleString('tr-TR')} JPY
                        </p>
                      )}
                    </div>
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="p-2 text-gray-200 hover:text-red-500 transition-all"
                      title="Sil"
                    >
                      <Trash2 className="w-4 h-4 sm:w-5 h-5" />
                    </button>
                  </motion.div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
