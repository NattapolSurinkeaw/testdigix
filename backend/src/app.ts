import express, { Request, Response, Application } from 'express';
import { bookRoute } from './routes/bookRoute';

const app: Application = express();
const PORT: number = process.env.PORT ? parseInt(process.env.PORT) : 3000;

// Middleware
app.use(express.json());
app.use(bookRoute)

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
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
