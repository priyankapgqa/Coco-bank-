
import express from 'express';
import * as paymentController from './payment.controller';
import { authenticate } from '../middleware/auth';

const router = express.Router();

// All payment routes require authentication
router.use(authenticate);

// Get list of billers
router.get('/billers', paymentController.getBillers);

// Pay a bill
router.post('/pay-bill', paymentController.payBill);

// Recharge mobile or services
router.post('/recharge', paymentController.recharge);

// Get payment history
router.get('/history', paymentController.getPaymentHistory);

export const paymentRoutes = router;
