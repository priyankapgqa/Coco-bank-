
import { Request, Response } from 'express';
import * as transactionService from './transaction.service';
import * as accountService from '../accounts/account.service';

// Get recent transactions for the user
export const getRecentTransactions = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;
    
    // Get all accounts for the user
    const userAccounts = await accountService.getAccountsByUserId(userId);
    const accountIds = userAccounts.map(account => account.id);
    
    // Get recent transactions for these accounts
    const transactions = await transactionService.getRecentTransactions(accountIds);
    
    res.status(200).json(transactions);
  } catch (error) {
    console.error('Get recent transactions error:', error);
    res.status(500).json({ message: 'Failed to retrieve recent transactions' });
  }
};

// Transfer funds between accounts
export const transferFunds = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;
    const { fromAccount, toAccount, amount, remarks } = req.body;
    
    // Validate input
    if (!fromAccount || !toAccount || !amount || amount <= 0) {
      return res.status(400).json({ message: 'Invalid transfer details' });
    }
    
    // Check if source account exists and belongs to the user
    const sourceAccount = await accountService.getAccountById(fromAccount);
    
    if (!sourceAccount) {
      return res.status(404).json({ message: 'Source account not found' });
    }
    
    if (sourceAccount.userId !== userId) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    // Check if the source account has sufficient balance
    if (sourceAccount.balance < amount) {
      return res.status(400).json({ message: 'Insufficient funds' });
    }
    
    // Check if destination account exists
    const destinationAccount = await accountService.getAccountById(toAccount);
    
    if (!destinationAccount) {
      return res.status(404).json({ message: 'Destination account not found' });
    }
    
    // Process the transfer
    const transaction = await transactionService.createTransfer({
      fromAccountId: fromAccount,
      toAccountId: toAccount,
      amount,
      remarks
    });
    
    res.status(200).json({
      message: 'Transfer completed successfully',
      transaction
    });
  } catch (error) {
    console.error('Transfer funds error:', error);
    res.status(500).json({ message: 'Failed to process transfer' });
  }
};

// Get transaction by ID
export const getTransactionById = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;
    const transactionId = parseInt(req.params.id);
    
    // Get the transaction
    const transaction = await transactionService.getTransactionById(transactionId);
    
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    
    // Check if the transaction involves an account owned by the user
    const userAccounts = await accountService.getAccountsByUserId(userId);
    const accountIds = userAccounts.map(account => account.id);
    
    if (!accountIds.includes(transaction.fromAccountId) && !accountIds.includes(transaction.toAccountId)) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    res.status(200).json(transaction);
  } catch (error) {
    console.error('Get transaction error:', error);
    res.status(500).json({ message: 'Failed to retrieve transaction details' });
  }
};
