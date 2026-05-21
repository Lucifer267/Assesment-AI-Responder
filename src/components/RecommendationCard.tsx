import { Star, Tags, Sparkles, ArrowRight } from 'lucide-react';
import { Product } from '../types';

interface RecommendationCardProps {
  product: Product;
  reason: string;
  rank: number;
}

export function RecommendationCard({ product, reason, rank }: RecommendationCardProps) {
  // Determine artificial match rating based on rank
  const matchPercentage = rank === 1 ? '98%' : rank === 2 ? '92%' : '85%';

  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-6 relative">
      <div className="w-full md:w-1/3 aspect-[4/3] bg-slate-50 border border-slate-100 rounded-xl relative overflow-hidden flex items-center justify-center shrink-0 shadow-inner">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover rounded-xl transition-transform duration-700 hover:scale-105"
        />
        <span className="absolute top-3 right-3 px-2 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-bold rounded shadow-sm backdrop-blur-md">
          {matchPercentage} MATCH
        </span>
      </div>

      <div className="flex flex-col flex-1 w-full relative">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            {product.category} • {product.brand}
          </span>
          <div className="flex items-center text-xs font-semibold text-amber-500">
            <Star className="w-3.5 h-3.5 fill-current mr-1 text-amber-500" />
            <span>{product.rating}</span>
          </div>
        </div>
        
        <h3 className="text-xl font-bold mb-2 text-[#1a1a1a] leading-tight">{product.name}</h3>
        <p className="text-sm text-slate-500 line-clamp-2 mb-4 leading-relaxed">
          {product.shortDescription}
        </p>
        
        <div className="mb-4 flex items-center gap-2 flex-wrap">
          {product.tags.map(tag => (
            <span key={tag} className="text-[10px] text-indigo-600 font-semibold px-2 py-1 bg-indigo-50 border border-indigo-100 rounded flex-shrink-0 uppercase tracking-wide">
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-100">
          <span className="text-xl font-extrabold text-slate-900">${product.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
          <button className="p-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 hover:border-indigo-200 transition-colors flex items-center justify-center">
             <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Reasoning Insight Footer style from prompt */}
        <div className="w-full mt-5 bg-indigo-50/70 p-4 rounded-xl border border-indigo-100 flex gap-3 items-start">
          <div className="w-8 h-8 rounded-full bg-indigo-100 flex-shrink-0 flex items-center justify-center text-indigo-600 shadow-sm border border-indigo-200/50">
             <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-indigo-900 uppercase tracking-widest mb-1.5 flex items-center gap-2">
              AI Recommendation Reasoning
            </p>
            <p className="text-xs text-indigo-800 leading-relaxed font-medium">
              {reason}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
