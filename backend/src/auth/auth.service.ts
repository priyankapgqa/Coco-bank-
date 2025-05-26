import bcrypt from 'bcryptjs';
import crypto from 'crypto';

// Mock database for demo users
let users: any[] = [
  {
    id: 1,
    email: 'demo@cocobank.com',
    password: '', // We'll hash this
    firstName: 'Demo',
    lastName: 'User',
    phoneNumber: '+1234567890',
    createdAt: new Date(),
    role: 'customer'
  }
];

let resetTokens: Record<string, { userId: number, expiry: Date }> = {};

// Initialize the demo user with a hashed password
const initializeDemoUser = async () => {
  const demoPassword = 'DemoCocoBankPassword123!';
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(demoPassword, salt);
  
  users[0].password = hashedPassword;
};

// Call initialization immediately
initializeDemoUser();

// Find user by email
export const findUserByEmail = async (email: string) => {
  return users.find(user => user.email === email);
};

// Find user by ID
export const findUserById = async (id: number) => {
  return users.find(user => user.id === id);
};

// Create new user
export const createUser = async (userData: any) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(userData.password, salt);
  
  const newUser = {
    id: users.length + 1,
    email: userData.email,
    password: hashedPassword,
    firstName: userData.firstName,
    lastName: userData.lastName,
    phoneNumber: userData.phoneNumber,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  
  users.push(newUser);
  return newUser;
};

// Update user
export const updateUser = async (id: number, userData: any) => {
  const userIndex = users.findIndex(user => user.id === id);
  
  if (userIndex !== -1) {
    users[userIndex] = {
      ...users[userIndex],
      ...userData,
      updatedAt: new Date()
    };
    
    return users[userIndex];
  }
  
  return null;
};

// Update password
export const updatePassword = async (id: number, newPassword: string) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(newPassword, salt);
  
  return updateUser(id, { password: hashedPassword });
};

// Generate password reset token
export const generatePasswordResetToken = async (userId: number) => {
  const token = crypto.randomBytes(32).toString('hex');
  const expiry = new Date();
  expiry.setHours(expiry.getHours() + 1); // Token expires in 1 hour
  
  resetTokens[token] = { userId, expiry };
  
  return token;
};

// Verify password reset token
export const verifyPasswordResetToken = async (token: string) => {
  const resetData = resetTokens[token];
  
  if (!resetData) {
    return null;
  }
  
  if (new Date() > resetData.expiry) {
    delete resetTokens[token];
    return null;
  }
  
  return resetData.userId;
};
