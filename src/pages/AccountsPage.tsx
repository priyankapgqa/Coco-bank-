
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowUpRight, ArrowDownLeft, Clock } from 'lucide-react';

const AccountsPage: React.FC = () => {
  const accounts = [
    {
      type: 'Savings Account',
      number: '1234567890',
      balance: 157890,
      transactions: [
        { id: 1, title: 'Salary Credit', amount: 52000, date: '02 Apr 2025', type: 'credit' },
        { id: 2, title: 'Online Shopping', amount: 4399, date: '01 Apr 2025', type: 'debit' },
        { id: 3, title: 'Electricity Bill', amount: 2350, date: '31 Mar 2025', type: 'debit' },
        { id: 4, title: 'Fund Transfer', amount: 15000, date: '29 Mar 2025', type: 'debit' },
        { id: 5, title: 'Interest Credit', amount: 1250, date: '28 Mar 2025', type: 'credit' },
      ],
    },
    {
      type: 'Current Account',
      number: '9876543210',
      balance: 478500,
      transactions: [
        { id: 1, title: 'Client Payment', amount: 150000, date: '01 Apr 2025', type: 'credit' },
        { id: 2, title: 'Office Rent', amount: 45000, date: '31 Mar 2025', type: 'debit' },
        { id: 3, title: 'Utility Bills', amount: 12500, date: '30 Mar 2025', type: 'debit' },
        { id: 4, title: 'Vendor Payment', amount: 78500, date: '28 Mar 2025', type: 'debit' },
        { id: 5, title: 'GST Refund', amount: 35600, date: '25 Mar 2025', type: 'credit' },
      ],
    },
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">My Accounts</h1>
        <p className="text-muted-foreground">View and manage your accounts</p>
      </div>

      <Tabs defaultValue="savings">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="savings">Savings Account</TabsTrigger>
          <TabsTrigger value="current">Current Account</TabsTrigger>
        </TabsList>

        {accounts.map((account, index) => (
          <TabsContent 
            key={account.type} 
            value={account.type.toLowerCase().split(' ')[0]}
            className="space-y-6"
          >
            <Card className="mt-4">
              <CardHeader className="bob-gradient text-white">
                <CardTitle className="flex justify-between">
                  <div>
                    <p className="text-sm font-normal opacity-90">Account Number</p>
                    <p className="font-semibold">••••{account.number.slice(-4)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-normal opacity-90">Available Balance</p>
                    <p className="font-semibold text-xl">{formatCurrency(account.balance)}</p>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-3 bg-baroda-gray rounded-md">
                    <ArrowDownLeft className="h-5 w-5 text-green-600 mx-auto mb-1" />
                    <p className="text-xs text-muted-foreground">Income</p>
                    <p className="font-semibold">{formatCurrency(53250)}</p>
                  </div>
                  <div className="text-center p-3 bg-baroda-gray rounded-md">
                    <ArrowUpRight className="h-5 w-5 text-red-600 mx-auto mb-1" />
                    <p className="text-xs text-muted-foreground">Expenses</p>
                    <p className="font-semibold">{formatCurrency(21749)}</p>
                  </div>
                  <div className="text-center p-3 bg-baroda-gray rounded-md">
                    <Clock className="h-5 w-5 text-baroda-maroon mx-auto mb-1" />
                    <p className="text-xs text-muted-foreground">Upcoming</p>
                    <p className="font-semibold">{formatCurrency(8500)}</p>
                  </div>
                </div>

                <h3 className="font-semibold mb-3">Recent Transactions</h3>
                <div className="space-y-3">
                  {account.transactions.map((transaction) => (
                    <div key={transaction.id} className="flex justify-between items-center p-3 bg-baroda-gray rounded-md">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          transaction.type === 'credit' ? 'bg-green-100' : 'bg-red-100'
                        }`}>
                          {transaction.type === 'credit' ? (
                            <ArrowDownLeft className="h-4 w-4 text-green-600" />
                          ) : (
                            <ArrowUpRight className="h-4 w-4 text-red-600" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-sm">{transaction.title}</p>
                          <p className="text-xs text-muted-foreground">{transaction.date}</p>
                        </div>
                      </div>
                      <p className={`font-medium ${
                        transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {transaction.type === 'credit' ? '+' : '-'}{formatCurrency(transaction.amount)}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default AccountsPage;
