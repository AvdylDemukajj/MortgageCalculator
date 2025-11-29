import React, { useState } from 'react';
import { Home, Lock, Menu, X, Phone, Mail, HelpCircle } from 'lucide-react';

const Layout = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Modern Glass Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20">
              <Home size={20} strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900 leading-none">Lloyds Bank</h1>
              <span className="text-xs font-medium text-primary tracking-wide uppercase">Mortgages</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 relative">
            <div className="hidden md:flex items-center text-xs font-medium text-gray-500 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100">
              <Lock size={12} className="mr-1.5 text-primary" />
              Secure Connection
            </div>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-500 hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary rounded-lg"
              aria-label="Menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
            </button>

            {/* Dropdown Menu */}
            {isMenuOpen && (
              <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border-2 border-gray-200 py-2 z-[60]">
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="text-sm font-semibold text-gray-900">Need Help?</p>
                </div>
                <nav className="py-2">
                  <a 
                    href="tel:03456020000" 
                    className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Phone size={18} className="mr-3 text-primary" />
                    <span>Call Us: 0345 602 0000</span>
                  </a>
                  <a 
                    href="mailto:mortgages@lloydsbank.co.uk" 
                    className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Mail size={18} className="mr-3 text-primary" />
                    <span>Email Us</span>
                  </a>
                  <a 
                    href="#" 
                    className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <HelpCircle size={18} className="mr-3 text-primary" />
                    <span>FAQs</span>
                  </a>
                </nav>
                <div className="px-4 py-2 border-t border-gray-100">
                  <p className="text-xs text-gray-500">
                    Mon-Fri: 8am-8pm<br />
                    Sat: 9am-5pm
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="flex-grow w-full max-w-5xl mx-auto px-4 sm:px-6 py-8 md:py-12" role="main">
        {children}
      </main>

      {/* Overlay to close menu when clicking outside */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 z-[55]" 
          onClick={() => setIsMenuOpen(false)}
          aria-hidden="true"
        ></div>
      )}

      <footer className="bg-white border-t border-gray-100 py-12 mt-auto">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <div className="flex justify-center space-x-6 mb-8 text-gray-400">
            <Home size={20} />
            <div className="w-px h-5 bg-gray-200"></div>
            <span className="text-sm font-medium">Privacy</span>
            <span className="text-sm font-medium">Security</span>
            <span className="text-sm font-medium">Legal</span>
          </div>
          <p className="text-sm text-gray-500">&copy; {new Date().getFullYear()} Lloyds Bank plc. All rights reserved.</p>
          <p className="mt-2 text-xs text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Lloyds Bank plc. Registered Office: 25 Gresham Street, London EC2V 7HN. Registered in England and Wales no. 2065. 
            Authorised by the Prudential Regulation Authority and regulated by the Financial Conduct Authority and the Prudential Regulation Authority under registration number 119278.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
