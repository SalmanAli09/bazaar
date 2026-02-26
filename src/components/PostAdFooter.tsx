export default function PostAdFooter() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-t border-slate-200 dark:border-slate-800 p-4 z-40">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="hidden sm:block">
          <span className="text-slate-500 text-sm">Save as draft and continue later?</span>
          <button className="ml-2 text-primary font-semibold text-sm hover:underline">Save Draft</button>
        </div>
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <button
            className="flex-1 sm:px-8 py-3 rounded-full text-slate-600 dark:text-slate-300 font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
            type="button"
          >
            Discard
          </button>
          <button
            className="flex-[2] sm:px-12 py-3 bg-primary text-white rounded-full font-bold shadow-lg shadow-primary/25 hover:bg-primary/90 transition-all active:scale-95"
            type="submit"
          >
            Publish My Ad
          </button>
        </div>
      </div>
    </div>
  );
}
