
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { authRoutes } from './auth/auth.routes';
import { accountRoutes } from './accounts/account.routes';
import { transactionRoutes } from './transactions/transaction.routes';
import { paymentRoutes } from './payments/payment.routes';

// Load environment variables
dotenv.config();

// Create Express app
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/accounts', accountRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/payments', paymentRoutes);

// Base route
app.get('/', (req, res) => {
  res.send('COCO BANK IN FEDERAL API');
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    status: 'error',
    message: err.message || 'Internal Server Error',
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app;
