"use client";
import { useRouter } from "next/navigation";
import categories from "../../data/category";

export default function Categories() {
  const router = useRouter();
 
  return (
    <section className="py-20 bg-white dark:bg-background-dark/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-bold mb-2">Browse Categories</h2>
            <p className="text-slate-500">Explore curated collections from top categories</p>
          </div>
          <a className="text-primary font-bold flex items-center gap-1 group" href="#">
            See All <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">chevron_right</span>
          </a>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {categories.map((category, index) => (
            <div
              key={index}
              onClick={()=>router.push(`/search/${category.name}`)}
              className="group p-6 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border border-transparent hover:border-primary/20 hover:bg-white dark:hover:bg-slate-800 hover:shadow-xl transition-all cursor-pointer text-center"
            >
              <div className={`w-16 h-16 mx-auto mb-4 ${category.bgColor} rounded-2xl flex items-center justify-center ${category.textColor} group-hover:scale-110 transition-transform`}>
                <span className="material-symbols-outlined text-3xl">{category.icon}</span>
              </div>
              <h3 className="font-bold mb-1">{category.name}</h3>
              <p className="text-slate-400 text-sm">{category.items}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
