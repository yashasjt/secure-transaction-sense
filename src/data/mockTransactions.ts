
import { Transaction } from '@/types/fraud';

export const mockTransactions: Transaction[] = [
  // User001 (John Smith) - Regular NYC worker, moderate amounts
  {
    id: 'txn001',
    userId: 'user001',
    amount: 234.50,
    location: 'New York',
    timestamp: new Date('2024-06-01T14:30:00'),
    riskScore: 15,
    status: 'legit'
  },
  {
    id: 'txn002',
    userId: 'user001',
    amount: 189.75,
    location: 'Brooklyn',
    timestamp: new Date('2024-06-01T12:15:00'),
    riskScore: 5,
    status: 'legit'
  },
  {
    id: 'txn003',
    userId: 'user001',
    amount: 1250.00,
    location: 'Miami',
    timestamp: new Date('2024-06-01T23:45:00'),
    riskScore: 85,
    status: 'fraud'
  },
  {
    id: 'txn004',
    userId: 'user001',
    amount: 312.20,
    location: 'Manhattan',
    timestamp: new Date('2024-06-01T16:20:00'),
    riskScore: 10,
    status: 'legit'
  },

  // User002 (Emma Johnson) - LA resident, lower amounts, daytime shopper
  {
    id: 'txn005',
    userId: 'user002',
    amount: 156.75,
    location: 'Los Angeles',
    timestamp: new Date('2024-06-01T12:15:00'),
    riskScore: 10,
    status: 'legit'
  },
  {
    id: 'txn006',
    userId: 'user002',
    amount: 89.99,
    location: 'Santa Monica',
    timestamp: new Date('2024-06-01T14:30:00'),
    riskScore: 5,
    status: 'legit'
  },
  {
    id: 'txn007',
    userId: 'user002',
    amount: 2100.00,
    location: 'London',
    timestamp: new Date('2024-06-01T03:20:00'),
    riskScore: 95,
    status: 'pending'
  },
  {
    id: 'txn008',
    userId: 'user002',
    amount: 127.50,
    location: 'Beverly Hills',
    timestamp: new Date('2024-06-01T13:45:00'),
    riskScore: 8,
    status: 'legit'
  },

  // User003 (Michael Davis) - Chicago business person, higher amounts
  {
    id: 'txn009',
    userId: 'user003',
    amount: 425.30,
    location: 'Chicago',
    timestamp: new Date('2024-06-01T16:00:00'),
    riskScore: 25,
    status: 'legit'
  },
  {
    id: 'txn010',
    userId: 'user003',
    amount: 567.80,
    location: 'Evanston',
    timestamp: new Date('2024-06-01T18:30:00'),
    riskScore: 15,
    status: 'legit'
  },
  {
    id: 'txn011',
    userId: 'user003',
    amount: 299.99,
    location: 'Chicago',
    timestamp: new Date('2024-06-01T11:20:00'),
    riskScore: 20,
    status: 'legit'
  },
  {
    id: 'txn012',
    userId: 'user003',
    amount: 750.00,
    location: 'Chicago',
    timestamp: new Date('2024-06-01T19:15:00'),
    riskScore: 30,
    status: 'legit'
  }
];
