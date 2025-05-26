
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Edit, Trash2, User, Search } from 'lucide-react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter,
  DialogDescription,
  DialogClose
} from '@/components/ui/dialog';
import { toast } from 'sonner';

interface Beneficiary {
  id: string;
  name: string;
  accountNumber: string;
  bankName: string;
  ifsc: string;
  lastTransfer?: string;
}

const BeneficiariesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>([
    {
      id: '1',
      name: 'Rahul Sharma',
      accountNumber: '78901234560',
      bankName: 'State Bank of India',
      ifsc: 'SBIN0001234',
      lastTransfer: '29 Mar 2025'
    },
    {
      id: '2',
      name: 'Priya Patel',
      accountNumber: '45678901230',
      bankName: 'ICICI Bank',
      ifsc: 'ICIC0005678',
      lastTransfer: '15 Mar 2025'
    },
    {
      id: '3',
      name: 'Amit Singh',
      accountNumber: '12345678900',
      bankName: 'HDFC Bank',
      ifsc: 'HDFC0009012',
      lastTransfer: '10 Mar 2025'
    }
  ]);

  const [formData, setFormData] = useState({
    name: '',
    accountNumber: '',
    confirmAccountNumber: '',
    bankName: '',
    ifsc: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleAddBeneficiary = () => {
    if (formData.accountNumber !== formData.confirmAccountNumber) {
      toast.error("Account numbers don't match");
      return;
    }

    const newBeneficiary: Beneficiary = {
      id: Date.now().toString(),
      name: formData.name,
      accountNumber: formData.accountNumber,
      bankName: formData.bankName,
      ifsc: formData.ifsc
    };

    setBeneficiaries([...beneficiaries, newBeneficiary]);
    toast.success("Beneficiary added successfully");
    
    // Reset form
    setFormData({
      name: '',
      accountNumber: '',
      confirmAccountNumber: '',
      bankName: '',
      ifsc: ''
    });
  };

  const handleDelete = (id: string) => {
    setBeneficiaries(beneficiaries.filter(b => b.id !== id));
    toast.success("Beneficiary deleted successfully");
  };

  const filteredBeneficiaries = beneficiaries.filter(
    beneficiary => beneficiary.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Manage Beneficiaries</h1>
        <p className="text-muted-foreground">Add and manage your payment recipients</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search beneficiaries" 
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-baroda-maroon">
              <Plus className="h-4 w-4 mr-2" />
              Add Beneficiary
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Beneficiary</DialogTitle>
              <DialogDescription>
                Add a new beneficiary to transfer funds quickly
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Beneficiary Name</Label>
                <Input 
                  id="name" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  placeholder="Enter full name" 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="accountNumber">Account Number</Label>
                <Input 
                  id="accountNumber" 
                  name="accountNumber" 
                  value={formData.accountNumber} 
                  onChange={handleChange} 
                  placeholder="Enter account number" 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirmAccountNumber">Confirm Account Number</Label>
                <Input 
                  id="confirmAccountNumber" 
                  name="confirmAccountNumber" 
                  value={formData.confirmAccountNumber} 
                  onChange={handleChange} 
                  placeholder="Re-enter account number" 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="bankName">Bank Name</Label>
                <Input 
                  id="bankName" 
                  name="bankName" 
                  value={formData.bankName} 
                  onChange={handleChange} 
                  placeholder="Enter bank name" 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="ifsc">IFSC Code</Label>
                <Input 
                  id="ifsc" 
                  name="ifsc" 
                  value={formData.ifsc} 
                  onChange={handleChange} 
                  placeholder="Enter IFSC code" 
                />
              </div>
            </div>
            
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button 
                className="bg-baroda-maroon" 
                onClick={handleAddBeneficiary}
              >
                Add Beneficiary
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="space-y-4">
        {filteredBeneficiaries.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-8">
              <User className="h-12 w-12 text-gray-300 mb-4" />
              <p className="text-muted-foreground">No beneficiaries found</p>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="mt-4 bg-baroda-maroon">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Your First Beneficiary
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  {/* Same content as the dialog above */}
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Your Beneficiaries</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredBeneficiaries.map((beneficiary) => (
                  <div key={beneficiary.id} className="flex justify-between items-center p-4 bg-baroda-gray rounded-md">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-baroda-maroon/10 flex items-center justify-center text-baroda-maroon font-semibold">
                        {beneficiary.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium">{beneficiary.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {beneficiary.bankName} • ••••{beneficiary.accountNumber.slice(-4)}
                        </p>
                        {beneficiary.lastTransfer && (
                          <p className="text-xs text-muted-foreground">Last transfer: {beneficiary.lastTransfer}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => toast.info("Edit beneficiary")}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDelete(beneficiary.id)}
                        className="text-red-500 hover:text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default BeneficiariesPage;
