
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CreditCard, Smartphone, Zap, Lightbulb, Wifi } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

const PaymentsPage: React.FC = () => {
  const handlePayment = (type: string) => {
    toast.success(`${type} payment initiated successfully!`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Payments & Recharge</h1>
        <p className="text-muted-foreground">Pay bills and recharge your services</p>
      </div>

      <Tabs defaultValue="bills">
        <TabsList className="grid grid-cols-2">
          <TabsTrigger value="bills">Pay Bills</TabsTrigger>
          <TabsTrigger value="recharge">Recharge</TabsTrigger>
        </TabsList>

        <TabsContent value="bills" className="space-y-4 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <Zap className="h-6 w-6 text-yellow-500 mb-2" />
                <CardTitle className="text-base">Electricity</CardTitle>
              </CardHeader>
              <CardContent>
                <Button 
                  className="w-full mt-2"
                  onClick={() => handlePayment('Electricity')}
                >
                  Pay Now
                </Button>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <Wifi className="h-6 w-6 text-blue-500 mb-2" />
                <CardTitle className="text-base">Internet</CardTitle>
              </CardHeader>
              <CardContent>
                <Button 
                  className="w-full mt-2"
                  onClick={() => handlePayment('Internet')}
                >
                  Pay Now
                </Button>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CreditCard className="h-6 w-6 text-purple-500 mb-2" />
                <CardTitle className="text-base">Credit Card</CardTitle>
              </CardHeader>
              <CardContent>
                <Button 
                  className="w-full mt-2"
                  onClick={() => handlePayment('Credit Card')}
                >
                  Pay Now
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Quick Bill Payment</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4" onSubmit={(e) => {
                e.preventDefault();
                toast.success("Bill payment successful!");
              }}>
                <div className="space-y-2">
                  <Label htmlFor="category">Bill Category</Label>
                  <select 
                    id="category" 
                    className="w-full border border-input bg-background h-10 px-3 py-2 rounded-md"
                  >
                    <option value="electricity">Electricity</option>
                    <option value="water">Water</option>
                    <option value="internet">Internet</option>
                    <option value="creditcard">Credit Card</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="biller">Biller/Provider</Label>
                  <Input type="text" id="biller" placeholder="Enter biller name" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="amount">Amount</Label>
                  <Input type="number" id="amount" placeholder="Enter amount" />
                </div>

                <Button type="submit" className="w-full bg-baroda-maroon">Pay Bill</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recharge" className="space-y-4 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <Smartphone className="h-6 w-6 text-green-500 mb-2" />
                <CardTitle className="text-base">Mobile</CardTitle>
              </CardHeader>
              <CardContent>
                <Button 
                  className="w-full mt-2"
                  onClick={() => handlePayment('Mobile')}
                >
                  Recharge
                </Button>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <Lightbulb className="h-6 w-6 text-amber-500 mb-2" />
                <CardTitle className="text-base">DTH</CardTitle>
              </CardHeader>
              <CardContent>
                <Button 
                  className="w-full mt-2"
                  onClick={() => handlePayment('DTH')}
                >
                  Recharge
                </Button>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <Wifi className="h-6 w-6 text-blue-500 mb-2" />
                <CardTitle className="text-base">Broadband</CardTitle>
              </CardHeader>
              <CardContent>
                <Button 
                  className="w-full mt-2"
                  onClick={() => handlePayment('Broadband')}
                >
                  Recharge
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Mobile Recharge</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4" onSubmit={(e) => {
                e.preventDefault();
                toast.success("Mobile recharge successful!");
              }}>
                <div className="space-y-2">
                  <Label htmlFor="mobile">Mobile Number</Label>
                  <Input type="tel" id="mobile" placeholder="Enter 10 digit mobile number" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="operator">Operator</Label>
                  <select 
                    id="operator" 
                    className="w-full border border-input bg-background h-10 px-3 py-2 rounded-md"
                  >
                    <option value="jio">Jio</option>
                    <option value="airtel">Airtel</option>
                    <option value="vi">Vi</option>
                    <option value="bsnl">BSNL</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="plan">Select Plan</Label>
                  <select 
                    id="plan" 
                    className="w-full border border-input bg-background h-10 px-3 py-2 rounded-md"
                  >
                    <option value="199">₹199 - 1.5GB/day, 28 days</option>
                    <option value="249">₹249 - 2GB/day, 28 days</option>
                    <option value="399">₹399 - 2.5GB/day, 56 days</option>
                    <option value="666">₹666 - 1.5GB/day, 84 days</option>
                  </select>
                </div>

                <Button type="submit" className="w-full bg-baroda-maroon">Recharge Now</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PaymentsPage;
