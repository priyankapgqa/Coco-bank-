
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import * as authService from './auth.service';

// User registration
export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, firstName, lastName, phoneNumber } = req.body;
    
    // Check if user already exists
    const existingUser = await authService.findUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({ message: 'User with this email already exists' });
    }
    
    // Create new user
    const user = await authService.createUser({
      email,
      password,
      firstName,
      lastName,
      phoneNumber
    });
    
    res.status(201).json({
      message: 'User registered successfully',
      userId: user.id
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Failed to register user' });
  }
};

// User login
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    
    // Find user by email
    const user = await authService.findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    
    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    
    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
    );
    
    res.status(200).json({
      token,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Failed to login' });
  }
};

// Get user profile
export const getProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const user = await authService.findUserById(userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.status(200).json({
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      createdAt: user.createdAt
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ message: 'Failed to get user profile' });
  }
};

// Update user profile
export const updateProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const { firstName, lastName, phoneNumber } = req.body;
    
    await authService.updateUser(userId, {
      firstName,
      lastName,
      phoneNumber
    });
    
    res.status(200).json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: 'Failed to update profile' });
  }
};

// Change password
export const changePassword = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const { currentPassword, newPassword } = req.body;
    
    const user = await authService.findUserById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Verify current password
    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Current password is incorrect' });
    }
    
    // Update password
    await authService.updatePassword(userId, newPassword);
    
    res.status(200).json({ message: 'Password changed successfully' });
  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({ message: 'Failed to change password' });
  }
};

// Forgot password
export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    
    const user = await authService.findUserByEmail(email);
    if (!user) {
      // Don't reveal user existence, but still return success
      return res.status(200).json({ message: 'If your email is registered, you will receive a password reset link' });
    }
    
    // In a real application, you would generate a reset token and send an email
    const resetToken = await authService.generatePasswordResetToken(user.id);
    
    // In a real application, you would send an email with the reset link
    // For now, just return the token for testing purposes
    res.status(200).json({
      message: 'Password reset link sent to your email',
      resetToken // This would not be included in a production environment
    });
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({ message: 'Failed to process forgot password request' });
  }
};

// Reset password
export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { token, newPassword } = req.body;
    
    const userId = await authService.verifyPasswordResetToken(token);
    if (!userId) {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }
    
    await authService.updatePassword(userId, newPassword);
    
    res.status(200).json({ message: 'Password reset successfully' });
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({ message: 'Failed to reset password' });
  }
};
