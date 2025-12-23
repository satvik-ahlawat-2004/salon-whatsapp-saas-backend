
import React, { useState } from 'react';
import { COLORS } from '../constants';

interface AuthPageProps {
  onLogin: () => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const features = [
    "50% reduction in no-shows",
    "WhatsApp integrated reminders",
    "Real-time appointment management",
    "Staff scheduling & payroll"
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white overflow-hidden">
      {/* Left Branding Section */}
      <div className="hidden md:flex md:w-3/5 lg:w-3/5 bg-gradient-to-br from-[#0097A7] to-[#006064] p-12 lg:p-24 flex-col justify-center text-white relative">
        <div className="z-10">
          <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-xl">
             <span className="text-[#0097A7] text-3xl font-bold">ZS</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">Salon Management <br/>Made Simple</h1>
          <p className="text-lg mb-12 opacity-90 max-w-md">Reduce no-shows, manage staff, track revenue - all from one platform designed for Indian salon owners.</p>
          
          <ul className="space-y-6">
            {features.map((feature, i) => (
              <li key={i} className="flex items-center space-x-4">
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                   <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                </div>
                <span className="text-lg font-medium">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Decorative Circles */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full -ml-48 -mb-48"></div>
      </div>

      {/* Mobile Branding Bar */}
      <div className="md:hidden bg-teal-primary h-2 w-full"></div>

      {/* Right Form Section */}
      <div className="w-full md:w-2/5 lg:w-2/5 flex flex-col items-center justify-center p-8 md:p-12 lg:p-20 bg-white">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="mb-10 text-center md:text-left">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {isLogin ? "Sign In to Your Salon" : "Create Your Salon Account"}
            </h2>
            <p className="text-gray-500">Welcome back! Please enter your details.</p>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-200 mb-8">
            <button 
              className={`flex-1 pb-4 font-semibold text-sm transition ${isLogin ? 'text-teal-primary border-b-2 border-teal-primary' : 'text-gray-400'}`}
              onClick={() => setIsLogin(true)}
            >
              SIGN IN
            </button>
            <button 
              className={`flex-1 pb-4 font-semibold text-sm transition ${!isLogin ? 'text-teal-primary border-b-2 border-teal-primary' : 'text-gray-400'}`}
              onClick={() => setIsLogin(false)}
            >
              SIGN UP
            </button>
          </div>

          {/* Form Content */}
          <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); onLogin(); }}>
            {isLogin ? (
              <>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Email Address</label>
                  <input 
                    type="email" 
                    placeholder="you@salon.com" 
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-teal-primary focus:ring-1 focus:ring-teal-primary outline-none transition"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Password</label>
                    <a href="#" className="text-teal-primary text-xs font-semibold hover:underline">Forgot password?</a>
                  </div>
                  <input 
                    type="password" 
                    placeholder="••••••••" 
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-teal-primary focus:ring-1 focus:ring-teal-primary outline-none transition"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="remember" className="w-4 h-4 text-teal-primary border-gray-300 rounded focus:ring-teal-primary" />
                  <label htmlFor="remember" className="ml-2 text-sm text-gray-600">Remember me for 30 days</label>
                </div>
              </>
            ) : (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Salon Name</label>
                    <input type="text" placeholder="Glitter Salon" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-teal-primary outline-none transition" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Your Name</label>
                    <input type="text" placeholder="Arun Mishra" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-teal-primary outline-none transition" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Phone Number</label>
                  <input type="tel" placeholder="+91 98765 43210" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-teal-primary outline-none transition" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Email Address</label>
                  <input type="email" placeholder="you@salon.com" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-teal-primary outline-none transition" />
                </div>
              </>
            )}

            <button 
              type="submit" 
              className="w-full bg-teal-primary hover:bg-[#00838F] text-white font-bold py-3 rounded-lg shadow-lg shadow-teal-900/10 transition-all active:scale-[0.98]"
            >
              {isLogin ? "Sign In" : "Create Account"}
            </button>
            
            <div className="relative flex items-center justify-center my-8">
              <div className="flex-grow border-t border-gray-200"></div>
              <span className="flex-shrink mx-4 text-gray-400 text-sm font-medium">OR</span>
              <div className="flex-grow border-t border-gray-200"></div>
            </div>

            <button type="button" className="w-full flex items-center justify-center space-x-2 border border-gray-200 hover:bg-gray-50 text-gray-700 font-semibold py-3 rounded-lg transition active:scale-[0.98]">
              <svg className="w-5 h-5" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path></svg>
              <span>Sign in with Google</span>
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-gray-600">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-teal-primary font-bold hover:underline"
            >
              {isLogin ? "Create one" : "Sign in"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
