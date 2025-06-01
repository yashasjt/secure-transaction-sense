
export interface Transaction {
  id: string;
  userId: string;
  amount: number;
  location: string;
  timestamp: Date;
  riskScore: number;
  status: 'pending' | 'legit' | 'fraud';
  isNew?: boolean;
}

export interface UserProfile {
  id: string;
  name: string;
  averageAmount: number;
  commonLocations: string[];
  usualTimeRange: { start: number; end: number };
  transactionHistory: Transaction[];
}

export interface FraudAlert {
  transactionId: string;
  message: string;
  riskScore: number;
  timestamp: Date;
}
