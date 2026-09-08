import 'dotenv/config';
import express, { Request, Response, Application } from 'express';
import { bookRoute } from './routes/bookRoute';
import { sequelize } from './util/database';
import './models/users';

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
