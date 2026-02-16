import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../utils/prisma';
import { generateTokens } from '../utils/jwt';

export const register = async (req: Request, res: Response) => {
  try {
    const { email, username, password } = req.body;
    
    const existingUser = await prisma.user.findFirst({
      where: { OR: [{ email }, { username }] }
    });
    
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }
    
    const passwordHash = await bcrypt.hash(password, 10);
    
    const user = await prisma.user.create({
      data: { email, username, passwordHash }
    });
    
    const tokens = generateTokens(user.id);
    
    res.status(201).json({
      user: { id: user.id, email: user.email, username: user.username },
      ...tokens
    });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    
    const user = await prisma.user.findUnique({ where: { email } });
    
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const tokens = generateTokens(user.id);
    
    res.json({
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        coinBalance: user.coinBalance,
        ecoScore: user.ecoScore
      },
      ...tokens
    });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;
    
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET!) as { userId: string };
    const tokens = generateTokens(decoded.userId);
    
    res.json(tokens);
  } catch (error) {
    res.status(401).json({ error: 'Invalid refresh token' });
  }
};

export const getProfile = async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.userId },
      select: {
        id: true,
        email: true,
        username: true,
        walletAddress: true,
        ecoScore: true,
        coinBalance: true,
        avatar: true,
        bio: true,
        createdAt: true
      }
    });
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
};
