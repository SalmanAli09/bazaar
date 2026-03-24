interface PostAdFooterProps {
  isSubmitting: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onSaveDraft: (e: React.FormEvent) => void;
}

export default function PostAdFooter({ isSubmitting, onSubmit, onSaveDraft }: PostAdFooterProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-t border-slate-200 dark:border-slate-800 p-4 z-40">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="hidden sm:block">
          <span className="text-slate-500 text-sm">Save as draft and continue later?</span>
          <button 
            className="ml-2 text-[var(--primary-dark)] font-semibold text-sm hover:underline"
            onClick={onSaveDraft}
            disabled={isSubmitting}
          >
            Save Draft
          </button>
        </div>
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <button
            className="flex-1 sm:px-8 py-3 rounded-full text-slate-600 dark:text-slate-300 font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
            type="button"
            disabled={isSubmitting}
          >
            Discard
          </button>
          <button
            className="flex-[2] sm:px-12 py-3 bg-[var(--primary-dark)] text-white rounded-full font-bold shadow-lg shadow-primary/25 hover:bg-[var(--primary-dark)]/90 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={onSubmit}
            disabled={isSubmitting}
            type="button"
          >
            {isSubmitting ? 'Posting...' : 'Publish My Ad'}
          </button>
        </div>
      </div>
    </div>
  );
}
