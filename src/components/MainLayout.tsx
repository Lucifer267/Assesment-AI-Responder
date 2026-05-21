import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ShoppingBag } from 'lucide-react';
import { SearchBar } from './SearchBar';
import { RecommendationCard } from './RecommendationCard';
import { useRecommendations } from '../hooks/useRecommendations';

export function MainLayout() {
  const [query, setQuery] = useState('');
  const { data, isLoading, isError, error, mutate } = useRecommendations();

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    mutate(searchQuery);
  };

  return (
    <div className="min-h-screen bg-[#fdfdfd] text-[#1a1a1a] font-sans selection:bg-indigo-500 selection:text-white flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-10 w-full h-16 px-8 flex items-center justify-between border-b border-slate-100 bg-white shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white font-bold">
            P
          </div>
          <div>
            <h1 className="text-lg font-semibold tracking-tight leading-none mb-0.5">PROMPT.AI</h1>
            <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">Curation Engine</p>
          </div>
        </div>
        <div className="flex gap-8 text-sm font-medium text-slate-500 hidden sm:flex">
          <span className="hover:text-indigo-600 cursor-pointer">Dashboard</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 rounded-full bg-slate-200 border border-slate-300"></div>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center px-6 py-12 pb-24">
        <div className="w-full max-w-3xl mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <h2 className="text-4xl font-bold tracking-tight mb-3">
              What are you looking for today?
            </h2>
            <p className="text-slate-500 text-lg">
              Enter your preferences and our AI will search the official catalog.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="w-full"
          >
            <SearchBar onSearch={handleSearch} isLoading={isLoading} />
            <div className="mt-4 flex gap-2 justify-center flex-wrap">
              <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold px-2 py-1 mt-0.5">Trending Searches:</span>
              <span className="text-[10px] text-indigo-600 font-semibold px-2 py-1 bg-indigo-50 rounded cursor-pointer hover:bg-indigo-100 transition-colors border border-indigo-100" onClick={() => handleSearch("iPhone under $500")}>iPhone under $500</span>
              <span className="text-[10px] text-indigo-600 font-semibold px-2 py-1 bg-indigo-50 rounded cursor-pointer hover:bg-indigo-100 transition-colors border border-indigo-100" onClick={() => handleSearch("Noise cancelling buds")}>Noise cancelling buds</span>
              <span className="text-[10px] text-indigo-600 font-semibold px-2 py-1 bg-indigo-50 rounded cursor-pointer hover:bg-indigo-100 transition-colors border border-indigo-100" onClick={() => handleSearch("Tablets for design")}>Tablets for design</span>
            </div>
          </motion.div>
        </div>

        {/* Results Section */}
        <div className="w-full max-w-3xl min-h-[400px]">
          <AnimatePresence mode="wait">
            {isLoading && (
              <motion.div
                key="loading"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex flex-col items-center justify-center py-20 text-indigo-600"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="h-8 w-8 mb-4 opacity-75" />
                </motion.div>
                <p className="text-sm font-bold tracking-widest uppercase text-slate-500 animate-pulse">Running AI Semantic Search...</p>
              </motion.div>
            )}

            {isError && (
              <motion.div
                key="error"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center text-red-600 shadow-sm"
              >
                <p className="font-semibold mb-1">Catalog index failed.</p>
                <p className="text-sm text-red-500">{error.message}</p>
              </motion.div>
            )}

            {!isLoading && !isError && data && data.length > 0 && (
              <motion.div
                key="results"
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.1 }
                  }
                }}
                className="grid gap-6 w-full"
              >
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-400">Top Matches Found ({data.length})</h2>
                  <div className="text-xs text-indigo-500 font-bold tracking-wider">RESPONSE: 420MS</div>
                </div>
                {data.map((item, index) => (
                  <motion.div
                    key={item.product.id}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 }
                    }}
                  >
                    <RecommendationCard product={item.product} reason={item.reason} rank={index + 1} />
                  </motion.div>
                ))}
              </motion.div>
            )}

            {!isLoading && !isError && data && data.length === 0 && (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="py-20 text-center text-slate-500"
              >
                <p className="font-medium text-lg">No suitable products found for "{query}".</p>
                <p className="text-sm mt-2">Try a different query approach.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Global Status Bar */}
      <footer className="h-10 bg-slate-50 border-t border-slate-100 w-full flex items-center justify-between px-8 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
        <div className="flex gap-4">
          <span>SYSTEM: STABLE</span>
          <span className="hidden sm:inline">MODEL: GPT-4O-MINI</span>
          <span className="hidden sm:inline">CATALOG: 15 ITEMS</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>CONNECTED TO AI SERVER</span>
        </div>
      </footer>
    </div>
  );
}
