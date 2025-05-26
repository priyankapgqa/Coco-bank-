
import React from 'react';
import AccountCard from '@/components/AccountCard';
import QuickActions from '@/components/QuickActions';
import RecentTransactions from '@/components/RecentTransactions';
import OffersBanner from '@/components/OffersBanner';

const Dashboard: React.FC = () => {
  const accounts = [
    {
      accountType: 'Savings Account',
      accountNumber: '1234567890',
      balance: 157890,
    },
    {
      accountType: 'Current Account',
      accountNumber: '9876543210',
      balance: 478500,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Welcome Back, Aditya</h1>
        <p className="text-muted-foreground">Here's your financial summary</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {accounts.map((account, index) => (
          <AccountCard
            key={index}
            accountType={account.accountType}
            accountNumber={account.accountNumber}
            balance={account.balance}
          />
        ))}
      </div>
      
      <div className="py-2">
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
        <QuickActions />
      </div>
      
      <div className="py-2">
        <OffersBanner />
      </div>
      
      <div className="py-2">
        <RecentTransactions />
      </div>
    </div>
  );
};

export default Dashboard;
