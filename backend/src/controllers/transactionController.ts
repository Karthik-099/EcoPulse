import { Request, Response } from 'express';
import { prisma } from '../utils/prisma';
import { transferTokens } from '../services/blockchainService';

export const getTransactions = async (req: Request, res: Response) => {
  try {
    const userId = req.user.userId;
    
    const transactions = await prisma.transaction.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 50
    });
    
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch transactions' });
  }
};

export const createTransaction = async (req: Request, res: Response) => {
  try {
    const { type, amount, toWallet, description } = req.body;
    const userId = req.user.userId;
    
    const user = await prisma.user.findUnique({ where: { id: userId } });
    
    if (!user || user.coinBalance < amount) {
      return res.status(400).json({ error: 'Insufficient balance' });
    }
    
    const txHash = await transferTokens(user.walletAddress!, toWallet, amount);
    
    const transaction = await prisma.transaction.create({
      data: {
        userId,
        type,
        amount,
        fromWallet: user.walletAddress,
        toWallet,
        txHash,
        status: 'COMPLETED',
        description
      }
    });
    
    await prisma.user.update({
      where: { id: userId },
      data: { coinBalance: { decrement: amount } }
    });
    
    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ error: 'Transaction failed' });
  }
};

export const getBalance = async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.userId },
      select: { coinBalance: true, walletAddress: true }
    });
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch balance' });
  }
};
