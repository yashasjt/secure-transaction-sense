
import { Transaction, UserProfile } from '@/types/fraud';

export class FraudDetectionEngine {
  private userProfiles: Map<string, UserProfile> = new Map();

  constructor() {
    this.initializeProfiles();
  }

  private initializeProfiles() {
    // Initialize with mock user profiles
    const profiles: UserProfile[] = [
      {
        id: 'user001',
        name: 'John Smith',
        averageAmount: 250,
        commonLocations: ['New York', 'Brooklyn', 'Manhattan'],
        usualTimeRange: { start: 9, end: 18 },
        transactionHistory: []
      },
      {
        id: 'user002',
        name: 'Emma Johnson',
        averageAmount: 150,
        commonLocations: ['Los Angeles', 'Santa Monica', 'Beverly Hills'],
        usualTimeRange: { start: 10, end: 16 },
        transactionHistory: []
      },
      {
        id: 'user003',
        name: 'Michael Davis',
        averageAmount: 400,
        commonLocations: ['Chicago', 'Evanston'],
        usualTimeRange: { start: 8, end: 20 },
        transactionHistory: []
      }
    ];

    profiles.forEach(profile => {
      this.userProfiles.set(profile.id, profile);
    });
  }

  calculateRiskScore(transaction: Transaction): number {
    const profile = this.userProfiles.get(transaction.userId);
    if (!profile) return 50; // Default risk for unknown user

    let riskScore = 0;
    const factors = [];

    // Amount analysis
    const amountDeviation = Math.abs(transaction.amount - profile.averageAmount) / profile.averageAmount;
    if (amountDeviation > 2) {
      riskScore += 40;
      factors.push('unusual_amount');
    } else if (amountDeviation > 1) {
      riskScore += 20;
      factors.push('moderate_amount_deviation');
    }

    // Location analysis
    if (!profile.commonLocations.includes(transaction.location)) {
      riskScore += 30;
      factors.push('unknown_location');
    }

    // Time analysis
    const hour = transaction.timestamp.getHours();
    if (hour < profile.usualTimeRange.start || hour > profile.usualTimeRange.end) {
      riskScore += 20;
      factors.push('unusual_time');
    }

    // Recent transaction frequency
    const recentTransactions = profile.transactionHistory.filter(t => 
      Date.now() - t.timestamp.getTime() < 3600000 // Last hour
    );
    if (recentTransactions.length > 3) {
      riskScore += 15;
      factors.push('high_frequency');
    }

    return Math.min(riskScore, 100);
  }

  updateProfile(transaction: Transaction, confirmedStatus: 'legit' | 'fraud') {
    const profile = this.userProfiles.get(transaction.userId);
    if (!profile) return;

    // Add transaction to history
    transaction.status = confirmedStatus;
    profile.transactionHistory.push(transaction);

    // Update profile if transaction is legitimate
    if (confirmedStatus === 'legit') {
      // Update average amount (weighted average)
      const weight = 0.1;
      profile.averageAmount = profile.averageAmount * (1 - weight) + transaction.amount * weight;

      // Add location if not already known
      if (!profile.commonLocations.includes(transaction.location)) {
        profile.commonLocations.push(transaction.location);
      }

      // Adjust time range if needed
      const hour = transaction.timestamp.getHours();
      if (hour < profile.usualTimeRange.start) {
        profile.usualTimeRange.start = Math.max(hour, profile.usualTimeRange.start - 1);
      }
      if (hour > profile.usualTimeRange.end) {
        profile.usualTimeRange.end = Math.min(hour, profile.usualTimeRange.end + 1);
      }
    }

    console.log(`Updated profile for ${profile.name}:`, profile);
  }

  getUserProfiles(): UserProfile[] {
    return Array.from(this.userProfiles.values());
  }

  getUserProfile(userId: string): UserProfile | undefined {
    return this.userProfiles.get(userId);
  }
}

export const fraudEngine = new FraudDetectionEngine();
