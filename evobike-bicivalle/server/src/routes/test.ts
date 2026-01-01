import express from 'express';
import { EmailService } from '../utils/emailService.js';

const router = express.Router();

router.get('/test-email', async (req, res) => {
  try {
    const success = await EmailService.sendTestEmail();
    if (success) {
      res.json({ message: 'Email de prueba enviado. Revisa tu bandeja de entrada.' });
    } else {
      res.status(500).json({ error: 'Error enviando email de prueba' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error en test de email' });
  }
});

export default router;