import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

import express from 'express';
import cors from 'cors';

import productRoutes from './routes/products.js';
import orderRoutes from './routes/orders.js';
import adminRoutes from './routes/admin.js';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import vendorRoutes from './routes/vendor.js';
import testRoutes from './routes/test.js';
import siigoRoutes from './routes/siigo.js';
import checkoutRoutes from './routes/checkout.js';

import webhookRoutes from './routes/webhooks.js';
if (!process.env.WOMPI_PUBLIC_KEY || !process.env.WOMPI_INTEGRITY_SECRET) {
  console.warn('Missing Wompi env vars');
}

const app = express();
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/users', userRoutes);
app.use('/api/vendor', vendorRoutes);
app.use('/api/test', testRoutes);
app.use('/api/siigo', siigoRoutes);
app.use('/api/checkout', checkoutRoutes);
app.use('/api/webhooks', webhookRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});