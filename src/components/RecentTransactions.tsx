
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import TransactionItem from './TransactionItem';

const mockTransactions = [
  {
    id: '1',
    title: 'Salary Credit',
    description: 'ACME Corporation',
    amount: 52000,
    date: '02 Apr 2025',
    type: 'credit' as const,
  },
  {
    id: '2',
    title: 'Online Shopping',
    description: 'Amazon.in',
    amount: 4399,
    date: '01 Apr 2025',
    type: 'debit' as const,
  },
  {
    id: '3',
    title: 'Electricity Bill',
    description: 'MSEB Power',
    amount: 2350,
    date: '31 Mar 2025',
    type: 'debit' as const,
  },
  {
    id: '4',
    title: 'Fund Transfer',
    description: 'To: Rahul Sharma',
    amount: 15000,
    date: '29 Mar 2025',
    type: 'debit' as const,
  },
  {
    id: '5',
    title: 'Interest Credit',
    description: 'Savings Account',
    amount: 1250,
    date: '28 Mar 2025',
    type: 'credit' as const,
  },
];

const RecentTransactions: React.FC = () => {
  return (
    <Card>
      <CardHeader className="px-6 py-4">
        <CardTitle className="text-lg font-semibold">Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent className="px-6 py-2">
        {mockTransactions.map((transaction) => (
          <TransactionItem
            key={transaction.id}
            id={transaction.id}
            title={transaction.title}
            description={transaction.description}
            amount={transaction.amount}
            date={transaction.date}
            type={transaction.type}
          />
        ))}
      </CardContent>
    </Card>
  );
};

export default RecentTransactions;
