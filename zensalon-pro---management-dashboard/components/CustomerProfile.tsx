
import React, { useState } from 'react';
import { MOCK_CUSTOMERS, COLORS } from '../constants';

interface CustomerProfileProps {
  customerId: string;
  onBack: () => void;
}

const CustomerProfile: React.FC<CustomerProfileProps> = ({ customerId, onBack }) => {
  const customer = MOCK_CUSTOMERS.find(c => c.id === customerId) || MOCK_CUSTOMERS[0];
  const [activeTab, setActiveTab] = useState<'history' | 'prefs' | 'loyalty' | 'notes'>('history');

  return (
    <div className="animate-in slide-in-from-right-4 duration-500">
      <button 
        onClick={onBack}
        className="flex items-center space-x-2 text-teal-primary font-bold text-sm mb-6 hover:translate-x-1 transition-transform"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
        <span>Back to Dashboard</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Sidebar - Info */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center flex flex-col items-center">
            <div className="w-32 h-32 rounded-full bg-teal-primary text-white text-5xl font-bold flex items-center justify-center mb-6 shadow-xl border-4 border-white">
              {customer.name[0]}
            </div>
            <h2 className="text-2xl font-bold text-gray-800">{customer.name}</h2>
            {customer.isVip && (
              <span className="mt-1 px-3 py-1 bg-amber-100 text-amber-700 text-[10px] font-bold uppercase tracking-wider rounded-full">★ VIP Member</span>
            )}
            <p className="mt-4 text-sm text-gray-500 font-medium">Customer since Jan 2024</p>
            
            <div className="w-full mt-8 pt-8 border-t border-gray-100 space-y-4">
              <div className="flex items-center text-sm text-gray-600 hover:text-teal-primary transition cursor-pointer group">
                <div className="w-8 h-8 rounded-lg bg-gray-50 group-hover:bg-teal-50 flex items-center justify-center mr-3">
                   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                </div>
                <span className="font-semibold">{customer.phone}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600 hover:text-teal-primary transition cursor-pointer group">
                <div className="w-8 h-8 rounded-lg bg-gray-50 group-hover:bg-teal-50 flex items-center justify-center mr-3">
                   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </div>
                <span className="font-semibold">{customer.email}</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 w-full mt-8">
              {[
                { label: 'Visits', val: customer.totalVisits },
                { label: 'Rate', val: '92%' },
                { label: 'Spent', val: `₹${(customer.totalSpent/1000).toFixed(1)}k` },
              ].map((s, i) => (
                <div key={i} className="bg-gray-50 p-2 rounded-lg">
                  <p className="text-[9px] font-bold text-gray-400 uppercase">{s.label}</p>
                  <p className="text-sm font-bold text-teal-primary">{s.val}</p>
                </div>
              ))}
            </div>

            <button className="w-full mt-8 bg-teal-primary hover:bg-[#00838F] text-white font-bold py-3 rounded-xl transition shadow-lg shadow-teal-900/10">
              BOOK APPOINTMENT
            </button>
          </div>

          <div className="bg-amber-50 p-5 rounded-xl border border-amber-200">
             <div className="flex items-center gap-2 mb-2">
               <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
               <h4 className="text-xs font-bold text-amber-800 uppercase tracking-wider">Allergies & Notes</h4>
             </div>
             <p className="text-xs text-amber-700 leading-relaxed">Sensitive to Ammonia-based hair colors. Prefers cool scalp massage and doesn't like strong chemical odors.</p>
          </div>
        </div>

        {/* Right Main Content */}
        <div className="lg:col-span-8 flex flex-col">
          {/* Tabs */}
          <div className="bg-white rounded-t-2xl shadow-sm border-x border-t border-gray-100 px-6 flex items-end space-x-8 overflow-x-auto h-16">
            {(['history', 'prefs', 'loyalty', 'notes'] as const).map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 text-sm font-bold uppercase tracking-widest transition-all whitespace-nowrap border-b-2 ${
                  activeTab === tab ? 'text-teal-primary border-teal-primary' : 'text-gray-400 border-transparent hover:text-gray-600'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content Area */}
          <div className="bg-white flex-1 rounded-b-2xl shadow-sm border border-gray-100 p-8">
            {activeTab === 'history' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold">Appointment History</h3>
                  <select className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 text-xs font-bold">
                    <option>Last 6 Months</option>
                    <option>This Year</option>
                  </select>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100">
                      <tr>
                        <th className="pb-3">Date</th>
                        <th className="pb-3">Service</th>
                        <th className="pb-3">Staff</th>
                        <th className="pb-3">Amount</th>
                        <th className="pb-3">Status</th>
                        <th className="pb-3"></th>
                      </tr>
                    </thead>
                    <tbody className="text-sm">
                      {[
                        { date: 'Dec 14, 2025', service: 'Hair Cut', staff: 'Priya', amount: '₹300', status: 'Completed' },
                        { date: 'Nov 22, 2025', service: 'Coloring', staff: 'Raj', amount: '₹1,500', status: 'Completed' },
                        { date: 'Oct 30, 2025', service: 'Facial', staff: 'Anita', amount: '₹800', status: 'Completed' },
                        { date: 'Sep 15, 2025', service: 'Hair Spa', staff: 'Vikram', amount: '₹1,200', status: 'No Show' },
                      ].map((h, i) => (
                        <tr key={i} className="border-b border-gray-50 group hover:bg-gray-50/50 transition">
                          <td className="py-4 font-medium text-gray-800">{h.date}</td>
                          <td className="py-4 text-gray-600">{h.service}</td>
                          <td className="py-4 text-gray-600">{h.staff}</td>
                          <td className="py-4 font-bold text-teal-primary">{h.amount}</td>
                          <td className="py-4">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              h.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                            }`}>
                              {h.status}
                            </span>
                          </td>
                          <td className="py-4 text-right">
                             <button className="p-1 hover:bg-teal-50 rounded text-gray-400 hover:text-teal-primary transition"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'loyalty' && (
              <div className="space-y-8">
                 <div className="bg-gradient-to-r from-teal-500 to-teal-700 p-8 rounded-2xl text-white shadow-lg shadow-teal-900/10">
                    <div className="flex justify-between items-start mb-8">
                       <div>
                          <p className="text-xs font-bold uppercase tracking-widest opacity-80 mb-1">Available Loyalty Points</p>
                          <h3 className="text-4xl font-bold">450 <span className="text-lg opacity-70">pts</span></h3>
                       </div>
                       <div className="px-3 py-1 bg-white/20 rounded-full text-[10px] font-bold uppercase tracking-wider">Silver Tier</div>
                    </div>
                    <div className="w-full bg-white/20 h-2 rounded-full mb-2">
                       <div className="bg-white h-full rounded-full w-[70%]"></div>
                    </div>
                    <p className="text-[10px] font-medium opacity-80">150 points away from Gold Tier benefits</p>
                 </div>

                 <div>
                   <h3 className="text-sm font-bold text-gray-500 uppercase mb-4 tracking-wider">Available Vouchers</h3>
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="p-4 rounded-xl border-2 border-dashed border-teal-200 bg-teal-50 flex justify-between items-center group cursor-pointer hover:bg-teal-100 transition">
                         <div>
                            <p className="text-xl font-black text-teal-700">₹500 OFF</p>
                            <p className="text-[10px] font-bold text-teal-600 uppercase">On services above ₹2,000</p>
                         </div>
                         <button className="bg-white text-teal-primary text-[10px] font-bold px-3 py-1.5 rounded-lg shadow-sm group-hover:bg-teal-primary group-hover:text-white transition">APPLY</button>
                      </div>
                      <div className="p-4 rounded-xl border-2 border-dashed border-rose-200 bg-rose-50 flex justify-between items-center opacity-60">
                         <div>
                            <p className="text-xl font-black text-rose-700">Free Hair Spa</p>
                            <p className="text-[10px] font-bold text-rose-600 uppercase">Valid for 3 months</p>
                         </div>
                         <span className="text-[10px] font-bold text-rose-400">EXPIRED</span>
                      </div>
                   </div>
                 </div>
              </div>
            )}

            {activeTab !== 'history' && activeTab !== 'loyalty' && (
              <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                <svg className="w-16 h-16 mb-4 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                <p className="text-lg font-bold">Coming Soon</p>
                <p className="text-sm">We are refining {activeTab} for a better experience.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerProfile;
