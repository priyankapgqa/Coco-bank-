
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeftRight, CreditCard, Wallet, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const QuickActions: React.FC = () => {
  const navigate = useNavigate();
  
  const actions = [
    { 
      icon: ArrowLeftRight, 
      label: 'Transfer', 
      color: 'bg-baroda-maroon text-white',
      action: () => navigate('/transfers')
    },
    { 
      icon: CreditCard, 
      label: 'Pay Bills', 
      color: 'bg-baroda-gold text-baroda-dark',
      action: () => navigate('/payments')
    },
    { 
      icon: Wallet, 
      label: 'Recharge', 
      color: 'bg-blue-600 text-white',
      action: () => navigate('/payments')
    },
    { 
      icon: Users, 
      label: 'Beneficiaries', 
      color: 'bg-gray-800 text-white',
      action: () => navigate('/beneficiaries')
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-2 sm:gap-4">
      {actions.map((action, index) => (
        <Button
          key={index}
          variant="outline"
          className="flex flex-col items-center h-auto py-3 px-1 gap-2 border shadow-sm hover:shadow-md transition-shadow"
          onClick={action.action}
        >
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${action.color}`}>
            <action.icon className="h-5 w-5" />
          </div>
          <span className="text-xs font-medium">{action.label}</span>
        </Button>
      ))}
    </div>
  );
};

export default QuickActions;
