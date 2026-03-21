import express from 'express';
import { wompiService } from '../services/wompiService';

const router = express.Router();

router.post('/create-session', async (req, res) => {
  try {
    const orderData = req.body;

    console.log('BODY RECIBIDO:', req.body);

    if (!orderData.total || !orderData.email) {
      const missingFields = [];
      if (!orderData.total) missingFields.push('total');
      if (!orderData.email) missingFields.push('email');

      console.error('VALIDATION 400 /checkout/create-session:', {
        missingFields,
        received: {
          email: orderData.email,
          total: orderData.total,
          hasItems: Array.isArray(orderData.items),
          itemsLength: Array.isArray(orderData.items) ? orderData.items.length : null,
        },
      });
      return res.status(400).json({ error: 'Datos inválidos' });
    }

    const params = wompiService.createPaymentParams(orderData);

    console.log('WOMPI PARAMS:', params);

    return res.json({
      params,
      reference: params.reference,
    });

  } catch (error: any) {
    console.error('ERROR:', error.message);
    return res.status(500).json({ error: error.message });
  }
});

export default router;