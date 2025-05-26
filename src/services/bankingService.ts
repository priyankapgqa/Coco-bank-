
import api from './api';

export interface Account {
  id: string;
  accountType: string;
  accountNumber: string;
  balance: number;
  currency: string;
  isActive: boolean;
}

export interface Transaction {
  id: string;
  title: string;
  amount: number;
  date: string;
  type: 'credit' | 'debit';
  description?: string;
  category?: string;
}

export interface TransferRequest {
  fromAccount: string;
  toAccount: string;
  amount: number;
  remarks?: string;
}

// User accounts endpoints
const getAccounts = async (): Promise<Account[]> => {
  const response = await api.get('/accounts');
  return response.data;
};

const getAccountDetails = async (accountId: string): Promise<Account> => {
  const response = await api.get(`/accounts/${accountId}`);
  return response.data;
};

// Transaction endpoints
const getTransactions = async (accountId: string): Promise<Transaction[]> => {
  const response = await api.get(`/accounts/${accountId}/transactions`);
  return response.data;
};

const getRecentTransactions = async (): Promise<Transaction[]> => {
  const response = await api.get('/transactions/recent');
  return response.data;
};

// Transfer funds
const transferFunds = async (transferData: TransferRequest): Promise<any> => {
  const response = await api.post('/transactions/transfer', transferData);
  return response.data;
};

// Mock user data
const mockDemoUser = {
  id: '123',
  email: 'demo@cocobank.com',
  firstName: 'Demo',
  lastName: 'User',
  token: 'mock-jwt-token-for-demo-user'
};

// User authentication - with mock implementation
const login = async (email?: string, password?: string): Promise<any> => {
  // Mock successful login without calling API
  const loginEmail = email || 'demo@cocobank.com';
  const loginPassword = password || 'DemoCocoBankPassword123!';
  
  // Simple validation (in a real app, this would be server-side)
  if (loginEmail === 'demo@cocobank.com' && loginPassword === 'DemoCocoBankPassword123!') {
    // Store token in localStorage
    localStorage.setItem('authToken', mockDemoUser.token);
    return {
      token: mockDemoUser.token,
      user: {
        id: mockDemoUser.id,
        email: mockDemoUser.email,
        firstName: mockDemoUser.firstName,
        lastName: mockDemoUser.lastName
      }
    };
  } else {
    // Simulate API error for invalid credentials
    throw new Error('Invalid email or password');
  }
};

const logout = (): void => {
  localStorage.removeItem('authToken');
};

const isAuthenticated = (): boolean => {
  return !!localStorage.getItem('authToken');
};

// Bills payment
const getBillersList = async (): Promise<any[]> => {
  const response = await api.get('/payments/billers');
  return response.data;
};

const payBill = async (billData: any): Promise<any> => {
  const response = await api.post('/payments/pay-bill', billData);
  return response.data;
};

const bankingService = {
  getAccounts,
  getAccountDetails,
  getTransactions,
  getRecentTransactions,
  transferFunds,
  login,
  logout,
  isAuthenticated,
  getBillersList,
  payBill
};

export default bankingService;
