import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from './Logo';
import { Home, CreditCard, ArrowLeftRight, Settings, Users, Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';

const navItems = [
  { icon: Home, label: 'Dashboard', path: '/' },
  { icon: CreditCard, label: 'Accounts', path: '/accounts' },
  { icon: ArrowLeftRight, label: 'Transfers', path: '/transfers' },
  { icon: Wallet, label: 'Payments', path: '/payments' },
  { icon: Users, label: 'Beneficiaries', path: '/beneficiaries' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

const Sidebar: React.FC = () => {
  const location = useLocation();
  
  return (
    <div className="h-full w-full flex flex-col p-4 bg-baroda-light border-r">
      <div className="mb-8 px-4 pt-4 block md:hidden">
        <Logo />
      </div>
      
      <div className="space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                isActive 
                  ? 'bg-baroda-maroon text-white' 
                  : 'hover:bg-baroda-gray'
              }`}
            >
              <item.icon className={`h-5 w-5 ${isActive ? 'text-white' : 'text-baroda-maroon'}`} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
      
      <div className="mt-auto mb-6 mx-3 p-4 rounded-lg bob-gradient text-white">
        <h3 className="font-medium text-sm">Need Help?</h3>
        <p className="text-xs mt-1 opacity-90">Contact our 24/7 customer support</p>
        <div className="mt-3">
          <Button 
            onClick={() => window.location.href = 'tel:1800-XXX-XXXX'} 
            className="text-xs font-medium bg-white/20 hover:bg-white/30 rounded-md px-3 py-1.5 text-center w-full"
          >
            1800-XXX-XXXX
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
