import { Request, Response } from 'express';
import { prisma } from '../utils/prisma';

export const getUser = async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.params.id },
      select: {
        id: true,
        username: true,
        avatar: true,
        bio: true,
        ecoScore: true,
        coinBalance: true,
        createdAt: true,
        tasks: {
          where: { status: 'APPROVED' },
          take: 10,
          orderBy: { createdAt: 'desc' }
        }
      }
    });
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { username, bio, avatar } = req.body;
    
    if (req.user.userId !== id) {
      return res.status(403).json({ error: 'Unauthorized' });
    }
    
    const user = await prisma.user.update({
      where: { id },
      data: { username, bio, avatar }
    });
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user' });
  }
};

export const getLeaderboard = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        avatar: true,
        ecoScore: true,
        coinBalance: true
      },
      orderBy: { ecoScore: 'desc' },
      take: 100
    });
    
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
};
