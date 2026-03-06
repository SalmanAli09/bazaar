import Link from 'next/link';

export default function LatestArrivals(props:any) {
 
  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'Like New':
      case 'Brand New':
        return 'bg-emerald-500 text-white';
      case 'Used':
      case 'Gently Used':
        return 'bg-blue-500 text-white';
      default:
        return 'bg-slate-500 text-white';
    }
  };

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-bold mb-2">Latest Arrivals</h2>
            <p className="text-slate-500">Recently added treasures just for you</p>
          </div>
          <button className="flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all">
            View All <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {props?.products.map((product:any) => (
            <Link key={product.id} href={`/product/${product.id}`}>
              <div className="group bg-white dark:bg-slate-800 rounded-3xl overflow-hidden border border-slate-100 dark:border-slate-700 hover:shadow-2xl transition-all cursor-pointer h-full">
                <div className="relative aspect-square overflow-hidden">
                  <img
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    src={product.image}
                  />
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {product.discount && (
                      <span className="px-3 py-1 bg-red-500 text-white text-[10px] font-bold rounded-full uppercase">
                        {product.discount}
                      </span>
                    )}
                    {product.badges.map((badge:any, index:any) => (
                      <span
                        key={index}
                        className={`px-3 py-1 ${product.badgeColors[index]} text-[10px] font-bold rounded-full uppercase`}
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                  <button className="absolute top-4 right-4 w-10 h-10 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-full flex items-center justify-center text-slate-900 dark:text-white hover:text-red-500 transition-colors">
                    <span className="material-symbols-outlined text-xl">favorite</span>
                  </button>
                  <div className="absolute bottom-4 right-4">
                    <span className={`px-3 py-1 ${getConditionColor(product.condition)} text-[10px] font-bold rounded-full uppercase`}>
                      {product.condition}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-lg mb-1 truncate">{product.title}</h3>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-primary font-extrabold text-xl">{product.price}</span>
                    <span className="text-slate-400 line-through text-sm">{product.originalPrice}</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-400 text-xs">
                    <div className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">location_on</span> {product.location}
                    </div>
                    <span>{product.time}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div> 
      </div>
    </section>
  );
}
