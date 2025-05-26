
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const offers = [
  {
    id: 1,
    title: "0% EMI on Credit Cards",
    description: "Shop now with 0% EMI for up to 12 months",
    bgClass: "bob-gradient",
    action: () => toast.success("Applied for 0% EMI offer!"),
  },
  {
    id: 2,
    title: "Personal Loan @8.9%",
    description: "Special rates for premium customers",
    bgClass: "gold-gradient",
    action: () => toast.success("Applied for Personal Loan offer!"),
  },
  {
    id: 3,
    title: "2% Cashback on Debit Cards",
    description: "Shop online and get 2% cashback",
    bgClass: "bg-blue-600",
    action: () => toast.success("Applied for Cashback offer!"),
  }
];

const OffersBanner: React.FC = () => {
  const [currentOffer, setCurrentOffer] = React.useState(0);

  const goToPrev = () => {
    setCurrentOffer((prev) => (prev === 0 ? offers.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentOffer((prev) => (prev === offers.length - 1 ? 0 : prev + 1));
  };

  const offer = offers[currentOffer];

  return (
    <div className={`${offer.bgClass} text-white rounded-xl p-5 shadow-md relative h-[120px] overflow-hidden`}>
      <div className="absolute top-1/2 -translate-y-1/2 left-2">
        <Button 
          size="icon" 
          variant="ghost" 
          className="h-7 w-7 bg-white/20 hover:bg-white/30 text-white rounded-full"
          onClick={goToPrev}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="text-center px-8">
        <h3 className="text-lg font-bold">{offer.title}</h3>
        <p className="text-sm mt-1 opacity-90">{offer.description}</p>
        <Button 
          size="sm" 
          className="mt-3 bg-white text-baroda-maroon hover:bg-gray-100"
          onClick={offer.action}
        >
          Apply Now
        </Button>
      </div>

      <div className="absolute top-1/2 -translate-y-1/2 right-2">
        <Button 
          size="icon" 
          variant="ghost" 
          className="h-7 w-7 bg-white/20 hover:bg-white/30 text-white rounded-full"
          onClick={goToNext}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5">
        {offers.map((_, index) => (
          <div 
            key={index} 
            className={`w-1.5 h-1.5 rounded-full ${
              currentOffer === index ? 'bg-white' : 'bg-white/30'
            }`} 
          />
        ))}
      </div>
    </div>
  );
};

export default OffersBanner;
