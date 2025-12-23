
import React, { useState } from 'react';
import { MOCK_CUSTOMERS, MOCK_SERVICES, MOCK_STAFF, COLORS } from '../constants';

interface BookingModalProps {
  onClose: () => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const [selectedService, setSelectedService] = useState<any>(null);
  const [selectedStaff, setSelectedStaff] = useState<any>(null);
  const [selectedDate, setSelectedDate] = useState<string>('2025-12-21');
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const totalSteps = 5;

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search customer by name or phone..." 
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-teal-primary outline-none"
              />
              <svg className="w-5 h-5 absolute left-3 top-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </div>
            
            <div>
              <h3 className="text-sm font-bold text-gray-500 uppercase mb-3">Recently Booked</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {MOCK_CUSTOMERS.map(c => (
                  <div 
                    key={c.id} 
                    onClick={() => setSelectedCustomer(c)}
                    className={`p-3 rounded-lg border cursor-pointer transition ${
                      selectedCustomer?.id === c.id ? 'border-teal-primary bg-teal-50' : 'border-gray-100 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-teal-primary flex items-center justify-center text-white font-bold">{c.name[0]}</div>
                      <div>
                        <p className="text-sm font-bold text-gray-800">{c.name}</p>
                        <p className="text-xs text-gray-500">{c.phone}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <button className="text-teal-primary text-sm font-bold hover:underline">+ Create New Customer</button>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-gray-500 uppercase">Select Service</h3>
            <div className="grid grid-cols-1 gap-3">
              {MOCK_SERVICES.map(s => (
                <div 
                  key={s.id}
                  onClick={() => setSelectedService(s)}
                  className={`p-4 rounded-lg border cursor-pointer transition flex items-center justify-between ${
                    selectedService?.id === s.id ? 'border-teal-primary bg-teal-50' : 'border-gray-100 hover:bg-gray-50'
                  }`}
                >
                  <div>
                    <p className="font-bold text-gray-800">{s.name}</p>
                    <p className="text-xs text-gray-500">{s.duration} mins • {s.description}</p>
                  </div>
                  <span className="font-bold text-teal-primary">₹{s.price}</span>
                </div>
              ))}
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-gray-500 uppercase">Choose Specialist</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               <div 
                  onClick={() => setSelectedStaff({ id: 'auto', name: 'Best Available' })}
                  className={`p-4 rounded-lg border cursor-pointer transition flex items-center space-x-3 ${
                    selectedStaff?.id === 'auto' ? 'border-teal-primary bg-teal-50' : 'border-gray-100 bg-teal-primary/5'
                  }`}
                >
                  <div className="w-12 h-12 rounded-full bg-teal-primary flex items-center justify-center text-white">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                  </div>
                  <div>
                    <p className="font-bold text-teal-primary text-sm">Best Available</p>
                    <p className="text-[10px] text-teal-600 font-medium">Auto-assign expert</p>
                  </div>
                </div>

                {MOCK_STAFF.map(s => (
                  <div 
                    key={s.id}
                    onClick={() => setSelectedStaff(s)}
                    className={`p-4 rounded-lg border cursor-pointer transition flex items-center space-x-3 ${
                      selectedStaff?.id === s.id ? 'border-teal-primary bg-teal-50' : 'border-gray-100 hover:bg-gray-50'
                    }`}
                  >
                    <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-400">{s.name[0]}</div>
                    <div>
                      <p className="font-bold text-gray-800 text-sm">{s.name}</p>
                      <p className="text-[10px] text-gray-500">{s.role} • ⭐ {s.rating}</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        );
      case 4:
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-bold text-gray-500 uppercase mb-3">Select Date</h3>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                <p className="text-center font-bold text-teal-primary mb-2">December 2025</p>
                <div className="grid grid-cols-7 gap-1 text-center text-[10px]">
                  {['S','M','T','W','T','F','S'].map(d => <span key={d} className="font-bold text-gray-400">{d}</span>)}
                  {Array.from({length: 31}).map((_, i) => (
                    <button 
                      key={i} 
                      className={`h-7 w-7 rounded-full flex items-center justify-center transition ${
                        i + 1 === 21 ? 'bg-teal-primary text-white font-bold' : 'hover:bg-teal-50 text-gray-600'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-500 uppercase mb-3">Select Time</h3>
              <div className="grid grid-cols-2 gap-2 max-h-[220px] overflow-y-auto pr-2">
                {['10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM', '1:00 PM', '2:00 PM', '2:30 PM'].map(t => (
                  <button 
                    key={t}
                    onClick={() => setSelectedTime(t)}
                    className={`py-2 px-3 rounded-lg border text-xs font-bold transition ${
                      selectedTime === t ? 'border-teal-primary bg-teal-50 text-teal-primary' : 'border-gray-100 hover:border-teal-primary'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );
      case 5:
        return (
          <div className="space-y-6">
            <div className="bg-teal-50 p-6 rounded-xl border border-teal-100">
              <h3 className="text-sm font-bold text-teal-800 uppercase mb-4">Review Details</h3>
              <div className="space-y-4">
                <div className="flex justify-between border-b border-teal-100 pb-2">
                  <span className="text-xs text-teal-600">Customer</span>
                  <span className="text-sm font-bold text-teal-900">{selectedCustomer?.name}</span>
                </div>
                <div className="flex justify-between border-b border-teal-100 pb-2">
                  <span className="text-xs text-teal-600">Service</span>
                  <span className="text-sm font-bold text-teal-900">{selectedService?.name}</span>
                </div>
                <div className="flex justify-between border-b border-teal-100 pb-2">
                  <span className="text-xs text-teal-600">Specialist</span>
                  <span className="text-sm font-bold text-teal-900">{selectedStaff?.name}</span>
                </div>
                <div className="flex justify-between border-b border-teal-100 pb-2">
                  <span className="text-xs text-teal-600">Time</span>
                  <span className="text-sm font-bold text-teal-900">Dec 21, 2025 at {selectedTime}</span>
                </div>
                <div className="flex justify-between pt-2">
                  <span className="text-sm font-bold text-teal-600">Total</span>
                  <span className="text-xl font-bold text-teal-900">₹{selectedService?.price}</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <label className="text-xs font-bold text-gray-500 uppercase">Special Notes</label>
              <textarea 
                className="w-full p-3 border border-gray-200 rounded-lg outline-none focus:border-teal-primary text-sm min-h-[80px]"
                placeholder="Any special requests or details..."
              ></textarea>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Create Appointment</h2>
            <p className="text-xs font-medium text-gray-400">Step {step} of {totalSteps}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition text-gray-400 hover:text-red-500">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        {/* Progress Bar */}
        <div className="h-1.5 w-full bg-gray-100">
          <div 
            className="h-full bg-teal-primary transition-all duration-500 ease-out" 
            style={{ width: `${(step / totalSteps) * 100}%` }}
          ></div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8">
          {renderStep()}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-100 flex items-center justify-between gap-4">
          <button 
            onClick={step === 1 ? onClose : () => setStep(step - 1)}
            className="px-6 py-2.5 text-sm font-bold text-gray-500 hover:bg-gray-50 rounded-lg transition"
          >
            {step === 1 ? 'CANCEL' : 'BACK'}
          </button>
          
          <button 
            onClick={() => step === totalSteps ? onClose() : setStep(step + 1)}
            disabled={
              (step === 1 && !selectedCustomer) ||
              (step === 2 && !selectedService) ||
              (step === 3 && !selectedStaff) ||
              (step === 4 && !selectedTime)
            }
            className="bg-teal-primary hover:bg-[#00838F] text-white px-8 py-2.5 rounded-lg text-sm font-bold shadow-lg shadow-teal-900/10 transition active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {step === totalSteps ? 'CONFIRM BOOKING' : 'NEXT STEP'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
