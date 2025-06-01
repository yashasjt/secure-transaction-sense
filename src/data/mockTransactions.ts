
import { Transaction } from '@/types/fraud';

export const mockTransactions: Transaction[] = [
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
    amount: 1250.00,
    location: 'Miami',
    timestamp: new Date('2024-06-01T23:45:00'),
    riskScore: 85,
    status: 'fraud'
  },
  {
    id: 'txn003',
    userId: 'user002',
    amount: 156.75,
    location: 'Los Angeles',
    timestamp: new Date('2024-06-01T12:15:00'),
    riskScore: 10,
    status: 'legit'
  },
  {
    id: 'txn004',
    userId: 'user002',
    amount: 2100.00,
    location: 'London',
    timestamp: new Date('2024-06-01T03:20:00'),
    riskScore: 95,
    status: 'pending'
  },
  {
    id: 'txn005',
    userId: 'user003',
    amount: 425.30,
    location: 'Chicago',
    timestamp: new Date('2024-06-01T16:00:00'),
    riskScore: 25,
    status: 'legit'
  }
];
