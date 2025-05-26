
import express from 'express';
import * as accountController from './account.controller';
import { authenticate } from '../middleware/auth';

const router = express.Router();

// All account routes require authentication
router.use(authenticate);

// Get all accounts for the authenticated user
router.get('/', accountController.getUserAccounts);

// Get a specific account by ID
router.get('/:id', accountController.getAccountById);

// Get transactions for a specific account
router.get('/:id/transactions', accountController.getAccountTransactions);

// Create a new account
router.post('/', accountController.createAccount);

// Update account details
router.put('/:id', accountController.updateAccount);

// Close an account
router.delete('/:id', accountController.closeAccount);

export const accountRoutes = router;
