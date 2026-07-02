import cors from 'cors';
import express from 'express';
import { env } from './config/env.js';
import authRoutes from './routes/auth.routes.js';
import checkoutRoutes from './routes/checkout.routes.js';
import adminRoutes from './routes/admin.routes.js';
import productRoutes from './routes/products.routes.js';
import { catalogService } from './services/catalog.service.js';

const app = express();

const allowedOrigins = [
  env.FRONTEND_URL,
  'https://movilibre.co',
  'https://www.movilibre.co',
  'http://localhost:3000',
  'http://localhost:5173',
]
  .flatMap((origin) => origin.split(','))
  .map((origin) => origin.trim())
  .filter(Boolean);

const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
      return;
    }

    callback(new Error(`Origin not allowed by CORS: ${origin}`));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/checkout', checkoutRoutes);
app.use('/api/admin', adminRoutes);

app.listen(env.PORT, () => {
  console.log(`Server running on http://localhost:${env.PORT}`);
  catalogService.warmCache();
});
