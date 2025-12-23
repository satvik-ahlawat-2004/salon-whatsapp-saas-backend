
import React from 'react';
import { AppointmentStatus, Customer, Staff, Service, Appointment } from './types';

export const COLORS = {
  primary: '#0097A7',
  accent: '#E91E63',
  success: '#4CAF50',
  warning: '#FFC107',
  error: '#F44336',
  bg: '#FAFAFA',
  surface: '#FFFFFF',
  textPrimary: '#424242',
  textSecondary: '#757575',
  border: '#EEEEEE',
};

export const MOCK_CUSTOMERS: Customer[] = [
  { id: 'c1', name: 'Priya Sharma', phone: '+91 98765 43210', email: 'priya@email.com', lastVisit: '2025-12-14', isVip: true, totalVisits: 24, totalSpent: 18500 },
  { id: 'c2', name: 'Sneha Kumar', phone: '+91 91234 56789', email: 'sneha@email.com', lastVisit: '2025-12-18', totalVisits: 5, totalSpent: 4200 },
  { id: 'c3', name: 'Arun Mishra', phone: '+91 99887 76655', email: 'arun@email.com', lastVisit: '2025-11-30', totalVisits: 12, totalSpent: 12400 },
  { id: 'c4', name: 'Deepika Rao', phone: '+91 88776 65544', email: 'deepika@email.com', lastVisit: '2025-12-20', totalVisits: 2, totalSpent: 1500 },
];

export const MOCK_STAFF: Staff[] = [
  { id: 's1', name: 'Priya Sharma', role: 'Senior Stylist', rating: 4.8, reviews: 124, expertise: ['Hair', 'Color', 'Styling'], availability: 'available' },
  { id: 's2', name: 'Raj Malhotra', role: 'Master Barber', rating: 4.9, reviews: 256, expertise: ['Beard', 'Classic Cut'], availability: 'busy' },
  { id: 's3', name: 'Anita Desai', role: 'Esthetician', rating: 4.7, reviews: 89, expertise: ['Facial', 'Skin Care'], availability: 'available' },
  { id: 's4', name: 'Vikram Singh', role: 'Hair Specialist', rating: 4.5, reviews: 67, expertise: ['Hair Spa', 'Keratin'], availability: 'away' },
];

export const MOCK_SERVICES: Service[] = [
  { id: 'ser1', name: 'Hair Cut', price: 300, duration: 30, category: 'Hair', description: 'Classic haircut with styling' },
  { id: 'ser2', name: 'Hair Coloring', price: 1500, duration: 90, category: 'Hair', description: 'Permanent or semi-permanent hair color' },
  { id: 'ser3', name: 'Facial Clean-up', price: 800, duration: 45, category: 'Facial', description: 'Skin rejuvenation treatment' },
  { id: 'ser4', name: 'Beard Grooming', price: 250, duration: 20, category: 'Men', description: 'Beard trim and shape' },
];

export const MOCK_APPOINTMENTS: Appointment[] = [
  {
    id: 'a1',
    customerId: 'c1',
    customerName: 'Priya Sharma',
    serviceId: 'ser1',
    serviceName: 'Hair Cut',
    staffId: 's1',
    staffName: 'Priya',
    startTime: '2025-12-21T10:00:00',
    endTime: '2025-12-21T10:30:00',
    status: AppointmentStatus.CONFIRMED,
    price: 300
  },
  {
    id: 'a2',
    customerId: 'c2',
    customerName: 'Sneha Kumar',
    serviceId: 'ser3',
    serviceName: 'Facial Clean-up',
    staffId: 's3',
    staffName: 'Anita',
    startTime: '2025-12-21T11:00:00',
    endTime: '2025-12-21T11:45:00',
    status: AppointmentStatus.PENDING,
    price: 800
  },
  {
    id: 'a3',
    customerId: 'c3',
    customerName: 'Arun Mishra',
    serviceId: 'ser4',
    serviceName: 'Beard Grooming',
    staffId: 's2',
    staffName: 'Raj',
    startTime: '2025-12-21T12:00:00',
    endTime: '2025-12-21T12:20:00',
    status: AppointmentStatus.IN_PROGRESS,
    price: 250
  },
];
