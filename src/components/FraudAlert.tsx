
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, CheckCircle, X, DollarSign, MapPin, Clock } from 'lucide-react';
import { Transaction } from '@/types/fraud';

interface FraudAlertProps {
  transaction: Transaction;
  onConfirm: (transactionId: string, status: 'legit' | 'fraud') => void;
  onClose: () => void;
}

const FraudAlert: React.FC<FraudAlertProps> = ({ 
  transaction, 
  onConfirm, 
  onClose 
}) => {
  const getRiskLevel = (score: number) => {
    if (score >= 70) return { level: 'HIGH', color: 'text-red-600', bgColor: 'bg-red-50' };
    if (score >= 40) return { level: 'MEDIUM', color: 'text-yellow-600', bgColor: 'bg-yellow-50' };
    return { level: 'LOW', color: 'text-green-600', bgColor: 'bg-green-50' };
  };

  const risk = getRiskLevel(transaction.riskScore);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md">
        <CardHeader className="relative">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
          <CardTitle className="flex items-center gap-2 text-lg">
            <AlertTriangle className="w-6 h-6 text-yellow-500" />
            Fraud Detection Alert
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className={`p-4 rounded-lg ${risk.bgColor}`}>
            <div className="flex items-center justify-between">
              <span className="font-semibold">Risk Level</span>
              <Badge variant="outline" className={`${risk.color} border-current`}>
                {risk.level} ({transaction.riskScore}/100)
              </Badge>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-gray-900">Transaction Details</h4>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-gray-500" />
                <span className="font-medium">${transaction.amount.toFixed(2)}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gray-500" />
                <span>{transaction.location}</span>
              </div>
              <div className="flex items-center gap-2 col-span-2">
                <Clock className="w-4 h-4 text-gray-500" />
                <span>{transaction.timestamp.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="border-t pt-4">
            <p className="text-gray-600 text-sm mb-4">
              This transaction shows unusual patterns. Please review and confirm:
            </p>
            
            <div className="flex gap-3">
              <Button
                onClick={() => onConfirm(transaction.id, 'legit')}
                variant="outline"
                className="flex-1 border-green-600 text-green-600 hover:bg-green-50"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Legitimate
              </Button>
              <Button
                onClick={() => onConfirm(transaction.id, 'fraud')}
                variant="destructive"
                className="flex-1"
              >
                <AlertTriangle className="w-4 h-4 mr-2" />
                Fraud
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FraudAlert;
