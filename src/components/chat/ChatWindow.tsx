import { ArrowLeft, Phone, Video, MoreVertical, PlusCircle, MapPin, Smile, Send, Shield } from 'lucide-react';

export default function ChatWindow({ onBack }: { onBack: () => void }) {
  return (
    <>
      <header className="flex items-center justify-between px-4 lg:px-6 py-3 border-b border-slate-200 bg-white/95 backdrop-blur-sm z-10">
        <div className="flex items-center gap-3">
          {/* Back button for mobile */}
          <button onClick={onBack} className="lg:hidden p-2 -ml-2 text-slate-500">
            <ArrowLeft size={20} />
          </button>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-base text-slate-800 leading-none">Ahmed Khan</h3>
              <span className="size-2 bg-[#11d421] rounded-full"></span>
            </div>
            <span className="text-[11px] text-[#11d421] font-semibold mt-1">Online</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1">
          <button className="p-2 text-slate-400 hover:bg-slate-50 rounded-lg"><Phone size={20} /></button>
          <button className="p-2 text-slate-400 hover:bg-slate-50 rounded-lg"><Video size={20} /></button>
          <button className="p-2 text-slate-400 hover:bg-slate-50 rounded-lg"><MoreVertical size={20} /></button>
        </div>
      </header>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 lg:p-6 flex flex-col gap-6 bg-white custom-scrollbar">
        <Message isOwn={false} time="12:42 PM" text="Salam! Is the Khaadi suit still available for sale?" />
        <Message isOwn={true} time="12:44 PM" text="Walikum Salam! Yes, it's still available. I just listed it yesterday." />
        
        <div className="mx-auto max-w-sm w-full bg-orange-50 border border-orange-100 rounded-xl p-4 flex items-start gap-3">
          <Shield className="text-orange-400 shrink-0" size={20} />
          <p className="text-[11px] text-slate-500 leading-relaxed">
            <strong className="text-orange-700 block mb-0.5">Safety Tip</strong>
            Meet in public places and inspect the item carefully. Never share bank details.
          </p>
        </div>
      </div>

      {/* Input Footer */}
      <footer className="p-4 bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto flex items-end gap-2 bg-slate-50 p-1.5 rounded-2xl border border-slate-200">
          <div className="flex items-center pb-1">
            <button className="p-2 text-slate-400 hover:text-[#11d421]"><PlusCircle size={20} /></button>
            <button className="p-2 text-slate-400 hover:text-[#11d421]"><MapPin size={20} /></button>
            <button className="p-2 text-slate-400 hover:text-[#11d421]"><Smile size={20} /></button>
          </div>
          <textarea
            className="flex-1 bg-transparent border-none focus:ring-0 text-[14px] py-3 px-2 resize-none max-h-32 placeholder:text-slate-400 text-slate-700"
            placeholder="Type your message..."
            rows={1}
          />
          <button className="bg-[#11d421] text-white size-10 rounded-xl flex items-center justify-center hover:bg-[#0fa31a] shadow-md mb-1 mr-1 transition-all">
            <Send size={18} />
          </button>
        </div>
      </footer>
    </>
  );
}

function Message({ isOwn, text, time }: any) {
  return (
    <div className={`flex items-end gap-3 max-w-[85%] lg:max-w-[75%] ${isOwn ? 'self-end flex-row-reverse' : ''}`}>
      {!isOwn && <img src="https://i.pravatar.cc/150?u=ahmed" className="size-8 rounded-full object-cover shrink-0" alt="avatar" />}
      <div className={`flex flex-col gap-1 ${isOwn ? 'items-end' : ''}`}>
        <div className={`p-3.5 rounded-2xl text-[14px] leading-relaxed ${
          isOwn ? 'bg-[#11d421] text-white rounded-br-none shadow-sm' : 'bg-slate-100 text-slate-700 rounded-bl-none'
        }`}>
          {text}
        </div>
        <span className="text-[10px] text-slate-400">{time}</span>
      </div>
    </div>
  );
}