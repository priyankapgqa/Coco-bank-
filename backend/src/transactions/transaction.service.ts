
import * as accountService from '../accounts/account.service';

// Mock database for transactions
let transactions: any[] = [
  {
    id: 1,
    fromAccountId: 1,
    toAccountId: null,
    title: 'Salary Credit',
    amount: 52000,
    date: '2025-04-02',
    type: 'credit',
    remarks: 'Monthly salary'
  },
  {
    id: 2,
    fromAccountId: null,
    toAccountId: 1,
    title: 'Online Shopping',
    amount: 4399,
    date: '2025-04-01',
    type: 'debit',
    remarks: 'Amazon purchase'
  },
  {
    id: 3,
    fromAccountId: null,
    toAccountId: 1,
    title: 'Electricity Bill',
    amount: 2350,
    date: '2025-03-31',
    type: 'debit',
    remarks: 'Monthly electricity payment'
  },
  {
    id: 4,
    fromAccountId: 2,
    toAccountId: null,
    title: 'Client Payment',
    amount: 150000,
    date: '2025-04-01',
    type: 'credit',
    remarks: 'Project completion payment'
  },
  {
    id: 5,
    fromAccountId: null,
    toAccountId: 2,
    title: 'Office Rent',
    amount: 45000,
    date: '2025-03-31',
    type: 'debit',
    remarks: 'Monthly office rent'
  }
];

// Get recent transactions for a list of account IDs
export const getRecentTransactions = async (accountIds: number[]) => {
  // Filter transactions involving any of the accounts
  const accountTransactions = transactions.filter(transaction => 
    accountIds.includes(transaction.fromAccountId) || 
    accountIds.includes(transaction.toAccountId)
  );
  
  // Sort by date, most recent first
  return accountTransactions
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 10); // Return only the 10 most recent
};

// Get transaction by ID
export const getTransactionById = async (id: number) => {
  return transactions.find(transaction => transaction.id === id);
};

// Create a transfer between accounts
export const createTransfer = async (transferData: any) => {
  // Get the accounts
  const fromAccount = await accountService.getAccountById(transferData.fromAccountId);
  const toAccount = await accountService.getAccountById(transferData.toAccountId);
  
  if (!fromAccount || !toAccount) {
    throw new Error('One or both accounts not found');
  }
  
  // Generate transaction ID
  const transactionId = transactions.length + 1;
  
  // Create transaction record
  const transaction = {
    id: transactionId,
    fromAccountId: transferData.fromAccountId,
    toAccountId: transferData.toAccountId,
    amount: transferData.amount,
    date: new Date().toISOString().split('T')[0],
    remarks: transferData.remarks || '',
    title: `Transfer to ${toAccount.accountNumber.slice(-4)}`,
    type: 'transfer'
  };
  
  transactions.push(transaction);
  
  // Update account balances
  // In a real system, you'd use a transaction to ensure both operations succeed or fail together
  const updatedFromAccount = await accountService.updateAccount(fromAccount.id, {
    balance: fromAccount.balance - transferData.amount
  });
  
  const updatedToAccount = await accountService.updateAccount(toAccount.id, {
    balance: toAccount.balance + transferData.amount
  });
  
  return {
    transaction,
    fromAccount: updatedFromAccount,
    toAccount: updatedToAccount
  };
};

// Create a deposit transaction
export const createDeposit = async (accountId: number, amount: number, remarks: string) => {
  const account = await accountService.getAccountById(accountId);
  
  if (!account) {
    throw new Error('Account not found');
  }
  
  // Generate transaction ID
  const transactionId = transactions.length + 1;
  
  // Create transaction record
  const transaction = {
    id: transactionId,
    fromAccountId: null,
    toAccountId: accountId,
    amount,
    date: new Date().toISOString().split('T')[0],
    remarks,
    title: 'Deposit',
    type: 'credit'
  };
  
  transactions.push(transaction);
  
  // Update account balance
  const updatedAccount = await accountService.updateAccount(accountId, {
    balance: account.balance + amount
  });
  
  return {
    transaction,
    account: updatedAccount
  };
};

// Create a withdrawal transaction
export const createWithdrawal = async (accountId: number, amount: number, remarks: string) => {
  const account = await accountService.getAccountById(accountId);
  
  if (!account) {
    throw new Error('Account not found');
  }
  
  if (account.balance < amount) {
    throw new Error('Insufficient funds');
  }
  
  // Generate transaction ID
  const transactionId = transactions.length + 1;
  
  // Create transaction record
  const transaction = {
    id: transactionId,
    fromAccountId: accountId,
    toAccountId: null,
    amount,
    date: new Date().toISOString().split('T')[0],
    remarks,
    title: 'Withdrawal',
    type: 'debit'
  };
  
  transactions.push(transaction);
  
  // Update account balance
  const updatedAccount = await accountService.updateAccount(accountId, {
    balance: account.balance - amount
  });
  
  return {
    transaction,
    account: updatedAccount
  };
};
