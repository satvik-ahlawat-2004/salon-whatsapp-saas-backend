
import React, { useState } from 'react';
import { MOCK_APPOINTMENTS, COLORS } from '../constants';
import { AppointmentStatus } from '../types';

interface CalendarViewProps {
  onNewAppointment: () => void;
}

const CalendarView: React.FC<CalendarViewProps> = ({ onNewAppointment }) => {
  const [view, setView] = useState<'day' | 'week' | 'month'>('week');
  
  const hours = Array.from({ length: 25 }, (_, i) => i * 0.5 + 9).filter(h => h <= 21);
  const days = ['Mon 18', 'Tue 19', 'Wed 20', 'Thu 21', 'Fri 22', 'Sat 23', 'Sun 24'];

  const getStatusColor = (status: AppointmentStatus) => {
    switch (status) {
      case AppointmentStatus.CONFIRMED: return 'bg-[#4CAF50]';
      case AppointmentStatus.PENDING: return 'bg-amber-100 border-amber-500 text-amber-900 border-dashed border-2';
      case AppointmentStatus.IN_PROGRESS: return 'bg-[#2196F3] animate-pulse-border border-4';
      case AppointmentStatus.CANCELLED: return 'bg-red-50 opacity-60 text-red-700 line-through';
      default: return 'bg-gray-100 text-gray-500';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col h-[calc(100vh-180px)] animate-in slide-in-from-bottom-4 duration-500">
      {/* Calendar Header */}
      <div className="p-4 border-b border-gray-200 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-bold text-gray-800">Calendar</h1>
          <div className="flex items-center bg-gray-100 rounded-lg p-1">
            <button className="px-3 py-1 text-xs font-bold">◀</button>
            <span className="px-4 text-xs font-bold text-gray-600">Dec 18 - 24, 2025</span>
            <button className="px-3 py-1 text-xs font-bold">▶</button>
          </div>
          <button className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs font-bold hover:bg-gray-100">Today</button>
        </div>

        <div className="flex items-center space-x-3">
          <select className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 text-xs font-bold outline-none focus:border-teal-primary">
            <option>All Staff</option>
            <option>Priya Sharma</option>
            <option>Raj Malhotra</option>
          </select>
          <div className="flex bg-gray-100 p-1 rounded-lg">
            {(['day', 'week', 'month'] as const).map(v => (
              <button 
                key={v}
                onClick={() => setView(v)}
                className={`px-3 py-1 rounded text-[10px] font-bold uppercase tracking-wider transition-all ${
                  view === v ? 'bg-white shadow-sm text-teal-primary' : 'text-gray-500'
                }`}
              >
                {v}
              </button>
            ))}
          </div>
          <button 
            onClick={onNewAppointment}
            className="bg-teal-primary text-white px-4 py-1.5 rounded-lg text-xs font-bold hover:bg-[#00838F] shadow-lg shadow-teal-900/10 transition"
          >
            + NEW BOOKING
          </button>
        </div>
      </div>

      {/* Main Grid Container */}
      <div className="flex-1 overflow-auto relative">
        <div className="min-w-[1000px]">
          {/* Day Headers */}
          <div className="flex sticky top-0 z-20 bg-white border-b border-gray-100">
            <div className="w-20 border-r border-gray-100"></div>
            {days.map((day, i) => (
              <div key={i} className={`flex-1 p-3 text-center border-r border-gray-100 ${day.includes('21') ? 'bg-teal-50' : ''}`}>
                <span className={`text-xs font-bold ${day.includes('21') ? 'text-teal-primary' : 'text-gray-500'}`}>{day}</span>
              </div>
            ))}
          </div>

          {/* Time Slots */}
          <div className="relative">
            {hours.map((hour, i) => (
              <div key={hour} className="flex h-16 border-b border-gray-50">
                <div className="w-20 border-r border-gray-100 pr-2 pt-1">
                  <span className="text-[10px] text-gray-400 font-bold block text-right">
                    {Math.floor(hour)}:{hour % 1 === 0 ? '00' : '30'}
                  </span>
                </div>
                {days.map((_, j) => (
                  <div key={j} className="flex-1 border-r border-gray-50 hover:bg-gray-50/50 transition cursor-pointer group">
                     {/* Placeholder slots for hover interaction */}
                     <div className="opacity-0 group-hover:opacity-100 flex items-center justify-center h-full">
                       <span className="text-[10px] text-teal-300 font-bold">+ BOOK</span>
                     </div>
                  </div>
                ))}
              </div>
            ))}

            {/* Mock Appointment Blocks - positioned absolutely for current day (Dec 21, index 3) */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
              {/* Appointment 1: 10:00 - 10:30 (1 hour block height = 64px) */}
              <div 
                className={`absolute left-[calc(20px+3/7*(100%-80px))] top-[64px] w-[calc(1/7*(100%-80px)-10px)] h-16 pointer-events-auto rounded-lg shadow-md p-2 flex flex-col justify-between group cursor-pointer transition hover:scale-[1.02] ${getStatusColor(AppointmentStatus.CONFIRMED)} text-white`}
                style={{ marginLeft: '5px' }}
              >
                <div>
                   <p className="text-[10px] font-bold leading-none mb-1">Hair Cut</p>
                   <p className="text-[10px] font-medium leading-none opacity-90">Priya Sharma</p>
                </div>
                <div className="flex justify-between items-center">
                   <span className="text-[9px] font-bold bg-white/20 px-1 rounded">P</span>
                   <span className="text-[8px] font-bold">10:00 - 10:30</span>
                </div>
              </div>

              {/* Appointment 2: 11:00 - 11:45 (45 mins = 48px) */}
              <div 
                className={`absolute left-[calc(20px+3/7*(100%-80px))] top-[128px] w-[calc(1/7*(100%-80px)-10px)] h-24 pointer-events-auto rounded-lg shadow-md p-2 flex flex-col justify-between border-2 bg-amber-50 border-amber-500 border-dashed text-amber-900`}
                style={{ marginLeft: '5px' }}
              >
                <div>
                   <p className="text-[10px] font-bold leading-none mb-1 uppercase">Facial Clean-up</p>
                   <p className="text-[10px] font-bold leading-none opacity-80">Sneha Kumar</p>
                </div>
                <div className="flex justify-between items-center">
                   <span className="text-[9px] font-bold bg-amber-200 px-1 rounded">A</span>
                   <span className="text-[8px] font-bold">11:00 - 11:45</span>
                </div>
              </div>

              {/* Current Time Indicator Line */}
              <div className="absolute left-20 right-0 h-0.5 bg-rose-accent z-10 pointer-events-none" style={{ top: '610px' }}>
                <div className="absolute -left-1 -top-1 w-2.5 h-2.5 rounded-full bg-rose-accent border-2 border-white shadow-sm"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Legend Footer */}
      <div className="p-3 bg-gray-50 border-t border-gray-200 flex items-center space-x-6">
        <div className="flex items-center space-x-1.5">
          <div className="w-3 h-3 bg-[#4CAF50] rounded-sm"></div>
          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Confirmed</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <div className="w-3 h-3 bg-amber-100 border border-amber-500 border-dashed rounded-sm"></div>
          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Pending</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <div className="w-3 h-3 bg-[#2196F3] rounded-sm"></div>
          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">In Progress</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <div className="w-3 h-3 bg-red-500 opacity-20 rounded-sm"></div>
          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Cancelled</span>
        </div>
      </div>
    </div>
  );
};

export default CalendarView;
