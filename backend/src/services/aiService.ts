import axios from 'axios';
import { prisma } from '../utils/prisma';

const AI_SERVICE_URL = process.env.AI_SERVICE_URL || 'http://localhost:8000';

export const verifyTaskWithAI = async (taskId: string, imageUrl: string, taskType: string) => {
  try {
    const response = await axios.post(`${AI_SERVICE_URL}/verify`, {
      imageUrl,
      taskType
    });
    
    const { isValid, confidence, detectedObjects } = response.data;
    
    const coinsEarned = isValid ? calculateReward(taskType, confidence) : 0;
    
    await prisma.task.update({
      where: { id: taskId },
      data: {
        status: isValid ? 'APPROVED' : 'REJECTED',
        aiScore: confidence,
        coinsEarned,
        verifiedAt: isValid ? new Date() : null,
        rejectedReason: isValid ? null : 'AI verification failed'
      }
    });
    
    if (isValid) {
      const task = await prisma.task.findUnique({ where: { id: taskId } });
      await prisma.user.update({
        where: { id: task!.userId },
        data: {
          coinBalance: { increment: coinsEarned },
          ecoScore: { increment: Math.floor(coinsEarned * 10) }
        }
      });
    }
  } catch (error) {
    console.error('AI verification failed:', error);
  }
};

const calculateReward = (taskType: string, confidence: number): number => {
  const baseRewards: Record<string, number> = {
    PLANT_TREE: 50,
    WATER_PLANTS: 10,
    PUBLIC_TRANSPORT: 20,
    BEACH_CLEANUP: 40,
    RECYCLE: 15,
    REDUCE_PLASTIC: 15,
    BIKE_RIDE: 25,
    CARPOOL: 30,
    OTHER: 10
  };
  
  return Math.floor((baseRewards[taskType] || 10) * confidence);
};
