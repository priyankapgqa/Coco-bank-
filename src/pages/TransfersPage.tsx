import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import bankingService, { Account } from '@/services/bankingService';

const TransfersPage: React.FC = () => {
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const [sourceAccount, setSourceAccount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        setLoading(true);
        const fetchedAccounts = [
          {
            id: '1',
            accountType: 'Savings Account',
            accountNumber: '1234567890',
            balance: 157890,
            currency: 'INR',
            isActive: true,
          },
          {
            id: '2',
            accountType: 'Current Account',
            accountNumber: '9876543210',
            balance: 478500,
            currency: 'INR',
            isActive: true,
          }
        ];
        setAccounts(fetchedAccounts);
      } catch (error) {
        console.error('Error fetching accounts:', error);
        toast.error('Failed to load account information');
      } finally {
        setLoading(false);
      }
    };

    fetchAccounts();
  }, []);

  const handleTransfer = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!amount || !recipient || !sourceAccount) {
      toast.error('Please fill in all fields');
      return;
    }
    
    setIsProcessing(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success(`Successfully transferred ₹${amount} to ${recipient}`);
      setAmount('');
      setRecipient('');
    } catch (error) {
      console.error('Transfer error:', error);
      toast.error('Transfer failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Fund Transfer</h1>
        <p className="text-muted-foreground">Transfer funds to your contacts or other bank accounts</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>New Transfer</CardTitle>
            <CardDescription>
              Send money to your beneficiaries
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleTransfer} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="sourceAccount">From Account</Label>
                <Select
                  value={sourceAccount}
                  onValueChange={setSourceAccount}
                >
                  <SelectTrigger id="sourceAccount">
                    <SelectValue placeholder="Select account" />
                  </SelectTrigger>
                  <SelectContent>
                    {accounts.map(account => (
                      <SelectItem key={account.id} value={account.id}>
                        {account.accountType} - ••••{account.accountNumber.slice(-4)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="recipient">To Account</Label>
                <Select
                  value={recipient}
                  onValueChange={setRecipient}
                >
                  <SelectTrigger id="recipient">
                    <SelectValue placeholder="Select recipient" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rahul">Rahul Sharma - SBI</SelectItem>
                    <SelectItem value="priya">Priya Patel - ICICI</SelectItem>
                    <SelectItem value="amit">Amit Singh - HDFC</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="amount">Amount (₹)</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="remarks">Remarks (Optional)</Label>
                <Input
                  id="remarks"
                  placeholder="Add a note"
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-baroda-maroon hover:bg-baroda-maroon/90"
                disabled={isProcessing}
              >
                {isProcessing ? 'Processing...' : 'Transfer Money'}
              </Button>
            </form>
          </CardContent>
        </Card>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Beneficiaries</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {['Rahul Sharma', 'Priya Patel', 'Amit Singh'].map((name, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-baroda-gray rounded-md">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-baroda-maroon/10 flex items-center justify-center text-baroda-maroon font-semibold">
                        {name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium">{name}</p>
                        <p className="text-xs text-muted-foreground">Last transaction: 29 Mar 2025</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Select
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Transfer Limits</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex justify-between items-center text-sm">
                  <span>NEFT Transfer</span>
                  <span className="font-semibold">₹10,00,000 / day</span>
                </li>
                <li className="flex justify-between items-center text-sm">
                  <span>IMPS Transfer</span>
                  <span className="font-semibold">₹5,00,000 / day</span>
                </li>
                <li className="flex justify-between items-center text-sm">
                  <span>UPI Transfer</span>
                  <span className="font-semibold">₹1,00,000 / day</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TransfersPage;
