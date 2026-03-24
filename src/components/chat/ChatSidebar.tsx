import { Search } from 'lucide-react';

export default function ChatSidebar({ onSelectChat }: { onSelectChat: () => void }) {
  return (
    <aside className="w-full flex flex-col border-r border-slate-200 h-full">
      <div className="p-4 border-b border-slate-100">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 text-sm py-2.5 outline-none focus:ring-2 focus:ring-primary/20"
            placeholder="Search chats..."
            type="text"
          />
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {/* Active/Selected Chat */}
        <div 
          onClick={onSelectChat}
          className="flex items-center gap-3 p-4 bg-primary/5 border-r-4 border-primary cursor-pointer"
        >
          <img src="https://i.pravatar.cc/150?u=ahmed" className="size-12 rounded-full object-cover" alt="Ahmed" />
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-baseline">
              <h4 className="font-bold text-sm text-slate-800 truncate">Ahmed Khan</h4>
              <span className="text-[10px] text-slate-400 font-medium">12:45 PM</span>
            </div>
            <p className="text-xs text-slate-500 truncate mt-0.5 font-medium">Is the Khaadi suit still available?</p>
          </div>
        </div>

        {/* Mock other chats */}
        <ChatItem name="Sara Malik" msg="I can meet at the mall at 5." time="Yesterday" img="13" />
        <ChatItem name="Zaid Ali" msg="Final price for the shoes?" time="Mon" img="14" badge={2} />
      </div>
    </aside>
  );
}

function ChatItem({ name, msg, time, img, badge }: any) {
  return (
    <div className="flex items-center gap-3 p-4 hover:bg-slate-50 transition-colors cursor-pointer border-b border-slate-50">
      <div className="relative shrink-0">
        <img src={`https://i.pravatar.cc/150?u=${img}`} className="size-12 rounded-full object-cover" alt={name} />
        {badge && (
          <div className="absolute -top-1 -right-1 size-5 bg-primary text-white text-[10px] flex items-center justify-center font-bold rounded-full border-2 border-white">
            {badge}
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-baseline">
          <h4 className="font-bold text-sm text-slate-800 truncate">{name}</h4>
          <span className="text-[10px] text-slate-400 font-medium">{time}</span>
        </div>
        <p className={`text-xs truncate mt-0.5 ${badge ? 'text-slate-900 font-semibold' : 'text-slate-500'}`}>{msg}</p>
      </div>
    </div>
  );
}