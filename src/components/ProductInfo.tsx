import { Star, MapPin, Clock } from 'lucide-react';

interface ProductInfoProps {
  title: string;
  price: string;
  originalPrice?: string;
  discount: string;
  location: string;
  time: string;
  description: string;
  badges: string[];
  category: string;
  condition?: string;
}

export default function ProductInfo({
  title,
  price,
  originalPrice,
  discount,
  location,
  time,
  description,
  badges,
  category,
  condition,
}: ProductInfoProps) {
  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'Like New':
      case 'Brand New':
        return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'Used':
      case 'Gently Used':
        return 'bg-blue-50 text-blue-600 border-blue-100';
      default:
        return 'bg-slate-50 text-slate-600 border-slate-100';
    }
  };

  const getDiscountPercentage = () => {
    if (!originalPrice) return 0;
    const current = parseInt(price.replace(/[^\d]/g, ''));
    const original = parseInt(originalPrice.replace(/[^\d]/g, ''));
    return Math.round(((original - current) / original) * 100);
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-wrap gap-2 mb-6">
        {badges.includes('Featured') && (
          <span className="px-3 py-1 bg-amber-50 text-amber-700 text-xs font-bold rounded-full border border-amber-200 flex items-center gap-1">
            <Star className="w-[14px] h-[14px]" /> Featured
          </span>
        )}
        <span className={`px-3 py-1 text-xs font-bold rounded-full border ${condition ? getConditionColor(condition) : 'bg-slate-50 text-slate-600 border-slate-100'}`}>
          {condition || 'N/A'}
        </span>
      </div>
      <h1 className="text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white mb-4">{title}</h1>
      <div className="flex items-center gap-4 mb-6">
        <span className="text-3xl font-extrabold text-[var(--primary-dark)]">{price}</span>
        {originalPrice && (
          <div className="flex flex-col">
            <span className="text-slate-400 line-through text-sm">{originalPrice}</span>
            <span className="text-rose-500 text-xs font-bold">{getDiscountPercentage()}% OFF</span>
          </div>
        )}
      </div>
      <div className="flex items-center gap-6 text-sm text-slate-500 mb-8 pb-8 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-1">
          <MapPin className="w-[18px] h-[18px]" />
          {location}
        </div>
        <div className="flex items-center gap-1">
          <Clock className="w-[18px] h-[18px]" />
          {time}
        </div>
      </div>
      <div className="mb-10">
        <h3 className="text-lg font-bold mb-3">Description</h3>
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}
