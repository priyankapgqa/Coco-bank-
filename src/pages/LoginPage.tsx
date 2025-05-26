
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import Logo from '@/components/Logo';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent, isDemoLogin: boolean = false) => {
    e.preventDefault();
    
    const loginEmail = isDemoLogin ? 'demo@cocobank.com' : email;
    const loginPassword = isDemoLogin ? 'DemoCocoBankPassword123!' : password;

    if (!loginEmail || !loginPassword) {
      toast.error('Please enter both email and password');
      return;
    }
    
    setIsLoading(true);
    
    try {
      await login(loginEmail, loginPassword);
      toast.success('Login successful');
      navigate('/');
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = (e: React.FormEvent) => {
    handleSubmit(e, true);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-baroda-gray">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-6">
            <Logo />
          </div>
          <CardTitle className="text-2xl text-center">Login to Your Account</CardTitle>
          <CardDescription className="text-center">
            Enter your email and password to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="name@example.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="password">Password</Label>
                <a href="#" className="text-xs text-baroda-maroon hover:underline">
                  Forgot password?
                </a>
              </div>
              <Input 
                id="password" 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-2">
              <Button 
                type="submit" 
                className="w-full bg-baroda-maroon hover:bg-baroda-maroon/90" 
                disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>
              <Button 
                type="button"
                variant="outline" 
                className="w-full" 
                onClick={handleDemoLogin}
                disabled={isLoading}
              >
                Demo Login
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col">
          <div className="text-center text-sm text-muted-foreground mt-2">
            Don't have an account?{' '}
            <a href="#" className="text-baroda-maroon hover:underline">
              Register
            </a>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginPage;

