import { ShoppingBag, Globe, Mail, Send } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              
              <span className="text-xl font-extrabold tracking-tight text-[var(--primary-dark)]">.بازار</span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed mb-6">
              The ultimate destination for second-hand gems. We make it easy for everyone to buy and sell pre-loved goods.
            </p>
            <div className="flex gap-4">
              <a className="w-10 h-10 rounded-full  dark:bg-slate-800 flex items-center justify-center text-white dark:text-white bg-[var(--primary-dark)] hover:text-white transition-all" href="#">
                <Globe className="w-5 h-5" />
              </a>
              <a className="w-10 h-10 rounded-full  dark:bg-white flex items-center justify-center text-white dark:text-white bg-[var(--primary-dark)] hover:text-white transition-all" href="#">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-6">Marketplace</h4>
            <ul className="space-y-4 text-sm text-slate-500">
              <li><a className="hover:text-[var(--primary-dark)] transition-colors" href="#">Latest Listings</a></li>
              <li><a className="hover:text-[var(--primary-dark)] transition-colors" href="#">Popular Categories</a></li>
              <li><a className="hover:text-[var(--primary-dark)] transition-colors" href="#">Requested Items</a></li>
              <li><a className="hover:text-[var(--primary-dark)] transition-colors" href="#">Safe Trading Tips</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6">Company</h4>
            <ul className="space-y-4 text-sm text-slate-500">
              <li><a className="hover:text-[var(--primary-dark)] transition-colors" href="#">About Us</a></li>
              <li><a className="hover:text-[var(--primary-dark)] transition-colors" href="#">Sustainability</a></li>
              <li><a className="hover:text-[var(--primary-dark)] transition-colors" href="#">Careers</a></li>
              <li><a className="hover:text-[var(--primary-dark)] transition-colors" href="#">Press</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6">Stay Updated</h4>
            <p className="text-sm text-slate-500 mb-4">Subscribe to get notifications about new deals.</p>
            <div className="flex gap-2">
              <input
                className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-xl text-sm px-4 focus:ring-2 focus:ring-primary"
                placeholder="Email address"
                type="email"
              />
              <button className="bg-[var(--primary-dark)] text-white p-2 rounded-xl">
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
        <div className="pt-8 border-t border-slate-100 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-400 text-xs font-medium">
          <p>© 2025 - 2026 .بازار Marketplace. All rights reserved.</p>
          <div className="flex gap-8">
            <a className="hover:text-[var(--primary-dark)] transition-colors" href="#">Privacy Policy</a>
            <a className="hover:text-[var(--primary-dark)] transition-colors" href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
