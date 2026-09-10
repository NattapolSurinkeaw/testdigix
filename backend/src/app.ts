import 'dotenv/config';
import express, { Request, Response, Application } from 'express';
import cors from 'cors';
import { sequelize } from './util/database';
import { authenRoute } from './routes/authenRoute';
import { authorRoute } from './routes/authorRoute';
import { bookRoute } from './routes/bookRoute';
import { categoryRoute } from './routes/categoryRoute';
import { userRoute } from './routes/userRoute';
import { authenticateToken } from './middlewares/authMiddleware';

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

app.use('/uploads', express.static('uploads'));

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
