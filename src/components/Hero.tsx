"use client"
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Hero() {
  const router = useRouter()
  return (
    <section className="relative bg-primary overflow-hidden min-h-[100vh] flex items-center">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[60%] bg-emerald-600/30 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-5%] w-[50%] h-[70%] bg-primary/20 rounded-full blur-[150px]"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
        <div className="max-w-3xl">
          <h1 className="text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-6 text-shadow-sm">
            Find Gems. <br />
            <span className="">Sell with Ease.</span>
          </h1>
          <p className="text-emerald-50/80 text-lg lg:text-xl mb-10 max-w-xl">
            The most trusted thrift marketplace. Join 50k+ users buying and selling high-quality pre-loved items every day with secure payments.
          </p>
          <div className="flex flex-wrap gap-4 mb-8">
            <Link href="/post-ad">
              <button className="px-8 py-4 bg-white text-primaryDark font-bold rounded-2xl flex items-center gap-2 hover:shadow-[0_0_25px_rgba(255,255,255,0.4)] hover:-translate-y-1 transition-all animate-pulse-glow">
                Start Selling <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </Link>
            <button onClick={() => router.push('/products')} className="px-8 py-4 bg-white/10 text-white font-bold rounded-2xl border border-white/20 backdrop-blur-md hover:bg-white/20 transition-all">
              Browse Listings
            </button>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-white text-sm font-semibold mr-2 uppercase tracking-wider">Trending:</span>
            <a className="px-3 py-1 bg-emerald-800/40 hover:bg-emerald-700/60 text-emerald-100 text-xs font-medium rounded-full border border-emerald-700/50 transition-colors" href="#">
              #VintageTelevisions
            </a>
            <a className="px-3 py-1 bg-emerald-800/40 hover:bg-emerald-700/60 text-emerald-100 text-xs font-medium rounded-full border border-emerald-700/50 transition-colors" href="#">
              #LawnSuits
            </a>
            <a className="px-3 py-1 bg-emerald-800/40 hover:bg-emerald-700/60 text-emerald-100 text-xs font-medium rounded-full border border-emerald-700/50 transition-colors" href="#">
              #PS5
            </a>
            <a className="px-3 py-1 bg-emerald-800/40 hover:bg-emerald-700/60 text-emerald-100 text-xs font-medium rounded-full border border-emerald-700/50 transition-colors" href="#">
              #RetroCameras
            </a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-16">
            <div className="flex items-center gap-4 p-4 glass-card rounded-2xl hover:-translate-y-2 transition-transform duration-300 cursor-default">
              <div className="w-10 h-10 rounded-xl bg-emerald-400/20 flex items-center justify-center text-emerald-300">
                <span className="material-symbols-outlined">verified_user</span>
              </div>
              <div>
                <div className="text-white font-bold text-lg leading-none">500+</div>
                <div className="text-emerald-100/60 text-[10px] uppercase font-bold tracking-tight">Verified Sellers</div>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 glass-card rounded-2xl hover:-translate-y-2 transition-transform duration-300 cursor-default">
              <div className="w-10 h-10 rounded-xl bg-emerald-400/20 flex items-center justify-center text-emerald-300">
                <span className="material-symbols-outlined">bolt</span>
              </div>
              <div>
                <div className="text-white font-bold text-lg leading-none">10k+</div>
                <div className="text-emerald-100/60 text-[10px] uppercase font-bold tracking-tight">Quick Deals</div>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 glass-card rounded-2xl hover:-translate-y-2 transition-transform duration-300 cursor-default">
              <div className="w-10 h-10 rounded-xl bg-emerald-400/20 flex items-center justify-center text-emerald-300">
                <span className="material-symbols-outlined">trending_up</span>
              </div>
              <div>
                <div className="text-white font-bold text-lg leading-none">98%</div>
                <div className="text-emerald-100/60 text-[10px] uppercase font-bold tracking-tight">Best Prices</div>
              </div>
            </div>
          </div>
        </div>
        <div className="relative h-[500px] hidden lg:block">
          <div className="absolute top-[10%] left-[10%] w-64 h-72 rounded-[2rem] overflow-hidden shadow-2xl animate-float z-20 group">
            <img
              alt="Vintage Item"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCZqPofUa-GQ6t4UtU7kvNv7_QvW8yYtxfGCdC8s2e-bh-KFXtotBJTW9j4X4sJMyjDncoru7EYF1zfYxZlBPPzwvXZlPXtF5YsNEYHFXOapm5AX17b__WCMdF-Lk_EmHQW3R0k8rFvLGYGXUvxlvd-LuPGKxEB6iCWK92syaSR5P_ZvhxGxuwOKo07Jp0VX6-XVdcbRCnNS-YBHRNz6hfs5gm2FWwcZ6OY1BcOQiHk8mXtJqZeBHWz48W3fWtWyBfGhSgk9bOBwIJC"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
              <span className="text-emerald-400 text-xs font-bold uppercase tracking-widest mb-1">Electronics</span>
              <h3 className="text-white font-bold text-lg">Vintage Series</h3>
            </div>
          </div>
          <div className="absolute top-[40%] right-[5%] w-56 h-64 rounded-[2rem] overflow-hidden shadow-2xl animate-float-slow z-10 group">
            <img
              alt="Apparel"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB5PoFCt7oeigGyCvRkMCLmTRPx9LyEuB6fRKFc8fon72hrDBjF-gJNC1z4Pa9Ls9H4qXGcUja7hfMx6QX2OV-uasTPXg4hi_x4OSuTvb7nW5uDVHNZDZTWmOAGJlawCvfBFQR7Kc3M6c7q_xIrUfhwzXZ-jWVYICL_Jz5ENKoN4qm-n2qgcz2FG36fKxQDaJGS4VVzd3KI7lv1PEWeSHVWUxmr5gmAntm2Lh7nwan_I_613XrJ8gGNV8S4bvI45foFztweFo_69C02"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
              <span className="text-emerald-400 text-xs font-bold uppercase tracking-widest mb-1">Apparel</span>
              <h3 className="text-white font-bold text-lg">Modern Fits</h3>
            </div>
          </div>
          <div className="absolute bottom-[0%] left-[30%] w-52 h-60 rounded-[2rem] overflow-hidden shadow-2xl animate-float z-30 group">
            <img
              alt="Home Decor"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDxtp6AVLU7-sHnJV8wQxB-tTbVNtpSaUQrfYRZyTFn9OAVVAeguNyDtw6BWX-LvpmuNC-xAhCxszGlkyAoH2bSFSn83pnla3nSFjIijBsgoVX58DHgEF3fw7sUjI_9HS8IDEDh5hnPBK1KCNn8_54cfYYjFRcQIq9qai8rKX16afwti9r2Ltf_fX6ha69TEEj_S2gldezhR9HZQuqISMjDdek0qLXR9goH8U1u0lS7MPo55uoqCesDAMW15AVpVUVp8g6X2S6vJsMD"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
              <span className="text-emerald-400 text-xs font-bold uppercase tracking-widest mb-1">Home</span>
              <h3 className="text-white font-bold text-lg">Artisan Decor</h3>
            </div>
          </div>
          <div className="absolute top-[5%] right-[20%] glass-card p-3 rounded-2xl flex items-center gap-3 animate-float-slow z-40 border border-white/20">
            <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white">
              <span className="material-symbols-outlined text-sm">payments</span>
            </div>
            <span className="text-white text-xs font-bold whitespace-nowrap">Secure Escrow</span>
          </div>
          <div className="absolute bottom-[20%] right-[10%] glass-card p-3 rounded-2xl flex items-center gap-3 animate-float z-40 border border-white/20">
            <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-white">
              <span className="material-symbols-outlined text-sm">stars</span>
            </div>
            <span className="text-white text-xs font-bold whitespace-nowrap">Top Rated</span>
          </div>
        </div>
      </div>
    </section>
  );
}
