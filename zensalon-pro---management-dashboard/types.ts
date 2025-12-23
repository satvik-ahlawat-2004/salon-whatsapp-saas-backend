
export enum AppointmentStatus {
  CONFIRMED = 'CONFIRMED',
  PENDING = 'PENDING',
  CANCELLED = 'CANCELLED',
  NO_SHOW = 'NO_SHOW',
  IN_PROGRESS = 'IN_PROGRESS'
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string;
  lastVisit: string;
  isVip?: boolean;
  totalVisits: number;
  totalSpent: number;
}

export interface Staff {
  id: string;
  name: string;
  role: string;
  rating: number;
  reviews: number;
  expertise: string[];
  photo?: string;
  availability: 'available' | 'busy' | 'away';
}

export interface Service {
  id: string;
  name: string;
  price: number;
  duration: number; // in minutes
  description?: string;
  category: string;
}

export interface Appointment {
  id: string;
  customerId: string;
  customerName: string;
  serviceId: string;
  serviceName: string;
  staffId: string;
  staffName: string;
  startTime: string; // ISO string
  endTime: string; // ISO string
  status: AppointmentStatus;
  price: number;
}
