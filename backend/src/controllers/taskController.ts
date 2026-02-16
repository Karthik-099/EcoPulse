import { Request, Response } from 'express';
import { prisma } from '../utils/prisma';
import { uploadToS3 } from '../utils/s3';
import { verifyTaskWithAI } from '../services/aiService';
import { rewardUser } from '../services/blockchainService';

export const createTask = async (req: Request, res: Response) => {
  try {
    const { type, title, description, location, latitude, longitude } = req.body;
    const userId = req.user.userId;
    
    if (!req.file) {
      return res.status(400).json({ error: 'Proof image required' });
    }
    
    const proofUrl = await uploadToS3(req.file);
    
    const task = await prisma.task.create({
      data: {
        userId,
        type,
        title,
        description,
        proofUrl,
        location,
        latitude: latitude ? parseFloat(latitude) : null,
        longitude: longitude ? parseFloat(longitude) : null
      }
    });
    
    verifyTaskWithAI(task.id, proofUrl, type).catch(console.error);
    
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create task' });
  }
};

export const getTasks = async (req: Request, res: Response) => {
  try {
    const { status, userId } = req.query;
    
    const tasks = await prisma.task.findMany({
      where: {
        ...(status && { status: status as any }),
        ...(userId && { userId: userId as string })
      },
      include: {
        user: {
          select: { id: true, username: true, avatar: true }
        }
      },
      orderBy: { createdAt: 'desc' },
      take: 50
    });
    
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
};

export const getTaskById = async (req: Request, res: Response) => {
  try {
    const task = await prisma.task.findUnique({
      where: { id: req.params.id },
      include: {
        user: {
          select: { id: true, username: true, avatar: true }
        }
      }
    });
    
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch task' });
  }
};

export const verifyTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status, coinsEarned, rejectedReason } = req.body;
    
    const task = await prisma.task.update({
      where: { id },
      data: {
        status,
        coinsEarned: status === 'APPROVED' ? coinsEarned : 0,
        verifiedAt: status === 'APPROVED' ? new Date() : null,
        rejectedReason: status === 'REJECTED' ? rejectedReason : null
      }
    });
    
    if (status === 'APPROVED' && coinsEarned > 0) {
      await prisma.user.update({
        where: { id: task.userId },
        data: {
          coinBalance: { increment: coinsEarned },
          ecoScore: { increment: Math.floor(coinsEarned * 10) }
        }
      });
      
      await rewardUser(task.userId, coinsEarned);
    }
    
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: 'Failed to verify task' });
  }
};
