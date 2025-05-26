
// Mock database for now
let accounts: any[] = [
  {
    id: 1,
    userId: 1,
    accountNumber: '1234567890',
    accountType: 'Savings Account',
    balance: 157890,
    currency: 'INR',
    isActive: true,
    createdAt: new Date('2025-01-15'),
    updatedAt: new Date('2025-03-20')
  },
  {
    id: 2,
    userId: 1,
    accountNumber: '9876543210',
    accountType: 'Current Account',
    balance: 478500,
    currency: 'INR',
    isActive: true,
    createdAt: new Date('2024-11-10'),
    updatedAt: new Date('2025-03-15')
  }
];

let transactions: any[] = [
  {
    id: 1,
    accountId: 1,
    title: 'Salary Credit',
    amount: 52000,
    date: '2025-04-02',
    type: 'credit'
  },
  {
    id: 2,
    accountId: 1,
    title: 'Online Shopping',
    amount: 4399,
    date: '2025-04-01',
    type: 'debit'
  },
  {
    id: 3,
    accountId: 1,
    title: 'Electricity Bill',
    amount: 2350,
    date: '2025-03-31',
    type: 'debit'
  },
  {
    id: 4,
    accountId: 2,
    title: 'Client Payment',
    amount: 150000,
    date: '2025-04-01',
    type: 'credit'
  },
  {
    id: 5,
    accountId: 2,
    title: 'Office Rent',
    amount: 45000,
    date: '2025-03-31',
    type: 'debit'
  }
];

// Get all accounts for a user
export const getAccountsByUserId = async (userId: number) => {
  return accounts.filter(account => account.userId === userId);
};

// Get account by ID
export const getAccountById = async (id: number) => {
  return accounts.find(account => account.id === id);
};

// Create a new account
export const createAccount = async (accountData: any) => {
  // Generate a unique account number
  const accountNumber = Math.floor(Math.random() * 9000000000) + 1000000000;
  
  const newAccount = {
    id: accounts.length + 1,
    userId: accountData.userId,
    accountNumber: accountNumber.toString(),
    accountType: accountData.accountType,
    balance: accountData.initialDeposit || 0,
    currency: accountData.currency,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  
  accounts.push(newAccount);
  
  // If there's an initial deposit, create a transaction
  if (accountData.initialDeposit > 0) {
    transactions.push({
      id: transactions.length + 1,
      accountId: newAccount.id,
      title: 'Initial Deposit',
      amount: accountData.initialDeposit,
      date: new Date().toISOString().split('T')[0],
      type: 'credit'
    });
  }
  
  return newAccount;
};

// Update account details
export const updateAccount = async (id: number, accountData: any) => {
  const accountIndex = accounts.findIndex(account => account.id === id);
  
  if (accountIndex !== -1) {
    accounts[accountIndex] = {
      ...accounts[accountIndex],
      ...accountData,
      updatedAt: new Date()
    };
    
    return accounts[accountIndex];
  }
  
  return null;
};

// Close an account
export const closeAccount = async (id: number) => {
  const accountIndex = accounts.findIndex(account => account.id === id);
  
  if (accountIndex !== -1) {
    accounts[accountIndex] = {
      ...accounts[accountIndex],
      isActive: false,
      updatedAt: new Date()
    };
    
    return true;
  }
  
  return false;
};

// Get transactions for an account
export const getAccountTransactions = async (accountId: number) => {
  return transactions.filter(transaction => transaction.accountId === accountId);
};
