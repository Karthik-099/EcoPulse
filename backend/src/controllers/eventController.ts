import { Request, Response } from 'express';
import { prisma } from '../utils/prisma';
import { uploadToS3 } from '../utils/s3';

export const createEvent = async (req: Request, res: Response) => {
  try {
    const { title, description, eventType, date, location, latitude, longitude, maxParticipants, budget, rewards } = req.body;
    const creatorId = req.user.userId;
    
    let imageUrl = null;
    if (req.file) {
      imageUrl = await uploadToS3(req.file);
    }
    
    const event = await prisma.event.create({
      data: {
        creatorId,
        title,
        description,
        eventType,
        date: new Date(date),
        location,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        maxParticipants: parseInt(maxParticipants),
        budget: budget ? parseFloat(budget) : null,
        rewards: parseFloat(rewards),
        imageUrl
      }
    });
    
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create event' });
  }
};

export const getEvents = async (req: Request, res: Response) => {
  try {
    const { status, eventType } = req.query;
    
    const events = await prisma.event.findMany({
      where: {
        ...(status && { status: status as any }),
        ...(eventType && { eventType: eventType as any })
      },
      include: {
        creator: {
          select: { id: true, username: true, avatar: true }
        },
        participants: {
          include: {
            user: {
              select: { id: true, username: true, avatar: true }
            }
          }
        }
      },
      orderBy: { date: 'asc' }
    });
    
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch events' });
  }
};

export const getEventById = async (req: Request, res: Response) => {
  try {
    const event = await prisma.event.findUnique({
      where: { id: req.params.id },
      include: {
        creator: {
          select: { id: true, username: true, avatar: true }
        },
        participants: {
          include: {
            user: {
              select: { id: true, username: true, avatar: true }
            }
          }
        }
      }
    });
    
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    
    res.json(event);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch event' });
  }
};

export const joinEvent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;
    
    const event = await prisma.event.findUnique({
      where: { id },
      include: { participants: true }
    });
    
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    
    if (event.participants.length >= event.maxParticipants) {
      return res.status(400).json({ error: 'Event is full' });
    }
    
    const participant = await prisma.eventParticipant.create({
      data: { eventId: id, userId }
    });
    
    res.status(201).json(participant);
  } catch (error) {
    res.status(500).json({ error: 'Failed to join event' });
  }
};

export const updateEvent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    const event = await prisma.event.update({
      where: { id },
      data: { status }
    });
    
    res.json(event);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update event' });
  }
};
