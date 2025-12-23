
import React, { useState, useEffect } from 'react';
import { COLORS } from './constants';
import AuthPage from './components/AuthPage';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import CalendarView from './components/CalendarView';
import CustomerProfile from './components/CustomerProfile';
import BookingModal from './components/BookingModal';

type Screen = 'dashboard' | 'calendar' | 'customers' | 'staff' | 'reports';

const App: React.FC = () => {
  // Set to true by default for immediate preview of the dashboard
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [currentScreen, setCurrentScreen] = useState<Screen>('dashboard');
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(null);

  const handleLogin = () => setIsAuthenticated(true);
  const handleLogout = () => setIsAuthenticated(false);

  if (!isAuthenticated) {
    return <AuthPage onLogin={handleLogin} />;
  }

  // Helper to handle customer selection and navigation
  const handleViewCustomer = (id: string) => {
    setSelectedCustomerId(id);
    setCurrentScreen('customers');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'dashboard':
        return (
          <Dashboard 
            onViewCustomer={handleViewCustomer}
          />
        );
      case 'calendar':
        return <CalendarView onNewAppointment={() => setIsBookingModalOpen(true)} />;
      case 'customers':
        return <CustomerProfile customerId={selectedCustomerId || 'c1'} onBack={() => setCurrentScreen('dashboard')} />;
      case 'staff':
      case 'reports':
        return (
          <div className="flex items-center justify-center h-full text-gray-500">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">{currentScreen.toUpperCase()} Coming Soon</h2>
              <p>We are still working on this feature.</p>
            </div>
          </div>
        );
      default:
        return <Dashboard onViewCustomer={handleViewCustomer} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA]">
      <Header 
        currentScreen={currentScreen} 
        onNavigate={setCurrentScreen} 
        onLogout={handleLogout} 
      />
      <main className="flex-1 container mx-auto px-4 py-8 overflow-y-auto">
        {renderScreen()}
      </main>

      {isBookingModalOpen && (
        <BookingModal onClose={() => setIsBookingModalOpen(false)} />
      )}
    </div>
  );
};

export default App;
