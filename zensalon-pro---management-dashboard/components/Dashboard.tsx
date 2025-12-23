
import React from 'react';
import { MOCK_APPOINTMENTS, COLORS } from '../constants';
import { AppointmentStatus } from '../types';

interface DashboardProps {
  onViewCustomer: (id: string) => void;
}

const RevenueChart = () => (
  <div className="w-full h-24 mt-4 relative">
    <svg viewBox="0 0 400 100" className="w-full h-full">
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#0097A7', stopOpacity: 0.2 }} />
          <stop offset="100%" style={{ stopColor: '#0097A7', stopOpacity: 0 }} />
        </linearGradient>
      </defs>
      <path
        d="M0,80 Q50,60 100,70 T200,40 T300,50 T400,20 L400,100 L0,100 Z"
        fill="url(#gradient)"
      />
      <path
        d="M0,80 Q50,60 100,70 T200,40 T300,50 T400,20"
        fill="none"
        stroke="#0097A7"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* Data Points */}
      <circle cx="100" cy="70" r="4" fill="#0097A7" />
      <circle cx="200" cy="40" r="4" fill="#0097A7" />
      <circle cx="300" cy="50" r="4" fill="#0097A7" />
      <circle cx="400" cy="20" r="4" fill="#0097A7" />
    </svg>
    <div className="flex justify-between text-[10px] text-gray-400 mt-1 uppercase font-bold tracking-tighter">
      <span>9 AM</span>
      <span>12 PM</span>
      <span>3 PM</span>
      <span>6 PM</span>
      <span>9 PM</span>
    </div>
  </div>
);

const Dashboard: React.FC<DashboardProps> = ({ onViewCustomer }) => {
  const stats = [
    { label: 'Revenue Today', value: '₹8,500', trend: '↑ 12%', trendColor: 'text-green-500' },
    { label: 'Appointments', value: '12', subtext: '5 remaining today' },
    { label: 'No-Show Rate', value: '8%', trend: '↓ 2%', trendColor: 'text-green-500', isBad: true },
    { label: 'Staff Working', value: '7 of 8', subtext: '1 on leave', subColor: 'text-amber-500' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
      {/* Top Section - Quick Stats */}
      <div>
        <div className="flex justify-between items-end mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Welcome back, Admin</h1>
            <p className="text-gray-500 text-sm">Here's what's happening at your salon today.</p>
          </div>
          <div className="text-right">
            <p className="text-gray-400 text-xs font-bold uppercase tracking-wider">Current Session</p>
            <p className="text-teal-primary font-bold">Dec 21, 2025 • 02:30 PM</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition-all duration-300">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{stat.label}</span>
              <div className="flex items-baseline justify-between mt-2">
                <span className={`text-3xl font-black ${stat.isBad ? 'text-red-500' : 'text-gray-800'}`}>{stat.value}</span>
                {stat.trend && (
                  <span className={`text-xs font-bold ${stat.trendColor} bg-opacity-10 rounded-full`}>{stat.trend}</span>
                )}
              </div>
              {stat.subtext ? (
                <span className={`text-xs mt-2 ${stat.subColor || 'text-gray-400 font-medium'}`}>{stat.subtext}</span>
              ) : (
                <div className="h-4"></div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Appointments Column */}
        <div className="lg:col-span-4 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
               <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center">
                 <svg className="w-4 h-4 text-teal-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
               </div>
               Next Appointments
            </h2>
            <button className="text-teal-primary text-xs font-bold uppercase hover:underline">View Schedule</button>
          </div>
          
          <div className="space-y-4">
            {MOCK_APPOINTMENTS.map((app) => (
              <div 
                key={app.id} 
                className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:border-teal-primary/30 transition-all group relative overflow-hidden"
              >
                {app.status === AppointmentStatus.IN_PROGRESS && (
                   <div className="absolute top-0 left-0 w-1 h-full bg-blue-500 animate-pulse"></div>
                )}
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-gray-800">{new Date(app.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-black tracking-tight ${
                      app.status === AppointmentStatus.CONFIRMED ? 'bg-green-50 text-green-600' :
                      app.status === AppointmentStatus.PENDING ? 'bg-amber-50 text-amber-600' :
                      app.status === AppointmentStatus.IN_PROGRESS ? 'bg-blue-50 text-blue-600' :
                      'bg-gray-50 text-gray-500'
                    }`}>
                      {app.status}
                    </span>
                  </div>
                  <button className="text-gray-300 hover:text-teal-primary transition">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg>
                  </button>
                </div>
                <div 
                  className="cursor-pointer" 
                  onClick={() => onViewCustomer(app.customerId)}
                >
                  <p className="font-bold text-gray-800 group-hover:text-teal-primary transition">{app.customerName}</p>
                  <p className="text-xs text-gray-500 mt-1">{app.serviceName} • {app.staffName}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Analytics Column */}
        <div className="lg:col-span-5 space-y-6">
          <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
             <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center">
               <svg className="w-4 h-4 text-teal-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
             </div>
             Revenue Insights
          </h2>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Today's Revenue Curve</p>
                <p className="text-2xl font-black text-gray-800 mt-1">₹8,500.00</p>
              </div>
              <div className="bg-green-50 text-green-600 px-2 py-1 rounded text-xs font-bold">+12.4%</div>
            </div>
            <RevenueChart />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Slot Utilization', value: '85%', sub: 'High demand today', bar: 85 },
              { label: 'Customer Satisfaction', value: '4.8', sub: 'From 12 reviews', star: true },
            ].map((kpi, i) => (
              <div key={i} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{kpi.label}</span>
                <div className="flex items-center gap-1 my-2">
                  <span className="text-xl font-black text-teal-primary">{kpi.value}{kpi.star && ' ⭐'}</span>
                </div>
                {kpi.bar && (
                  <div className="w-full bg-gray-50 h-2 rounded-full mt-1 overflow-hidden">
                    <div className="bg-teal-primary h-full rounded-full transition-all duration-1000" style={{ width: `${kpi.bar}%` }}></div>
                  </div>
                )}
                <span className="text-[10px] text-gray-400 font-medium mt-1">{kpi.sub}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Alerts & Notifications */}
        <div className="lg:col-span-3 space-y-6">
          <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
             <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center">
               <svg className="w-4 h-4 text-teal-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
             </div>
             Active Alerts
          </h2>
          <div className="space-y-4">
            {[
              { type: 'success', msg: 'Priya completed 8 appointments today', border: 'border-green-400', bg: 'bg-green-50/30' },
              { type: 'warning', msg: '2 pending customer confirmations', border: 'border-amber-400', bg: 'bg-amber-50/30' },
              { type: 'error', msg: 'Low stock: Premium Hair Serum', border: 'border-red-400', bg: 'bg-red-50/30' },
            ].map((alert, i) => (
              <div key={i} className={`p-4 rounded-2xl shadow-sm border-l-4 ${alert.border} ${alert.bg} flex flex-col group`}>
                <p className="text-xs font-bold text-gray-700 leading-tight group-hover:text-teal-primary transition-colors">{alert.msg}</p>
                <div className="flex justify-end mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="text-[10px] font-black text-teal-primary hover:bg-white px-2 py-1 rounded-md">ACTION</button>
                </div>
              </div>
            ))}
            <button className="w-full text-center py-3 text-[10px] font-black text-gray-400 hover:text-teal-primary transition-colors uppercase tracking-widest border border-dashed border-gray-200 rounded-2xl">
              View All Notifications
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
