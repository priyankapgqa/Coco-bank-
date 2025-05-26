
# COCO BANK IN FEDERAL - Backend API

This is the backend API for COCO BANK IN FEDERAL banking application.

## Project Structure

```
coco-bank-backend/
├── src/
│   ├── auth/               # Authentication and user management
│   ├── accounts/           # Account management
│   ├── transactions/       # Transaction processing
│   ├── payments/           # Bill payments and recharges
│   ├── middleware/         # API middleware (auth, validation)
│   └── main.ts             # Main application entry point
├── .env.example            # Environment variables template
├── package.json            # Project dependencies and scripts
└── tsconfig.json           # TypeScript configuration
```

## Getting Started

### Prerequisites

- Node.js (v18+)
- PostgreSQL (v14+)

### Installation

1. Clone the repository
2. Install dependencies

```bash
cd coco-bank-backend
npm install
```

3. Set up environment variables

```bash
cp .env.example .env
# Edit .env file with your configuration
```

4. Start the development server

```bash
npm run dev
```

The API will be available at `http://localhost:5000`.

## API Documentation

### Authentication Endpoints

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and get access token
- `GET /api/auth/profile` - Get user profile information
- `PUT /api/auth/profile` - Update user profile
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password with token

### Account Endpoints

- `GET /api/accounts` - Get all accounts for authenticated user
- `GET /api/accounts/:id` - Get specific account details
- `GET /api/accounts/:id/transactions` - Get transactions for an account
- `POST /api/accounts` - Create a new account
- `PUT /api/accounts/:id` - Update account details
- `DELETE /api/accounts/:id` - Close an account

### Transaction Endpoints

- `GET /api/transactions/recent` - Get recent transactions
- `POST /api/transactions/transfer` - Transfer funds between accounts
- `GET /api/transactions/:id` - Get transaction details

### Payment Endpoints

- `GET /api/payments/billers` - Get list of billers
- `POST /api/payments/pay-bill` - Pay a bill
- `POST /api/payments/recharge` - Recharge mobile or services
- `GET /api/payments/history` - Get payment history

## Development

The current implementation uses in-memory storage for demonstration purposes. In a production environment, you would:

1. Connect to a PostgreSQL database using TypeORM
2. Implement proper error handling and validation
3. Set up authentication with JWT
4. Implement transaction isolation for financial operations

## Production Deployment

For production deployment:

1. Build the application

```bash
npm run build
```

2. Set up proper environment variables
3. Use a process manager like PM2 to run the application
