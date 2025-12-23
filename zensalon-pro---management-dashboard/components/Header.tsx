
import React from 'react';
import { COLORS } from '../constants';

interface HeaderProps {
  currentScreen: string;
  onNavigate: (screen: any) => void;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ currentScreen, onNavigate, onLogout }) => {
  const tabs = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'calendar', label: 'Calendar' },
    { id: 'customers', label: 'Customers' },
    { id: 'staff', label: 'Staff' },
    { id: 'reports', label: 'Reports' },
  ];

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo */}
        <div className="flex items-center">
          <div 
            className="text-2xl font-bold text-teal-primary cursor-pointer flex items-center gap-2"
            onClick={() => onNavigate('dashboard')}
          >
            <span className="p-1 rounded bg-teal-primary text-white text-lg">ZS</span>
            ZenSalon Pro
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onNavigate(tab.id)}
              className={`px-1 py-5 text-sm font-medium border-b-2 transition-all duration-200 ${
                currentScreen === tab.id
                  ? 'border-teal-primary text-teal-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {/* User Profile & Actions */}
        <div className="flex items-center space-x-4">
          <div className="hidden lg:flex items-center text-sm text-gray-600 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-200 cursor-pointer hover:bg-gray-100 transition">
            <span>Raj Nagar Branch</span>
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
          </div>

          <div className="relative cursor-pointer hover:text-teal-primary transition text-gray-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold px-1 rounded-full border-2 border-white">3</span>
          </div>

          <button onClick={onLogout} className="flex items-center space-x-2 p-1 rounded-full hover:bg-gray-50 transition border border-transparent hover:border-gray-200">
            <div className="w-8 h-8 rounded-full bg-teal-primary flex items-center justify-center text-white font-semibold text-sm">AM</div>
          </button>
        </div>
      </div>
      
      {/* Mobile Nav */}
      <div className="md:hidden border-t border-gray-100 bg-white overflow-x-auto">
        <div className="flex px-4 py-2 space-x-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onNavigate(tab.id)}
              className={`whitespace-nowrap py-2 text-xs font-bold uppercase tracking-wider ${
                currentScreen === tab.id ? 'text-teal-primary' : 'text-gray-500'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;
