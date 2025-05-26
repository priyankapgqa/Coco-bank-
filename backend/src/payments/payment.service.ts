
import * as accountService from '../accounts/account.service';
import * as transactionService from '../transactions/transaction.service';

// Mock database for payments
let payments: any[] = [];
let billers: any[] = [
  { id: 1, name: 'Tata Power', category: 'electricity', logo: 'tata-power.png' },
  { id: 2, name: 'Adani Electricity', category: 'electricity', logo: 'adani-electricity.png' },
  { id: 3, name: 'Reliance Energy', category: 'electricity', logo: 'reliance-energy.png' },
  { id: 4, name: 'Airtel Broadband', category: 'internet', logo: 'airtel.png' },
  { id: 5, name: 'Jio Fiber', category: 'internet', logo: 'jio.png' },
  { id: 6, name: 'HDFC Credit Card', category: 'creditcard', logo: 'hdfc.png' },
  { id: 7, name: 'SBI Credit Card', category: 'creditcard', logo: 'sbi.png' },
  { id: 8, name: 'ICICI Credit Card', category: 'creditcard', logo: 'icici.png' }
];

let serviceProviders: any[] = [
  { id: 1, name: 'Jio', category: 'mobile', logo: 'jio.png' },
  { id: 2, name: 'Airtel', category: 'mobile', logo: 'airtel.png' },
  { id: 3, name: 'Vi', category: 'mobile', logo: 'vi.png' },
  { id: 4, name: 'BSNL', category: 'mobile', logo: 'bsnl.png' },
  { id: 5, name: 'Tata Sky', category: 'dth', logo: 'tata-sky.png' },
  { id: 6, name: 'Dish TV', category: 'dth', logo: 'dish-tv.png' },
  { id: 7, name: 'Airtel DTH', category: 'dth', logo: 'airtel-dth.png' }
];

// Get billers by category
export const getBillers = async (category?: string) => {
  if (category) {
    return billers.filter(biller => biller.category === category);
  }
  return billers;
};

// Create a bill payment
export const createBillPayment = async (paymentData: any) => {
  // Get the account
  const account = await accountService.getAccountById(paymentData.accountId);
  
  if (!account) {
    throw new Error('Account not found');
  }
  
  // Get the biller
  const biller = billers.find(b => b.id === paymentData.billerId);
  
  if (!biller) {
    throw new Error('Biller not found');
  }
  
  // Generate payment ID
  const paymentId = payments.length + 1;
  
  // Create payment record
  const payment = {
    id: paymentId,
    userId: paymentData.userId,
    accountId: paymentData.accountId,
    billerId: paymentData.billerId,
    billerName: biller.name,
    amount: paymentData.amount,
    reference: paymentData.reference || `REF${Math.floor(Math.random() * 1000000)}`,
    remarks: paymentData.remarks || `Bill payment - ${biller.name}`,
    date: new Date().toISOString(),
    status: 'COMPLETED',
    type: 'BILL_PAYMENT'
  };
  
  payments.push(payment);
  
  // Create a transaction for this payment
  await transactionService.createWithdrawal(
    paymentData.accountId,
    paymentData.amount,
    `Bill payment - ${biller.name}`
  );
  
  return payment;
};

// Create a recharge
export const createRecharge = async (rechargeData: any) => {
  // Get the account
  const account = await accountService.getAccountById(rechargeData.accountId);
  
  if (!account) {
    throw new Error('Account not found');
  }
  
  // Get the service provider
  const provider = serviceProviders.find(p => p.id === rechargeData.serviceProvider);
  
  if (!provider) {
    throw new Error('Service provider not found');
  }
  
  // Generate recharge ID
  const rechargeId = payments.length + 1;
  
  // Create recharge record
  const recharge = {
    id: rechargeId,
    userId: rechargeData.userId,
    accountId: rechargeData.accountId,
    providerId: rechargeData.serviceProvider,
    providerName: provider.name,
    mobileNumber: rechargeData.mobileNumber,
    amount: rechargeData.amount,
    plan: rechargeData.plan,
    date: new Date().toISOString(),
    status: 'COMPLETED',
    type: 'RECHARGE'
  };
  
  payments.push(recharge);
  
  // Create a transaction for this recharge
  await transactionService.createWithdrawal(
    rechargeData.accountId,
    rechargeData.amount,
    `Recharge - ${provider.name} - ${rechargeData.mobileNumber}`
  );
  
  return recharge;
};

// Get payment history for a user
export const getPaymentHistory = async (userId: number, type?: string) => {
  let userPayments = payments.filter(payment => payment.userId === userId);
  
  if (type) {
    userPayments = userPayments.filter(payment => payment.type === type);
  }
  
  return userPayments.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};
