import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';

import authRoutes from './server/api/routes/authRoutes.js';
import serviceRoutes from './server/api/routes/serviceRoutes.js';
import bookingRoutes from './server/api/routes/bookingRoutes.js';
import applicationRoutes from './server/api/routes/applicationRoutes.js';
import notificationRoutes from './server/api/routes/notificationRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  console.log('Initializing Express app...');
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  console.log('Registering API routes...');
  // API Routes
  app.use('/api/auth', authRoutes);
  app.use('/api/services', serviceRoutes);
  app.use('/api/bookings', bookingRoutes);
  app.use('/api/applications', applicationRoutes);
  app.use('/api/notifications', notificationRoutes);

  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'The ARD API is running' });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    console.log('Starting Vite in middleware mode...');
    try {
      const vite = await createViteServer({
        server: { 
          middlewareMode: true,
          hmr: false
        },
        appType: 'spa',
      });
      app.use(vite.middlewares);
      console.log('Vite middleware attached successfully.');
    } catch (viteError) {
      console.error('Failed to start Vite server:', viteError);
    }
  } else {
    console.log('Serving static files from dist...');
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`>>> Server is listening on http://0.0.0.0:${PORT}`);
    console.log(`>>> Environment: ${process.env.NODE_ENV || 'development'}`);
  });
}

console.log('Starting server...');

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

startServer().catch(err => {
  console.error('Failed to start server:', err);
});
