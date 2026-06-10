import express from 'express';
import { NotificationRepository } from '../../infrastructure/NotificationRepository.js';
import { v4 as uuidv4 } from 'uuid';
import { NotificationType } from '../../domain/Notification.js';

const router = express.Router();
const notificationRepo = new NotificationRepository();

// Middleware to mock auth for now (should use real JWT)
const getUserId = (req: express.Request) => {
  // In a real app, this would come from the JWT token
  return req.headers['x-user-id'] as string;
};

router.get('/', async (req, res) => {
  const userId = getUserId(req);
  if (!userId) return res.status(401).json({ error: 'Unauthorized' });
  
  try {
    const notifications = await notificationRepo.getByUserId(userId);
    res.json(notifications);
  } catch (e) {
    res.status(500).json({ error: 'Failed to fetch notifications' });
  }
});

router.post('/:id/read', async (req, res) => {
  try {
    await notificationRepo.markAsRead(req.params.id);
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: 'Failed to mark as read' });
  }
});

router.post('/read-all', async (req, res) => {
  const userId = getUserId(req);
  if (!userId) return res.status(401).json({ error: 'Unauthorized' });

  try {
    await notificationRepo.markAllAsRead(userId);
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: 'Failed to mark all as read' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await notificationRepo.delete(req.params.id);
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: 'Failed to delete notification' });
  }
});

// Helper route to create a test notification
router.post('/test', async (req, res) => {
  const userId = getUserId(req);
  if (!userId) return res.status(401).json({ error: 'Unauthorized' });

  const notification = {
    id: uuidv4(),
    userId,
    title: req.body.title || 'Test Notification',
    message: req.body.message || 'This is a test notification from the system.',
    type: req.body.type || NotificationType.INFO,
    isRead: false,
    createdAt: new Date()
  };

  try {
    await notificationRepo.create(notification);
    res.json(notification);
  } catch (e) {
    res.status(500).json({ error: 'Failed to create notification' });
  }
});

export default router;
