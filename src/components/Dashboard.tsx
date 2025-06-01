
import React, { useState, useEffect } from 'react';
import { Transaction } from '@/types/fraud';
import { fraudEngine } from '@/utils/fraudDetection';
import { mockTransactions } from '@/data/mockTransactions';
import TransactionTable from './TransactionTable';
import TransactionForm from './TransactionForm';
import FraudAlert from './FraudAlert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LogOut, Shield, AlertTriangle, CheckCircle, TrendingUp, Users } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface DashboardProps {
  username: string;
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ username, onLogout }) => {
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  const [alertTransaction, setAlertTransaction] = useState<Transaction | null>(null);

  // Initialize fraud engine with existing transactions
  useEffect(() => {
    mockTransactions.forEach(transaction => {
      if (transaction.status !== 'pending') {
        fraudEngine.updateProfile(transaction, transaction.status as 'legit' | 'fraud');
      }
    });
  }, []);

  const handleNewTransaction = (transactionData: {
    userId: string;
    amount: number;
    location: string;
    timestamp: Date;
  }) => {
    const newTransaction: Transaction = {
      id: `txn${Date.now()}`,
      ...transactionData,
      riskScore: 0,
      status: 'pending',
      isNew: true
    };

    // Calculate risk score using AI engine
    newTransaction.riskScore = fraudEngine.calculateRiskScore(newTransaction);

    // Add transaction to list
    setTransactions(prev => [newTransaction, ...prev]);

    // Show alert if high risk
    if (newTransaction.riskScore >= 40) {
      setAlertTransaction(newTransaction);
    } else {
      // Auto-approve low risk transactions
      newTransaction.status = 'legit';
      fraudEngine.updateProfile(newTransaction, 'legit');
      toast({
        title: "Transaction Approved",
        description: `Low risk transaction (${newTransaction.riskScore}/100) automatically approved.`,
      });
    }
  };

  const handleTransactionConfirm = (transactionId: string, status: 'legit' | 'fraud') => {
    setTransactions(prev => 
      prev.map(transaction => 
        transaction.id === transactionId 
          ? { ...transaction, status, isNew: false }
          : transaction
      )
    );

    // Update AI model with feedback
    const transaction = transactions.find(t => t.id === transactionId);
    if (transaction) {
      fraudEngine.updateProfile(transaction, status);
      
      toast({
        title: "Transaction Updated",
        description: `Transaction marked as ${status}. AI model updated with feedback.`,
      });
    }

    setAlertTransaction(null);
  };

  const handleTransactionClick = (transaction: Transaction) => {
    if (transaction.status === 'pending') {
      setAlertTransaction(transaction);
    }
  };

  // Calculate statistics
  const stats = {
    total: transactions.length,
    pending: transactions.filter(t => t.status === 'pending').length,
    fraud: transactions.filter(t => t.status === 'fraud').length,
    highRisk: transactions.filter(t => t.riskScore >= 70).length
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  Fraud Detection System
                </h1>
                <p className="text-sm text-gray-500">AI-Powered Transaction Monitoring</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">Welcome, {username}</span>
              <Button
                onClick={onLogout}
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600">Total Transactions</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600">Pending Review</p>
                  <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
                </div>
                <AlertTriangle className="w-8 h-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600">Fraud Detected</p>
                  <p className="text-2xl font-bold text-red-600">{stats.fraud}</p>
                </div>
                <Shield className="w-8 h-8 text-red-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600">High Risk</p>
                  <p className="text-2xl font-bold text-orange-600">{stats.highRisk}</p>
                </div>
                <Users className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <TransactionTable 
              transactions={transactions}
              onTransactionClick={handleTransactionClick}
            />
          </div>
          <div>
            <TransactionForm onSubmit={handleNewTransaction} />
          </div>
        </div>
      </div>

      {/* Fraud Alert Modal */}
      {alertTransaction && (
        <FraudAlert
          transaction={alertTransaction}
          onConfirm={handleTransactionConfirm}
          onClose={() => setAlertTransaction(null)}
        />
      )}
    </div>
  );
};

export default Dashboard;
