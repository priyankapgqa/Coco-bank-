
import { Request, Response } from 'express';
import * as paymentService from './payment.service';
import * as accountService from '../accounts/account.service';

// Get list of billers
export const getBillers = async (req: Request, res: Response) => {
  try {
    const { category } = req.query;
    
    const billers = await paymentService.getBillers(category as string);
    
    res.status(200).json(billers);
  } catch (error) {
    console.error('Get billers error:', error);
    res.status(500).json({ message: 'Failed to retrieve billers' });
  }
};

// Pay a bill
export const payBill = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;
    const { accountId, billerId, amount, reference, remarks } = req.body;
    
    // Validate input
    if (!accountId || !billerId || !amount || amount <= 0) {
      return res.status(400).json({ message: 'Invalid bill payment details' });
    }
    
    // Check if source account exists and belongs to the user
    const account = await accountService.getAccountById(accountId);
    
    if (!account) {
      return res.status(404).json({ message: 'Account not found' });
    }
    
    if (account.userId !== userId) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    // Check if the account has sufficient balance
    if (account.balance < amount) {
      return res.status(400).json({ message: 'Insufficient funds' });
    }
    
    // Process the bill payment
    const payment = await paymentService.createBillPayment({
      accountId,
      userId,
      billerId,
      amount,
      reference,
      remarks
    });
    
    res.status(200).json({
      message: 'Bill payment successful',
      payment
    });
  } catch (error) {
    console.error('Bill payment error:', error);
    res.status(500).json({ message: 'Failed to process bill payment' });
  }
};

// Recharge mobile or services
export const recharge = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;
    const { accountId, serviceProvider, mobileNumber, amount, plan } = req.body;
    
    // Validate input
    if (!accountId || !serviceProvider || !mobileNumber || !amount || amount <= 0) {
      return res.status(400).json({ message: 'Invalid recharge details' });
    }
    
    // Check if source account exists and belongs to the user
    const account = await accountService.getAccountById(accountId);
    
    if (!account) {
      return res.status(404).json({ message: 'Account not found' });
    }
    
    if (account.userId !== userId) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    // Check if the account has sufficient balance
    if (account.balance < amount) {
      return res.status(400).json({ message: 'Insufficient funds' });
    }
    
    // Process the recharge
    const recharge = await paymentService.createRecharge({
      accountId,
      userId,
      serviceProvider,
      mobileNumber,
      amount,
      plan
    });
    
    res.status(200).json({
      message: 'Recharge successful',
      recharge
    });
  } catch (error) {
    console.error('Recharge error:', error);
    res.status(500).json({ message: 'Failed to process recharge' });
  }
};

// Get payment history
export const getPaymentHistory = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;
    const { type } = req.query;
    
    const paymentHistory = await paymentService.getPaymentHistory(userId, type as string);
    
    res.status(200).json(paymentHistory);
  } catch (error) {
    console.error('Get payment history error:', error);
    res.status(500).json({ message: 'Failed to retrieve payment history' });
  }
};
