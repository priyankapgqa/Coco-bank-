
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CreditCard, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface AccountCardProps {
  accountType: string;
  accountNumber: string;
  balance: number;
}

const AccountCard: React.FC<AccountCardProps> = ({ accountType, accountNumber, balance }) => {
  const navigate = useNavigate();
  
  const formattedBalance = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(balance);
  
  const maskedAccountNumber = accountNumber.replace(/\d(?=\d{4})/g, "•");
  
  const handleClick = () => {
    navigate('/accounts');
  };
  
  return (
    <Card 
      className="overflow-hidden bg-white border-none shadow-md hover:shadow-lg transition-shadow cursor-pointer"
      onClick={handleClick}
    >
      <div className="h-2 bob-gradient" />
      <CardContent className="p-5">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm text-muted-foreground">{accountType}</p>
            <div className="flex items-center mt-1">
              <CreditCard className="h-4 w-4 mr-2 text-baroda-maroon" />
              <p className="text-sm font-medium">{maskedAccountNumber}</p>
            </div>
          </div>
          <div className="text-right flex flex-col items-end">
            <p className="text-sm text-muted-foreground">Balance</p>
            <p className="text-xl font-bold text-baroda-maroon">{formattedBalance}</p>
            <ChevronRight className="h-4 w-4 text-gray-400 mt-2" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AccountCard;
