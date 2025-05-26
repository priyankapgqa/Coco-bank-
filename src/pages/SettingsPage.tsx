
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { 
  BellRing, 
  Smartphone, 
  Lock, 
  Languages, 
  User, 
  CreditCard 
} from 'lucide-react';

const SettingsPage: React.FC = () => {
  const [profileForm, setProfileForm] = React.useState({
    name: 'Aditya Sharma',
    email: 'aditya.sharma@example.com',
    phone: '+91 9876543210'
  });

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Profile updated successfully");
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Password changed successfully");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Manage your account settings</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="h-5 w-5 mr-2" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleProfileUpdate} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name" 
                    value={profileForm.name} 
                    onChange={(e) => setProfileForm({...profileForm, name: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    value={profileForm.email} 
                    onChange={(e) => setProfileForm({...profileForm, email: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Mobile Number</Label>
                  <Input 
                    id="phone" 
                    value={profileForm.phone} 
                    onChange={(e) => setProfileForm({...profileForm, phone: e.target.value})}
                  />
                </div>

                <Button type="submit" className="bg-baroda-maroon">
                  Save Changes
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Lock className="h-5 w-5 mr-2" />
                Security Settings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePasswordChange} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input id="currentPassword" type="password" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input id="newPassword" type="password" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input id="confirmPassword" type="password" />
                </div>

                <Button type="submit" className="bg-baroda-maroon">
                  Change Password
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BellRing className="h-5 w-5 mr-2" />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Transaction Alerts</p>
                    <p className="text-xs text-muted-foreground">Get notified for all transactions</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Bill Payment Reminders</p>
                    <p className="text-xs text-muted-foreground">Get reminded before bill due dates</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Promotional Offers</p>
                    <p className="text-xs text-muted-foreground">Receive updates on new offers</p>
                  </div>
                  <Switch />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Smartphone className="h-5 w-5 mr-2" />
                Linked Devices
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-baroda-gray rounded-md">
                  <div>
                    <p className="font-medium">iPhone 13 Pro</p>
                    <p className="text-xs text-muted-foreground">Last active: 2 hours ago</p>
                  </div>
                  <Button variant="outline" size="sm" 
                    onClick={() => toast.success("Device removed successfully")}
                  >
                    Remove
                  </Button>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-baroda-gray rounded-md">
                  <div>
                    <p className="font-medium">MacBook Pro</p>
                    <p className="text-xs text-muted-foreground">Last active: Now</p>
                  </div>
                  <Button variant="outline" size="sm" 
                    onClick={() => toast.success("Device removed successfully")}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Languages className="h-5 w-5 mr-2" />
                Language & Region
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <select 
                    id="language" 
                    className="w-full border border-input bg-background h-10 px-3 py-2 rounded-md"
                    defaultValue="english"
                  >
                    <option value="english">English</option>
                    <option value="hindi">Hindi</option>
                    <option value="gujarati">Gujarati</option>
                    <option value="marathi">Marathi</option>
                  </select>
                </div>
                
                <Button className="w-full mt-2"
                  onClick={() => toast.success("Language settings updated")}
                >
                  Save Preferences
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
