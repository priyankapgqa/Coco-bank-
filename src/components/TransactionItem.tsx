
import React from 'react';
import { ArrowDownLeft, ArrowUpRight } from 'lucide-react';

interface TransactionItemProps {
  id: string;
  title: string;
  description: string;
  amount: number;
  date: string;
  type: 'credit' | 'debit';
}

const TransactionItem: React.FC<TransactionItemProps> = ({
  title,
  description,
  amount,
  date,
  type,
}) => {
  const formattedAmount = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
  
  return (
    <div className="flex items-center justify-between py-3 border-b last:border-0">
      <div className="flex items-center">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
          type === 'credit' ? 'bg-green-100' : 'bg-red-100'
        }`}>
          {type === 'credit' ? (
            <ArrowDownLeft className="h-4 w-4 text-green-600" />
          ) : (
            <ArrowUpRight className="h-4 w-4 text-red-600" />
          )}
        </div>
        <div>
          <p className="font-medium text-sm">{title}</p>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
      </div>
      <div className="text-right">
        <p className={`font-medium ${
          type === 'credit' ? 'text-green-600' : 'text-red-600'
        }`}>
          {type === 'credit' ? '+' : '-'}{formattedAmount}
        </p>
        <p className="text-xs text-muted-foreground">{date}</p>
      </div>
    </div>
  );
};

export default TransactionItem;
