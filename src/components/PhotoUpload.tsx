import { Images, Camera, Plus, Ban, CloudUpload } from "lucide-react";

export default function PhotoUpload() {
  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
      <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
        <Images className="w-5 h-5 text-primary" />
        Upload Photos
      </h2>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
        Add up to 5 photos. First photo is your main thumbnail.
      </p>
      <div className="grid grid-cols-3 gap-3">
        <div className="aspect-square rounded-xl border-2 border-dashed border-primary bg-primary/5 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-primary/10 transition-colors group">
          <Camera className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
          <span className="text-[10px] font-bold text-primary uppercase tracking-wider">Cover</span>
        </div>
        <div className="aspect-square rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-400">
          <Plus className="w-6 h-6" />
        </div>
        <div className="aspect-square rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-400">
          <Plus className="w-6 h-6" />
        </div>
        <div className="aspect-square rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-400">
          <Plus className="w-6 h-6" />
        </div>
        <div className="aspect-square rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-400">
          <Plus className="w-6 h-6" />
        </div>
        <div className="aspect-square rounded-xl bg-slate-50 dark:bg-slate-900/50 flex flex-col items-center justify-center text-slate-300">
          <Ban className="w-4 h-4" />
          <span className="text-[10px]">Max 5</span>
        </div>
      </div>
      <button
        className="w-full mt-6 py-2.5 border-2 border-slate-200 dark:border-slate-700 rounded-xl text-sm font-semibold hover:border-primary hover:text-primary transition-all flex items-center justify-center gap-2"
        type="button"
      >
        <CloudUpload className="w-5 h-5" />
        Bulk Upload
      </button>
    </div>
  );
}
