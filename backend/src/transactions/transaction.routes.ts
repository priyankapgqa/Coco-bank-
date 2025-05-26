
import express from 'express';
import * as transactionController from './transaction.controller';
import { authenticate } from '../middleware/auth';

const router = express.Router();

// All transaction routes require authentication
router.use(authenticate);

// Get recent transactions for the user
router.get('/recent', transactionController.getRecentTransactions);

// Transfer funds between accounts
router.post('/transfer', transactionController.transferFunds);

// Get transaction by ID
router.get('/:id', transactionController.getTransactionById);

export const transactionRoutes = router;
