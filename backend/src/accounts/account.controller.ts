
import { Request, Response } from 'express';
import * as accountService from './account.service';

// Get all accounts for the authenticated user
export const getUserAccounts = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;
    const accounts = await accountService.getAccountsByUserId(userId);
    
    res.status(200).json(accounts);
  } catch (error) {
    console.error('Get user accounts error:', error);
    res.status(500).json({ message: 'Failed to retrieve accounts' });
  }
};

// Get account details by ID
export const getAccountById = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;
    const accountId = parseInt(req.params.id);
    
    const account = await accountService.getAccountById(accountId);
    
    if (!account) {
      return res.status(404).json({ message: 'Account not found' });
    }
    
    // Check if the account belongs to the authenticated user
    if (account.userId !== userId) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    res.status(200).json(account);
  } catch (error) {
    console.error('Get account error:', error);
    res.status(500).json({ message: 'Failed to retrieve account details' });
  }
};

// Get transactions for an account
export const getAccountTransactions = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;
    const accountId = parseInt(req.params.id);
    
    // Check if the account exists and belongs to the user
    const account = await accountService.getAccountById(accountId);
    
    if (!account) {
      return res.status(404).json({ message: 'Account not found' });
    }
    
    if (account.userId !== userId) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    // Get transactions
    const transactions = await accountService.getAccountTransactions(accountId);
    
    res.status(200).json(transactions);
  } catch (error) {
    console.error('Get account transactions error:', error);
    res.status(500).json({ message: 'Failed to retrieve account transactions' });
  }
};

// Create a new account
export const createAccount = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;
    const { accountType, currency, initialDeposit } = req.body;
    
    // Validate input
    if (!accountType || !currency) {
      return res.status(400).json({ message: 'Account type and currency are required' });
    }
    
    // Create account
    const account = await accountService.createAccount({
      userId,
      accountType,
      currency,
      initialDeposit: initialDeposit || 0
    });
    
    res.status(201).json({
      message: 'Account created successfully',
      account
    });
  } catch (error) {
    console.error('Create account error:', error);
    res.status(500).json({ message: 'Failed to create account' });
  }
};

// Update account details
export const updateAccount = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;
    const accountId = parseInt(req.params.id);
    const { nickname } = req.body;
    
    // Check if the account exists and belongs to the user
    const account = await accountService.getAccountById(accountId);
    
    if (!account) {
      return res.status(404).json({ message: 'Account not found' });
    }
    
    if (account.userId !== userId) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    // Update account
    const updatedAccount = await accountService.updateAccount(accountId, { nickname });
    
    res.status(200).json({
      message: 'Account updated successfully',
      account: updatedAccount
    });
  } catch (error) {
    console.error('Update account error:', error);
    res.status(500).json({ message: 'Failed to update account' });
  }
};

// Close an account
export const closeAccount = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;
    const accountId = parseInt(req.params.id);
    
    // Check if the account exists and belongs to the user
    const account = await accountService.getAccountById(accountId);
    
    if (!account) {
      return res.status(404).json({ message: 'Account not found' });
    }
    
    if (account.userId !== userId) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    // Check if the account has a zero balance
    if (account.balance > 0) {
      return res.status(400).json({ message: 'Account must have a zero balance before closing' });
    }
    
    // Close the account
    await accountService.closeAccount(accountId);
    
    res.status(200).json({ message: 'Account closed successfully' });
  } catch (error) {
    console.error('Close account error:', error);
    res.status(500).json({ message: 'Failed to close account' });
  }
};
