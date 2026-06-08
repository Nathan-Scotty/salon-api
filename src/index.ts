import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';

import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import clientRoutes from './routes/client.routes';
import stylistRoutes from './routes/stylist.routes';
import serviceRoutes from './routes/service.routes';
import availabilityRoutes from './routes/availability.routes';
import appointmentRoutes from './routes/appointment.routes';
import appointmentServiceRoutes from './routes/appointmentService.routes';
import paymentRoutes from './routes/payment.routes';
import productRoutes from './routes/product.routes';
import postRoutes from './routes/post.routes';
import mediaRoutes from './routes/media.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/auth',                 authRoutes);
app.use('/users',                userRoutes);
app.use('/clients',              clientRoutes);
app.use('/stylists',             stylistRoutes);
app.use('/services',             serviceRoutes);
app.use('/availability',         availabilityRoutes);
app.use('/appointments',         appointmentRoutes);
app.use('/appointment-services', appointmentServiceRoutes);
app.use('/payments',             paymentRoutes);
app.use('/products',             productRoutes);
app.use('/posts',                postRoutes);
app.use('/media',                mediaRoutes);

app.get('/health', (_, res) => res.json({ status: 'ok' }));

app.use((_req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`🚀 Salon API running on http://localhost:${PORT}`);
});

export default app;