"use client"
import Link from "next/link";
import { useRouter } from "next/navigation";
export default function Navbar() {
  const router = useRouter();
  return (
    <nav className="sticky top-0 z-50 bg-white/90 dark:bg-background-dark/90 backdrop-blur-md border-b border-slate-100 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            
            <Link href="/" className="text-3xl font-extrabold tracking-tight text-primary">Bazaar</Link>
          </div>
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                <span className="material-symbols-outlined text-[20px]">search</span>
              </span>
              <input
                className="block w-full pl-10 pr-3 py-2 border-none bg-slate-100 dark:bg-slate-800 rounded-full text-sm placeholder-slate-500 focus:ring-2 focus:ring-primary"
                placeholder="Search for unique gems..."
                type="text"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-1 text-slate-600 dark:text-slate-400 text-sm font-medium hover:text-primary cursor-pointer transition-colors">
              <span className="material-symbols-outlined text-[20px]">location_on</span>
              <span>All Cities</span>
              <span className="material-symbols-outlined text-[16px]">expand_more</span>
            </div>
            <button onClick={()=>router.push('/login')}  className="px-5 py-2 bg-primary hover:bg-opacity-90 text-white font-semibold rounded-full transition-all">
              Sign In
            </button> 
          </div>
        </div>
      </div>
    </nav>
  );
}
