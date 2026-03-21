import express from 'express';
import { handleWompiWebhook } from '../controllers/webhookController.js';

const router = express.Router();

router.post('/wompi', handleWompiWebhook);

export default router;