import 'dotenv/config';
import path from 'path';
import fs from 'fs';
import express, { Request, Response, Application } from 'express';
import cors from 'cors';
import { sequelize } from './util/database';
import { authenRoute } from './routes/authenRoute';
import { authorRoute } from './routes/authorRoute';
import { bookRoute } from './routes/bookRoute';
import { categoryRoute } from './routes/categoryRoute';
import { userRoute } from './routes/userRoute';
import { authenticateToken } from './middlewares/authMiddleware';

const UPLOADS_DIR = path.join(__dirname, '../uploads');
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

const imageMimeTypes: Record<string, string> = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.bmp': 'image/bmp',
  '.ico': 'image/x-icon',
};

const app: Application = express();
const PORT: number = process.env.PORT ? parseInt(process.env.PORT) : 3000;

app.use(cors({
  origin: process.env.URL_FRONTEND, // อนุญาตเฉพาะ Origin ของ React
  credentials: true,               // อนุญาตให้ส่ง Cookie หรือ Header พิเศษได้
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sample Route
app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'api already to use' });
});

app.get('/test', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    message: 'Test route is working',
    timestamp: new Date().toISOString(),
  });
});


app.use('/uploads', express.static(UPLOADS_DIR, {
  maxAge: '7d',
  fallthrough: false,
  setHeaders: (res, filePath) => {
    const ext = path.extname(filePath).toLowerCase();
    const mime = imageMimeTypes[ext];
    if (mime) res.setHeader('Content-Type', mime);
    res.setHeader('Cache-Control', 'public, max-age=604800, immutable, no-transform');
    res.setHeader('Access-Control-Allow-Origin', '*');
  },
}));

app.use('/api', authenRoute)

app.use(authenticateToken);
app.use('/api', authorRoute)
app.use('/api', bookRoute)
app.use('/api', categoryRoute)
app.use('/api', userRoute)

app.use((err: any, req: Request, res: Response, next: any) => {
  if (err) {
    return res.status(400).json({
      status: "error",
      message: err.message || "Upload error",
    });
  }
  next();
});

// Start Server
sequelize.authenticate()
  .then(() => {
    console.log('Database connected successfully.');
    return sequelize.sync();
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });
