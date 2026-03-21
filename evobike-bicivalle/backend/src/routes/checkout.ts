import express from 'express';
import { wompiService } from '../services/wompiService';

const router = express.Router();

router.post('/create-session', async (req, res) => {
  try {
    const orderData = req.body;

    if (!orderData.total || !orderData.email) {
      return res.status(400).json({ error: 'Datos inválidos' });
    }

    const params = wompiService.createPaymentParams(orderData);

    return res.json({
      params,
      reference: params.reference,
    });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.get('/verify-payment/:transactionId', async (req, res) => {
  try {
    const { transactionId } = req.params;

    if (!transactionId) {
      return res.status(400).json({ error: 'transactionId requerido' });
    }

    const transaction = await wompiService.getTransaction(transactionId);

    return res.json({
      status: transaction.status,
      reference: transaction.reference,
      amount: transaction.amount_in_cents,
      currency: transaction.currency,
    });

  } catch (error) {
    return res.status(500).json({ error: 'Error verificando pago' });
  }
});

export default router;