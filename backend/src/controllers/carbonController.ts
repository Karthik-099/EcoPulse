import { Request, Response } from 'express';
import { prisma } from '../utils/prisma';

export const createCarbonCredit = async (req: Request, res: Response) => {
  try {
    const { companyName, companyEmail, amount, price } = req.body;
    
    const credit = await prisma.carbonCredit.create({
      data: {
        companyName,
        companyEmail,
        amount: parseFloat(amount),
        price: parseFloat(price)
      }
    });
    
    res.status(201).json(credit);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create carbon credit request' });
  }
};

export const getCarbonCredits = async (req: Request, res: Response) => {
  try {
    const { status } = req.query;
    
    const credits = await prisma.carbonCredit.findMany({
      where: status ? { status: status as any } : {},
      orderBy: { createdAt: 'desc' }
    });
    
    res.json(credits);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch carbon credits' });
  }
};

export const approveCarbonCredit = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status, txHash } = req.body;
    
    const credit = await prisma.carbonCredit.update({
      where: { id },
      data: { status, txHash }
    });
    
    res.json(credit);
  } catch (error) {
    res.status(500).json({ error: 'Failed to approve carbon credit' });
  }
};
