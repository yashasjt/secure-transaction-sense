
import React from 'react';
import { Transaction } from '@/types/fraud';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, CheckCircle, Clock, TrendingUp } from 'lucide-react';

interface TransactionTableProps {
  transactions: Transaction[];
  onTransactionClick: (transaction: Transaction) => void;
}

const TransactionTable: React.FC<TransactionTableProps> = ({ 
  transactions, 
  onTransactionClick 
}) => {
  const getRiskBadge = (riskScore: number) => {
    if (riskScore >= 70) {
      return <Badge variant="destructive" className="flex items-center gap-1">
        <AlertTriangle className="w-3 h-3" />
        High Risk ({riskScore})
      </Badge>;
    } else if (riskScore >= 40) {
      return <Badge variant="secondary" className="flex items-center gap-1">
        <TrendingUp className="w-3 h-3" />
        Medium Risk ({riskScore})
      </Badge>;
    } else {
      return <Badge variant="outline" className="flex items-center gap-1">
        <CheckCircle className="w-3 h-3" />
        Low Risk ({riskScore})
      </Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'fraud':
        return <Badge variant="destructive">Fraud</Badge>;
      case 'legit':
        return <Badge variant="default" className="bg-green-600">Legitimate</Badge>;
      case 'pending':
        return <Badge variant="outline" className="flex items-center gap-1">
          <Clock className="w-3 h-3" />
          Pending Review
        </Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const formatDateTime = (timestamp: Date) => {
    return {
      date: timestamp.toLocaleDateString(),
      time: timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          Transaction History
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Transaction ID</TableHead>
                <TableHead>User ID</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Risk Score</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => {
                const { date, time } = formatDateTime(transaction.timestamp);
                return (
                  <TableRow
                    key={transaction.id}
                    className={`cursor-pointer hover:bg-gray-50 ${
                      transaction.isNew ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
                    }`}
                    onClick={() => onTransactionClick(transaction)}
                  >
                    <TableCell className="font-mono text-sm">
                      {transaction.id}
                    </TableCell>
                    <TableCell>{transaction.userId}</TableCell>
                    <TableCell className="font-semibold">
                      ₹{transaction.amount.toFixed(2)}
                    </TableCell>
                    <TableCell>{transaction.location}</TableCell>
                    <TableCell>{date}</TableCell>
                    <TableCell className="font-mono">{time}</TableCell>
                    <TableCell>
                      {getRiskBadge(transaction.riskScore)}
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(transaction.status)}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default TransactionTable;
