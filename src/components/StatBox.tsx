export default function StatBox({ value, label }: { value: string, label: string }) {
  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow text-center">
      <div className="text-3xl font-bold mb-1 dark:text-white">{value}</div>
      <div className="text-slate-500 dark:text-slate-400 text-xs font-medium uppercase tracking-wider">
        {label}
      </div>
    </div>
  );
}