export default function Categories() {
  const categories = [
    {
      name: 'Clothing',
      items: '156 items',
      icon: 'checkroom',
      bgColor: 'bg-rose-100 dark:bg-rose-900/30',
      textColor: 'text-rose-500'
    },
    {
      name: 'Electronics',
      items: '89 items',
      icon: 'devices',
      bgColor: 'bg-blue-100 dark:bg-blue-900/30',
      textColor: 'text-blue-500'
    },
    {
      name: 'Furniture',
      items: '43 items',
      icon: 'chair',
      bgColor: 'bg-orange-100 dark:bg-orange-900/30',
      textColor: 'text-orange-500'
    },
    {
      name: 'Books',
      items: '112 items',
      icon: 'book',
      bgColor: 'bg-purple-100 dark:bg-purple-900/30',
      textColor: 'text-purple-500'
    },
    {
      name: 'Accessories',
      items: '91 items',
      icon: 'watch',
      bgColor: 'bg-amber-100 dark:bg-amber-900/30',
      textColor: 'text-amber-500'
    }
  ];

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
