interface SellerInfoProps {
  name: string;
  initials: string;
  rating: number;
  reviews: number;
  listings: number;
  sales: number;
}

export default function SellerInfo({
  name,
  initials,
  rating,
  reviews,
  listings,
  sales,
}: SellerInfoProps) {
  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={`full-${i}`} className="material-symbols-outlined text-[16px] filled">star</span>
      );
    }

    if (hasHalfStar) {
      stars.push(
        <span key="half" className="material-symbols-outlined text-[16px] filled">star_half</span>
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <span key={`empty-${i}`} className="material-symbols-outlined text-[16px]">star</span>
      );
    }

    return stars;
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 p-6 shadow-sm mb-10">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-purple-600 flex items-center justify-center text-white text-xl font-bold border-2 border-white dark:border-slate-800 shadow-sm">
            {initials}
          </div>
          <div>
            <div className="flex items-center gap-1">
              <h4 className="font-bold text-slate-900 dark:text-white cursor-pointer hover:text-primary transition-colors">
                {name}
              </h4>
              <span className="material-symbols-outlined text-emerald-500 text-[18px] filled">verified</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="flex text-amber-400">
                {renderStars(rating)}
              </div>
              <span className="text-xs text-slate-400">({reviews} reviews)</span>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-3 text-center">
          <span className="material-symbols-outlined text-slate-400 text-[20px] mb-1">list_alt</span>
          <div className="text-sm font-bold">{listings}</div>
          <div className="text-[10px] text-slate-400 uppercase font-semibold">Listings</div>
        </div>
        <div className="bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-3 text-center">
          <span className="material-symbols-outlined text-slate-400 text-[20px] mb-1">shopping_cart</span>
          <div className="text-sm font-bold">{sales}</div>
          <div className="text-[10px] text-slate-400 uppercase font-semibold">Sales</div>
        </div>
        <div className="bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-3 text-center">
          <span className="material-symbols-outlined text-slate-400 text-[20px] mb-1">grade</span>
          <div className="text-sm font-bold">{rating}</div>
          <div className="text-[10px] text-slate-400 uppercase font-semibold">Rating</div>
        </div>
      </div>
      <button className="w-full py-3 bg-slate-50 dark:bg-slate-900/50 hover:bg-slate-100 text-slate-900 dark:text-white font-bold rounded-2xl transition-all flex items-center justify-center gap-2 border border-slate-100 dark:border-slate-800">
        <span className="material-symbols-outlined text-[20px]">chat</span>
        Chat with Seller
      </button>
    </div>
  );
}
