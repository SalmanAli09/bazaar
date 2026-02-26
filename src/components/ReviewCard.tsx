import { Star } from 'lucide-react';

interface ReviewProps {
  name: string; initials: string; color: string; time: string; content: string;
}

export default function ReviewCard({ name, initials, color, time, content }: ReviewProps) {
  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-full ${color} flex items-center justify-center text-white font-bold text-sm`}>
            {initials}
          </div>
          <div>
            <h4 className="font-semibold text-sm dark:text-white">{name}</h4>
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="currentColor" />)}
            </div>
          </div>
        </div>
        <span className="text-xs text-slate-400">{time}</span>
      </div>
      <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
        {content}
      </p>
    </div>
  );
}