import Link from 'next/link';

export default function LatestArrivals() {
  const products = [
    {
      id: 1,
      title: 'Khaadi Lawn Suit',
      price: 'Rs. 2,500',
      originalPrice: 'Rs. 5,800',
      discount: '-57% Off',
      location: 'Karachi',
      time: '1 week ago',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB5PoFCt7oeigGyCvRkMCLmTRPx9LyEuB6fRKFc8fon72hrDBjF-gJNC1z4Pa9Ls9H4qXGcUja7hfMx6QX2OV-uasTPXg4hi_x4OSuTvb7nW5uDVHNZDZTWmOAGJlawCvfBFQR7Kc3M6c7q_xIrUfhwzXZ-jWVYICL_Jz5ENKoN4qm-n2qgcz2FG36fKxQDaJGS4VVzd3KI7lv1PEWeSHVWUxmr5gmAntm2Lh7nwan_I_613XrJ8gGNV8S4bvI45foFztweFo_69C02',
      badges: ['Featured'],
      condition: 'Like New',
      badgeColors: ['bg-primary text-white']
    },
    {
      id: 2,
      title: 'Samsung S23 Ultra - 256GB',
      price: 'Rs. 48,000',
      originalPrice: 'Rs. 95,000',
      discount: '-49% Off',
      location: 'Lahore',
      time: '4 days ago',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC7zIbxm0rG2MWXNCGNENKI3d_bcQddY2HU3TVnPhfzj6elfsLpgAX6FayxtXtKwHnUFgkLp9phNrJMPSHaWP33lij35DgZXYq_DBBIZ1d8aFAxGtVGO1jCtAyXAZxyboPA0-8RIs5X0ozqnBvLg-vgXFdndsxvCWGIa0ZdiTQR9fQe0IWe5Kst8GIFQ_eaoDIBAYleyiuzNvnUla0gisUViPn5ir9GE8Q4j6BUIR22IjuiRK6LAJUnge6-9AXbMF5TCFnh9UY6emhp',
      badges: ['Urgent'],
      condition: 'Used',
      badgeColors: ['bg-amber-500 text-white']
    },
    {
      id: 3,
      title: 'Premium Leather Watch',
      price: 'Rs. 3,200',
      originalPrice: 'Rs. 5,000',
      discount: '-30%',
      location: 'Islamabad',
      time: '2 hours ago',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBpWb3WDuxxBcI0T2RJewm7LG2-kpFQJqxp3LZXXN36st6_gWAOpknMls6GLZPK_SZ2RhweGK53gJZus9lMf2KYSyovqXjRi_ZeDd6RsFyzoW5L-s5ppDPz6804bUAMexyk9SA4iwokeIVYl_3o3-ZWpJE8kNC3-GSGpv8B89LgA51sYYcH9THTju9s1Eb7H9rFVETZOfIWPz73W3d8WZJzfHwPVTW4OqsXi8oPwqOtfrjZ2UoHeHR-5JRzi1sNYGroSCZqzzMAXMhm',
      badges: ['New Arrival'],
      condition: 'Brand New',
      badgeColors: ['bg-primary text-white']
    },
    {
      id: 4,
      title: 'Handcrafted Table Lamp',
      price: 'Rs. 1,800',
      originalPrice: 'Rs. 2,600',
      discount: '-30%',
      location: 'Lahore',
      time: '3 weeks ago',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDxtp6AVLU7-sHnJV8wQxB-tTbVNtpSaUQrfYRZyTFn9OAVVAeguNyDtw6BWX-LvpmuNC-xAhCxszGlkyAoH2bSFSn83pnla3nSFjIijBsgoVX58DHgEF3fw7sUjI_9HS8IDEDh5hnPBK1KCNn8_54cfYYjFRcQIq9qai8rKX16afwti9r2Ltf_fX6ha69TEEj_S2gldezhR9HZQuqISMjDdek0qLXR9goH8U1u0lS7MPo55uoqCesDAMW15AVpVUVp8g6X2S6vJsMD',
      badges: [],
      condition: 'Gently Used',
      badgeColors: []
    }
  ];

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
          {products.map((product) => (
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
                    {product.badges.map((badge, index) => (
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
        <div className="mt-16 text-center">
          <button className="px-10 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-2xl hover:shadow-2xl hover:-translate-y-1 transition-all flex items-center gap-2 mx-auto">
            Load More Items <span className="material-symbols-outlined">expand_more</span>
          </button>
        </div>
      </div>
    </section>
  );
}
